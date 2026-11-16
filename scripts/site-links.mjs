import path from "node:path";

// Link rewriting for the website build (eleventy.config.mjs). Kept separate
// so it can be tested without the site's build tools installed.

export const repository = "https://github.com/ho-henry-senior/ai-wiki";
export const pathPrefix = "/ai-wiki/";

// In the repository, but not part of the site. Links to them go to GitHub.
export const excluded = [
  "AGENTS.md",
  "DESIGN-GOALS.md",
  "MAINTAINING.md",
  "STYLE.md",
  ".agents/",
  ".github/",
  "_site/",
  "data/",
  "scripts/",
];

export const isExcluded = (file) =>
  excluded.some((entry) =>
    entry.endsWith("/") ? file.startsWith(entry) : file === entry,
  );

// The site URL for a Markdown file, relative to the repository root.
// README.md becomes its folder's index page. URLs start at the site root;
// Eleventy's HTML base plugin, which the GOV.UK plugin adds, puts the path
// prefix in front when it writes the page.
export function pageUrl(file) {
  const dir = path.posix.dirname(file);
  const name = path.posix.basename(file, ".md");
  const folder = dir === "." ? "" : `${dir}/`;
  return "/" + (name === "README" ? folder : `${folder}${name}/`);
}

// Rewrites a link in a page for the site. External links and same-page
// anchors are unchanged; links to other pages point to their site URL; links
// to files that are not on the site point to the file on GitHub.
export function rewriteLink(href, inputPath) {
  if (!href || /^([a-z][a-z\d+.-]*:|\/\/|#)/i.test(href)) return href;
  const hashAt = href.indexOf("#");
  const target = hashAt === -1 ? href : href.slice(0, hashAt);
  const anchor = hashAt === -1 ? "" : href.slice(hashAt);
  const from = path.posix.dirname(
    path.posix.normalize(inputPath.replace(/^\.\//, "")),
  );
  const file = path.posix.normalize(path.posix.join(from, target));
  if (file.startsWith("..")) return href;
  if (file.endsWith(".md") && !isExcluded(file)) return pageUrl(file) + anchor;
  return `${repository}/blob/main/${file}${anchor}`;
}

// GitHub's heading IDs, so that links such as page.md#core-advice work the
// same on the site as on GitHub: lower case, punctuation removed, spaces
// become hyphens, and repeated headings get -1, -2, and so on.
export function githubSlug(text, seen = new Map()) {
  const base = text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{M}\p{N}\p{Pc}\- ]/gu, "")
    .replace(/ /g, "-");
  const count = seen.get(base) ?? 0;
  seen.set(base, count + 1);
  return count === 0 ? base : `${base}-${count}`;
}
