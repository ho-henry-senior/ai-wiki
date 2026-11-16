import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
  allowedDomains,
  checkChecked,
  checkRecheck,
  checkAppliesTo,
  checkStyle,
  countWords,
  findDuplicates,
  findHedges,
  frontMatter,
  parseRules,
  prose,
} from "./style.mjs";

const style = [
  '6. **Cut hedges.** Avoid "appropriate", "where practical", and "useful" unless needed.',
  "8. **Decide what to do with long pages.** A page over about 20 words for an overview or concept, or about 40 for a guide or pattern, needs one decision.",
].join("\n");

async function fixture(t, files) {
  const root = await mkdtemp(path.join(os.tmpdir(), "wiki-style-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(path.join(root, "pages"));
  await mkdir(path.join(root, "concepts"));
  await mkdir(path.join(root, "maintainers"));
  await writeFile(path.join(root, "maintainers/STYLE.md"), style);
  for (const [file, text] of Object.entries(files))
    await writeFile(path.join(root, file), text);
  return root;
}

const page = (type, body) =>
  `---\ntype: ${type}\nsummary: S.\n---\n\n# Title\n\n${body}\n`;

test("reads hedge words and length ceilings from STYLE.md", () => {
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
    "pages/about-guide.md": page(
      "guide",
      Array.from({ length: 41 }, (_, i) => `term${i}`).join(" ") + ".",
    ),
    "pages/long-reference.md": page("reference", `${long}.`),
    "pages/long-because.md": `---\ntype: guide\nsummary: S.\nlong-because: one setup procedure\n---\n\n# Title\n\n${long}.\n`,
    "pages/long-no-reason.md": `---\ntype: guide\nsummary: S.\nlong-because:\n---\n\n# Title\n\n${long}.\n`,
    "pages/hedgy.md": page("guide", "Use useful checks."),
    "concepts/README.md": page("reference", "Use useful checks."),
  });
  const warnings = await checkStyle(root);
  assert.ok(warnings.some((w) => w.startsWith("pages/long-guide.md: 6")));
  // "About 40" allows 10% leeway: 42 words (with the title) is not over.
  assert.ok(!warnings.some((w) => w.startsWith("pages/about-guide.md")));
  assert.ok(!warnings.some((w) => w.startsWith("pages/long-reference.md")));
  // These pages share text with long-guide, so check the length warning only.
  assert.ok(!warnings.some((w) => w.startsWith("pages/long-because.md: 6")));
  assert.ok(warnings.some((w) => w.startsWith("pages/long-no-reason.md: 6")));
  assert.ok(warnings.includes("pages/hedgy.md: hedge words: useful"));
  assert.ok(!warnings.some((w) => w.startsWith("concepts/README.md")));
});

test("reads lists in front matter and the workflow's allowed domains", () => {
  const { meta } = frontMatter(
    "---\ntype: guide\nrecheck: every-run\ncheck-against:\n  - https://docs.github.com/a\n  - https://github.blog/b\n---\n",
  );
  assert.equal(meta.type, "guide");
  assert.deepEqual(meta["check-against"], [
    "https://docs.github.com/a",
    "https://github.blog/b",
  ]);
  const workflow = [
    "network:",
    "  allowed:",
    "    - defaults",
    "    - docs.github.com",
    '    - "*.example.com"',
    "tools:",
    "  bash:",
    "    - cat",
  ].join("\n");
  assert.deepEqual(allowedDomains(workflow), [
    "defaults",
    "docs.github.com",
    "*.example.com",
  ]);
});

test("a page marked recheck needs reachable https sources", () => {
  const domains = ["docs.github.com", "*.example.com"];
  assert.deepEqual(checkRecheck("p.md", { type: "guide" }, domains), []);
  assert.match(
    checkRecheck("p.md", { recheck: "every-run" }, domains)[0],
    /lists no sources/,
  );
  const ok = {
    recheck: "every-run",
    "check-against": ["https://docs.github.com/x", "https://a.example.com/y"],
  };
  assert.deepEqual(checkRecheck("p.md", ok, domains), []);
  const bad = {
    recheck: "every-run",
    "check-against": [
      "http://docs.github.com/x",
      "https://other.org/y",
      "nope",
    ],
  };
  const warnings = checkRecheck("p.md", bad, domains);
  assert.equal(warnings.length, 3);
  assert.ok(warnings.some((w) => /not https/.test(w)));
  assert.ok(warnings.some((w) => /cannot fetch other\.org/.test(w)));
  assert.ok(warnings.some((w) => /not a URL/.test(w)));
});

test("checked must be a real, past date, kept out of the text", () => {
  const today = new Date("2026-11-16T12:00:00Z");
  assert.deepEqual(
    checkChecked("p.md", { checked: "2026-11-15" }, "", today),
    [],
  );
  assert.deepEqual(checkChecked("p.md", {}, "No dates here.", today), []);
  assert.match(
    checkChecked("p.md", { checked: "15 November 2026" }, "", today)[0],
    /YYYY-MM-DD/,
  );
  assert.match(
    checkChecked("p.md", { checked: "2026-02-30" }, "", today)[0],
    /YYYY-MM-DD/,
  );
  assert.match(
    checkChecked("p.md", { checked: "2026-12-01" }, "", today)[0],
    /future/,
  );
  assert.match(
    checkChecked(
      "p.md",
      {},
      "Checked 15 November 2026 against the docs.",
      today,
    )[0],
    /checked field/,
  );
});

test("applies-to must list known parts of Copilot", () => {
  const known = ["cli", "cloud-agent"];
  assert.deepEqual(checkAppliesTo("a.md", {}, known), []);
  assert.deepEqual(
    checkAppliesTo("a.md", { "applies-to": ["cli", "cloud-agent"] }, known),
    [],
  );
  assert.match(
    checkAppliesTo("a.md", { "applies-to": ["cli", "chat"] }, known)[0],
    /unknown "chat"/,
  );
  assert.match(
    checkAppliesTo("a.md", { "applies-to": "cli" }, known)[0],
    /must be a list/,
  );
});
