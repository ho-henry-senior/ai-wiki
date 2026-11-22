// The site's three lanes and the four goals. Each page says where it
// belongs with front matter: `lane`, and `goal` for a goal overview or an
// article with a clear main goal. See maintainers/MAINTAINING.md#website.

import { guideForUrl, caseStudyForUrl, groupForGuide, groupForUrl } from "./guides.mjs";

// The order here is the order of the site's top bar.
export const lanes = {
  goals: {
    title: "Goals",
    url: "/goals/",
    description: "",
  },
  guides: {
    title: "Guides",
    url: "/guides/",
    description: "Collections of related pages to explore together.",
  },
  "case-studies": {
    title: "Case studies",
    url: "/case-studies/",
    description: "Observed applications of agents, with evidence, outcomes and limits.",
  },
  articles: {
    title: "Articles",
    url: "/articles/",
    description: "",
  },
  reference: {
    title: "Reference",
    url: "/reference/",
    description:
      "Copyable assets, practical checklists, tools and the sources behind the guidance.",
  },
};

export const goals = {
  alignment: "Alignment",
  economy: "Economy",
  security: "Security",
  traceability: "Trust & Traceability",
};

const homeKey = "Home";

// Where a page sits in the navigation tree: goals pages, including
// concepts, under their goal's overview, overviews under Goals, and other
// lanes' pages directly under their lane. Pages with no lane keep the plugin's
// defaults and appear in no lane's navigation.
//
// This replaces the plugin's computed navigation data, keeping its defaults
// for pages with no lane.
//
// Eleventy Navigation treats commas in keys as multiple parents, so a Guide
// whose title has a comma is keyed by its entry URL instead of its title.
export const guideKey = (guide) =>
  guide.title.includes(",") ? `guide:${guide.overview.url}` : guide.title;

