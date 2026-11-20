// Separate a final Sources section from rendered article HTML so it can
// appear after the series previous/next cards without changing Markdown order.
// Only the final second-level section named Sources is eligible.
export function splitFinalSources(html = "") {
  const source = String(html);
  const headings = [...source.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi)];
  const last = headings.at(-1);
  if (!last || !/<h2\b[^>]*\bid=["']sources["'][^>]*>/i.test(last[0])) {
    return { article: source, sources: "" };
  }
  if (last[1].replace(/<[^>]*>/g, "").trim() !== "Sources") {
    return { article: source, sources: "" };
  }
  return {
    article: source.slice(0, last.index),
    sources: source.slice(last.index),
  };
}
