// Case-study reading routes reuse the Guide navigation UI without changing
// editorial type, lane, or the Guides index.
export const caseStudySeries = {
  "lo-fi-software-factory": {
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
const byUrl = new Map();
for (const [id, study] of Object.entries(caseStudySeries)) {
  for (const [position, item] of [study.overview, ...study.parts].entries()) {
    if (byUrl.has(item.url)) throw new Error("Duplicate case-study URL: " + item.url);
    byUrl.set(item.url, { id, study, position });
  }
}
export const caseStudyForUrl = (url) => byUrl.get(url) ?? null;
export function caseStudyNavigation(url) {
  const found = caseStudyForUrl(url);
  if (!found) return null;
  const { id, study, position } = found;
  const all = [study.overview, ...study.parts];
  return {
    id, title: study.title, overview: study.overview, items: study.parts,
    ordered: true, numbered: false, current: position, total: study.parts.length,
    previous: position ? all[position - 1] : null,
    next: position < study.parts.length ? all[position + 1] : null,
    kind: "case study",
  };
}
export function validateCaseStudyUrls(publishedUrls) {
  const urls = new Set(publishedUrls);
  for (const url of byUrl.keys()) {
    if (!urls.has(url)) throw new Error("Unresolved case-study URL: " + url);
  }
  return true;
}
