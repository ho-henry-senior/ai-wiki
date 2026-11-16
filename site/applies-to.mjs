// The parts of Copilot a page can say it applies to, in its front matter:
//
//   applies-to:
//     - cli
//     - cloud-agent
//
// List a part when the page gives instructions or behavior specific to it,
// not when it only mentions it. Pages show the names under their title, so
// readers can tell whether a page is for the Copilot they use. `just style`
// rejects values not listed here.

export const copilotParts = {
  editor: "Copilot in the editor",
  cli: "Copilot CLI",
  app: "Copilot app",
  "cloud-agent": "Copilot cloud agent",
  "code-review": "Copilot code review",
};

// The names to show for a page's `applies-to` list, in the order given.
export const appliesToNames = (keys) =>
  Array.isArray(keys) ? keys.map((key) => copilotParts[key] ?? key) : [];
