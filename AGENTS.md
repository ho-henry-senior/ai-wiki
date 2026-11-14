# Working in this wiki

This repository is a Markdown knowledge base, not an application.

## Find the relevant context

- Before substantive content, scope, or structural changes, read [the design goals](DESIGN-GOALS.md); mechanical formatting fixes do not require this review.
- To locate a topic, use [the topic map](README.md#topic-map); read only the pages relevant to the task.
- When adding or restructuring pages, follow [the page conventions](pages/README.md) and update that index and the topic map.
- When adding sources or researching changing claims, follow [the source conventions](sources/README.md). Keep authored guidance in `pages/`, provenance in `sources/`, and raw source material in `data/`.

## Make and verify changes

Keep concepts focused and link to their canonical explanations. Label product-specific behavior and distinguish confirmed facts from proposals or unknowns.

When editing content, review potentially stale claims in the affected pages using [the freshness guidance](pages/README.md#keeping-content-current).

Use `just --list` to discover the task interface. Run `just setup` for initial setup and `just verify` before handoff. Verification checks Markdown formatting and local link targets, including heading anchors; it does not check external websites or raw material in `data/`. The `format` recipe modifies authored Markdown files. Recipes delegate to the canonical npm scripts in `package.json`.
