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