export const eleventyNavigation = {
  key: (data) => {
    if (data.homepage) return data.eleventyNavigation?.key || homeKey;
    const key = data.eleventyNavigation?.key || data.title;
    // Eleventy Navigation treats commas in keys as multiple parents. A
    // Guide chapter can have a comma in its heading, but never in its key.
    const member = guideForUrl(data.page?.url);
    if ((data.lane === "guides" || data.lane === "case-studies") && member?.position === 0)
      return guideKey(member.guide);
    if ((data.lane === "guides" || data.lane === "case-studies") && member?.position > 0 && key?.includes(","))
      return `guide-member:${data.page.url}`;
    return key;
  },
  title: (data) => data.eleventyNavigation?.title || data.title,
  parent: (data) => {
    if (data.homepage) return false;
    if (!data.lane) return data.eleventyNavigation?.parent || homeKey;
    // Only Guides-lane chapters nest under the registry's entry heading.
    // Reference members remain in their own primary navigation lane.
    const member = guideForUrl(data.page?.url);
    if (data.lane === "guides" && member?.position > 0)
      return guideKey(member.guide);
    // A grouped Guide's entry nests under its group's overview page.
    if (data.lane === "guides" && member?.position === 0 && groupForGuide(member.id))
      return groupForGuide(member.id).group.title;
    if (data.lane === "case-studies" && member?.guide.kind === "case-study" && member.position > 0)
      return guideKey(member.guide);
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
// group that contains the current page instead. Guides, Articles and
// Reference are sorted by title at the top level; Guide chapters follow the
// registry's order.
export function laneItems(tree = [], pageUrl, alphabetical = false) {
  const byTitle = (a, b) => a.title.localeCompare(b.title);
  const items = alphabetical ? [...tree].sort(byTitle) : tree;
  const contains = (node) =>
    (node.children ?? []).some((child) => child.url === pageUrl || contains(child));
  const toItem = (node) => {
    // The Guide registry owns reading order; old page-specific order
    // values must not rearrange the chapter list in the sidebar. A group's
    // Guides are listed alphabetically.
    const children = [...(node.children ?? [])];
    if (guideForUrl(node.url)?.guide.ordered)
      children.sort((a, b) =>
        (guideForUrl(a.url)?.position ?? Infinity) -
        (guideForUrl(b.url)?.position ?? Infinity),
      );
    else if (groupForUrl(node.url)) children.sort(byTitle);
    const current = node.url === pageUrl;
    const inside = contains(node);
    return {
      href: node.url,
      text: node.title,
      current,
      parent: current || inside,
      // A group always shows its Guides; a Guide shows its chapters only
      // when the reader is on it or one of them.
      expanded: current || inside || Boolean(groupForUrl(node.url)),
      children: children.length ? children.map(toItem) : false,
    };
  };
  return items.map(toItem);
}

// Mark the current top-level section on both its landing page and its
// content pages. A supporting article belongs to Articles regardless of goal.
// Standalone pages (tags, the sitemap, etc.) select no section.
export function sectionNavigation(items = [], lane, pageUrl) {
  return items.map((item) => {
    const section = Object.entries(lanes).find(([, value]) => value.url === item.href)?.[0];
    const current = item.href === pageUrl;
    return { ...item, current, active: !current && section === lane };
  });
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

// Group the same article collection for the landing page by tag, including
// Copilot. An article may appear in more than one topic; items without a
// tag remain discoverable in Other.
import { allowedTags } from "./tags.mjs";

const byTitle = (a, b) => a.data.title.localeCompare(b.data.title);

export function articleTopicGroups(articles = []) {
  const groups = allowedTags
    .map((title) => ({
      title,
      items: articles.filter((item) => item.data.tags?.includes(title)).sort(byTitle),
    }))
    .filter((group) => group.items.length)
    .sort((a, b) => a.title.localeCompare(b.title));

  const other = articles.filter(
    (item) => !allowedTags.some((tag) => item.data.tags?.includes(tag)),
  );
  if (other.length) groups.push({ title: "Other articles", items: other.sort(byTitle) });
  return groups;
}

export function articleTypeGroups(articles = []) {
  const groups = new Map();
  for (const item of articles) {
    const title = typeLabels[item.data.type] || "Other";
    if (!groups.has(title)) groups.set(title, []);
    groups.get(title).push(item);
  }
  return [...groups].sort(([a], [b]) => a.localeCompare(b))
    .map(([title, items]) => ({ title, items: items.sort(byTitle) }));
}

// Labels for the existing `type` values, shown on articles.
export const typeLabels = {
  "how-to": "How-to",
  advice: "Advice",
  pattern: "Pattern",
  explanation: "Explanation",
  reference: "Reference",
  "case-study": "Case study",
  exploration: "Exploration",
};

// A goal's overview page, at its published address.
export const goalUrl = (goal) => (goals[goal] ? `/pages/${goal}/` : undefined);

const statuses = ["established", "developing", "stub"];

// The parts of a page's metadata line, in order. Articles show their type
// and main goal, if they have one; any page can show its published date,
// checked date and status. `formatDate` is the GOV.UK plugin's govukDate.
export function metadataParts(page = {}, formatDate = String) {
  const parts = [];
  const article = page.lane === "articles";
  const caseStudy = page.lane === "case-studies";
  if (article && typeLabels[page.type]) parts.push({ text: typeLabels[page.type] });
  if (article && goals[page.goal])
    parts.push({ text: `Goal: ${goals[page.goal]}`, href: goalUrl(page.goal) });
  if ((article || caseStudy) && page.published)
    parts.push({ text: `Published: ${formatDate(page.published)}` });
  if (page.checked) parts.push({ text: `Checked: ${formatDate(page.checked)}`, kind: "checked" });
  if (statuses.includes(page.status)) {
    const status = page.status[0].toUpperCase() + page.status.slice(1);
    parts.push({ text: `Status: ${status}` });
  }
  return parts;
}
