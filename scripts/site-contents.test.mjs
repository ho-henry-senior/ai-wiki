import assert from "node:assert/strict";
import test from "node:test";
import { contents, isLetterIndex } from "./site-contents.mjs";

const section = (id, text) =>
  `<h2 class="govuk-heading-l" id="${id}">${text}</h2><p>Text.</p>`;

test("lists second-level headings with their IDs", () => {
  const html =
    section("why", "Why") +
    '<h3 id="detail">Detail</h3>' +
    section("try-it", "Try <code>it</code>") +
    section("q-a", "Q &amp; A");
  assert.deepEqual(contents(html), [
    { id: "why", text: "Why" },
    { id: "try-it", text: "Try it" },
    { id: "q-a", text: "Q &amp; A" },
  ]);
});

test("lists nothing for pages with few sections", () => {
  assert.deepEqual(contents(section("a", "A") + section("b", "B")), []);
});

test("skips headings without an ID", () => {
  const html =
    section("a", "A") + section("b", "B") + "<h2>No ID</h2>" + section("c", "C");
  assert.equal(contents(html).length, 3);
});

test("treats sections named by letters as a letter index", () => {
  const letters = contents(section("a", "A") + section("b", "B") + section("c", "C"));
  assert.equal(isLetterIndex(letters), true);
  const words = contents(section("a", "A") + section("b", "B") + section("why", "Why"));
  assert.equal(isLetterIndex(words), false);
  assert.equal(isLetterIndex([]), false);
});
