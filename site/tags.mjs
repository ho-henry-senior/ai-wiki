// The tags a page can have, in its front matter:
//
//   tags:
//     - Copilot
//     - Permissions and sandboxing
//
// One flat list. Tag a page with what it explains substantially, not what it
// only mentions. Each tag should gather a recognisable set of pages that
// readers would otherwise struggle to find together: as a rule of thumb,
// three or more.
//
// - Copilot: pages with substantial Copilot-specific guidance, on any part of
//   Copilot. Pair it with subject tags; a page that only mentions Copilot
//   does not get it.
// - Broad subjects (Economy, Repository, Security) gather related pages
//   across the lanes, which the goal navigation does not. Keep a narrower
//   tag inside one only while it still groups something distinct. Not every
//   goal is a tag: Specifications and Pull requests and review already
//   gather Alignment's and Trust & Traceability's pages.
//
// Eleventy builds a collection for each tag, and the GOV.UK plugin's tag
// layouts list them at /tags/ and /tags/<tag>/. The Articles landing page's
// "By topic" view groups articles by these tags. `just style` rejects tags
// not listed here, so add a tag here before using it.

export const allowedTags = [
  "Copilot",
  // Broad subjects.
  "Economy",
  "Repository",
  "Security",
  // Narrower topics.
  "AGENTS.md",
  "Agent roles",
  "Context and tokens",
  "Data and privacy",
  "MCP",
  "Permissions and sandboxing",
  "Pull requests and review",
  "Skills",
  "Specifications",
  "Testing",
  "Untrusted content and code",
];
