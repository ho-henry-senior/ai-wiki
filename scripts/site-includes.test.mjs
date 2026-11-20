import assert from "node:assert/strict";
import test from "node:test";
import {
  IncludeError,
  expandIncludes,
  rebaseLinks,
  resolveAsset,
} from "./site-includes.mjs";

const page = "../content/concepts/loop.md";

// Runs expandIncludes against in-memory files, keyed by repository path.
const expand = (content, files, inputPath = page) =>
  expandIncludes(content, inputPath, {
    rootDir: "/repo",
    readFile: (file) => {
      const key = file.replace(/^\/repo\//, "");
      if (!(key in files)) throw new Error("ENOENT");
      return files[key];
    },
  });

const include = (href, text = "Diagram") =>
  `<!-- include -->\n\n[${text}](${href})`;

test("replaces the marker and link with the asset", () => {
  const diagram = "```mermaid\nflowchart LR\n  A --> B\n```\n";
  const out = expand(
    `Before.\n\n${include("../includes/loop.md")}\n\nAfter.`,
    { "content/includes/loop.md": diagram },
  );
  assert.equal(
    out,
    "Before.\n\n```mermaid\nflowchart LR\n  A --> B\n```\n\nAfter.",
  );
});

test("includes the same asset in pages in different folders", () => {
  const files = { "content/includes/note.md": "A shared sentence." };
  assert.equal(expand(include("../includes/note.md"), files), "A shared sentence.");
  assert.equal(
    expand(include("../includes/note.md"), files, "../content/slides/loop.md"),
    "A shared sentence.",
  );
});

test("accepts the link directly after the marker", () => {
  const out = expand("<!-- include -->\n[Note](../includes/note.md)", {
    "content/includes/note.md": "Text.",
  });
  assert.equal(out, "Text.");
});

test("drops a leading comment and surrounding blank lines from the asset", () => {
  const out = expand(include("../includes/note.md"), {
    "content/includes/note.md": "<!-- Used by loop.md. -->\n\nText.\n\n",
  });
  assert.equal(out, "Text.");
});

test("leaves ordinary links and markers in code blocks alone", () => {
  const content =
    "[A link](../includes/note.md)\n\n```markdown\n" +
    include("../includes/missing.md") +
    "\n```";
  assert.equal(expand(content, {}), content);
});

test("rewrites the asset's relative links for the including page", () => {
  const out = expand(include("../includes/note.md"), {
    "content/includes/note.md":
      "See [security](../goals/security/README.md#limits), [the slide](../slides/loop.md), [MCP](https://modelcontextprotocol.io/) and [below](#below).\n\n[ref]: ../reference/glossary.md",
  });
  assert.equal(
    out,
    "See [security](../goals/security/README.md#limits), [the slide](../slides/loop.md), [MCP](https://modelcontextprotocol.io/) and [below](#below).\n\n[ref]: ../reference/glossary.md",
  );
  const fromRoot = expand(
    include("content/includes/note.md"),
    { "content/includes/note.md": "[Slide](../slides/loop.md)" },
    "../README.md",
  );
  assert.equal(fromRoot, "[Slide](content/slides/loop.md)");
});

test("leaves link-shaped text in code spans unchanged", () => {
  const asset = "content/includes/x.md";
  const page = "content/slides/loop.md";
  assert.equal(
    rebaseLinks(
      "Write `[name](example.md)` to link; see [the guide](../goals/guide.md).",
      asset,
      "content/concepts/deep/loop.md",
    ),
    "Write `[name](example.md)` to link; see [the guide](../../goals/guide.md).",
  );
  // Longer runs, a code span inside link text, and a span over two lines.
  assert.equal(
    rebaseLinks("``a `[b](c.md)` d`` [`code`](e.md)", asset, "content/x/y/z.md"),
    "``a `[b](c.md)` d`` [`code`](../../includes/e.md)",
  );
  assert.equal(
    rebaseLinks("`[a](b.md)\n[c](d.md)` [e](f.md)", asset, "content/x/y/z.md"),
    "`[a](b.md)\n[c](d.md)` [e](../../includes/f.md)",
  );
  // An unmatched backtick is text, so the link after it is rewritten.
  assert.equal(
    rebaseLinks("A ` then [e](f.md)", asset, "content/x/y/z.md"),
    "A ` then [e](../../includes/f.md)",
  );
  // An escaped backtick does not open a code span.
  assert.equal(
    rebaseLinks("\\` [e](f.md) `", asset, "content/x/y/z.md"),
    "\\` [e](../../includes/f.md) `",
  );
  // A reference definition is rewritten only at the start of a line.
  assert.equal(
    rebaseLinks("`x` [r]: f.md\n[r]: f.md", asset, page),
    "`x` [r]: f.md\n[r]: ../includes/f.md",
  );
});

test("keeps code examples in an included fragment as written", () => {
  const out = expand(
    include("../../includes/note.md"),
    {
      "content/includes/note.md":
        "Use `[name](example.md)` for a link, as in [the glossary](../reference/glossary.md).",
    },
    "../content/goals/security/page.md",
  );
  assert.equal(
    out,
    "Use `[name](example.md)` for a link, as in [the glossary](../../reference/glossary.md).",
  );
});

test("rebases a link to the including page itself", () => {
  assert.equal(
    rebaseLinks("[Full](../concepts/loop.md#sources)", "content/includes/x.md", "content/concepts/loop.md"),
    "[Full](loop.md#sources)",
  );
});

test("fails clearly on missing and unsafe includes", () => {
  const fails = (content, pattern) =>
    assert.throws(() => expand(content, {}), (error) =>
      error instanceof IncludeError && pattern.test(error.message),
    );
  fails(include("../includes/missing.md"), /loop\.md:1: include not found: content\/includes\/missing\.md/);
  fails(include("../../data/secret.md"), /must be a \.md file in content\/includes\//);
  fails(include("../includes/../concepts/loop.md"), /must be a \.md file in content\/includes\//);
  fails(include("../includes/diagram.mmd"), /must be a \.md file/);
  fails(include("https://example.com/x.md"), /relative link/);
  fails(include("/content/includes/x.md"), /relative link/);
  fails(include("../includes/x.md#part"), /without an anchor/);
  fails("<!-- include -->\nNot a link.", /must be followed by a link/);
  fails("Text.\n\n<!-- include -->", /loop\.md:3: <!-- include --> must be followed/);
});

test("rejects nested includes, front matter and titles in assets", () => {
  const fails = (asset, pattern) =>
    assert.throws(
      () => expand(include("../includes/a.md"), { "content/includes/a.md": asset }),
      (error) => error instanceof IncludeError && pattern.test(error.message),
    );
  fails(include("b.md"), /cannot be nested/);
  fails("---\ntitle: A\n---\nText.", /front matter/);
  fails("# A title\n\nText.", /# title/);
});

test("allows # lines inside an asset's code blocks", () => {
  const asset = "```bash\n# a comment\n<!-- include -->\n```";
  assert.equal(
    expand(include("../includes/a.md"), { "content/includes/a.md": asset }),
    asset,
  );
});

test("resolves asset paths from the repository root", () => {
  assert.equal(
    resolveAsset("../includes/tool%20loop.md", "content/slides/loop.md"),
    "content/includes/tool loop.md",
  );
});
