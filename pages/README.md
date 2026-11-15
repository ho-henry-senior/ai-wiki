# Authored pages

This directory holds articles, applied patterns, reference catalogs, and checklists. They connect and apply the focused explanations in [reusable concepts](../concepts/README.md); provenance belongs in [sources](../sources/README.md).

## Articles and concepts

Put a standalone explanation or reusable distinction in `concepts/` when extracting it helps readers reuse or find it. Follow the [concept conventions](../concepts/README.md#writing-a-concept). Keep articles coherent: summarize the idea where it supports the narrative, then link to the canonical explanation rather than duplicate its example and caveats.

Length alone is not a reason to split. Keep tightly coupled explanations together; catalogs, checklists, and concrete workflow examples can remain complete pages. Concepts may provide the basis for short slides, but slide size is not a required format.

[Short slides](../slides/README.md) are standalone summaries of selected concepts, not replacements for their fuller explanations.

Use lightweight YAML front matter to identify each page's primary purpose and summarize it. A page may also serve other purposes:

```yaml
---
type: reference
summary: A concise description of what this page explains.
---
```

Suggested `type` values:

- `overview` — an entrypoint to an outcome or a group of related approaches.
- `guide` — applied guidance for approaching a task or problem.
- `pattern` — a reusable practice or building block.
- `explanation` — an article explaining how related ideas fit together and why they matter.
- `reference` — information or a checklist to consult.
- `case-study` — an account of an approach applied in practice and what happened.
- `exploration` — a provisional investigation or path, rather than a case study or established practice.

Focused reusable concepts live in `concepts/` and use the types described in the [concept conventions](../concepts/README.md#writing-a-concept). An explanatory article may bring several concepts together without replacing them.

The homepage and outcome overviews are the navigation layer, not a directory scheme. Link a page from every relevant outcome rather than duplicating it. The [sitemap](sitemap.md) derives its goal paths from those overview links and its inventory from page metadata; regenerate it with `just sitemap` rather than editing it directly.

## Completeness status

An assessed page or concept may include `status` in its front matter. This is an editorial judgment about completeness for the page's stated purpose, not a guarantee of correctness, safety, or freshness. A missing status means **unassessed**, not established.

- `stub` — an early outline, placeholder, or starting point with too little coverage to fulfill its stated purpose on its own. It may still link to useful material.
- `developing` — useful content with significant gaps in fulfilling its stated purpose.
- `established` — fulfills its stated purpose with useful content and important limitations explained; it can still improve.

Choose a status based on the content, not its age, length, or `type`. For example, an exploration can have any completeness status: an established exploration fulfills its purpose without implying that its ideas are settled. Explain material gaps in the page or its navigation context. Prefer usable guidance on central routes; keep incomplete material discoverable and make important gaps visible rather than hiding them. Reassess status when the content changes or a review finds evidence for a change; promotion is a judgment, not an automatic consequence of editing.

## Keeping content current

For substantive edits, review the affected pages for claims that may have become stale, especially tool capabilities, configuration paths, API behavior, model limits, and provider security or data-handling policies. Mechanical formatting fixes do not require a freshness review.

Check those claims against current primary sources. Update outdated guidance and its supporting links; where verification is unavailable or inconclusive, flag the uncertainty rather than presenting it as confirmed. Distinguish durable principles from product-, version-, or account-specific behavior.

For time-sensitive claims or recommendations, record the relevant version or review date where it helps readers judge applicability. A review date should describe what was actually checked, not imply that every claim in the page was reverified. Follow [the source conventions](../sources/README.md) for provenance.

Keep edit-time review focused on the affected material and directly dependent guidance, including concepts. Treat a whole-wiki review as a separate periodic task, using [the wiki-review skill](../.agents/skills/wiki-review/SKILL.md), not a prerequisite for every change.

## Current pages

- [Alignment](alignment.md) — core advice for matching work to the intended outcome.
- [Economy](economy.md) — core advice for using time and tokens effectively without sacrificing quality or security.
- [Traceability](traceability.md) — developing core advice for recording intent, decisions, and evidence.
- [Security](security.md) — an early stub on limiting data exposure and unsafe actions.
- [Define and verify a task](define-and-verify-tasks.md) — clarify outcomes, acceptance criteria, verification, and review evidence.
- [AI glossary](glossary.md) — practical definitions of foundational AI and current generative AI terms.
- [How models and harnesses interact](model-harness-interaction.md) — the tool-call loop, message structure, session state, and context limits.
- [Sensitive data in agent workflows](sensitive-data-in-agent-workflows.md) — developing guidance on agent risks, data sources and destinations, and practical controls.
- [Agent data-flow checklist](agent-data-flow-checklist.md) — questions for reviewing a particular agent setup, integration, or sensitive task.
- [Furnish repositories with context for agents](repository-context-for-agents.md) — developing notes on domain, decisions, architecture, and inter-repository context.
- [A structure for agent-facing repositories](agent-facing-repository-structure.md) — an illustrative pattern connecting instructions, reference material, skills, task commands, and harness-specific configuration.
- [AGENTS.md as a shared agent entrypoint](agents-md-as-shared-entrypoint.md) — current cross-harness support, limits, and guidance for keeping repository instructions concise and discoverable.
- [Get more from agents by delegating repo tasks to tools](agent-tool-delegation.md) — a pattern for exposing deterministic repository tasks through a discoverable interface.
- [A Justfile as an agent-facing task interface](justfile-as-agent-facing-task-interface.md) — a focused pattern for turning existing repository commands into a stable, discoverable task interface.
- [Tool choices by purpose](tools-by-purpose.md) — selection considerations and examples from several repositories.
- [Skills as a changing capability layer](skills-as-capabilities.md) — why skills fill gaps and how their value can shift as harnesses evolve.
- [Useful skills right now](useful-skills.md) — a living, problem-oriented list, with harness support and review status.
- [Skills and agent profiles](skills-and-agent-profiles.md) — choosing procedures, roles, and executable capabilities for a workflow.
- [Define agent role responsibilities and boundaries](agent-role-boundaries.md) — positive scope, explicit limits, and workflow responsibility mapping.
- [Unit tests in the age of AI](unit-tests-in-the-age-of-ai.md) — the value and limits of unit tests as feedback for agent-produced changes.
- [From CLI agents toward a lightweight software factory](cli-to-software-factory.md) — a stub for an exploratory progression path.
- [Case study: a lo-fi software factory](lo-fi-software-factory-case-study.md) — a local agent workflow, its observed results, and limitations.
