---
type: overview
summary: Core advice for recording requests, decisions, changes, and evidence in agent-assisted work.
status: developing
---

# Traceability

**Developing:** This overview gives a starting point; more examples of tracing intent across artifacts would help.

Traceability means being able to understand what was requested, what changed, and the evidence and decisions behind the result. It supports human review; an agent's explanation is not necessarily a complete account of its reasoning.

## Try this first

For a small change, one issue and its pull request may be enough: link the PR to the issue, summarize the change and check results, and record the reviewer’s decision there. A reader should be able to follow that link and compare the result with the original request.

| Artifact          | What a reviewer should be able to verify                                                                         |
| ----------------- | ---------------------------------------------------------------------------------------------------------------- |
| Issue or request  | The intended outcome and any acceptance criteria.                                                                |
| Pull request      | The change is linked to the request; the summary identifies what changed and any assumptions or unchecked risks. |
| Checks and review | Check results are recorded, and a named human reviewer records approval or requested changes.                    |

**Example (fictional):** Issue #12 asks to reject expired credentials. PR #15 links to #12, describes the change, and records that focused tests passed but an integration check was not run. A named human reviewer requests that missing check, then records approval after reviewing its result. The links and review history show how the request, evidence, and decision connect; the individual artifacts carry the details.

For larger work, add artifacts only when they help explain a decision or connect work that cannot be followed from the issue and PR alone. [Define and verify a task](define-and-verify-tasks.md) covers the shared outcome, criteria, and verification workflow.

## Core advice

- **Record the request and decisions.** Keep the outcome, acceptance criteria, constraints, and meaningful decisions where reviewers can find them. [Define and verify a task](define-and-verify-tasks.md) covers the task workflow.
- **Connect related artifacts.** Link the request to its change and review when those live separately; add more records only when they clarify intent or decisions.
- **Preserve verification evidence.** Record check results and relevant checks not run. Review the change against the request, rather than treating a passing suite as complete proof: [passing tests are evidence, not proof](../concepts/tests-are-evidence.md).
- **Make responsibilities visible.** For a small PR, name the human reviewer and record whether they approved it or requested changes; separate approval authority from implementation when the repository requires it.
- **Keep records proportionate and safe.** Choose enough detail for the task's risk and review needs; avoid collecting secrets or sensitive data unnecessarily. Review artifacts before sharing them. [Sensitive data in agent workflows](sensitive-data-in-agent-workflows.md).

## Explore further

- [Repository context for agents](repository-context-for-agents.md) — developing notes on preserving decisions and distinguishing confirmed rationale from inference.
- [Alignment](alignment.md) — defining and checking the intended outcome.
- [From agile roles to agent-assisted workflows](agent-role-boundaries.md) — a perspective on familiar roles, outputs, and human handoffs.
- [Lo-fi software factory case study](lo-fi-software-factory-case-study.md) — artifacts and review evidence in a real workflow.
