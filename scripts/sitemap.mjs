import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import prettier from "prettier";
import { remark } from "remark";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import { parse as parseYaml } from "yaml";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const sitemapPath = "pages/sitemap.md";
const goals = ["alignment", "economy", "traceability", "security"];
const directories = ["pages", "concepts", "slides", "sources"];
const statuses = new Set(["stub", "developing", "established"]);
const parser = remark().use(remarkFrontmatter).use(remarkGfm);

function visit(node, callback) {
  callback(node);
  for (const child of node.children ?? []) visit(child, callback);
}

function textContent(node) {
  if (node.type === "text" || node.type === "inlineCode") return node.value;
  return (node.children ?? []).map(textContent).join("");
}

function linkText(value) {
  return value
    .replaceAll("\\", "\\\\")
    .replaceAll("[", "\\[")
    .replaceAll("]", "\\]");
}

async function markdownFiles(rootDir, directory) {
  const found = [];
  async function walk(relativeDir) {
    const entries = await readdir(path.join(rootDir, relativeDir), {
      withFileTypes: true,
    });
    for (const entry of entries) {
      const relativePath = path.posix.join(relativeDir, entry.name);
      if (entry.isDirectory()) await walk(relativePath);
      else if (entry.isFile() && entry.name.endsWith(".md"))
        found.push(relativePath);
    }
  }
  await walk(directory);
  return found.filter(
    (file) => file !== `${directory}/README.md` && file !== sitemapPath,
  );
}

async function readPage(rootDir, relativePath) {
  const content = await readFile(path.join(rootDir, relativePath), "utf8");
  const tree = parser.parse(content);
  const titleNode = tree.children.find(
    (node) => node.type === "heading" && node.depth === 1,
  );
  const title = titleNode && textContent(titleNode).trim();
  if (!title) throw new Error(`${relativePath}: missing level-one heading`);

  const frontmatter = tree.children.find((node) => node.type === "yaml");
  const metadata = frontmatter ? parseYaml(frontmatter.value) : {};
  const directory = relativePath.split("/")[0];
  if (
    (directory === "pages" || directory === "concepts") &&
    (typeof metadata?.type !== "string" ||
      !metadata.type.trim() ||
      typeof metadata?.summary !== "string" ||
      !metadata.summary.trim())
  ) {
    throw new Error(
      `${relativePath}: expected type and summary in YAML front matter`,
    );
  }
  if (
    (directory === "pages" || directory === "concepts") &&
    metadata?.status !== undefined &&
    !statuses.has(metadata.status)
  ) {
    throw new Error(`${relativePath}: invalid completeness status`);
  }
  return {
    path: relativePath,
    title,
    type: metadata?.type,
    summary: metadata?.summary,
    status: metadata?.status,
    tree,
  };
}

