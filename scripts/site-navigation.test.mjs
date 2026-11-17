import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const cases = [
  ["goals/index.html", "goals", "Goals"],
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
    if (selectedPage) {
      const sidebar = html.match(/<nav[^>]*x-govuk-sub-navigation[^>]*>[\s\S]*?<\/nav>/)?.[0];
      assert.ok(sidebar, `${page}: sidebar exists`);
      assert.match(sidebar, /aria-current="page"/, `${page}: current sidebar item`);
    }
  }
});
