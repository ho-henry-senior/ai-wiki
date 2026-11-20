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
