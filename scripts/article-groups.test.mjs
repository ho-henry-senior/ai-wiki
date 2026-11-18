import assert from "node:assert/strict";
import test from "node:test";
import { articleTopicGroups, articleTypeGroups } from "../site/lanes.mjs";

const article = (title, tags, type) => ({ data: { title, tags, type } });
const pages = [
  article("C", ["Testing", "Permissions and sandboxing"], "reference"),
  article("A", ["Copilot CLI"], "pattern"),
  article("B", ["Testing"], "reference"),
  article("D", [], "case-study"),
];

test("topic groups include all articles and allow multiple topics", () => {
  const groups = articleTopicGroups(pages);
  assert.deepEqual(groups.map((g) => g.title), [
    "Permissions and sandboxing", "Testing", "Other articles",
  ]);
  assert.deepEqual(groups[1].items.map((x) => x.data.title), ["B", "C"]);
  assert.deepEqual(groups[2].items.map((x) => x.data.title), ["A", "D"]);
});

test("type groups use existing labels and sort titles", () => {
  const groups = articleTypeGroups(pages);
  assert.deepEqual(groups.map((g) => g.title), ["Case study", "Pattern", "Reference"]);
  assert.deepEqual(groups[2].items.map((x) => x.data.title), ["B", "C"]);
});
