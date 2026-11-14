---
type: guide
summary: Core advice for recording requests, decisions, changes, and evidence in agent-assisted work.
---

# Traceability

Traceability means being able to understand what was requested, what changed, and the evidence and decisions behind the result. It supports human review; an agent's explanation is not necessarily a complete account of its reasoning.

## Try this first

For one task, record the desired outcome and acceptance criteria in the issue or PR. When the work is ready for review, record what changed, the checks run and their results, and any important assumptions or unchecked risks.

## Core advice

- **Record the request and decisions.** Keep the outcome, acceptance criteria, constraints, and meaningful decisions where reviewers can find them. [Define and verify a task](define-and-verify-tasks.md).
- **Connect related artifacts.** Link specifications, tickets, changes, and reviews when they exist so a reader can follow the work from intent to result. A small task does not need every artifact.
- **Preserve verification evidence.** Record what was checked, the outcome, and relevant checks not run. Review the change against the request, rather than treating a passing suite as complete proof. [Passing tests are evidence, not proof](../concepts/tests-are-evidence.md).
- **Make responsibilities visible.** Clarify who performs the work, who reviews it, and who has approval authority. [Agent role responsibilities and boundaries](agent-role-boundaries.md) illustrates one possible workflow.
- **Keep records proportionate and safe.** Choose enough detail for the task's risk and review needs; avoid collecting secrets or sensitive data unnecessarily. Review artifacts before sharing them. [Sensitive data in agent workflows](sensitive-data-in-agent-workflows.md).

## Explore further

- [Repository context for agents](repository-context-for-agents.md) — preserving decisions and distinguishing confirmed rationale from inference.
- [Alignment](alignment.md) — defining and checking the intended outcome.
