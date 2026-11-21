import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { guideNavigation, guideForUrl, guides, validateGuideUrls } from "../site/guides.mjs";
import { eleventyNavigation } from "../site/lanes.mjs";
import { pageUrl } from "./site-links.mjs";

function markdownFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? markdownFiles(file) : file.endsWith(".md") ? [file] : [];
  });
}

test("Guide registry entries and members resolve to unique Markdown pages", () => {
  const published = markdownFiles("content").map((file) => pageUrl(file.split(path.sep).join("/")));
  assert.equal(validateGuideUrls(published), true);
  const covered = new Set();
  for (const guide of Object.values(guides)) {
    assert.ok(guide.overview.url && guide.title, "Guide needs entry and title");
    if (guide.ordered) assert.ok(guide.parts.length >= 2, "Ordered Guide needs chapters");
    for (const member of [guide.overview, ...guide.parts]) {
      assert.ok(!covered.has(member.url), `Multiple Guide memberships for ${member.url}`);
      covered.add(member.url);
    }
  }
});

test("Guide registry titles match the entry headings used as navigation keys", () => {
  const sourceByUrl = new Map(
    markdownFiles("content").map((file) => [
      pageUrl(file.split(path.sep).join("/")),
      file,
    ]),
  );
  for (const [id, guide] of Object.entries(guides)) {
    const entryFile = sourceByUrl.get(guide.overview.url);
    assert.ok(entryFile, `Guide ${id} entry must resolve to a Markdown page`);
    const contents = fs.readFileSync(entryFile, "utf8");
    const heading = contents.match(/^# (.+)$/m)?.[1]?.trim();
    assert.ok(heading, `Guide ${id} entry needs an H1 heading`);
    assert.equal(
      guide.title,
      heading,
      `Guide ${id} registry title must match the entry H1 used by Eleventy navigation`,
    );
    assert.equal(
      guide.overview.title,
      heading,
      `Guide ${id} entry link title must match the entry H1`,
    );
  }
});

test("Guide reading context and sidebar nesting use the canonical URL", () => {
  const ordered = guideNavigation("/pages/model-requests-and-responses/");
  assert.equal(ordered.title, "How coding agents work");
  assert.equal(ordered.current, 2);
  assert.equal(ordered.total, 3);
  assert.equal(ordered.previous.url, "/pages/inside-coding-agent/");
  assert.equal(ordered.next.url, "/concepts/tool-call-loop/");
  assert.equal(guideNavigation("/pages/understanding-coding-agents/").current, 0);
  assert.equal(eleventyNavigation.parent({ lane: "guides", page: { url: "/pages/model-requests-and-responses/" } }), "How coding agents work");

  const thematic = guideNavigation("/pages/writing-agent-skills/");
  assert.equal(thematic.title, "Skills");
  assert.equal(thematic.ordered, false);
  assert.equal(thematic.current, 1);
  assert.equal(thematic.previous, null);
  assert.equal(thematic.next, null);
  assert.equal(eleventyNavigation.parent({ lane: "reference", page: { url: "/pages/writing-agent-skills/" } }), "Reference");
  assert.equal(guideForUrl("/pages/cloud-agent-security/"), null);
});

test("page front matter does not duplicate registry membership", () => {
  for (const file of markdownFiles("content")) {
    const frontMatter = fs.readFileSync(file, "utf8").match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "";
    assert.doesNotMatch(frontMatter, /^guide(?:Order)?:/m, `${file}: membership belongs in registry`);
  }
});
