import fs from "node:fs";
import path from "node:path";
import { repoPath } from "./site-links.mjs";

// Includes for the website build (site/eleventy.config.mjs). A page marks a
// link to a shared asset with an HTML comment just before it:
//
//   <!-- include -->
//
//   [Diagram: how a tool call flows](../includes/tool-call-loop-diagram.md)
//
// GitHub hides the comment and shows the link; the website replaces both with
// the asset's Markdown, before the page is rendered, so an included Mermaid
// diagram is drawn like any other. See maintainers/MAINTAINING.md#website.
//
// Assets live in content/includes/, are not published as pages, and cannot
// include other assets, so there are no cycles. Any problem fails the build.

export const includesDir = "content/includes/";

const marker = /^<!--\s*include\s*-->\s*$/;
const linkLine = /^\[[^\]\n]+\]\(([^()\s]+)\)\s*$/;
const fenceOpen = /^ {0,3}(`{3,}|~{3,})/;
// Not rewritten: URLs, site-absolute paths and same-page anchors.
const notRelative = /^([a-z][a-z\d+.-]*:|\/|#)/i;

export class IncludeError extends Error {}

// Expands every include in a page's Markdown. inputPath is the page's path as
// Eleventy reports it; rootDir is the repository root.
export function expandIncludes(content, inputPath, { rootDir, readFile }) {
  const page = repoPath(inputPath);
  const read = readFile ?? ((file) => fs.readFileSync(file, "utf8"));
  const lines = content.split("\n");
  const out = [];
  let fence = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    fence = trackFence(line, fence);
    if (fence || !marker.test(line)) {
      out.push(line);
      continue;
    }

    const where = `${page}:${i + 1}`;
    // Prettier puts a blank line between the marker and its link; allow it
    // with or without one.
    let next = i + 1;
    if (lines[next]?.trim() === "" && linkLine.test(lines[next + 1] ?? ""))
      next++;
    const href = lines[next]?.match(linkLine)?.[1];
    if (!href)
      throw new IncludeError(
        `${where}: <!-- include --> must be followed by a link to an asset in ${includesDir}`,
      );

    const asset = resolveAsset(href, page, where);
    let text;
    try {
      text = read(path.join(rootDir, asset));
    } catch {
      throw new IncludeError(`${where}: include not found: ${asset}`);
    }
    out.push(prepareAsset(text, asset, page, where));
    i = next;
  }
  return out.join("\n");
}

function trackFence(line, fence) {
  const open = line.match(fenceOpen)?.[1];
  if (!fence) return open ?? null;
  // A fence closes with at least as many of the same character.
  const close = line.trim();
  return close.startsWith(fence) && /^(`+|~+)$/.test(close) ? null : fence;
}

// The asset's path from the repository root, or an error if the link does
// not point at a Markdown file inside content/includes/.
export function resolveAsset(href, page, where = page) {
  if (notRelative.test(href) || href.includes("#"))
    throw new IncludeError(
      `${where}: include must be a relative link to a file, without an anchor: ${href}`,
    );
  const asset = path.posix.normalize(
    path.posix.join(path.posix.dirname(page), decodeURI(href)),
  );
  if (!asset.startsWith(includesDir) || !asset.endsWith(".md"))
    throw new IncludeError(
      `${where}: include must be a .md file in ${includesDir}: ${href}`,
    );
  return asset;
}

// Checks an asset and rewrites its relative links for the including page.
function prepareAsset(text, asset, page, where) {
  text = text.replace(/\r\n/g, "\n");
  // A leading comment, such as a note of which pages use the asset; but not
  // an include marker, which is rejected below.
  if (!marker.test(text.trimStart().split("\n")[0]))
    text = text.replace(/^\s*<!--[\s\S]*?-->\s*/, "");
  if (text.startsWith("---\n"))
    throw new IncludeError(`${where}: ${asset} must not have front matter`);

  let fence = null;
  const lines = text.trim().split("\n");
  const result = lines.map((line) => {
    const wasInFence = fence;
    fence = trackFence(line, fence);
    if (wasInFence || fence) return line;
    if (marker.test(line))
      throw new IncludeError(
        `${where}: ${asset} contains an include; includes cannot be nested`,
      );
    if (/^#\s/.test(line))
      throw new IncludeError(
        `${where}: ${asset} must not have a # title; the including page has one`,
      );
    return rebaseLinks(line, asset, page);
  });
  return result.join("\n");
}

// Links in an asset are written relative to the asset, so GitHub and the
// link checker follow them; make them relative to the including page.
export function rebaseLinks(line, asset, page) {
  const rebase = (href) => {
    if (notRelative.test(href)) return href;
    const hashAt = href.indexOf("#");
    const target = hashAt === -1 ? href : href.slice(0, hashAt);
    const anchor = hashAt === -1 ? "" : href.slice(hashAt);
    const file = path.posix.join(path.posix.dirname(asset), target);
    const relative = path.posix.relative(path.posix.dirname(page), file);
    return (relative || path.posix.basename(file)) + anchor;
  };
  return line
    .replace(/(\]\()([^()\s]+)/g, (_, open, href) => open + rebase(href))
    .replace(
      /^( {0,3}\[[^\]]+\]:\s*)(\S+)/,
      (_, start, href) => start + rebase(href),
    );
}
