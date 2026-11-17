import assert from "node:assert/strict";
import test from "node:test";
import { breadcrumbs, laneItems, metadataParts, tagItems } from "../site/lanes.mjs";

const item = (key, parent, url) => ({
  url,
  data: { title: key, eleventyNavigation: { key, parent } },
});

test("lists the pages above a page, from the top down", () => {
  const items = [
    item("Goals", undefined, "/goals/"),
    item("Security", "Goals", "/pages/security/"),
    item("Secure the cloud agent", "Security", "/pages/cloud-agent-security/"),
  ];
  assert.deepEqual(breadcrumbs(items, "Secure the cloud agent"), [
    { text: "Goals", href: "/goals/" },
    { text: "Security", href: "/pages/security/" },
  ]);
});

test("stops at a missing parent, and at a loop", () => {
  assert.deepEqual(breadcrumbs([item("A", "Missing", "/a/")], "A"), []);
  const loop = [item("A", "B", "/a/"), item("B", "A", "/b/")];
  assert.deepEqual(breadcrumbs(loop, "A"), [{ text: "B", href: "/b/" }]);
});

test("tag sidebar lists all tags, then each tag, marking the current one", () => {
  const slugify = (text) => text.toLowerCase().replaceAll(" ", "-");
  assert.deepEqual(tagItems(["MCP", "Copilot CLI"], "/tags/mcp/", slugify), [
    { href: "/tags/", text: "All tags", current: false },
    { href: "/tags/mcp/", text: "MCP", current: true },
    { href: "/tags/copilot-cli/", text: "Copilot CLI", current: false },
  ]);
});

test("metadata shows an article's type and goal, then dates and status", () => {
  const date = (d) => `D(${d})`;
  assert.deepEqual(
    metadataParts(
      { lane: "articles", type: "guide", goal: "economy", checked: "2026-11-15", status: "developing" },
      date,
    ),
    [
      { text: "Guide" },
      { text: "Goal: Economy", href: "/pages/economy/" },
      { text: "Checked: D(2026-11-15)" },
      { text: "Status: Developing" },
    ],
  );
  // Goal pages and pages with no clear goal show no type or goal.
  assert.deepEqual(metadataParts({ lane: "goals", type: "overview", goal: "economy" }), []);
  assert.deepEqual(metadataParts({ lane: "articles", type: "pattern" }), [{ text: "Pattern" }]);
});

test("the Articles sidebar can be sorted by title", () => {
  const tree = [
    { url: "/b/", title: "Beta" },
    { url: "/a/", title: "Alpha" },
  ];
  assert.deepEqual(
    laneItems(tree, "/a/", true).map((item) => item.text),
    ["Alpha", "Beta"],
  );
  assert.deepEqual(laneItems(tree, "/a/").map((item) => item.text), ["Beta", "Alpha"]);
});
