// Ranks search results for the site's search box. Used by search.js in the
// browser, and tested in scripts/search-ranking.test.mjs.
//
// The plugin's own search matches any part of a word ("rag" matches
// "storage") and lists results in index order. This matches whole words and
// lists the best matches first.

const words = (text) =>
  (text || "")
    .toLowerCase()
    .split(/[^0-9a-z]+/)
    .filter(Boolean);

// "Retrieval-augmented generation" -> "rag", so searching an acronym finds
// the page that spells it out.
const initials = (title) =>
  words(title)
    .map((word) => word[0])
    .join("");

export function rankResults(query, index, limit = 10) {
  const terms = words(query);
  if (!terms.length) return [];
  const last = terms.length - 1;

  const scored = [];
  for (const item of index) {
    const title = words(item.title);
    const description = words(item.description);
    const body = (item.tokens || "").split(" ");
    let score = 0;
    for (const [i, term] of terms.entries()) {
      // The last term may still be being typed, so it matches as a prefix.
      const has = (list) =>
        i === last
          ? list.some((word) => word.startsWith(term))
          : list.includes(term);
      const points =
        has(title) || initials(item.title) === term
          ? 10
          : has(description)
            ? 4
            : has(body)
              ? 1
              : 0;
      if (!points) {
        score = 0;
        break;
      }
      score += points;
    }
    if (score) scored.push({ item, score });
  }

  return scored
    .sort(
      (a, b) =>
        b.score - a.score ||
        (a.item.title || "").localeCompare(b.item.title || ""),
    )
    .slice(0, limit)
    .map(({ item }) => item);
}
