// A guide gathers related pages around a reader journey. Its members may
// keep their primary lane (for example Reference) while sharing guide context.
// An ordered guide has chapters; a thematic guide has independent resources.
// An ordered guide with `numbered: false` keeps Previous/Next, which implies
// a sequence, but shows no "Part n of m", so it does not read as a checklist.
export const guides = {
  skills: {
    title: "Skills",
    // A practical reading route; chapters remain independently useful.
    ordered: true,
    overview: { title: "Skills", url: "/pages/useful-skills/" },
    parts: [
      { title: "Write a SKILL.md", url: "/pages/writing-agent-skills/" },
      { title: "Agent skills directory", url: "/pages/agent-skills-directory/" },
    ],
  },
  "agent-roles": {
    title: "Agent roles",
    ordered: true,
    overview: { title: "Agent roles", url: "/concepts/skills-profiles-and-tools/" },
    parts: [
      { title: "Agile roles in agentic development", url: "/pages/agent-role-boundaries/" },
      { title: "How agent roles use skills", url: "/pages/agent-roles-directory/" },
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
      { title: "Session history and active context", url: "/concepts/session-history-vs-context/" },
    ],
  },
  "local-agent-security": {
    title: "Secure a local coding agent",
    ordered: true,
    numbered: false,
    overview: { title: "Secure a local coding agent", url: "/pages/local-agent-security/" },
    parts: [
      { title: "Configure the sandbox and tool restrictions", url: "/pages/local-sandbox-and-tool-restrictions/" },
      { title: "Protect credentials and sensitive data", url: "/pages/local-agent-credentials/" },
      { title: "Check integrations and sandbox boundaries", url: "/pages/local-agent-integrations/" },
    ],
  },
  "repository-setup": {
    title: "Set up a repository for agents",
    ordered: true,
    numbered: false,
    overview: { title: "Set up a repository for agents", url: "/pages/agent-facing-repository-structure/" },
    parts: [
      { title: "Write repository instructions in AGENTS.md", url: "/pages/repository-instructions/" },
      { title: "Repository context for coding agents", url: "/pages/repository-context-for-agents/" },
      { title: "Enable agents to run repository commands", url: "/pages/agent-tool-delegation/" },
      { title: "Give agents a command interface with Just", url: "/pages/justfile-agent-workflows/" },
    ],
  },
};

// The registry is the only owner of membership, order and entry points.
// Lookups use canonical published URLs, so members can keep their own lane.
const membersByUrl = new Map();
for (const [id, guide] of Object.entries(guides)) {
  if (!guide.overview?.url || !guide.title)
    throw new Error(`Guide ${id} needs a title and an entry URL`);
  if (guide.numbered === false && !guide.ordered)
    throw new Error(`Guide ${id} sets numbered: false but is not ordered`);
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
    numbered: guide.ordered === true && guide.numbered !== false,
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
