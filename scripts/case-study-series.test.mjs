import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { readingRoutes, guides, caseStudyForUrl, guideForUrl, guideNavigation } from "../site/guides.mjs";
import { eleventyNavigation, laneItems } from "../site/lanes.mjs";
import { pageUrl } from "./site-links.mjs";

const study = readingRoutes["lo-fi-software-factory"];
const all = [study.overview, ...study.parts];

test("case-study chapters resolve, stay in their lane and retain a stable entry", () => {
  const published = fs.readdirSync("content/articles").filter((x) => x.endsWith(".md"))
    .map((x) => pageUrl("content/articles/" + x));
  assert.ok(all.every((item) => published.includes(item.url)));
  assert.equal(study.overview.url, "/pages/lo-fi-software-factory-case-study/");
  assert.equal(new Set(all.map((x) => x.url)).size, all.length);
  for (const item of all) {
    const name = item.url.split("/").filter(Boolean).at(-1);
    const source = fs.readFileSync("content/articles/" + name + ".md", "utf8");
    assert.match(source, /^type: case-study$/m);
    assert.match(source, /^lane: case-studies$/m);
    assert.equal(caseStudyForUrl(item.url).guide.title, study.title);
  }
});

test("case-study reading order is unnumbered and independent of Guides", () => {
  all.forEach((item, i) => {
    const nav = guideNavigation(item.url);
    assert.equal(nav.current, i);
    assert.equal(nav.numbered, false);
    assert.equal(nav.kind, "case-study");
    assert.equal(nav.previous?.url ?? null, all[i - 1]?.url ?? null);
    assert.equal(nav.next?.url ?? null, all[i + 1]?.url ?? null);
    if (i) assert.equal(eleventyNavigation.parent({ lane: "case-studies", page: { url: item.url } }), study.title);
  });
  assert.equal(caseStudyForUrl("/pages/understanding-coding-agents/"), null);
  assert.equal(guides["lo-fi-software-factory"], undefined);
  const children = [...study.parts].reverse().map((x) => ({ title: x.title, url: x.url }));
  const [sidebar] = laneItems([{ title: study.title, url: study.overview.url, children }], study.parts[0].url);
  assert.deepEqual(sidebar.children.map((x) => x.href), study.parts.map((x) => x.url));
  assert.equal(guideForUrl(study.overview.url).guide.kind, "case-study");
});

test("built case-study pages show accessible ordered navigation", () => {
  all.forEach((item, i) => {
    const html = fs.readFileSync("_site" + item.url + "index.html", "utf8");
    assert.match(html, /aria-label="Case study navigation"/);
    assert.doesNotMatch(html, /Part [0-9]+ of/);
    if (i) assert.match(html, /Part of the <a[^>]+>Case study: a lo-fi software factory<\/a>/);
    if (i < all.length - 1) assert.match(html, /app-series-navigation__card--next/);
    if (i > 0) assert.match(html, /app-series-navigation__card--previous/);
  });
  const listing = fs.readFileSync("_site/case-studies/index.html", "utf8");
  assert.match(listing, /Case study: a lo-fi software factory/);
  assert.doesNotMatch(listing, /From a refactor idea to actionable issues/);
});
