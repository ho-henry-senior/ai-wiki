import { repoPath } from "../scripts/site-links.mjs";

// The site's three lanes and the goals that group the Guidance lane. Each
// page says where it belongs with front matter: `lane`, and for guidance,
// `goal`, plus `order` within its group. See MAINTAINING.md#website.

export const lanes = {
  guidance: {
    title: "Guidance",
    url: "/guidance/",
    description:
      "What to do and why, grouped by goal. Each goal starts with an overview of what matters, then the guides that act on it.",
  },
  reference: {
    title: "Reference",
    url: "/reference/",
    description:
      "Things to look up: the glossary, the data-flow checklist, and research notes.",
  },
  articles: {
    title: "Articles",
    url: "/articles/",
    description:
      "Current thinking, background, and case studies, newest first. These are perspectives and context, not recommendations.",
  },
};

export const goals = {
  alignment: "Alignment",
  economy: "Economy",
  traceability: "Traceability",
  security: "Security",
  concepts: "Concepts",
};

const homeKey = "Home";

// Where a page sits in the navigation tree: guidance pages under their goal's
// overview, overviews and the concepts index under Guidance, and other lanes'
// pages directly under their lane. Pages with no lane keep the plugin's
// defaults and appear in no lane's navigation.
//
// This replaces the plugin's computed navigation data, keeping its defaults
// for pages with no lane.
export const eleventyNavigation = {
  key: (data) => {
    if (repoPath(data.page.inputPath) === "concepts/README.md")
      return goals.concepts;
    if (data.homepage) return data.eleventyNavigation?.key || homeKey;
    return data.eleventyNavigation?.key || data.title;
  },
  parent: (data) => {
    if (data.homepage) return false;
    if (!data.lane) return data.eleventyNavigation?.parent || homeKey;
    if (data.lane !== "guidance") return lanes[data.lane]?.title;
    const input = repoPath(data.page.inputPath);
    if (data.type === "overview" || input === "concepts/README.md")
      return lanes.guidance.title;
    return goals[data.goal] || lanes.guidance.title;
  },
  order: (data) => data.order ?? data.eleventyNavigation?.order,
  excerpt: (data) => data.eleventyNavigation?.excerpt || data.description,
};

// Sidebar items for a lane, in the shape the GOV.UK sub-navigation expects.
// The plugin expands a group only when the page's URL sits inside the
// group's folder, but our page URLs are flat (/pages/...), so expand the
// group that contains the current page instead.
export function laneItems(tree = [], pageUrl) {
  return tree.map((item) => {
    const children = item.children ?? [];
    const contains = children.some((child) => child.url === pageUrl);
    return {
      href: item.url,
      text: item.title,
      current: item.url === pageUrl,
      parent: item.url === pageUrl || contains,
      children: children.length
        ? children.map((child) => ({
            href: child.url,
            text: child.title,
            current: child.url === pageUrl,
          }))
        : false,
    };
  });
}
