import fs from "node:fs";
import path from "node:path";
import { pageUrl, repoPath } from "../../scripts/site-links.mjs";
import { lanes } from "../lanes.mjs";

// Computed data for every page. Eleventy merges this with the plugin's own
// computed data (its navigation defaults), so neither replaces the other.

// Pages take their title from their first "# " heading.
function firstHeading(inputPath) {
  try {
    const text = fs
      .readFileSync(inputPath, "utf8")
      .replace(/^---\n[\s\S]*?\n---\n/, "");
    const match = text.match(/^#\s+(.+)$/m);
    return match ? match[1].replace(/`/g, "").trim() : undefined;
  } catch {
    return undefined;
  }
}

export default {
  // Pages in a lane show their lane's navigation.
  sectionKey: (data) =>
    ["goals", "guides", "reference", "articles"].includes(data.lane)
      ? lanes[data.lane].title
      : data.sectionKey,
  title: (data) =>
    data.title ||
    (data.page.inputPath.endsWith(".md")
      ? firstHeading(data.page.inputPath)
      : undefined),
  description: (data) => data.description || data.summary,
  // Published Markdown under content/ retains its pre-migration URL.
  // Other README.md files become their folder's index; plugin pages keep theirs.
  permalink: (data) => {
    const input = repoPath(data.page.inputPath);
    if (input.startsWith("content/")) return `${pageUrl(input)}index.html`;
    if (path.posix.basename(input) !== "README.md") return data.permalink;
    const dir = path.posix.dirname(input);
    return dir === "." ? "/index.html" : `/${dir}/index.html`;
  },
};
