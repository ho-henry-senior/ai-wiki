// The Copilot surfaces a page can be tagged with, in its front matter:
//
//   surfaces:
//     - cli
//     - cloud-agent
//
// Tag a page with a surface when it gives instructions or behavior specific
// to it, not when it only mentions it. Each surface gets a page on the site
// listing its pages. `just style` rejects tags not listed here.

export const surfaces = {
  editor: {
    title: "Copilot in the editor",
    description: "Pages on Copilot Chat and agent mode in VS Code and other editors.",
  },
  cli: {
    title: "Copilot CLI",
    description: "Pages on Copilot in the terminal.",
  },
  app: {
    title: "Copilot app",
    description: "Pages on the Copilot desktop app.",
  },
  "cloud-agent": {
    title: "Copilot cloud agent",
    description: "Pages on the agent that works on GitHub, from an issue to a pull request.",
  },
  "code-review": {
    title: "Copilot code review",
    description: "Pages on Copilot reviewing pull requests.",
  },
};

export const surfaceUrl = (key) => `/surfaces/${key}/`;
