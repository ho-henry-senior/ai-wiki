import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { surfaces } from "../site/surfaces.mjs";

// Checks authored pages against maintainers/STYLE.md: length ceilings, hedge words, and
// sentences repeated across pages. Also checks that pages marked `recheck`
// list sources the daily review can fetch. Rules are read from STYLE.md itself, so
// they live in one place. Reports warnings; `--strict` makes them fail.

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const excluded = new Set([
  "pages/README.md",
  "pages/glossary.md",
  "concepts/README.md",
]);
// Types that STYLE.md gives no ceiling.
const unlimited = new Set(["reference", "case-study"]);
// STYLE.md gives ceilings as "about N"; allow that much leeway.
const about = 1.1;
const workflow = ".github/workflows/daily-wiki-review.md";
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
    .find((line) => /long pages/.test(line));
  if (!hedgeLine || !lengthLine)
    throw new Error("STYLE.md: could not find the hedge or length rule");
  const hedges = [...hedgeLine.matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  const numbers = [...lengthLine.matchAll(/about (\d+)/g)].map((m) =>
    Number(m[1]),
  );
  if (!hedges.length || numbers.length < 2)
    throw new Error("STYLE.md: could not read hedge words or length ceilings");
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

// Reads simple front matter: `key: value` lines, and `key:` followed by
// `  - item` lines as a list.
export function frontMatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n/);
  const meta = {};
  let last;
  if (match)
    for (const line of match[1].split("\n")) {
      const item = line.match(/^\s+-\s+(.*)$/);
      if (item) {
        if (Array.isArray(meta[last])) meta[last].push(item[1].trim());
        continue;
      }
      const [key, ...rest] = line.split(":");
      if (!key || !rest.length) continue;
      last = key.trim();
      const value = rest.join(":").trim();
      meta[last] = value === "" ? [] : value;
    }
  return { meta, body: match ? text.slice(match[0].length) : text };
}

// Domains the daily review may fetch, from the workflow's network allowlist.
export function allowedDomains(workflowText) {
  const domains = [];
  let inside = false;
  let indent = 0;
  for (const line of workflowText.split("\n")) {
    const allowed = line.match(/^(\s*)allowed:\s*$/);
    if (allowed) {
      inside = true;
      indent = allowed[1].length;
      continue;
    }
    if (!inside) continue;
    const item = line.match(/^(\s*)-\s+(\S+)/);
    if (item && item[1].length > indent)
      domains.push(item[2].replace(/^["']|["']$/g, ""));
    else if (line.trim()) inside = false;
  }
  return domains;
}

function domainAllowed(host, domains) {
  return domains.some((domain) =>
    domain.startsWith("*.") ? host.endsWith(domain.slice(1)) : host === domain,
  );
}

// A page's `checked` date must be a real date, not in the future, and dates
// belong in that field rather than in the text.
export function checkChecked(file, meta, prose, today = new Date()) {
  const warnings = [];
  if (meta.checked !== undefined) {
    const value = String(meta.checked);
    const date = new Date(`${value}T00:00:00Z`);
    // A date such as 2026-02-30 parses, but as 2 March; compare it back.
    const real =
      !Number.isNaN(date.getTime()) &&
      date.toISOString().slice(0, 10) === value;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || !real)
      warnings.push(
        `${file}: checked must be a date written YYYY-MM-DD: ${value}`,
      );
    else if (date > today)
      warnings.push(`${file}: checked is in the future: ${value}`);
  }
  if (/\bchecked (on )?\d{1,2} [A-Z][a-z]+ \d{4}/i.test(prose))
    warnings.push(
      `${file}: put the date facts were checked in the checked field, not in the text`,
    );
  return warnings;
}

// A page marked `recheck` must list https sources the daily review can reach.
export function checkRecheck(file, meta, domains) {
  if (meta.recheck === undefined) return [];
  const sources = meta["check-against"];
  if (!Array.isArray(sources) || !sources.length)
    return [`${file}: recheck is set but check-against lists no sources`];
  const warnings = [];
  for (const source of sources) {
    let url;
    try {
      url = new URL(source);
    } catch {
      warnings.push(`${file}: check-against source is not a URL: ${source}`);
      continue;
    }
    if (url.protocol !== "https:")
      warnings.push(`${file}: check-against source is not https: ${source}`);
    else if (domains && !domainAllowed(url.hostname, domains))
      warnings.push(
        `${file}: the daily review cannot fetch ${url.hostname}; add it to the workflow's network allowlist`,
      );
  }
  return warnings;
}

// A page's `surfaces` tags must be a list of the surfaces in site/surfaces.mjs.
export function checkSurfaces(file, meta, known = Object.keys(surfaces)) {
  if (meta.surfaces === undefined) return [];
  if (!Array.isArray(meta.surfaces) || !meta.surfaces.length)
    return [`${file}: surfaces must be a list, one surface per line`];
  return meta.surfaces
    .filter((surface) => !known.includes(surface))
    .map(
      (surface) =>
        `${file}: unknown surface "${surface}"; use one of ${known.join(", ")}, or add it to site/surfaces.mjs`,
    );
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
    await readFile(path.join(rootDir, "maintainers/STYLE.md"), "utf8"),
  );
  const files = [
    ...(await markdownFiles(rootDir, "pages")),
    ...(await markdownFiles(rootDir, "concepts")),
  ];
  let domains;
  try {
    domains = allowedDomains(
      await readFile(path.join(rootDir, workflow), "utf8"),
    );
  } catch {
    domains = undefined;
  }
  const pages = [];
  const warnings = [];
  for (const file of files) {
    const text = await readFile(path.join(rootDir, file), "utf8");
    const { meta } = frontMatter(text);
    const kind = file.startsWith("concepts/") ? "concept" : meta.type;
    pages.push({
      path: file,
      kind,
      prose: prose(text),
      longBecause:
        typeof meta["long-because"] === "string" && meta["long-because"],
    });
    warnings.push(...checkRecheck(file, meta, domains));
    warnings.push(...checkChecked(file, meta, prose(text)));
    warnings.push(...checkSurfaces(file, meta));
  }
  for (const page of pages) {
    const words = countWords(page.prose);
    const ceiling =
      unlimited.has(page.kind) || page.longBecause
        ? undefined
        : rules.targets[page.kind];
    if (ceiling && words > ceiling * about)
      warnings.push(
        `${page.path}: ${words} words, over the ceiling of about ${ceiling} for ${page.kind}; link restated material, split it, shorten it, or give a long-because reason`,
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
        ? `Style: ${warnings.length} warning(s). See maintainers/STYLE.md and maintainers/MAINTAINING.md#who-owns-what.`
        : "Style: no warnings.",
    );
    if (strict && warnings.length) process.exitCode = 1;
  } catch (error) {
    console.error(`Style: ${error.message}`);
    process.exitCode = 1;
  }
}
