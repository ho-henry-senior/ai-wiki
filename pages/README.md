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

- [Furnish repositories with context for agents](repository-context-for-agents.md) — working notes on domain, decisions, architecture, and inter-repository context.
- [Get more from agents by delegating repo tasks to tools](agent-tool-delegation.md) — a guide to exposing deterministic repository tasks through a discoverable interface.
- [Tool choices by purpose](tools-by-purpose.md) — selection considerations and examples from several repositories.
- [Skills as a changing capability layer](skills-as-capabilities.md) — why skills fill gaps and how their value can shift as harnesses evolve.
- [Useful skills right now](useful-skills.md) — a living, problem-oriented list, with harness support and review status.
- [Skills and agent profiles](skills-and-agent-profiles.md) — a comparison of complementary ways to shape agent capability and behavior.
- [Define agent role responsibilities and boundaries](agent-role-boundaries.md) — positive scope, explicit limits, and workflow responsibility mapping.
- [From CLI agents toward a lightweight software factory](cli-to-software-factory.md) — an exploratory progression path.
