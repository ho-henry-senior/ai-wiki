import assert from "node:assert/strict";
import test from "node:test";
import { breadcrumbs, tagItems } from "../site/lanes.mjs";

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
