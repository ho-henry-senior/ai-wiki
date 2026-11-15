import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, unlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { buildSitemap, syncSitemap } from "./sitemap.mjs";

async function fixture(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), "wiki-sitemap-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  for (const directory of ["pages", "concepts", "slides", "sources"]) {
    await mkdir(path.join(root, directory));
  }
  for (const goal of ["alignment", "economy", "traceability", "security"]) {
    await writeFile(
      path.join(root, "pages", `${goal}.md`),
      `---\ntype: overview\nsummary: Overview of ${goal}.\n---\n\n# ${goal}\n`,
    );
  }
  return root;
}

test("maps curated Markdown links and inventories pages by purpose", async (t) => {
  const root = await fixture(t);
  await writeFile(
    path.join(root, "concepts", "example.md"),
    '---\ntype: reference\nsummary: "A concept: its meaning."\n---\n\n# Example concept\n',
  );
  await writeFile(
    path.join(root, "pages", "alignment.md"),
    [
      "---",
      "type: overview",
      "summary: Overview of alignment.",
      "---",
      "",
      "# alignment",
      "",
      "[Read the concept][example] and [read it again](../concepts/example.md#detail).",
      "",
      "[example]: ../concepts/example.md",
      "",
      "```md",
      "[Not a relationship](economy.md)",
      "```",
      "",
    ].join("\n"),
  );
  const sitemap = await buildSitemap(root);
  const alignment = sitemap
    .split("### [alignment]")[1]
    .split("### [economy]")[0];
  assert.match(alignment, /\[Example concept\]\(\.\.\/concepts\/example\.md\)/);
  assert.equal((alignment.match(/Example concept/g) ?? []).length, 1);
  assert.doesNotMatch(alignment, /\[economy\]/);
  assert.match(sitemap, /### Concepts[\s\S]*A concept: its meaning\./);
  assert.match(sitemap, /#### overview/);
});

test("groups goal links by their curated overview sections", async (t) => {
  const root = await fixture(t);
  for (const name of ["start", "context", "shared", "other"]) {
    await writeFile(
      path.join(root, "pages", `${name}.md`),
      `---\ntype: guide\nsummary: ${name} summary.\n---\n\n# ${name}\n`,
    );
  }
  const overview = path.join(root, "pages", "alignment.md");
  const content = [
    "---",
    "type: overview",
    "summary: Overview of alignment.",
    "---",
    "",
    "# alignment",
    "",
    "[Other](other.md)",
    "",
    "## Try this first",
    "",
    "[Start](start.md)",
    "",
    "## Core advice",
    "",
    "[Shared][shared] and [again](shared.md#detail)",
    "",
    "## Explore further",
    "",
    "[Context](context.md) and [Shared](shared.md)",
    "",
    "[shared]: shared.md",
    "",
  ].join("\n");
  await writeFile(overview, content);
  const sitemap = await buildSitemap(root);
  const alignment = sitemap
    .split("### [alignment]")[1]
    .split("### [economy]")[0];
  const core = alignment.split("#### Core advice and supporting links")[1].split(
    "#### Explore further",
  )[0];
  const further = alignment.split("#### Explore further")[1].split(
    "#### Other links",
  )[0];
  const other = alignment.split("#### Other links")[1];
  assert.match(core, /\[start\]\(start\.md\)/);
  assert.equal((core.match(/\[shared\]/g) ?? []).length, 1);
  assert.doesNotMatch(core, /\[context\]/);
  assert.match(further, /\[context\]\(context\.md\)/);
  assert.match(further, /\[shared\]\(shared\.md\)/);
  assert.match(other, /\[other\]\(other\.md\)/);

  await syncSitemap(root, "write");
  await writeFile(
    overview,
    content.replace("## Explore further", "## Other reading"),
  );
  assert.equal(await syncSitemap(root, "check"), false);
  const updated = await buildSitemap(root);
  const updatedAlignment = updated
    .split("### [alignment]")[1]
    .split("### [economy]")[0];
  assert.doesNotMatch(updatedAlignment, /#### Explore further/);
  assert.match(
    updatedAlignment.split("#### Other links")[1],
    /\[context\]\(context\.md\)/,
  );
});

test("detects inventory, metadata, and curated relationship changes", async (t) => {
  const root = await fixture(t);
  assert.equal(await syncSitemap(root, "check"), false);
  assert.equal(await syncSitemap(root, "write"), true);
  assert.equal(await syncSitemap(root, "check"), true);

  const page = path.join(root, "pages", "new-page.md");
  await writeFile(
    page,
    "---\ntype: guide\nsummary: First summary.\n---\n\n# New page\n",
  );
  assert.equal(await syncSitemap(root, "check"), false);
  await syncSitemap(root, "write");
  await writeFile(
    page,
    "---\ntype: guide\nsummary: Revised summary.\n---\n\n# New page\n",
  );
  assert.equal(await syncSitemap(root, "check"), false);
  await syncSitemap(root, "write");
  await writeFile(
    path.join(root, "pages", "economy.md"),
    "---\ntype: overview\nsummary: Overview of economy.\n---\n\n# economy\n\n[New page](new-page.md)\n",
  );
  assert.equal(await syncSitemap(root, "check"), false);
  await syncSitemap(root, "write");
  await unlink(page);
  assert.equal(await syncSitemap(root, "check"), false);
});

test("reports missing required page metadata", async (t) => {
  const root = await fixture(t);
  await writeFile(
    path.join(root, "pages", "missing.md"),
    "# Missing metadata\n",
  );
  await assert.rejects(
    buildSitemap(root),
    /missing\.md: expected type and summary/,
  );
});

test("shows assessed status in goal paths and inventory, and detects changes", async (t) => {
  const root = await fixture(t);
  const page = path.join(root, "pages", "new-page.md");
  await writeFile(
    page,
    "---\ntype: guide\nsummary: A guide.\nstatus: developing\n---\n\n# New page\n",
  );
  await writeFile(
    path.join(root, "pages", "alignment.md"),
    "---\ntype: overview\nsummary: Overview of alignment.\nstatus: established\n---\n\n# alignment\n\n[New page](new-page.md)\n",
  );
  const sitemap = await buildSitemap(root);
  assert.match(
    sitemap,
    /### \[alignment\]\(alignment\.md\)\n\n\*\*Status:\*\* established/,
  );
  assert.equal((sitemap.match(/A guide\. \(developing\)/g) ?? []).length, 2);
  assert.match(sitemap, /without a \[completeness status\].*is unassessed/);
  await syncSitemap(root, "write");
  await writeFile(
    page,
    "---\ntype: guide\nsummary: A guide.\nstatus: stub\n---\n\n# New page\n",
  );
  assert.equal(await syncSitemap(root, "check"), false);
});

test("rejects invalid completeness status while allowing an absent status", async (t) => {
  const root = await fixture(t);
  await buildSitemap(root);
  const page = path.join(root, "concepts", "example.md");
  for (const status of ["unknown", "exploratory", "", "false"]) {
    await writeFile(
      page,
      `---\ntype: reference\nsummary: A concept.\nstatus: ${status}\n---\n\n# Example\n`,
    );
    await assert.rejects(
      buildSitemap(root),
      /concepts\/example\.md: invalid completeness status/,
    );
  }
});

test("accepts established status for exploration pages", async (t) => {
  const root = await fixture(t);
  await writeFile(
    path.join(root, "pages", "exploration.md"),
    "---\ntype: exploration\nsummary: An investigation.\nstatus: established\n---\n\n# Investigation\n",
  );
  assert.match(
    await buildSitemap(root),
    /#### exploration[\s\S]*An investigation\. \(established\)/,
  );
});
