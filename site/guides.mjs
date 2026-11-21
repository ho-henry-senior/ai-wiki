// A guide gathers related pages around a reader journey. Its members may
// keep their primary lane (for example Reference) while sharing guide context.
// An ordered guide has chapters; a thematic guide has independent resources.
export const guides = {
  skills: {
    title: "Skills",
    ordered: false,
    overview: { title: "Skills", url: "/pages/useful-skills/" },
    parts: [
      { title: "Write a SKILL.md", url: "/pages/writing-agent-skills/" },
      { title: "Agent skills directory", url: "/pages/agent-skills-directory/" },
    ],
  },
  "understanding-coding-agents": {
    title: "How coding agents work",
    ordered: true,
    overview: { title: "How coding agents work", url: "/pages/understanding-coding-agents/" },
    parts: [
      { title: "Inside a coding agent", url: "/pages/inside-coding-agent/" },
      { title: "What the model receives and returns", url: "/pages/model-requests-and-responses/" },
      { title: "The tool-call loop", url: "/concepts/tool-call-loop/" },
    ],
  },
};

export function guideNavigation(name, position) {
  const entry = guides[name];
  if (!entry || !Number.isInteger(position) || position < 0 || position > entry.parts.length)
    return null;
  const items = [entry.overview, ...entry.parts];
  return {
    title: entry.title,
    overview: entry.overview,
    ordered: entry.ordered === true,
    items: entry.parts,
    current: position,
    total: entry.parts.length,
    previous: entry.ordered && position > 0 ? items[position - 1] : null,
    next: entry.ordered && position < entry.parts.length ? items[position + 1] : null,
  };
}
