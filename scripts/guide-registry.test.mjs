import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { guideNavigation, guideForUrl, guides, validateGuideUrls } from "../site/guides.mjs";
import { eleventyNavigation, laneItems } from "../site/lanes.mjs";
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

  const skills = guideNavigation("/pages/writing-agent-skills/");
  assert.equal(skills.title, "Skills");
  assert.equal(skills.ordered, true);
  assert.equal(skills.current, 1);
  assert.equal(skills.previous.url, "/pages/useful-skills/");
  assert.equal(skills.next.url, "/pages/agent-skills-directory/");
  assert.equal(eleventyNavigation.parent({ lane: "guides", page: { url: "/pages/writing-agent-skills/" } }), "Skills");
  assert.equal(eleventyNavigation.parent({ lane: "reference", page: { url: "/pages/agent-skills-directory/" } }), "Reference");

  const roles = guideNavigation("/pages/agent-role-boundaries/");
  assert.equal(roles.title, "Agent roles");
  assert.equal(roles.ordered, true);
  assert.equal(roles.current, 1);
  assert.equal(roles.total, 2);
  assert.equal(roles.previous.url, "/concepts/skills-profiles-and-tools/");
  assert.equal(roles.next.url, "/pages/agent-roles-directory/");
  assert.equal(eleventyNavigation.parent({ lane: "guides", page: { url: "/pages/agent-role-boundaries/" } }), "Agent roles");
  // The entry page's title matches the guide's, so its chapters nest under it.
  assert.equal(guideNavigation("/concepts/skills-profiles-and-tools/").current, 0);
  assert.equal(guideForUrl("/pages/cloud-agent-security/"), null);
});

test("comma-titled Guide chapters use safe navigation keys without changing their labels", () => {
  // No current chapter has a comma in its title, so give a real chapter one.
  const page = {
    lane: "guides",
    title: "Inside a coding agent, part one",
    page: { url: "/pages/inside-coding-agent/" },
  };
  assert.equal(eleventyNavigation.key(page), "guide-member:/pages/inside-coding-agent/");
  assert.equal(eleventyNavigation.title(page), "Inside a coding agent, part one");
  assert.equal(eleventyNavigation.parent(page), "How coding agents work");
});

test("Guide sidebars use the registry's chapter order", () => {
  const children = [
    { title: "How agent roles use skills", url: "/pages/agent-roles-directory/" },
    { title: "Agile roles in agentic development", url: "/pages/agent-role-boundaries/" },
  ];
  const [group] = laneItems([{
    title: "Agent roles",
    url: "/concepts/skills-profiles-and-tools/",
    children,
  }], "/pages/agent-role-boundaries/");
  assert.deepEqual(group.children.map((child) => child.href), [
    "/pages/agent-role-boundaries/",
    "/pages/agent-roles-directory/",
  ]);
});

test("page front matter does not duplicate registry membership", () => {
  for (const file of markdownFiles("content")) {
    const frontMatter = fs.readFileSync(file, "utf8").match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "";
    assert.doesNotMatch(frontMatter, /^guide(?:Order)?:/m, `${file}: membership belongs in registry`);
  }
});
