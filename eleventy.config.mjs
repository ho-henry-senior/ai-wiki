import fs from "node:fs";
import path from "node:path";
import { govukEleventyPlugin } from "@x-govuk/govuk-eleventy-plugin";
import { excluded, pathPrefix, rewriteLink } from "./scripts/site-links.mjs";

// Builds the wiki as a website. The Markdown stays the source: pages keep
// relative .md links that work on GitHub and in editors, and this config
// rewrites them for the site at build time. See MAINTAINING.md#website.

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

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(govukEleventyPlugin, {
    header: {
      logotype: { text: "Making the most of agents" },
      search: { indexPath: "/search-index.json", sitemapPath: "/sitemap" },
    },
    titleSuffix: "Making the most of agents",
    // Our stylesheet replaces the GDS Transport typeface, which only
    // GOV.UK may use. See assets/application.scss.
    stylesheets: ["/assets/application.css"],
    templates: { searchIndex: true },
  });

  for (const entry of excluded)
    eleventyConfig.ignores.add(entry.endsWith("/") ? `${entry}**` : entry);

  eleventyConfig.addGlobalData("layout", "page");
  eleventyConfig.addGlobalData("eleventyComputed", {
    title: (data) => data.title || firstHeading(data.page.inputPath),
    description: (data) => data.description || data.summary,
    permalink: (data) => {
      const input = data.page.inputPath.replace(/^\.\//, "");
      if (path.posix.basename(input) !== "README.md") return data.permalink;
      const dir = path.posix.dirname(input);
      return dir === "." ? "/index.html" : `/${dir}/index.html`;
    },
  });

  // The layout shows the title, so drop the page's own first heading.
  eleventyConfig.addPreprocessor("first-heading", "md", (data, content) =>
    content.replace(/^#\s+.+\n?/m, ""),
  );

  eleventyConfig.amendLibrary("md", (md) => {
    const render =
      md.renderer.rules.link_open ||
      ((tokens, idx, options, env, self) =>
        self.renderToken(tokens, idx, options));
    md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
      const href = tokens[idx].attrGet("href");
      if (href && env?.page?.inputPath)
        tokens[idx].attrSet("href", rewriteLink(href, env.page.inputPath));
      return render(tokens, idx, options, env, self);
    };
  });

  return {
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    // Pages contain code examples such as ${{ github.ref }}, so Markdown is
    // never processed as a template.
    markdownTemplateEngine: false,
    pathPrefix,
    dir: { input: ".", output: "_site" },
  };
}
