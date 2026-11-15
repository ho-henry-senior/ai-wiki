import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// Checks authored pages against STYLE.md: length targets, hedge words, and
// sentences repeated across pages. Rules are read from STYLE.md itself, so
// they live in one place. Reports warnings; `--strict` makes them fail.

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const excluded = new Set([
  "pages/README.md",
  "pages/sitemap.md",
  "pages/glossary.md",
  "concepts/README.md",
]);
// Types that STYLE.md lets run longer when every line earns its place.
const unlimited = new Set(["reference", "case-study"]);
const tolerance = 1.2;
const stopwords = new Set(
  "a an and are as at be by can do does for from if in is it its not of on or that the their them they this to when which with you your".split(
    " ",
  ),
);

export function parseRules(styleText) {
  const hedgeLine = styleText
    .split("\n")
    .find((line) => /Cut hedges/.test(line));
  const lengthLine = styleText
    .split("\n")
    .find((line) => /Keep pages short/.test(line));
  if (!hedgeLine || !lengthLine)
    throw new Error("STYLE.md: could not find the hedge or length rule");
  const hedges = [...hedgeLine.matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  const numbers = [...lengthLine.matchAll(/about (\d+)/g)].map((m) =>
    Number(m[1]),
  );
  if (!hedges.length || numbers.length < 2)
    throw new Error("STYLE.md: could not read hedge words or length targets");
  const [short, long] = numbers;
  return {
    hedges,
    targets: {
      overview: short,
      concept: short,
      guide: long,
      pattern: long,
      explanation: long,
      exploration: long,
    },
  };
}

export function frontMatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n/);
  const meta = {};
  if (match)
    for (const line of match[1].split("\n")) {
      const [key, ...rest] = line.split(":");
      if (key && rest.length) meta[key.trim()] = rest.join(":").trim();
    }
  return { meta, body: match ? text.slice(match[0].length) : text };
}

// The text a reader reads as prose: no front matter, code, tables, HTML
// comments, link targets, or source lists.
export function prose(text) {
  let body = frontMatter(text).body;
  body = body.replace(/^(```|~~~)[\s\S]*?^\1[^\n]*$/gm, "");
  body = body.replace(/<!--[\s\S]*?-->/g, "");
  const kept = [];
  let skipping = false;
  for (const line of body.split("\n")) {
    const heading = line.match(/^(#{1,6})\s+(.*)/);
    if (heading && heading[1].length <= 2)
      skipping = /^(sources|references)\b/i.test(heading[2].trim());
    if (skipping || /^\s*\|/.test(line)) continue;
    kept.push(line);
  }
  return kept
    .join("\n")
    .replace(/`[^`\n]*`/g, " ")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1");
}

export function countWords(text) {
  return (text.match(/[A-Za-z0-9][A-Za-z0-9'’-]*/g) ?? []).length;
}

export function findHedges(text, hedges) {
  const found = [];
  for (const hedge of hedges) {
    const pattern = new RegExp(
      `\\b${hedge.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/ /g, "\\s+")}\\b`,
      "gi",
    );
    for (const match of text.matchAll(pattern))
      found.push(match[0].toLowerCase());
  }
  return found;
}

// Sentences worth comparing: not headings, pointers ("See ..."), or dated
// check notes, which repeat by design.
function sentences(text) {
  const out = [];
  const body = text
    .split("\n")
    .filter((line) => !/^\s*#/.test(line))
    .join("\n");
  for (const block of body.split(/\n\s*\n|\n\s*[-*] |\n\s*\d+\. /)) {
    for (const sentence of block.replace(/\n/g, " ").split(/(?<=[.!?])\s+/)) {
      const clean = sentence.replace(/[*_#>]/g, "").trim();
      const words = clean.toLowerCase().match(/[a-z0-9']+/g) ?? [];
      if (words.length >= 8 && !/^(checked|see)\b/i.test(clean))
        out.push({ text: clean, words });
    }
  }
  return out;
}

function trigrams(words) {
  const content = words.filter((word) => !stopwords.has(word));
  const set = new Set();
  for (let i = 0; i + 2 < content.length; i++)
    set.add(content.slice(i, i + 3).join(" "));
  return set;
}

// Pairs of sentences on different pages that share most of their wording.
// Overviews summarize their owner pages by design, so they are skipped.
export function findDuplicates(pages, threshold = 0.6, minShared = 4) {
  const items = pages
    .filter((page) => page.kind !== "overview")
    .flatMap((page) =>
      sentences(page.prose).map((s) => ({
        ...s,
        path: page.path,
        grams: trigrams(s.words),
      })),
    );
  const pairs = [];
  for (let i = 0; i < items.length; i++)
    for (let j = i + 1; j < items.length; j++) {
      const a = items[i];
      const b = items[j];
      if (a.path === b.path || !a.grams.size || !b.grams.size) continue;
      let shared = 0;
      for (const gram of a.grams) if (b.grams.has(gram)) shared++;
      const score = shared / Math.min(a.grams.size, b.grams.size);
      if (shared >= minShared && score >= threshold)
        pairs.push({ a, b, score });
    }
  return pairs.sort((x, y) => y.score - x.score);
}

async function markdownFiles(rootDir, directory) {
  const entries = await readdir(path.join(rootDir, directory), {
    withFileTypes: true,
  });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => `${directory}/${entry.name}`)
    .filter((file) => !excluded.has(file))
    .sort();
}

export async function checkStyle(rootDir = root) {
  const rules = parseRules(
    await readFile(path.join(rootDir, "STYLE.md"), "utf8"),
  );
  const files = [
    ...(await markdownFiles(rootDir, "pages")),
    ...(await markdownFiles(rootDir, "concepts")),
  ];
  const pages = [];
  for (const file of files) {
    const text = await readFile(path.join(rootDir, file), "utf8");
    const { meta } = frontMatter(text);
    const kind = file.startsWith("concepts/") ? "concept" : meta.type;
    pages.push({ path: file, kind, prose: prose(text) });
  }
  const warnings = [];
  for (const page of pages) {
    const words = countWords(page.prose);
    const target = unlimited.has(page.kind)
      ? undefined
      : rules.targets[page.kind];
    if (target && words > target * tolerance)
      warnings.push(
        `${page.path}: ${words} words; target for ${page.kind} is about ${target}`,
      );
    const hedges = findHedges(page.prose, rules.hedges);
    if (hedges.length)
      warnings.push(
        `${page.path}: hedge words: ${[...new Set(hedges)].join(", ")}`,
      );
  }
  for (const { a, b } of findDuplicates(pages))
    warnings.push(
      `${a.path} and ${b.path} repeat a sentence:\n    "${a.text}"\n    "${b.text}"`,
    );
  return warnings;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href
) {
  const strict = process.argv.includes("--strict");
  try {
    const warnings = await checkStyle(root);
    for (const warning of warnings) console.log(`warning: ${warning}`);
    console.log(
      warnings.length
        ? `Style: ${warnings.length} warning(s). See STYLE.md and MAINTAINING.md#who-owns-what.`
        : "Style: no warnings.",
    );
    if (strict && warnings.length) process.exitCode = 1;
  } catch (error) {
    console.error(`Style: ${error.message}`);
    process.exitCode = 1;
  }
}
