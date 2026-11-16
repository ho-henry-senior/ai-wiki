import assert from "node:assert/strict";
import test from "node:test";
import { pageUrl, rewriteLink } from "./site-links.mjs";

test("maps Markdown files to site URLs, with README as the folder index", () => {
  assert.equal(pageUrl("README.md"), "/ai-wiki/");
  assert.equal(pageUrl("pages/README.md"), "/ai-wiki/pages/");
  assert.equal(pageUrl("pages/security.md"), "/ai-wiki/pages/security/");
  assert.equal(
    pageUrl("concepts/tool-call-loop.md"),
    "/ai-wiki/concepts/tool-call-loop/",
  );
});

test("rewrites links between pages, keeping anchors", () => {
  const from = "./pages/security.md";
  assert.equal(
    rewriteLink("local-agent-security.md", from),
    "/ai-wiki/pages/local-agent-security/",
  );
  assert.equal(
    rewriteLink("../concepts/tool-call-loop.md#the-loop", from),
    "/ai-wiki/concepts/tool-call-loop/#the-loop",
  );
  assert.equal(
    rewriteLink("../README.md#start-here", from),
    "/ai-wiki/#start-here",
  );
  assert.equal(
    rewriteLink("pages/security.md", "./README.md"),
    "/ai-wiki/pages/security/",
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
