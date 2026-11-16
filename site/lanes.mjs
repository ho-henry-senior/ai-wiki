
// The site's three lanes and the goals that group the Goals lane. Each
// page says where it belongs with front matter: `lane`, and for goals pages,
// `goal`, plus `order` within its group. See maintainers/MAINTAINING.md#website.

export const lanes = {
  goals: {
    title: "Goals",
    url: "/goals/",
    description:
      "Four outcomes to improve in AI-assisted work. Each goal starts with an overview of what matters, then the guides that act on it and the ideas behind them.",
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
};

const homeKey = "Home";

// Where a page sits in the navigation tree: goals pages, including
// concepts, under their goal's overview, overviews under Goals, and other
// lanes' pages directly under their lane. Pages with no lane keep the plugin's
// defaults and appear in no lane's navigation.
//
// This replaces the plugin's computed navigation data, keeping its defaults
// for pages with no lane.
export const eleventyNavigation = {
  key: (data) => {
    if (data.homepage) return data.eleventyNavigation?.key || homeKey;
    return data.eleventyNavigation?.key || data.title;
  },
  parent: (data) => {
    if (data.homepage) return false;
    if (!data.lane) return data.eleventyNavigation?.parent || homeKey;
    if (data.lane !== "goals") return lanes[data.lane]?.title;
    if (data.type === "overview") return lanes.goals.title;
    return goals[data.goal] || lanes.goals.title;
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
