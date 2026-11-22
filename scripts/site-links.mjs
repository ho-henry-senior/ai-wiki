import path from "node:path";

// Link rewriting for the website build (site/eleventy.config.mjs). Kept separate
// so it can be tested without the site's build tools installed.

export const repository = "https://github.com/ho-henry-senior/ai-wiki";
export const pathPrefix = "/ai-wiki/";
// Where the site is published. The plugin uses it for addresses that the
// HTML base plugin does not rewrite, such as the search index.
export const siteUrl = "https://ho-henry-senior.github.io/ai-wiki/";

// In the repository, but not part of the site. Links to them go to GitHub.
export const excluded = [
  "AGENTS.md",
  "maintainers/",
  ".agents/",
  ".github/",
  "_site/",
  "data/",
  "scripts/",
  // Shared assets, included into pages by scripts/site-includes.mjs.
  "content/includes/",
];

export const isExcluded = (file) =>
  excluded.some((entry) =>
    entry.endsWith("/") ? file.startsWith(entry) : file === entry,
  );

// The site URL for a Markdown file, relative to the repository root.
// README.md becomes its folder's index page. URLs start at the site root;
// Eleventy's HTML base plugin, which the GOV.UK plugin adds, puts the path
// prefix in front when it writes the page.
// Published URLs keep their old paths even when Markdown is organised under
// content/. The source path remains canonical for GitHub-relative links.
export function publishedSourcePath(file) {
  if (file === "content/README.md") return "pages/README.md";
  const parts = file.split("/");
  if (parts[0] !== "content" || parts.length < 3) return file;
  const [, kind, ...rest] = parts;
  if (kind === "goals" && rest.length >= 2) {
    const name = rest.at(-1) === "README.md" ? `${rest[0]}.md` : rest.at(-1);
    return `pages/${name}`;
  }
  if (kind === "articles" || kind === "reference")
    return `pages/${rest.at(-1)}`;
  if (["concepts", "sources", "slides"].includes(kind))
    return `${kind}/${rest.join("/")}`;
  return file;
}

export function pageUrl(file) {
  file = publishedSourcePath(file);
  const dir = path.posix.dirname(file);
  const name = path.posix.basename(file, ".md");
  const folder = dir === "." ? "" : `${dir}/`;
  return "/" + (name === "README" ? folder : `${folder}${name}/`);
}

// A page's path relative to the repository root. Eleventy runs from site/,
// so it reports paths such as ../pages/security.md.
export const repoPath = (inputPath) =>
  path.posix.normalize(inputPath).replace(/^(\.\.\/)+|^\.\//, "");

// Rewrites a link in a page for the site. External links, same-page anchors,
// and site-absolute paths such as /pages/security/ are unchanged; links to other pages point to their site URL; links
// to files that are not on the site point to the file on GitHub.
// The GitHub index's section headings are the site's lanes, so a link to one
// of them goes to that lane's landing page on the site. Keep in step with
// site/lanes.mjs.
export const laneAnchors = {
  "#goals": "/goals/",
  "#guides": "/guides/",
  "#articles": "/articles/",
  "#case-studies": "/case-studies/",
  "#reference": "/reference/",
};

export function rewriteLink(href, inputPath) {
  if (!href || /^([a-z][a-z\d+.-]*:|\/|#)/i.test(href)) return href;
  const hashAt = href.indexOf("#");
  const target = hashAt === -1 ? href : href.slice(0, hashAt);
  const anchor = hashAt === -1 ? "" : href.slice(hashAt);
  const from = path.posix.dirname(repoPath(inputPath));
  const file = path.posix.normalize(path.posix.join(from, target));
  if (file.startsWith("..")) return href;
  if (file === "content/README.md" && laneAnchors[anchor]) return laneAnchors[anchor];
  if (file.endsWith(".md") && !isExcluded(file)) return pageUrl(file) + anchor;
  return `${repository}/blob/main/${file}${anchor}`;
}

// Whether a rewritten link leaves the wiki: any web address outside the site,
// including repository files that rewriteLink sends to GitHub. Site-absolute
// paths, same-page anchors and other schemes, such as mailto:, stay unmarked.
export function isExternalLink(href) {
  if (!/^https?:\/\//i.test(href ?? "")) return false;
  const url = new URL(href);
  const site = new URL(siteUrl);
  return url.host !== site.host || !url.pathname.startsWith(site.pathname);
}

// Adds the external-link class and description to a rendered opening <a>
// tag, keeping any class another renderer, such as the GOV.UK plugin's,
// has already set.
export const externalLinkClass = "app-link--external";
export const externalLinkDescription = "app-external-link-description";
export function markExternalLink(tag) {
  if (!tag.includes(externalLinkClass))
    tag = /\sclass="/.test(tag)
      ? tag.replace(/\sclass="([^"]*)"/, (_, names) => ` class="${`${names} ${externalLinkClass}`.trim()}"`)
      : tag.replace(/^<a\b/, `<a class="${externalLinkClass}"`);
  if (!/\saria-describedby="/.test(tag))
    tag = tag.replace(/^<a\b/, `<a aria-describedby="${externalLinkDescription}"`);
  return tag;
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
