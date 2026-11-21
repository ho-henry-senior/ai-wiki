// Explicit reading orders for explanatory series. The same data drives
// previous/next links and their overview links; pages remain ordinary articles.
export const series = {
  "skills-and-agent-roles": {
    title: "Skills and agent roles",
    overview: { title: "Series introduction", url: "/pages/skills-and-agent-roles/" },
    parts: [
      { title: "What a skill is, and when to add one", url: "/pages/useful-skills/" },
      { title: "Write a SKILL.md", url: "/pages/writing-agent-skills/" },
      { title: "Agent roles, skills and tools", url: "/concepts/skills-profiles-and-tools/" },
      { title: "How agent roles use skills", url: "/pages/agent-roles-directory/" },
    ],
  },
};

export function seriesNavigation(name, order) {
  const entry = series[name];
  if (!entry || !Number.isInteger(order) || order < 0 || order > entry.parts.length)
    return null;
  const items = [entry.overview, ...entry.parts];
  return {
    title: entry.title,
    overview: entry.overview,
    current: order,
    total: entry.parts.length,
    previous: order > 0 ? items[order - 1] : null,
    next: order < entry.parts.length ? items[order + 1] : null,
  };
}
