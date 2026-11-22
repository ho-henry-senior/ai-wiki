// A guide gathers related pages around a reader journey. Its members may
// keep their primary lane (for example Reference) while sharing guide context.
// An ordered guide has chapters; a thematic guide has independent resources.
// An ordered guide with `numbered: false` keeps Previous/Next, which implies
// a sequence, but shows no "Part n of m", so it does not read as a checklist.
export const readingRoutes = {
  skills: {
    title: "Skills",
    // Each chapter is a task: find, install or write, then test.
    ordered: true,
    numbered: false,
    overview: { title: "Skills", url: "/pages/useful-skills/" },
    parts: [
      { title: "Skills worth trying", url: "/pages/agent-skills-directory/" },
      { title: "Install an existing skill", url: "/pages/install-agent-skills/" },
      { title: "Write your own skill", url: "/pages/writing-agent-skills/" },
      { title: "Test whether a skill helps", url: "/pages/test-agent-skills/" },
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
  "define-and-verify": {
    title: "Define, steer, and verify a task",
    ordered: true,
    numbered: false,
    overview: { title: "Define, steer, and verify a task", url: "/pages/define-and-verify-tasks/" },
    parts: [
      { title: "Agree on the problem", url: "/pages/agree-on-the-problem/" },
      { title: "Turn the specification into issues", url: "/pages/turn-specification-into-issues/" },
      { title: "Hand off an issue and steer the implementation", url: "/pages/hand-off-and-steer/" },
    ],
  },
  "review-and-approve": {
    title: "Review and approve agent work",
    ordered: true,
    numbered: false,
    overview: { title: "Review and approve agent work", url: "/pages/review-and-approve-agent-work/" },
    parts: [
      { title: "Ask for work you can approve", url: "/pages/ask-for-work-you-can-approve/" },
      { title: "Decide where to look", url: "/pages/decide-where-to-look/" },
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
  "lo-fi-software-factory": {
    kind: "case-study",
    title: "Case study: a lo-fi software factory",
    ordered: true,
    numbered: false,
    overview: { title: "Case study: a lo-fi software factory", url: "/pages/lo-fi-software-factory-case-study/" },
    parts: [
      { title: "From a refactor idea to actionable issues", url: "/pages/lo-fi-factory-issues/" },
      { title: "Dispatching development with GitHub labels", url: "/pages/lo-fi-factory-dispatch/" },
      { title: "Agent reviews and human decisions", url: "/pages/lo-fi-factory-reviews/" },
      { title: "What worked, what failed, and what remains", url: "/pages/lo-fi-factory-lessons/" },
    ],
  },
};
export const guides = Object.fromEntries(
  Object.entries(readingRoutes).filter(([, route]) => route.kind !== "case-study"),
);

// The registry is the only owner of membership, order and entry points.
// Lookups use canonical published URLs, so members can keep their own lane.
const membersByUrl = new Map();
for (const [id, guide] of Object.entries(readingRoutes)) {
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
    kind: guide.kind ?? "guide",
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

// Case-study lookup is a filtered view of the same registry, not a second
// membership map. Duplicate URLs across Guides and case studies are rejected.
export function caseStudyForUrl(url) {
  const member = guideForUrl(url);
  return member?.guide.kind === "case-study" ? member : null;
}
