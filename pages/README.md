# Authored pages

This directory holds authored knowledge, not source archives. Pages can be short references, reusable patterns, or broader guides and articles. Let the purpose determine the length; do not force every page into a slide-sized format.

Use lightweight YAML front matter to identify each page's role and summarize it:

```yaml
---
type: reference
summary: A concise description of what this page explains.
---
```

Suggested `type` values:

- `reference` — concise, primarily descriptive information.
- `pattern` — a reusable practice or building block.
- `guide` — an applied or synthesized discussion; it may be broad or compose other pages.

The README topic map is the navigation layer, not a directory scheme. Link a page from every relevant topic rather than duplicating it.

## Current pages

- [AI glossary](glossary.md) — practical definitions of foundational AI and current generative AI terms.
- [Furnish repositories with context for agents](repository-context-for-agents.md) — working notes on domain, decisions, architecture, and inter-repository context.
- [A structure for agent-facing repositories](agent-facing-repository-structure.md) — an illustrative pattern connecting instructions, reference material, skills, task commands, and harness-specific configuration.
- [AGENTS.md as a shared agent entrypoint](agents-md-as-shared-entrypoint.md) — current cross-harness support, limits, and guidance for keeping repository instructions concise and discoverable.
- [Get more from agents by delegating repo tasks to tools](agent-tool-delegation.md) — a guide to exposing deterministic repository tasks through a discoverable interface.
- [A Justfile as an agent-facing task interface](justfile-as-agent-facing-task-interface.md) — a focused pattern for turning existing repository commands into a stable, discoverable task interface.
- [Tool choices by purpose](tools-by-purpose.md) — selection considerations and examples from several repositories.
- [Skills as a changing capability layer](skills-as-capabilities.md) — why skills fill gaps and how their value can shift as harnesses evolve.
- [Useful skills right now](useful-skills.md) — a living, problem-oriented list, with harness support and review status.
- [Skills and agent profiles](skills-and-agent-profiles.md) — a comparison of complementary ways to shape agent capability and behavior.
- [Define agent role responsibilities and boundaries](agent-role-boundaries.md) — positive scope, explicit limits, and workflow responsibility mapping.
- [Unit tests in the age of AI](unit-tests-in-the-age-of-ai.md) — the value and limits of unit tests as feedback for agent-produced changes.
- [From CLI agents toward a lightweight software factory](cli-to-software-factory.md) — an exploratory progression path.
