import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const cases = [
  ["goals/index.html", "goals"],
  ["pages/security/index.html", "goals", "Security"],
  ["articles/index.html", "articles"],
  ["pages/cloud-agent-security/index.html", "articles", "Secure the Copilot cloud agent"],
  ["reference/index.html", "reference"],
  ["pages/glossary/index.html", null],
];

test("built pages have no breadcrumbs and show the active navigation", () => {
  for (const [page, section, selectedPage] of cases) {
    const html = fs.readFileSync(`_site/${page}`, "utf8");
    assert.doesNotMatch(html, /govuk-breadcrumbs__list/, page);
    const activeItems = [
      ...html.matchAll(/<li[^>]*class="[^"]*govuk-service-navigation__item--active[^"]*"[^>]*>([\s\S]*?)<\/li>/g),
    ].map((match) => match[1]);
    assert.equal(activeItems.length, section ? 1 : 0, `${page}: selected top section`);
    if (section) {
      assert.match(activeItems[0], new RegExp(`href="/ai-wiki/${section}/"`), page);
      assert.match(activeItems[0], /aria-current="(?:page|true)"/, page);
    }
    if (page === "goals/index.html") {
      const sidebar = html.match(/<nav[^>]*x-govuk-sub-navigation[^>]*>[\s\S]*?<\/nav>/)?.[0];
      assert.ok(sidebar, "Goals sidebar exists");
      assert.doesNotMatch(sidebar, />Overview<|aria-current=/, "Goals landing page selects nothing in the sidebar");
    }
    if (selectedPage) {
      const sidebar = html.match(/<nav[^>]*x-govuk-sub-navigation[^>]*>[\s\S]*?<\/nav>/)?.[0];
      assert.ok(sidebar, `${page}: sidebar exists`);
      // The x-govuk sub-navigation marks the current item aria-current="true".
      assert.match(sidebar, /aria-current="(?:page|true)"/, `${page}: current sidebar item`);
    }
  }
});

test("Reference sidebar is alphabetical while the landing page retains purpose groups", () => {
  const html = fs.readFileSync("_site/reference/index.html", "utf8");
  const sidebar = html.match(/<nav[^>]*x-govuk-sub-navigation[^>]*>[\\s\\S]*?<\\/nav>/)?.[0];
  assert.ok(sidebar, "Reference sidebar exists");
  const titles = ["AGENTS.md example", "Agent data-flow checklist", "Write a SKILL.md"];
  const positions = titles.map((title) => sidebar.indexOf(title));
  assert.ok(positions.every((position) => position >= 0), "Expected reference entries exist");
  assert.ok(positions[0] < positions[1] && positions[1] < positions[2], "Reference entries are sorted");
  assert.ok(html.includes("Examples and assets") && html.includes("Checklists and tools"),
    "Reference landing page remains grouped by purpose");
});
