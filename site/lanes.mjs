// The site's three lanes and the goals that group the Goals lane. Each
// page says where it belongs with front matter: `lane`, and for goals pages,
// `goal`, plus `order` within its group. See maintainers/MAINTAINING.md#website.

export const lanes = {
  goals: {
    title: "Goals",
    url: "/goals/",
    description: "",
  },
  reference: {
    title: "Reference",
    url: "/reference/",
    description:
      "Things to look up: the data-flow checklist and research notes.",
  },
  articles: {
    title: "Articles",
    url: "/articles/",
    description: "",
  },
};

export const goals = {
  alignment: "Alignment",
  economy: "Economy",
  security: "Security",
  traceability: "Traceability & Trust",
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

// Breadcrumbs for a page: the pages above it in the navigation tree, from
// the top down, in the shape GOV.UK breadcrumbs expect. Built from the same
// navigation data as the sidebar.
export function breadcrumbs(items = [], key) {
  const byKey = new Map();
  for (const item of items) {
    const nav = item.data?.eleventyNavigation;
    if (nav?.key && !byKey.has(nav.key)) byKey.set(nav.key, { item, nav });
  }
  const trail = [];
  const seen = new Set([key]);
  let parent = byKey.get(key)?.nav.parent;
  while (parent && byKey.has(parent) && !seen.has(parent)) {
    seen.add(parent);
    const { item, nav } = byKey.get(parent);
    trail.unshift({ text: item.data.title || nav.key, href: item.url });
    parent = nav.parent;
  }
  return trail;
}

// Sidebar items for the tag pages: all tags, then each tag, in the shape the
// GOV.UK sub-navigation expects. `slugify` is Eleventy's, so the links match
// the tag pages' addresses.
export function tagItems(tags = [], pageUrl, slugify) {
  const item = (href, text) => ({ href, text, current: href === pageUrl });
  return [
    item("/tags/", "All tags"),
    ...tags.map((tag) => item(`/tags/${slugify(tag)}/`, tag)),
  ];
}
