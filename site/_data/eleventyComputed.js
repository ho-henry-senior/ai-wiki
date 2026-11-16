import fs from "node:fs";
import path from "node:path";

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
  title: (data) =>
    data.title ||
    (data.page.inputPath.endsWith(".md")
      ? firstHeading(data.page.inputPath)
      : undefined),
  description: (data) => data.description || data.summary,
  // README.md becomes its folder's index page. Other pages keep their own
  // permalink, including the plugin's 404 page, sitemap, and search index.
  permalink: (data) => {
    const input = data.page.inputPath.replace(/^\.\//, "");
    if (path.posix.basename(input) !== "README.md") return data.permalink;
    const dir = path.posix.dirname(input);
    return dir === "." ? "/index.html" : `/${dir}/index.html`;
  },
};
