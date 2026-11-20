// Explicit reading orders for explanatory series. The same data drives
// previous/next links and their overview links; pages remain ordinary articles.
export const series = {
  "understanding-coding-agents": {
    title: "How Coding Agents Work",
    overview: { title: "Series introduction", url: "/pages/understanding-coding-agents/" },
    parts: [
      { title: "Inside a coding agent", url: "/pages/inside-coding-agent/" },
      { title: "What the model receives and returns", url: "/pages/model-requests-and-responses/" },
      { title: "How a coding agent carries out a task", url: "/concepts/tool-call-loop/" },
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
