import assert from "node:assert/strict";
import test from "node:test";
import { splitFinalSources } from "./site-sources.mjs";

test("separates final Sources heading and preserves its markup", () => {
  const html = '<h2 id="overview">Overview</h2><p>Main</p><h2 id="sources">Sources</h2><ul><li>Book</li></ul>';
  assert.deepEqual(splitFinalSources(html), {
    article: '<h2 id="overview">Overview</h2><p>Main</p>',
    sources: '<h2 id="sources">Sources</h2><ul><li>Book</li></ul>',
  });
});

test("does not move non-final Sources sections or other headings", () => {
  const html = '<h2 id="sources">Sources</h2><p>Citation</p><h2 id="discussion">Discussion</h2>';
  assert.deepEqual(splitFinalSources(html), { article: html, sources: "" });
  const unrelated = '<h2 id="other">Other</h2><p>End</p>';
  assert.deepEqual(splitFinalSources(unrelated), { article: unrelated, sources: "" });
});

test("does not split an unrelated heading with the sources anchor", () => {
  const html = '<h2 id="sources">Further reading</h2><p>Links</p>';
  assert.deepEqual(splitFinalSources(html), { article: html, sources: "" });
});
