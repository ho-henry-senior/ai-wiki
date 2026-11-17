import assert from "node:assert/strict";
import test from "node:test";
import { breadcrumbs } from "../site/lanes.mjs";

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
