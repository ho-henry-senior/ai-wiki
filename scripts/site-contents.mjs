// Builds a page's contents list from its rendered HTML, for the website.
// It reads the page's second-level headings, which already have GitHub-style
// IDs, so the Markdown needs no marker that would show on GitHub.

// Short pages don't need a list; below this many sections, show none.
export const minimumSections = 3;

export function contents(html) {
  const sections = [];
  for (const [, attributes, inner] of String(html).matchAll(
    /<h2\b([^>]*)>([\s\S]*?)<\/h2>/g,
  )) {
    const id = attributes.match(/\bid="([^"]+)"/)?.[1];
    // Headings are already escaped HTML; keep their text, drop any tags.
    const text = inner.replace(/<[^>]*>/g, "").trim();
    if (id && text) sections.push({ id, text });
  }
  return sections.length >= minimumSections ? sections : [];
}

// Sections named by a letter or two, such as a glossary's A to Z, read better
// as one line of links than as a long list.
export function isLetterIndex(sections) {
  return sections.length > 0 && sections.every(({ text }) => text.length <= 2);
}
