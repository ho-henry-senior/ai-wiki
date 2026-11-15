# Working in this wiki

This repository is a Markdown knowledge base, not an application.

## Find the relevant context

- Before substantive content, scope, or structural changes, read [the design goals](DESIGN-GOALS.md); mechanical formatting fixes do not require this review.
- To locate a topic, use [the homepage](README.md); read only the pages relevant to the task.
- When writing or editing any page, follow [the writing standard](STYLE.md), and check [who owns what](MAINTAINING.md#who-owns-what) before explaining an idea another page owns.
- When adding or restructuring content, follow [the article conventions](MAINTAINING.md#articles-and-concepts) and [concept conventions](concepts/README.md). Keep reusable explanations canonical in `concepts/`, compose them in `pages/`, and update the relevant indexes and topic map.
- When adding or editing slides, follow [the slide conventions](MAINTAINING.md#writing-a-slide).
- When adding sources or researching changing claims, follow [the source conventions](sources/README.md). Keep provenance in `sources/` and raw source material in `data/`.
- For whole-wiki, goal-alignment, information-architecture, or concept-extraction reviews, use [the wiki-review skill](.agents/skills/wiki-review/SKILL.md).

## Make and verify changes

Keep concepts focused and link to their canonical explanations. Label product-specific behavior and distinguish confirmed facts from proposals or unknowns.

When editing content, review potentially stale claims in the affected pages using [the freshness guidance](MAINTAINING.md#keeping-content-current).

Use `just --list` to discover the task interface. Run `just setup` for initial setup, `just sitemap` after edits affecting the generated sitemap, and `just verify` before handoff. Verification tests and checks sitemap freshness, Markdown formatting, and local link targets, including heading anchors, and fails on style problems; it does not check external websites or raw material in `data/`. Run `just style` on its own to see them. The `format` recipe modifies authored Markdown files. Recipes delegate to the canonical npm scripts in `package.json`.

For setup details or scheduled review configuration, see [maintenance and daily reviews](MAINTAINING.md).
