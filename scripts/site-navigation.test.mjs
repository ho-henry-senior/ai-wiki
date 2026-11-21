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
  ["pages/writing-agent-skills/index.html", "guides", "Write a SKILL.md"],
  ["concepts/skills-profiles-and-tools/index.html", "guides", "Agent roles"],
  ["pages/agent-role-boundaries/index.html", "guides", "Agile roles in agentic development"],
  ["pages/agent-roles-directory/index.html", "guides", "How agent roles use skills"],
  ["pages/agent-skills-directory/index.html", "reference", "Agent skills directory"],
  ["pages/agent-facing-repository-structure/index.html", "guides", "Set up a repository for agents"],
  ["pages/repository-instructions/index.html", "guides", "Write repository instructions in AGENTS.md"],
  ["concepts/session-history-vs-context/index.html", "guides", "Session history and active context"],
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
  assert.ok(html.includes("Write a SKILL.md"), "Write a SKILL.md retains a direct link from the Reference landing page");
  assert.ok(html.includes("Agent skills directory"), "Standalone skills directory stays in Reference");
});

test("ordered Guides navigation uses linked cards with titles and reading order", () => {
  const html = fs.readFileSync("_site/pages/model-requests-and-responses/index.html", "utf8");
  const nav = html.match(/<nav class="app-series-navigation"[^>]*>[\s\S]*?<\/nav>/)?.[0];
  assert.ok(nav, "Guide navigation exists");
  assert.match(nav, /Part 2 of 4/);
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
    "concepts/session-history-vs-context/index.html",
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


test("Skills is an ordered Guide with a Reference directory", () => {
  const index = fs.readFileSync("_site/guides/index.html", "utf8");
  for (const url of ["/pages/useful-skills/", "/concepts/skills-profiles-and-tools/"]) {
    assert.ok(index.includes('href="/ai-wiki' + url + '"'), "Guide index contains " + url);
  }
  assert.deepEqual(guides.skills.parts.map((part) => part.url), [
    "/pages/writing-agent-skills/",
    "/pages/agent-skills-directory/",
  ]);
  assert.equal(guides.skills.ordered, true);
  for (const [file, previous, next, part] of [
    ["pages/useful-skills/index.html", null, "/pages/writing-agent-skills/", null],
    ["pages/writing-agent-skills/index.html", "/pages/useful-skills/", "/pages/agent-skills-directory/", "Part 1 of 2"],
    ["pages/agent-skills-directory/index.html", "/pages/writing-agent-skills/", null, "Part 2 of 2"],
  ]) {
    const html = fs.readFileSync("_site/" + file, "utf8");
    const nav = html.match(/<nav class="app-series-navigation"[^>]*>[\s\S]*?<\/nav>/)?.[0];
    assert.ok(nav, file + ": Guide navigation exists");
    assert.match(nav, /aria-label="Guide navigation"/);
    if (part) assert.ok(nav.includes(part), file + ": sequence position");
    if (previous) assert.ok(nav.includes('href="/ai-wiki' + previous + '"'), file + ": Previous link");
    else assert.doesNotMatch(nav, /app-series-navigation__card--previous/, file);
    if (next) assert.ok(nav.includes('href="/ai-wiki' + next + '"'), file + ": Next link");
    else assert.doesNotMatch(nav, /app-series-navigation__card--next/, file);
    assert.doesNotMatch(nav, /<span aria-current="page">/, file + ": no thematic member list");
  }
});

test("Agent roles has two linked chapters with Previous/Next", () => {
  assert.equal(guides["agent-roles"].ordered, true);
  const pages = [
    ["concepts/skills-profiles-and-tools/index.html", null, "pages/agent-role-boundaries/index.html"],
    ["pages/agent-role-boundaries/index.html", "concepts/skills-profiles-and-tools/index.html", "pages/agent-roles-directory/index.html"],
    ["pages/agent-roles-directory/index.html", "pages/agent-role-boundaries/index.html", null],
  ];
  const href = (file) => 'href="/ai-wiki/' + file.replace(/index[.]html$/, "") + '"';
  for (const [file, previous, next] of pages) {
    const html = fs.readFileSync("_site/" + file, "utf8");
    const nav = html.match(/<nav class="app-series-navigation"[^>]*>[\s\S]*?<\/nav>/)?.[0];
    assert.ok(nav, file + ": Guide nav");
    assert.match(nav, /Agent roles/);
    if (previous) assert.ok(nav.includes(href(previous)), file + ": Previous link");
    else assert.doesNotMatch(nav, /app-series-navigation__card--previous/);
    if (next) assert.ok(nav.includes(href(next)), file + ": Next link");
    else assert.doesNotMatch(nav, /app-series-navigation__card--next/);
  }
});

test("Guide members have direct-entry context near the title", () => {
  const members = [
    "pages/inside-coding-agent/index.html",
    "pages/model-requests-and-responses/index.html",
    "concepts/tool-call-loop/index.html",
    "pages/writing-agent-skills/index.html",
    "pages/agent-skills-directory/index.html",
    "pages/agent-role-boundaries/index.html",
    "pages/agent-roles-directory/index.html",
    "concepts/session-history-vs-context/index.html",
    "pages/repository-instructions/index.html",
    "pages/justfile-agent-workflows/index.html",
  ];
  for (const file of members) {
    const html = fs.readFileSync(`_site/${file}`, "utf8");
    const header = html.indexOf("app-document-header");
    const context = html.indexOf('class="govuk-body-s app-guide-context"');
    const body = html.indexOf('class="app-prose-scope"');
    assert.ok(header >= 0 && context > header && body > context, `${file}: Guide link near title`);
    assert.match(html.slice(context, body), /Part of the <a class="govuk-link" href="\/ai-wiki\/(pages\/understanding-coding-agents|pages\/useful-skills|concepts\/skills-profiles-and-tools|pages\/agent-facing-repository-structure)\/"/);
  }
  for (const entry of ["pages/useful-skills/index.html", "concepts/skills-profiles-and-tools/index.html", "pages/agent-facing-repository-structure/index.html"]) {
    const html = fs.readFileSync(`_site/${entry}`, "utf8");
    assert.doesNotMatch(html, /class="govuk-body-s app-guide-context"/, `${entry}: entry pages need no "Part of" line`);
  }
});


test("checked metadata shows a date, with optional accessible verification details", () => {
  const agentRoles = fs.readFileSync("_site/concepts/skills-profiles-and-tools/index.html", "utf8");
  assert.match(agentRoles, /class="app-checked-date">Checked: 20 November 2026<\/span>/);
  assert.match(agentRoles, /<details class="app-verification-details">\s*<summary>Verification details<\/summary>/);
  assert.match(agentRoles, /Checked against GitHub.{1,12}s agent-skills and custom-agent configuration documentation/);
  assert.match(agentRoles, /<p class="govuk-body-s">/);

  // Pages with a checked date but no verification notes should not show
  // an inert disclosure control; their visible dates still matter.
  const local = fs.readFileSync("_site/pages/local-agent-security/index.html", "utf8");
  assert.match(local, /class="app-checked-date">Checked: /);
  assert.doesNotMatch(local, /app-verification-details/);

  // Missing dates must not be presented as if they were verified.
  const glossary = fs.readFileSync("_site/pages/glossary/index.html", "utf8");
  assert.doesNotMatch(glossary, /app-checked-date|app-verification-details/);
});

test("Set up a repository for agents has Previous/Next but no chapter numbers", () => {
  const guide = guides["repository-setup"];
  assert.equal(guide.ordered, true);
  assert.equal(guide.numbered, false);
  const items = [guide.overview, ...guide.parts];
  items.forEach((member, position) => {
    const html = fs.readFileSync(`_site${member.url}index.html`, "utf8");
    const nav = html.match(/<nav class="app-series-navigation"[^>]*>[\s\S]*?<\/nav>/)?.[0];
    assert.ok(nav, `${member.url}: guide navigation exists`);
    assert.doesNotMatch(nav, /Part \d+ of/, `${member.url}: no chapter numbers`);
    const previous = items[position - 1];
    const next = items[position + 1];
    if (previous) assert.ok(nav.includes(`app-series-navigation__card--previous" href="/ai-wiki${previous.url}"`), `${member.url}: Previous`);
    else assert.doesNotMatch(nav, /app-series-navigation__card--previous/, `${member.url}: no Previous`);
    if (next) assert.ok(nav.includes(`app-series-navigation__card--next" href="/ai-wiki${next.url}"`), `${member.url}: Next`);
    else assert.doesNotMatch(nav, /app-series-navigation__card--next/, `${member.url}: no Next`);
  });
});
