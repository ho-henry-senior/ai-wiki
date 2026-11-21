// Regression checks for the IA invariant that broad navigation may be
// selective, but the sitemap and search index must retain published pages.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { pageUrl } from "./site-links.mjs";
import { guides } from "../site/guides.mjs";

const prefix = "/ai-wiki";
const siteRoot = path.resolve("_site");

function markdownFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? markdownFiles(file) : file.endsWith(".md") ? [file] : [];
  });
}

function publishedPages() {
  const entries = markdownFiles("content").filter(
    (file) => /^lane: (goals|guides|articles|reference)\s*$/m.test(fs.readFileSync(file, "utf8")),
  );
  const urls = entries.map((file) => pageUrl(file.split(path.sep).join("/")));
  assert.equal(new Set(urls).size, urls.length, "Published page URLs must be unique");
  return urls;
}

function normalizedUrl(href) {
  if (!href) return null;
  try {
    const url = new URL(href, "https://ho-henry-senior.github.io");
    if (url.hostname !== "ho-henry-senior.github.io") return null;
    const pathname = url.pathname.replace(/\/?$/, "/");
    return pathname.startsWith(prefix + "/") ? pathname.slice(prefix.length) : pathname;
  } catch {
    return null;
  }
}

test("published pages and Guide members remain in sitemap and search", () => {
  const expected = new Set(publishedPages());
  for (const guide of Object.values(guides)) {
    expected.add(guide.overview.url);
    for (const part of guide.parts) expected.add(part.url);
  }
  const sitemap = fs.readFileSync(path.join(siteRoot, "sitemap/index.html"), "utf8");
  // Navigation and footer links are not sitemap entries. Count only the
  // sitemap's content, so a site-wide link cannot look like a duplicate.
  const main = sitemap.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
  assert.ok(main, "Sitemap has a main content region");
  const sitemapCounts = new Map();
  for (const [, href] of main.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    const url = normalizedUrl(href);
    if (url) sitemapCounts.set(url, (sitemapCounts.get(url) ?? 0) + 1);
  }
  const index = JSON.parse(fs.readFileSync(path.join(siteRoot, "search-index.json"), "utf8"));
  assert.ok(Array.isArray(index), "Search index should be a list of pages");
  const searchUrls = index.map((page) => normalizedUrl(page.url));
  const counts = new Map();
  for (const url of searchUrls) counts.set(url, (counts.get(url) ?? 0) + 1);
  for (const url of expected) {
    assert.ok(fs.existsSync(path.join(siteRoot, url.slice(1), "index.html")), `Missing built page: ${url}`);
    assert.equal(sitemapCounts.get(url), 1, `Sitemap must contain ${url} exactly once`);
    assert.equal(counts.get(url), 1, `Search index must contain ${url} exactly once`);
  }
});

test("all Guides-lane pages stay out of Articles navigation", () => {
  const articles = fs.readFileSync(path.join(siteRoot, "articles/index.html"), "utf8");
  const articlePage = fs.readFileSync(path.join(siteRoot, "pages/cloud-agent-security/index.html"), "utf8");
  const articleSidebar = articlePage.match(/<nav[^>]*x-govuk-sub-navigation[^>]*>[\s\S]*?<\/nav>/)?.[0];
  assert.ok(articleSidebar, "An Article must keep its own sidebar");
  // Check all Guides-lane pages, not just one Guide's known chapters.
  const guidePages = markdownFiles("content")
    .filter((file) => /^lane: guides\s*$/m.test(fs.readFileSync(file, "utf8")))
    .map((file) => pageUrl(file.split(path.sep).join("/")));
  assert.ok(guidePages.length > 0, "Expected Guides-lane pages");
  for (const url of guidePages) {
    const href = 'href="' + prefix + url + '"';
    assert.ok(!articles.includes(href), "Articles listing must not duplicate " + url);
    assert.ok(!articleSidebar.includes(href), "Articles sidebar must not duplicate " + url);
  }
});
