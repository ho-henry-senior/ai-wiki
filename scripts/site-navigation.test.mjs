import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { guides } from "../site/guides.mjs";

const cases = [
  ["goals/index.html", "goals"],
  ["pages/security/index.html", "goals", "Security"],
  ["guides/index.html", "guides"],
  ["pages/understanding-coding-agents/index.html", "guides", "How coding agents work"],
  ["pages/useful-skills/index.html", "guides", "Skills"],
  ["pages/model-requests-and-responses/index.html", "guides", "What the model receives and returns"],
  ["articles/index.html", "articles"],
  ["pages/cloud-agent-security/index.html", "articles", "Secure the Copilot cloud agent"],
  ["reference/index.html", "reference"],
  ["pages/writing-agent-skills/index.html", "reference", "Write a SKILL.md"],
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
  const sidebar = html.match(/<nav[^>]*x-govuk-sub-navigation[^>]*>[\s\S]*?<\/nav>/)?.[0];
  assert.ok(sidebar, "Reference sidebar exists");
  const titles = ["Agent data-flow checklist", "AGENTS.md example", "Local checks and tools"];
  const positions = titles.map((title) => sidebar.indexOf(title));
  assert.ok(positions.every((position) => position >= 0), "Expected reference entries exist");
  assert.ok(positions[0] < positions[1] && positions[1] < positions[2], "Reference entries are sorted");
  assert.ok(html.includes("Examples and assets") && html.includes("Checklists and tools"),
    "Reference landing page remains grouped by purpose");
  assert.ok(html.includes("Write a SKILL.md"), "Series how-to retains direct Reference discovery");
  assert.ok(html.includes("Agent skills directory"), "Standalone skills directory stays in Reference");
});

test("ordered Guides navigation uses linked cards with titles and reading order", () => {
  const html = fs.readFileSync("_site/pages/model-requests-and-responses/index.html", "utf8");
  const nav = html.match(/<nav class="app-series-navigation"[^>]*>[\s\S]*?<\/nav>/)?.[0];
  assert.ok(nav, "Guide navigation exists");
  assert.match(nav, /Part 2 of 3/);
  assert.match(nav, /Guide navigation/);
  assert.match(nav, /class="app-series-navigation__card app-series-navigation__card--previous"/);
  assert.match(nav, /class="app-series-navigation__card app-series-navigation__card--next"/);
  // Titles come from the guide data, so retitling a part needs no change here.
  const [first, , third] = guides["understanding-coding-agents"].parts;
  assert.ok(nav.includes(first.title), "Previous card names part 1");
  assert.ok(nav.includes(third.title), "Next card names part 3");
  assert.match(nav, /<span aria-hidden="true">←<\/span> Previous/);
  assert.match(nav, /Next <span aria-hidden="true">→<\/span>/);
});

test("sources follow Guides navigation across the ordered guide", () => {
  const pages = [
    "pages/inside-coding-agent/index.html",
    "pages/model-requests-and-responses/index.html",
    "concepts/tool-call-loop/index.html",
  ];
  for (const page of pages) {
    const html = fs.readFileSync(`_site/${page}`, "utf8");
    const navigation = html.indexOf('<nav class="app-series-navigation"');
    const sources = html.indexOf('<h2 id="sources"');
    assert.ok(navigation >= 0, `${page}: guide navigation exists`);
    assert.ok(sources > navigation, `${page}: sources appear after navigation`);
    assert.equal(html.match(/<h2 id="sources"/g)?.length, 1, `${page}: Sources occurs once`);
  }
});


test("Skills is an unnumbered guide across Guides and Reference", () => {
  const index = fs.readFileSync("_site/guides/index.html", "utf8");
  assert.match(index, /href="\/ai-wiki\/pages\/useful-skills\/"/);
  assert.match(index, /Skills/);
  const skills = guides.skills;
  assert.equal(skills.ordered, false);
  assert.deepEqual(skills.parts.map((x) => x.title), ["Write a SKILL.md", "Agent skills directory"]);
  for (const path of ["pages/useful-skills/index.html", "pages/writing-agent-skills/index.html", "pages/agent-skills-directory/index.html"]) {
    const html = fs.readFileSync(`_site/${path}`, "utf8");
    const nav = html.match(/<nav class="app-series-navigation"[^>]*>[\s\S]*?<\/nav>/)?.[0];
    assert.ok(nav, `${path}: guide context shown`);
    assert.match(nav, /Guide navigation/);
    assert.match(nav, /href="\/ai-wiki\/pages\/useful-skills\/"/);
    assert.match(nav, /Write a SKILL.md/);
    assert.match(nav, /Agent skills directory/);
    assert.doesNotMatch(nav, /Part [1-9]|Previous|Next/);
  }
  for (const path of ["pages/skills-and-agent-roles/index.html", "concepts/skills-profiles-and-tools/index.html", "pages/agent-roles-directory/index.html"]) {
    const html = fs.readFileSync(`_site/${path}`, "utf8");
    assert.doesNotMatch(html, /<nav class="app-series-navigation"/);
  }
});

test("Guide members have direct-entry context and thematic current-page semantics", () => {
  const members = [
    "pages/inside-coding-agent/index.html",
    "pages/model-requests-and-responses/index.html",
    "concepts/tool-call-loop/index.html",
    "pages/writing-agent-skills/index.html",
    "pages/agent-skills-directory/index.html",
  ];
  for (const file of members) {
    const html = fs.readFileSync(`_site/${file}`, "utf8");
    const header = html.indexOf("app-document-header");
    const context = html.indexOf('class="govuk-body-s app-guide-context"');
    const body = html.indexOf('class="app-prose-scope"');
    assert.ok(header >= 0 && context > header && body > context, `${file}: Guide link near title`);
    assert.match(html.slice(context, body), /Part of the <a class="govuk-link" href="\/ai-wiki\/pages\/(understanding-coding-agents|useful-skills)\/"/);
  }
  for (const file of ["pages/writing-agent-skills/index.html", "pages/agent-skills-directory/index.html"]) {
    const html = fs.readFileSync(`_site/${file}`, "utf8");
    const nav = html.match(/<nav class="app-series-navigation"[^>]*>[\s\S]*?<\/nav>/)?.[0];
    assert.ok(nav, `${file}: thematic navigation`);
    assert.match(nav, /<span aria-current="page">/);
    assert.doesNotMatch(nav, /<a[^>]*aria-current="page"/);
  }
  const entry = fs.readFileSync("_site/pages/useful-skills/index.html", "utf8");
  assert.doesNotMatch(entry, /class="govuk-body-s app-guide-context"/);
});
