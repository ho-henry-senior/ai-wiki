import assert from "node:assert/strict";
import test from "node:test";
import { githubSlug, pageUrl, rewriteLink } from "./site-links.mjs";

test("maps Markdown files to site URLs, with README as the folder index", () => {
  assert.equal(pageUrl("README.md"), "/");
  assert.equal(pageUrl("pages/README.md"), "/pages/");
  assert.equal(pageUrl("pages/security.md"), "/pages/security/");
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

test("leaves external links and same-page anchors alone", () => {
  for (const href of [
    "https://docs.github.com/en/copilot",
    "mailto:someone@example.com",
    "#core-advice",
  ])
    assert.equal(rewriteLink(href, "./pages/security.md"), href);
});

test("sends links to files outside the site to GitHub", () => {
  assert.equal(
    rewriteLink("../AGENTS.md", "./pages/repository-instructions.md"),
    "https://github.com/ho-henry-senior/ai-wiki/blob/main/AGENTS.md",
  );
  assert.equal(
    rewriteLink("../../../STYLE.md", "./.agents/skills/wiki-review/SKILL.md"),
    "https://github.com/ho-henry-senior/ai-wiki/blob/main/STYLE.md",
  );
  assert.equal(
    rewriteLink("../MAINTAINING.md#who-owns-what", "./pages/security.md"),
    "https://github.com/ho-henry-senior/ai-wiki/blob/main/MAINTAINING.md#who-owns-what",
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
