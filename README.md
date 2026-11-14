# Making the most of agents

Practical guidance for people using AI agents in software work. Start with a useful change, then follow links to deeper explanations when you need them.

## Alignment

Get results that match what you intended.

- [Clarify the task and check the result](pages/define-and-verify-tasks.md) against its acceptance criteria.
- [Give agents repository context](pages/repository-context-for-agents.md) through a short, discoverable entrypoint.
- [Explore the core advice for alignment](pages/alignment.md).

Here, alignment means matching a specific task's intended outcome; see the broader [AI alignment definition](pages/glossary.md#alignment).

## Economy

Get useful results with less time and fewer tokens, without sacrificing quality.

- [Make existing checks easy to discover and run](pages/agent-tool-delegation.md), rather than having agents reconstruct commands.
- [Use focused tests as feedback](pages/unit-tests-in-the-age-of-ai.md) and broaden checks when the change warrants it.
- [Explore the core advice for economy](pages/economy.md).

## Traceability

Understand what was requested, what changed, and the evidence behind it.

- [Record the request, decisions, and verification](pages/define-and-verify-tasks.md) in proportion to the task.
- [Explore the core advice for traceability](pages/traceability.md).

## Security

Protect sensitive information and limit unsafe actions.

- [Review access and data flow before an agent runs](pages/sensitive-data-in-agent-workflows.md), and enforce limits on consequential actions.
- [Explore the core advice for security](pages/security.md).

## Explore further

- [Sitemap](pages/sitemap.md) — goal paths and a generated inventory of the wiki.
- [Short slides](slides/README.md) — concise, standalone ideas.
- [Reusable concepts](concepts/README.md) — explanations to follow when relevant, including RAG, vector stores, evals, and hill climbing.
- [Authored pages](pages/README.md) — all articles, patterns, and checklists.
- [AI glossary](pages/glossary.md) — shared vocabulary for AI and agents.
- [Source index and records](sources/README.md) — provenance and research notes.
- [From CLI agents toward a lightweight software factory](pages/cli-to-software-factory.md) — an exploratory guided path.
