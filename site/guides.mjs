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

// The registry is the only owner of membership, order and entry points.
// Lookups use canonical published URLs, so members can keep their own lane.
const membersByUrl = new Map();
for (const [id, guide] of Object.entries(guides)) {
  if (!guide.overview?.url || !guide.title)
    throw new Error(`Guide ${id} needs a title and an entry URL`);
  if (guide.ordered && guide.parts.length < 2)
    throw new Error(`Ordered guide ${id} needs at least two chapters`);
  for (const [position, member] of [guide.overview, ...guide.parts].entries()) {
    if (!member.url || !member.title)
      throw new Error(`Guide ${id} has a member without a URL or title`);
    if (membersByUrl.has(member.url))
      throw new Error(`Duplicate guide membership: ${member.url}`);
    membersByUrl.set(member.url, { id, guide, position });
  }
}

// Returns null for ordinary pages. Position 0 is the entry point; positive
// positions are members, regardless of whether their lane is Guides or Reference.
export function guideForUrl(url) {
  return membersByUrl.get(url) ?? null;
}

export function guideNavigation(url) {
  const match = guideForUrl(url);
  if (!match) return null;
  const { id, guide, position } = match;
  const items = [guide.overview, ...guide.parts];
  return {
    id,
    title: guide.title,
    overview: guide.overview,
    ordered: guide.ordered === true,
    items: guide.parts,
    current: position,
    total: guide.parts.length,
    previous: guide.ordered && position > 0 ? items[position - 1] : null,
    next: guide.ordered && position < guide.parts.length ? items[position + 1] : null,
  };
}

// Call from the Website build test against the actual published page URLs.
// This catches stale entries even though the registry itself is well-formed.
export function validateGuideUrls(publishedUrls) {
  const urls = new Set(publishedUrls);
  for (const [url, match] of membersByUrl) {
    if (!urls.has(url))
      throw new Error(`Unresolved URL in guide ${match.id}: ${url}`);
  }
  return true;
}
