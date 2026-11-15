# Making the most of agents

Practical guidance for people using AI agents in software work. Explore a goal, understand its principles, and choose techniques to apply them.

## [Alignment](pages/alignment.md)

Get results that match what you intended.

- [Define the work](pages/define-and-verify-tasks.md)
- [Provide relevant context](pages/repository-instructions.md)
- [Make checks available](pages/agent-tool-delegation.md)
- [Steer the work](pages/define-and-verify-tasks.md#steer-it)
- [Verify the intended behavior](concepts/tests-are-evidence.md)
- [Keep responsibilities clear](pages/alignment.md#core-advice)

Here, alignment means matching a specific task's intended outcome; see the broader [AI alignment definition](pages/glossary.md#alignment).

## [Economy](pages/economy.md)

Get useful results with less time and fewer tokens, without sacrificing quality.

- [Clarify the work early](pages/define-and-verify-tasks.md)
- [Reuse deterministic tools](pages/agent-tool-delegation.md)
- [Use focused feedback](pages/unit-tests-in-the-age-of-ai.md)
- [Keep context focused](concepts/progressive-disclosure.md)
- [Reuse skills selectively](pages/skills-as-capabilities.md)

## [Traceability](pages/traceability.md)

Understand what was requested, what changed, and the evidence behind it. **Status: developing.**

- [Record the request and decisions](pages/define-and-verify-tasks.md)
- [Connect related artifacts](pages/traceability.md#core-advice)
- [Preserve verification evidence](pages/define-and-verify-tasks.md)
- [Make responsibilities visible](pages/traceability.md#core-advice)
- [Keep records proportionate and safe](pages/sensitive-data-in-agent-workflows.md#choose-controls-for-the-execution-environment)

## [Security](pages/security.md)

Protect sensitive information and limit unsafe actions. **Status: developing.**

- [Secure a local coding agent](pages/local-agent-security.md)
- [Secure a cloud coding agent](pages/cloud-agent-security.md)
- [Sandbox local agent tools](pages/local-agent-sandboxing.md)
- [Understand prompt injection](pages/prompt-injection-coding-agents.md)
- [Trace data and actions](pages/agent-data-flow-checklist.md)

## Explore further

- [Sitemap](pages/sitemap.md) — goal paths and a generated inventory of the wiki
- [Short slides](slides/README.md) — concise, standalone ideas
- [Reusable concepts](concepts/README.md) — explanations to follow when relevant, including RAG, vector stores, evals, and hill climbing
- [Authored pages](pages/README.md) — all articles, patterns, and checklists
- [AI glossary](pages/glossary.md) — shared vocabulary for AI and agents
- [Source index and records](sources/README.md) — provenance and research notes
