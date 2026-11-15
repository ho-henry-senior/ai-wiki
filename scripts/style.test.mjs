import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
  checkStyle,
  countWords,
  findDuplicates,
  findHedges,
  parseRules,
  prose,
} from "./style.mjs";

const style = [
  '6. **Cut hedges.** Avoid "appropriate", "where practical", and "useful" unless needed.',
  "8. **Keep pages short.** Aim for about 20 words for an overview or concept and about 40 for a guide or pattern.",
].join("\n");

async function fixture(t, files) {
  const root = await mkdtemp(path.join(os.tmpdir(), "wiki-style-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(path.join(root, "pages"));
  await mkdir(path.join(root, "concepts"));
  await writeFile(path.join(root, "STYLE.md"), style);
  for (const [file, text] of Object.entries(files))
    await writeFile(path.join(root, file), text);
  return root;
}

const page = (type, body) =>
  `---\ntype: ${type}\nsummary: S.\n---\n\n# Title\n\n${body}\n`;

test("reads hedge words and length targets from STYLE.md", () => {
  const rules = parseRules(style);
  assert.deepEqual(rules.hedges, ["appropriate", "where practical", "useful"]);
  assert.equal(rules.targets.overview, 20);
  assert.equal(rules.targets.concept, 20);
  assert.equal(rules.targets.guide, 40);
  assert.throws(() => parseRules("# Nothing here"), /could not find/);
});

test("counts prose only, not code, tables, link targets, or sources", () => {
  const text = page(
    "guide",
    [
      "One two [three](https://example.com/a/b/c).",
      "",
      "```text",
      "ignored code words here",
      "```",
      "",
      "| ignored | table |",
      "",
      "## Sources",
      "",
      "- ignored source words",
      "",
      "## Next",
      "",
      "Four five.",
    ].join("\n"),
  );
  assert.equal(countWords(prose(text)), 7); // Title, One, two, three, Next, Four, five
});

test("finds hedge words, including multi-word ones, by whole word", () => {
  const found = findHedges(
    "Where  practical, use useful tools. Usefulness is fine.",
    ["where practical", "useful"],
  );
  assert.deepEqual(found.sort(), ["useful", "where  practical"].sort());
});

test("finds repeated sentences across pages but not pointers or overviews", () => {
  const repeated =
    "Restrict credentials, filesystem paths, network destinations, and tool permissions for every agent run.";
  const pairs = findDuplicates([
    { path: "pages/a.md", kind: "guide", prose: repeated },
    { path: "pages/b.md", kind: "guide", prose: `Also: ${repeated}` },
    { path: "pages/c.md", kind: "overview", prose: repeated },
    {
      path: "pages/d.md",
      kind: "guide",
      prose:
        "See restrict credentials, filesystem paths, network destinations, and tool permissions.",
    },
  ]);
  assert.equal(pairs.length, 1);
  assert.deepEqual(
    [pairs[0].a.path, pairs[0].b.path],
    ["pages/a.md", "pages/b.md"],
  );
});

test("reports long pages, hedges, and duplicates; exempts references", async (t) => {
  const long = Array.from({ length: 60 }, (_, i) => `word${i}`).join(" ");
  const root = await fixture(t, {
    "pages/long-guide.md": page("guide", `${long}.`),
    "pages/long-reference.md": page("reference", `${long}.`),
    "pages/hedgy.md": page("guide", "Use useful checks."),
    "concepts/README.md": page("reference", "Use useful checks."),
  });
  const warnings = await checkStyle(root);
  assert.ok(warnings.some((w) => w.startsWith("pages/long-guide.md: 6")));
  assert.ok(!warnings.some((w) => w.startsWith("pages/long-reference.md")));
  assert.ok(warnings.includes("pages/hedgy.md: hedge words: useful"));
  assert.ok(!warnings.some((w) => w.startsWith("concepts/README.md")));
});