function goalLinks(page, pages) {
  const definitions = new Map();
  visit(page.tree, (node) => {
    if (node.type === "definition")
      definitions.set(node.identifier.toLowerCase(), node.url);
  });
  const groups = new Map([
    ["Core advice and supporting links", new Set()],
    ["Explore further", new Set()],
    ["Other links", new Set()],
  ]);
  let group = "Other links";
  for (const section of page.tree.children) {
    if (section.type === "heading" && section.depth === 2) {
      const heading = textContent(section).trim().toLowerCase();
      group =
        heading === "try this first" || heading === "core advice"
          ? "Core advice and supporting links"
          : heading === "explore further"
            ? "Explore further"
            : "Other links";
    }
    visit(section, (node) => {
      const url =
        node.type === "link"
          ? node.url
          : node.type === "linkReference"
            ? definitions.get(node.identifier.toLowerCase())
            : null;
      if (!url || /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(url)) return;
      const target = url.split(/[?#]/, 1)[0];
      if (!target) return;
      let decoded;
      try {
        decoded = decodeURIComponent(target);
      } catch {
        throw new Error(`${page.path}: invalid URL encoding in ${url}`);
      }
      const resolved = path.posix.normalize(
        path.posix.join(path.posix.dirname(page.path), decoded),
      );
      if (pages.has(resolved) && resolved !== page.path)
        groups.get(group).add(resolved);
    });
  }
  return [...groups].map(([title, files]) => [
    title,
    [...files].map((file) => pages.get(file)),
  ]);
}

function entry(page) {
  const target = encodeURI(path.posix.relative("pages", page.path));
  const summary = page.summary
    ? ` — ${page.summary.replace(/\s+/g, " ").trim()}`
    : "";
  const status = page.status ? ` (${page.status})` : "";
  return `- [${linkText(page.title)}](${target})${summary}${status}`;
}

function sortPages(pages) {
  return [...pages].sort((a, b) => {
    const left = a.title.toLowerCase();
    const right = b.title.toLowerCase();
    return left < right
      ? -1
      : left > right
        ? 1
        : a.path < b.path
          ? -1
          : a.path > b.path
            ? 1
            : 0;
  });
}

export async function buildSitemap(rootDir = root) {
  const files = (
    await Promise.all(
      directories.map((directory) => markdownFiles(rootDir, directory)),
    )
  ).flat();
  const records = await Promise.all(
    files.map((file) => readPage(rootDir, file)),
  );
  const pages = new Map(records.map((page) => [page.path, page]));
  const lines = [
    "# Sitemap",
    "",
    "This map is generated from page metadata and the links curated in each outcome overview. Regenerate it with `just sitemap`; edit the source pages rather than this file.",
    "",
    "## Goal paths",
    "",
    "These lists group directly linked pages, concepts, slides, and source records by their place in each overview; follow the overview for the advice and context behind its links. A page or concept without a [completeness status](README.md#completeness-status) is unassessed; status does not establish correctness or freshness.",
  ];

  for (const goal of goals) {
    const page = pages.get(`pages/${goal}.md`);
    if (!page) throw new Error(`Missing goal overview: pages/${goal}.md`);
    lines.push("", `### [${linkText(page.title)}](${goal}.md)`, "");
    if (page.status) lines.push(`**Status:** ${page.status}`, "");
    for (const [title, links] of goalLinks(page, pages)) {
      if (links.length)
        lines.push(`#### ${title}`, "", ...links.map(entry), "");
    }
  }

  lines.push(
    "",
    "## Page inventory",
    "",
    "Pages are grouped by their primary purpose; a page can serve more than one purpose. Concepts are listed separately regardless of their metadata type.",
    "",
    "### Authored pages",
  );
  const authored = records.filter((page) => page.path.startsWith("pages/"));
  const types = [...new Set(authored.map((page) => page.type))].sort();
  for (const type of types) {
    lines.push("", `#### ${type}`, "");
    lines.push(
      ...sortPages(authored.filter((page) => page.type === type)).map(entry),
    );
  }
  for (const [directory, title] of [
    ["concepts", "Concepts"],
    ["slides", "Slides"],
    ["sources", "Source records"],
  ]) {
    lines.push("", `### ${title}`, "");
    lines.push(
      ...sortPages(
        records.filter((page) => page.path.startsWith(`${directory}/`)),
      ).map(entry),
    );
  }
  lines.push(
    "",
    "## Other entrypoints",
    "",
    "- [Homepage](../README.md)",
    "- [Design goals](../DESIGN-GOALS.md)",
    "- [Maintaining the wiki](../MAINTAINING.md)",
    "- [Authored pages index](README.md)",
    "- [Concept index](../concepts/README.md)",
    "- [Slides index](../slides/README.md)",
    "- [Sources index](../sources/README.md)",
    "",
  );
  return prettier.format(lines.join("\n"), {
    ...(await prettier.resolveConfig(path.join(rootDir, sitemapPath))),
    filepath: path.join(rootDir, sitemapPath),
  });
}

export async function syncSitemap(rootDir, mode) {
  const expected = await buildSitemap(rootDir);
  const destination = path.join(rootDir, sitemapPath);
  if (mode === "write") {
    await writeFile(destination, expected);
    return true;
  }
  let actual;
  try {
    actual = await readFile(destination, "utf8");
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  return actual === expected;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href
) {
  const option = process.argv[2];
  if (process.argv.length !== 3 || !["--write", "--check"].includes(option)) {
    console.error("Usage: node scripts/sitemap.mjs --write|--check");
    process.exitCode = 2;
  } else {
    try {
      const current = await syncSitemap(
        root,
        option === "--write" ? "write" : "check",
      );
      if (!current) {
        console.error("Sitemap is missing or out of date; run `just sitemap`.");
        process.exitCode = 1;
      } else {
        console.log(
          option === "--write" ? "Sitemap updated." : "Sitemap is current.",
        );
      }
    } catch (error) {
      console.error(`Sitemap: ${error.message}`);
      process.exitCode = 1;
    }
  }
}
