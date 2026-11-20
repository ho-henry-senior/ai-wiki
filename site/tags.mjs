// The tags a page can have, in its front matter:
//
//   tags:
//     - Copilot CLI
//     - Copilot cloud agent
//
// One flat list for every kind of category. Tags for a part of Copilot start
// with "Copilot", so they sort together; topic tags need no prefix. Tag a
// page with what it explains, not what it only mentions.
//
// Add a tag only when it groups pages a reader would otherwise have to find
// one by one: as a rule of thumb, three or more. Tag a part of Copilot only
// where the page gives guidance specific to it, not where it lists that part
// alongside others.
//
// Eleventy builds a collection for each tag, and the GOV.UK plugin's tag
// layouts list them at /tags/ and /tags/<tag>/. `just style` rejects tags
// not listed here, so add a tag here before using it.

export const allowedTags = [
  // Parts of Copilot.
  "Copilot CLI",
  "Copilot cloud agent",
  "Copilot in the editor",
  // Topics.
  "AGENTS.md",
  "Commands",
  "Context and tokens",
  "Data and privacy",
  "MCP",
  "Permissions and sandboxing",
  "Pull requests and review",
  "Skills and agent roles",
  "Specifications",
  "Testing",
  "Untrusted content and code",
];
