# Working in this wiki

This repository publishes a Markdown knowledge base and maintains its own editorial project. Reader-facing knowledge lives in `content/`, `content/concepts/`, and `content/sources/`; project instructions live in `maintainers/`. Keep maintenance instructions out of published wiki pages.

## Find the relevant context

- Before substantive content, scope, or structural changes, read [the design goals](maintainers/DESIGN-GOALS.md); mechanical formatting fixes do not require this review.
- To locate a topic, use [the homepage](README.md); read only the pages relevant to the task.
- When writing or editing any page, follow [the writing standard](maintainers/STYLE.md), and check [who owns what](maintainers/MAINTAINING.md#who-owns-what) before explaining an idea another page owns.
- When adding or restructuring content, follow [the article conventions](maintainers/MAINTAINING.md#articles-and-concepts) and [concept conventions](maintainers/MAINTAINING.md#writing-a-concept). Keep reusable explanations canonical in `content/concepts/`, compose them in `content/`, and update the relevant indexes and topic map.
- When adding or editing slides, follow [the slide conventions](maintainers/MAINTAINING.md#writing-a-slide).
- When adding sources or researching changing claims, follow [the source conventions](maintainers/MAINTAINING.md#maintaining-sources). Keep provenance in `content/sources/` and raw source material in `data/`.
- For whole-wiki, goal-alignment, information-architecture, or concept-extraction reviews, use [the wiki-review skill](.agents/skills/wiki-review/SKILL.md).

## Make and verify changes

Keep concepts focused and link to their canonical explanations. Label product-specific behavior and distinguish confirmed facts from proposals or unknowns.

When editing content, review potentially stale claims in the affected pages using [the freshness guidance](maintainers/MAINTAINING.md#keeping-content-current).

Use `just --list` to discover the task interface. Run `just setup` for initial setup and `just verify` before handoff. Verification tests and checks Markdown formatting, and local link targets, including heading anchors, and fails on style problems; it does not check external websites or raw material in `data/`. Run `just style` on its own to see them. The `format` recipe modifies authored Markdown files. Recipes delegate to the canonical npm scripts in `package.json`.

For setup details or scheduled review configuration, see [maintenance and daily reviews](maintainers/MAINTAINING.md).
