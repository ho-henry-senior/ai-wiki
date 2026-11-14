# Authored pages

This directory holds articles, applied patterns, reference catalogs, and checklists. They connect and apply the focused explanations in [reusable concepts](../concepts/README.md); provenance belongs in [sources](../sources/README.md).

## Articles and concepts

Put a standalone explanation or reusable distinction in `concepts/` when extracting it helps readers reuse or find it. Follow the [concept conventions](../concepts/README.md#writing-a-concept). Keep articles coherent: summarize the idea where it supports the narrative, then link to the canonical explanation rather than duplicate its example and caveats.

Length alone is not a reason to split. Keep tightly coupled explanations together; catalogs, checklists, and concrete workflow examples can remain complete pages. Concepts may provide the basis for short slides, but slide size is not a required format.

[Short slides](../slides/README.md) are standalone summaries of selected concepts, not replacements for their fuller explanations.

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

## Keeping content current

For substantive edits, review the affected pages for claims that may have become stale, especially tool capabilities, configuration paths, API behavior, model limits, and provider security or data-handling policies. Mechanical formatting fixes do not require a freshness review.

Check those claims against current primary sources. Update outdated guidance and its supporting links; where verification is unavailable or inconclusive, flag the uncertainty rather than presenting it as confirmed. Distinguish durable principles from product-, version-, or account-specific behavior.

For time-sensitive claims or recommendations, record the relevant version or review date where it helps readers judge applicability. A review date should describe what was actually checked, not imply that every claim in the page was reverified. Follow [the source conventions](../sources/README.md) for provenance.

Keep edit-time review focused on the affected material and directly dependent guidance, including concepts. Treat a whole-wiki review as a separate periodic task, using [the wiki-review skill](../.agents/skills/wiki-review/SKILL.md), not a prerequisite for every change.

## Current pages

- [AI glossary](glossary.md) — practical definitions of foundational AI and current generative AI terms.
- [How models and harnesses interact](model-harness-interaction.md) — the tool-call loop, message structure, session state, and context limits.
- [Sensitive data in agent workflows](sensitive-data-in-agent-workflows.md) — major agent risks, data sources and destinations, and practical controls.
- [Agent data-flow checklist](agent-data-flow-checklist.md) — questions for reviewing a particular agent setup, integration, or sensitive task.
- [Furnish repositories with context for agents](repository-context-for-agents.md) — working notes on domain, decisions, architecture, and inter-repository context.
- [A structure for agent-facing repositories](agent-facing-repository-structure.md) — an illustrative pattern connecting instructions, reference material, skills, task commands, and harness-specific configuration.
- [AGENTS.md as a shared agent entrypoint](agents-md-as-shared-entrypoint.md) — current cross-harness support, limits, and guidance for keeping repository instructions concise and discoverable.
- [Get more from agents by delegating repo tasks to tools](agent-tool-delegation.md) — a guide to exposing deterministic repository tasks through a discoverable interface.
- [A Justfile as an agent-facing task interface](justfile-as-agent-facing-task-interface.md) — a focused pattern for turning existing repository commands into a stable, discoverable task interface.
- [Tool choices by purpose](tools-by-purpose.md) — selection considerations and examples from several repositories.
- [Skills as a changing capability layer](skills-as-capabilities.md) — why skills fill gaps and how their value can shift as harnesses evolve.
- [Useful skills right now](useful-skills.md) — a living, problem-oriented list, with harness support and review status.
- [Skills and agent profiles](skills-and-agent-profiles.md) — choosing procedures, roles, and executable capabilities for a workflow.
- [Define agent role responsibilities and boundaries](agent-role-boundaries.md) — positive scope, explicit limits, and workflow responsibility mapping.
- [Unit tests in the age of AI](unit-tests-in-the-age-of-ai.md) — the value and limits of unit tests as feedback for agent-produced changes.
- [From CLI agents toward a lightweight software factory](cli-to-software-factory.md) — an exploratory progression path.
