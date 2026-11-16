// The site's three lanes and the goals that group the Guidance lane. Each
// page says where it belongs with front matter: `lane`, and for guidance,
// `goal`, plus `order` within its group. See MAINTAINING.md#website.

export const lanes = {
  guidance: {
    title: "Guidance",
    url: "/guidance/",
    description:
      "What to do and why, grouped by goal. Each goal starts with an overview of what matters, then the guides that act on it.",
  },
  reference: {
    title: "Reference",
    url: "/reference/",
    description:
      "Things to look up: the glossary, the data-flow checklist, and research notes.",
  },
  articles: {
    title: "Articles",
    url: "/articles/",
    description:
      "Current thinking, background, and case studies, newest first. These are perspectives and context, not recommendations.",
  },
};

export const goals = {
  alignment: "Alignment",
  economy: "Economy",
  traceability: "Traceability",
  security: "Security",
  concepts: "Concepts",
};
