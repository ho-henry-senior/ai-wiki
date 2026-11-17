t import fs from "node:fs";
import path from "node:path";
import { govukEleventyPlugin } from "@x-govuk/govuk-eleventy-plugin";
import {
  excluded,
  githubSlug,
  pathPrefix,
  rewriteLink,
  siteUrl,
} from "./scripts/site-links.mjs";

// Builds the wiki as a website. The Markdown stays the source: pages keep
// relative .md links that work on GitHub and in editors, and this config
// rewrites them for the site at build time. See MAINTAINING.md#website.

// Copied from GOV.UK Frontend by the plugin, but only for GOV.UK: the GDS
// Transport font files and the crown icons. Removed after each build.
const govukOnlyAssets = [
  "assets/fonts",
  "assets/images",
  "assets/rebrand",
  "assets/manifest.json",
];

export default async function (eleventyConfig) {
  await eleventyConfig.addPlugin(govukEleventyPlugin, {
    header: {
      logotype: { text: "Making the most of agents" },
      search: { indexPath: "/search-index.json", sitemapPath: "/sitemap" },
    },
    titleSuffix: "Making the most of agents",
    url: siteUrl,
    // No crown icons or GOV.UK sharing image.
    icons: { mask: false, shortcut: false, touch: false },
    // No footer crown, copyright statement, or Open Government Licence.
    footer: { logo: false, copyright: false, contentLicence: false },
    opengraphImageUrl: false,
    // Our stylesheet replaces the GDS Transport typeface, which only
    // GOV.UK may use. See assets/application.scss.
    stylesheets: ["/assets/application.css"],
    templates: { error404: true, searchIndex: true, sitemap: true },
  });

  for (const entry of excluded)
    eleventyConfig.ignores.add(entry.endsWith("/") ? `${entry}**` : entry);

  eleventyConfig.addGlobalData("layout", "page");

  // Better search ranking (assets/search-ranking.js). The plugin stops
  // building its own script if given a scripts list, so add ours to each page
  // with a relative link, which works locally and under the path prefix.
  eleventyConfig.addPassthroughCopy("assets/search.js");
  eleventyConfig.addPassthroughCopy("assets/search-ranking.js");
  eleventyConfig.addTransform("search-ranking", function (content) {
    if (!this.page.outputPath?.endsWith(".html")) return content;
    const folder = this.page.url.replace(/[^/]*$/, "");
    const depth = folder.split("/").filter(Boolean).length;
    const src = `${"../".repeat(depth)}assets/search.js`;
    return content.replace(
      "</head>",
      `<script type="module" src="${src}"></script></head>`,
    );
  });

  // The layout shows the title, so drop the page's own first heading.
  eleventyConfig.addPreprocessor("first-heading", "md", (data, content) =>
    content.replace(/^#\s+.+\n?/m, ""),
  );

  eleventyConfig.amendLibrary("md", (md) => {
    // Links: rewrite relative .md links for the site.
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

    // Headings: use GitHub's IDs, so anchors match on both.
    md.core.ruler.push("github-heading-ids", (state) => {
      const seen = new Map();
      state.tokens.forEach((token, i) => {
        if (token.type !== "heading_open") return;
        const text = (state.tokens[i + 1]?.children ?? [])
          .filter((child) => ["text", "code_inline"].includes(child.type))
          .map((child) => child.content)
          .join("");
        token.attrSet("id", githubSlug(text, seen));
      });
    });
  });

  eleventyConfig.on("eleventy.after", ({ dir }) => {
    for (const asset of govukOnlyAssets)
      fs.rmSync(path.join(dir.output, asset), { recursive: true, force: true });
  });

  return {
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    // Pages contain code examples such as ${{ github.ref }}, so Markdown is
    // never processed as a template.
    markdownTemplateEngine: false,
    pathPrefix,
    dir: { input: ".", output: "_site", data: "site/_data" },
  };
}
