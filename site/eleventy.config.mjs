import fs from "node:fs";
import path from "node:path";
import { govukEleventyPlugin } from "@x-govuk/govuk-eleventy-plugin";
import {
  excluded,
  githubSlug,
  pathPrefix,
  repository,
  rewriteLink,
  siteUrl,
} from "../scripts/site-links.mjs";
import { contents, isLetterIndex } from "../scripts/site-contents.mjs";
import {
  eleventyNavigation,
  articleTopicGroups,
  articleTypeGroups,
  laneItems,
  lanes,
  metadataParts,
  sectionNavigation,
  tagItems,
} from "./lanes.mjs";

// Builds the wiki as a website. The Markdown stays the source: pages keep
// relative .md links that work on GitHub and in editors, and this config
// rewrites them for the site at build time. See maintainers/MAINTAINING.md#website.
//
// Runs from site/, so the build uses only site/'s own packages
// (site/package.json); the repository root is the input.

// Copied from GOV.UK Frontend by the plugin, but only for GOV.UK: the GDS
// Transport font files and the crown icons. Removed after each build.
const govukOnlyAssets = [
  "assets/fonts",
  "assets/images",
  "assets/rebrand",
  "assets/manifest.json",
];

export default async function (eleventyConfig) {
  // Collections, defined before the plugin so it uses ours. The plugin's own
  // navigation collection matches files by glob, which misses pages when the
  // input folder is "..".
  eleventyConfig.addCollection("navigation", (api) =>
    api
      .getAll()
      .filter(
        (item) =>
          /\.(md|njk)$/.test(item.inputPath) &&
          !item.inputPath.endsWith("/content/reference/glossary.md") &&
          !/^tag/.test(item.data.layout),
      ),
  );
  // The four goal overviews, which the Goals lane page lists.
  eleventyConfig.addCollection("goalOverviews", (api) =>
    api
      .getAll()
      .filter(
        (item) => item.data.lane === "goals" && item.data.type === "overview",
      )
      .sort((a, b) => (a.data.order ?? 0) - (b.data.order ?? 0)),
  );
  // Articles: every supporting page, by title. The feed takes only those
  // with a date, newest first.
  eleventyConfig.addCollection("articles", (api) =>
    api
      .getAll()
      .filter((item) => item.data.lane === "articles")
      .sort((a, b) => a.data.title.localeCompare(b.data.title)),
  );
  eleventyConfig.addCollection("datedArticles", (api) =>
    api
      .getAll()
      .filter((item) => item.data.lane === "articles" && item.data.date)
      .sort(
        (a, b) => b.date - a.date || a.data.title.localeCompare(b.data.title),
      ),
  );

  await eleventyConfig.addPlugin(govukEleventyPlugin, {
    header: {
      logotype: { text: "Making the most of agents" },
      search: { indexPath: "/search-index.json", sitemapPath: "/sitemap" },
    },
    showBreadcrumbs: false,
    serviceNavigation: {
      navigation: Object.values(lanes).map(({ title, url }) => ({
        text: title,
        href: url,
      })),
    },
    titleSuffix: "Making the most of agents",
    // Compact GOV.UK heading scale: h2 uses heading-m, h3 heading-s.
    markdown: { headingsStartWith: "l" },
    url: siteUrl,
    // No crown icons or GOV.UK sharing image.
    icons: { mask: false, shortcut: false, touch: false },
    // No footer crown, copyright statement, or Open Government Licence.
    // Instead, a row of site-wide links: ways in that are not pages of a
    // lane, and where the wiki is maintained.
    footer: {
      logo: false,
      copyright: false,
      contentLicence: false,
      meta: {
        items: [
          { href: "/pages/glossary/", text: "Glossary" },
          { href: "/tags/", text: "Tags" },
          { href: "/sitemap/", text: "Sitemap" },
          {
            href: `${repository}/blob/main/maintainers/README.md`,
            text: "How this wiki is maintained",
          },
          { href: repository, text: "Source on GitHub" },
        ],
      },
    },
    opengraphImageUrl: false,
    // Our stylesheet replaces the GDS Transport typeface, which only
    // GOV.UK may use. See assets/application.scss.
    stylesheets: ["/assets/application.css"],
    templates: {
      error404: true,
      searchIndex: true,
      sitemap: true,
      // Tag pages: /tags/ lists every tag, /tags/<tag>/ its pages. Tags
      // are allowed in site/tags.mjs.
      tags: { tagTitle: "Pages tagged ‘{{ tag }}’" },
      // An Atom feed of the Articles lane, linked from every page's head.
      feed: {
        title: "Articles: Making the most of agents",
        collection: "datedArticles",
        permalink: "/articles/feed.xml",
      },
    },
  });

  for (const entry of [...excluded, "site/"]) {
    const glob = entry.endsWith("/") ? `${entry}**` : entry;
    eleventyConfig.ignores.add(glob);
    eleventyConfig.ignores.add(`../${glob}`);
  }

  eleventyConfig.addGlobalData("layout", "wiki");
  eleventyConfig.addFilter("laneItems", laneItems);
  eleventyConfig.addFilter("articleTopicGroups", articleTopicGroups);
  eleventyConfig.addFilter("articleTypeGroups", articleTypeGroups);
  eleventyConfig.addFilter("sectionNavigation", sectionNavigation);
  // govukDate comes from the GOV.UK plugin, which registers it after this
  // function runs, so look it up when the filter is used.
  eleventyConfig.addFilter("metadataParts", (page) =>
    metadataParts(page, eleventyConfig.getFilter("govukDate")),
  );
  const slugify = eleventyConfig.getFilter("slugify");
  eleventyConfig.addFilter("tagItems", (tags, pageUrl) =>
    tagItems(tags, pageUrl, slugify),
  );
  eleventyConfig.addFilter("contents", contents);
  eleventyConfig.addFilter("isLetterIndex", isLetterIndex);
  // Eleventy runs plugins after this function, so the GOV.UK plugin's
  // computed navigation data would replace ours. Adding ours from a plugin
  // registered after it makes ours run last. Our other computed data is in
  // site/_data/eleventyComputed.js and merges with this.
  eleventyConfig.addPlugin((config) => {
    config.addGlobalData("eleventyComputed", { eleventyNavigation });
  });

  // A landing page for each lane, generated here so the lanes need no
  // Markdown files of their own. Each has its lane's sidebar; Goals lists
  // the four goal overviews in order, and Articles lists every article by
  // title, with its type and main goal.
  const lists = { goals: "goalOverviews", articles: "articles" };
  for (const [lane, { title, url, description }] of Object.entries(lanes)) {
    const listing = { sectionKey: title, listCollection: lists[lane] };
    eleventyConfig.addTemplate(`lanes/${lane}.md`, "", {
      title,
      description,
      permalink: url,
      eleventyNavigation: { key: title, order: 0 },
      ...listing,
    });
  }

  // Better search ranking (assets/search-ranking.js). The plugin stops
  // building its own script if given a scripts list, so add ours to each page
  // with a relative link, which works locally and under the path prefix.
  eleventyConfig.addPassthroughCopy({
    "../assets/search.js": "assets/search.js",
    "../assets/search-ranking.js": "assets/search-ranking.js",
    "../assets/article-views.js": "assets/article-views.js",
    "../assets/diagrams.js": "assets/diagrams.js",
    // Mermaid's single prebuilt file, from site/'s own packages. Only this
    // file is published, and only pages with a diagram load it.
    "node_modules/mermaid/dist/mermaid.min.js": "assets/mermaid.min.js",
  });
  eleventyConfig.addTransform("search-ranking", function (content) {
    if (!this.page.outputPath?.endsWith(".html")) return content;
    const folder = this.page.url.replace(/[^/]*$/, "");
    const depth = folder.split("/").filter(Boolean).length;
    const assets = `${"../".repeat(depth)}assets/`;
    let scripts = `<script type="module" src="${assets}search.js"></script>`;
    if (content.includes('data-article-views'))
      scripts += `<script type="module" src="${assets}article-views.js"></script>`;
    if (content.includes('<pre class="mermaid">'))
      scripts += `<script src="${assets}mermaid.min.js"></script><script type="module" src="${assets}diagrams.js"></script>`;
    return content.replace("</head>", `${scripts}</head>`);
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

    // Diagrams: write ```mermaid blocks as <pre class="mermaid">, which
    // Mermaid's script draws in the browser, as GitHub does.
    const fence = md.renderer.rules.fence;
    md.renderer.rules.fence = (tokens, idx, options, env, self) => {
      const token = tokens[idx];
      if (token.info.trim() === "mermaid")
        return `<pre class="mermaid">${md.utils.escapeHtml(token.content)}</pre>\n`;
      return fence(tokens, idx, options, env, self);
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
    dir: {
      input: "..",
      output: "../_site",
      data: "site/_data",
      includes: "site/_includes",
    },
  };
}
