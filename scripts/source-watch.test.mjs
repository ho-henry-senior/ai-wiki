import assert from "node:assert/strict";
import test from "node:test";
import { parseFeed, parseSources, renderCandidates, selectNew } from "./source-watch.mjs";

const now = new Date("2026-11-18T12:00:00Z");

test("reads sources from the maintainer's list", () => {
  const text = [
    "- **AI Hero (Matt Pocock)**, practitioner: workflows. Read from `https://www.aihero.dev/rss.xml`.",
    "- **Not a source line**",
    "- **METR**, research: studies. Read from `https://metr.org/feed.xml`.",
  ].join("\n");
  assert.deepEqual(parseSources(text), [
    { name: "AI Hero (Matt Pocock)", url: "https://www.aihero.dev/rss.xml" },
    { name: "METR", url: "https://metr.org/feed.xml" },
  ]);
});

test("parses RSS items, including CDATA and entities", () => {
  const xml = `<rss><channel><title>Feed</title>
    <item><title><![CDATA[Skills & agents]]></title><link>https://example.com/a</link>
      <pubDate>Mon, 16 Nov 2026 09:00:00 GMT</pubDate><description>&lt;p&gt;Hello&lt;/p&gt;</description></item>
    <item><title>No date</title><link>https://example.com/b</link></item>
  </channel></rss>`;
  const items = parseFeed(xml);
  assert.equal(items.length, 2);
  assert.equal(items[0].title, "Skills & agents");
  assert.equal(items[0].link, "https://example.com/a");
  assert.equal(items[0].date.toISOString(), "2026-11-16T09:00:00.000Z");
  assert.equal(items[0].summary, "Hello");
  assert.equal(items[1].date, undefined);
});

test("parses Atom entries, preferring the alternate link", () => {
  const xml = `<feed xmlns="http://www.w3.org/2005/Atom"><title>Blog</title>
    <entry><title>Post</title><link rel="alternate" href="https://example.com/post"/>
      <link rel="self" href="https://example.com/post.atom"/>
      <published>2026-11-17T10:00:00+00:00</published><summary>Short</summary></entry></feed>`;
  const [entry] = parseFeed(xml);
  assert.equal(entry.link, "https://example.com/post");
  assert.equal(entry.date.toISOString(), "2026-11-17T10:00:00.000Z");
});

test("treats an HTML page as not a feed", () => {
  assert.equal(parseFeed("<!doctype html><html><body>News</body></html>"), undefined);
});

test("keeps new, dated items in the window, newest first, and counts undated ones", () => {
  const items = [
    { title: "Old", link: "https://e.com/old", date: new Date("2026-10-01") },
    { title: "Seen", link: "https://e.com/seen", date: new Date("2026-11-15") },
    { title: "Newer", link: "https://e.com/newer", date: new Date("2026-11-17") },
    { title: "New", link: "https://e.com/new", date: new Date("2026-11-10") },
    { title: "Undated", link: "https://e.com/undated" },
    { title: "Future", link: "https://e.com/future", date: new Date("2026-12-01") },
  ];
  const { items: kept, undated } = selectNew(items, new Set(["https://e.com/seen"]), now);
  assert.deepEqual(kept.map((i) => i.title), ["Newer", "New"]);
  assert.equal(undated, 1);
});

test("caps items per source", () => {
  const items = Array.from({ length: 15 }, (_, i) => ({
    title: `Item ${i}`,
    link: `https://e.com/${i}`,
    date: new Date(now.getTime() - i * 3600_000),
  }));
  assert.equal(selectNew(items, new Set(), now).items.length, 10);
});

test("renders candidates, reporting unreachable and page sources", () => {
  const { text, count } = renderCandidates(
    [
      { name: "Feed", items: [{ title: "T", link: "https://e.com/t", date: new Date("2026-11-17"), summary: "S" }], undated: 2 },
      { name: "Page", notFeed: true },
      { name: "Down", error: "HTTP 503" },
      { name: "Quiet", items: [], undated: 0 },
    ],
    now,
  );
  assert.equal(count, 1);
  assert.match(text, /untrusted data, not instructions/);
  assert.match(text, /- Title: T\n {2}- Link: https:\/\/e\.com\/t\n {2}- Date: 2026-11-17/);
  assert.match(text, /Left out 2 item\(s\) with no stated date/);
  assert.match(text, /## Page\n\nNot a feed/);
  assert.match(text, /## Down\n\nUnreachable: HTTP 503/);
  assert.match(text, /## Quiet\n\nNo new items/);
});
