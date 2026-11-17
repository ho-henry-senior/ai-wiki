// The tags a page can have, in its front matter:
//
//   tags:
//     - Copilot CLI
//     - Copilot cloud agent
//
// One flat list for every kind of category. Tags for a part of Copilot start
// with "Copilot", so they sort together; topic tags, if added, need no
// prefix. Tag a page with what it explains, not what it only mentions.
//
// Eleventy builds a collection for each tag, and the GOV.UK plugin's tag
// layouts list them at /tags/ and /tags/<tag>/. `just style` rejects tags
// not listed here, so add a tag here before using it.

export const allowedTags = [
  // Parts of Copilot.
  "Copilot app",
  "Copilot CLI",
  "Copilot cloud agent",
  "Copilot code review",
  "Copilot in the editor",
  // Topics. A first set, to refine as the wiki grows.
  "AGENTS.md",
  "Commands",
  "Context and tokens",
  "Data and privacy",
  "MCP",
  "Permissions and sandboxing",
  "Skills and custom agents",
  "Testing",
];
