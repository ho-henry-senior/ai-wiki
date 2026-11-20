import assert from "node:assert/strict";
import test from "node:test";
import { githubSlug, isExternalLink, markExternalLink, pageUrl, rewriteLink } from "./site-links.mjs";

test("maps Markdown files to site URLs, with README as the folder index", () => {
  assert.equal(pageUrl("README.md"), "/");
  assert.equal(pageUrl("pages/README.md"), "/pages/");
  assert.equal(pageUrl("pages/security.md"), "/pages/security/");
  assert.equal(pageUrl("content/goals/security/README.md"), "/pages/security/");
  assert.equal(pageUrl("content/goals/security/local-agent-security.md"), "/pages/local-agent-security/");
  assert.equal(pageUrl("content/concepts/tool-call-loop.md"), "/concepts/tool-call-loop/");
  assert.equal(
    pageUrl("concepts/tool-call-loop.md"),
    "/concepts/tool-call-loop/",
  );
});

test("rewrites links between pages, keeping anchors", () => {
  const from = "./pages/security.md";
  assert.equal(
    rewriteLink("local-agent-security.md", from),
    "/pages/local-agent-security/",
  );
  assert.equal(
    rewriteLink("../concepts/tool-call-loop.md#the-loop", from),
    "/concepts/tool-call-loop/#the-loop",
  );
  assert.equal(rewriteLink("../README.md#start-here", from), "/#start-here");
  assert.equal(
    rewriteLink("pages/security.md", "./README.md"),
    "/pages/security/",
  );
});

test("accepts page paths as Eleventy reports them from site/", () => {
  assert.equal(
    rewriteLink("../concepts/tool-call-loop.md", "../pages/security.md"),
    "/concepts/tool-call-loop/",
  );
  assert.equal(
    rewriteLink("pages/security.md", "../README.md"),
    "/pages/security/",
  );
});

test("leaves external links and same-page anchors alone", () => {
  for (const href of [
    "https://docs.github.com/en/copilot",
    "mailto:someone@example.com",
    "#core-advice",
    "/pages/security/",
  ])
    assert.equal(rewriteLink(href, "./pages/security.md"), href);
});

test("sends links to files outside the site to GitHub", () => {
  assert.equal(
    rewriteLink("../AGENTS.md", "./pages/repository-instructions.md"),
    "https://github.com/ho-henry-senior/ai-wiki/blob/main/AGENTS.md",
  );
  assert.equal(
    rewriteLink("../../../maintainers/STYLE.md", "./.agents/skills/wiki-review/SKILL.md"),
    "https://github.com/ho-henry-senior/ai-wiki/blob/main/maintainers/STYLE.md",
  );
  assert.equal(
    rewriteLink("../maintainers/MAINTAINING.md#who-owns-what", "./pages/security.md"),
    "https://github.com/ho-henry-senior/ai-wiki/blob/main/maintainers/MAINTAINING.md#who-owns-what",
  );
});

test("excludes maintainer documentation from website links", () => {
  assert.equal(
    rewriteLink("../maintainers/README.md", "./pages/security.md"),
    "https://github.com/ho-henry-senior/ai-wiki/blob/main/maintainers/README.md",
  );
});

test("makes heading IDs the way GitHub does", () => {
  assert.equal(githubSlug("Core advice"), "core-advice");
  assert.equal(githubSlug("Fill Copilot's gaps"), "fill-copilots-gaps");
  assert.equal(
    githubSlug("Write repository instructions in AGENTS.md"),
    "write-repository-instructions-in-agentsmd",
  );
  assert.equal(
    githubSlug("Define, steer, and verify a task"),
    "define-steer-and-verify-a-task",
  );
  assert.equal(githubSlug("`docs/agents/`"), "docsagents");
  const seen = new Map();
  assert.equal(githubSlug("Sources", seen), "sources");
  assert.equal(githubSlug("Sources", seen), "sources-1");
});

test("marks links that leave the wiki, including files sent to GitHub", () => {
  assert.equal(isExternalLink("https://docs.github.com/en/copilot"), true);
  assert.equal(isExternalLink("http://example.com/"), true);
  // A repository file that is not a site page goes to GitHub.
  assert.equal(isExternalLink(rewriteLink("../../AGENTS.md", "./content/goals/alignment.md")), true);
  // The published site itself, by full address, is not external.
  assert.equal(isExternalLink("https://ho-henry-senior.github.io/ai-wiki/pages/security/"), false);
  // Another project on the same host is.
  assert.equal(isExternalLink("https://ho-henry-senior.github.io/other-project/"), true);
  for (const href of ["/pages/security/", "#sources", "mailto:someone@example.com", "", undefined])
    assert.equal(isExternalLink(href), false, String(href));
  assert.equal(isExternalLink(rewriteLink("local-agent-security.md", "./pages/security.md")), false);
});

test("adds the external class and description to a rendered link tag", () => {
  const description = 'aria-describedby="app-external-link-description"';
  assert.equal(
    markExternalLink('<a href="https://example.com/">'),
    `<a ${description} class="app-link--external" href="https://example.com/">`,
  );
  // Keeps a class set by another renderer.
  assert.equal(
    markExternalLink('<a class="govuk-link" href="https://example.com/">'),
    `<a ${description} class="govuk-link app-link--external" href="https://example.com/">`,
  );
  // Does not mark a link twice.
  const marked = markExternalLink('<a href="https://example.com/">');
  assert.equal(markExternalLink(marked), marked);
});
