import assert from "node:assert/strict";
import test from "node:test";
import { laneItems, lanes, metadataParts, sectionNavigation, tagItems } from "../site/lanes.mjs";

test("top navigation identifies landing pages, article pages, and standalone pages", () => {
  const nav = [
    { text: "Goals", href: "/goals/" },
    { text: "Guides", href: "/guides/" },
    { text: "Articles", href: "/articles/" },
    { text: "Case studies", href: "/case-studies/" },
    { text: "Reference", href: "/reference/" },
  ];
  assert.deepEqual(sectionNavigation(nav, "goals", "/goals/")[0], {
    ...nav[0], current: true, active: false,
  });
  assert.deepEqual(sectionNavigation(nav, "goals", "/pages/security/")[0], {
    ...nav[0], current: false, active: true,
  });
  // Even an article linked to Security belongs to the Articles section.
  assert.deepEqual(sectionNavigation(nav, "articles", "/pages/cloud-agent-security/").map((x) => x.active), [false, false, true, false, false]);
  assert.deepEqual(sectionNavigation(nav, "reference", "/reference/data/").map((x) => x.active), [false, false, false, false, true]);
  assert.deepEqual(sectionNavigation(nav, undefined, "/tags/").map((x) => x.active), [false, false, false, false, false]);
  assert.deepEqual(nav[0], { text: "Goals", href: "/goals/" });
});

test("the top bar lists Goals, Guides, Case studies, Articles, then Reference", () => {
  assert.deepEqual(Object.values(lanes).map((lane) => lane.title), ["Goals", "Guides", "Case studies", "Articles", "Reference"]);
});

test("left sidebar marks only the selected item as current", () => {
  const tree = [
    { url: "/pages/alignment/", title: "Alignment" },
    { url: "/pages/security/", title: "Security" },
  ];
  assert.deepEqual(laneItems(tree, "/pages/security/").map((x) => x.current), [false, true]);
  assert.deepEqual(laneItems(tree, "/goals/").map((x) => x.current), [false, false]);
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
      { lane: "articles", type: "how-to", goal: "economy", checked: "2026-11-15", status: "developing" },
      date,
    ),
    [
      { text: "How-to" },
      { text: "Goal: Economy", href: "/pages/economy/" },
      { text: "Checked: D(2026-11-15)", kind: "checked" },
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

test("a lane landing page has no Overview item or selected sidebar entry", () => {
  const tree = [
    { url: "/pages/alignment/", title: "Alignment" },
    { url: "/pages/security/", title: "Security" },
  ];
  const items = laneItems(tree, "/goals/");
  assert.deepEqual(items.map((item) => item.text), ["Alignment", "Security"]);
  assert.ok(items.every((item) => !item.current));
});
