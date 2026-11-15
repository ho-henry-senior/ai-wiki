---
type: overview
summary: Core advice for helping an agent's work match a task's intended outcome.
status: established
---

# Alignment

Alignment here means helping an agent's work match the intended outcome of a specific task. This practical use complements the broader [AI alignment definition](glossary.md#alignment).

## Try this first

Choose one task. Write its desired outcome and one observable acceptance criterion, then identify a check that would reveal if that criterion were missed. Give the agent the relevant project context and review its result against the request.

## Core advice

- **Define the work.** State the outcome, constraints, and out-of-scope work. Agree on observable acceptance criteria and resolve material ambiguities before implementation. [Define and verify a task](define-and-verify-tasks.md).
- **Provide relevant context.** Give the agent a discoverable starting point for the domain, decisions, interfaces, and constraints it needs. Keep inferred behavior distinct from confirmed rationale. [Focused entrypoints](../concepts/progressive-disclosure.md) explain the principle; [Give Copilot repository instructions](copilot-repository-instructions.md) shows which file to use.
- **Make checks available.** Expose existing tests and verification commands so the agent can run suitable checks rather than reconstruct them. Make their [scope and side effects explicit](../concepts/task-interface-contracts.md); [delegate repository tasks to tools](agent-tool-delegation.md) describes the practice.
- **Verify the intended behavior.** Review the result against the acceptance criteria and choose checks appropriate to the risks. [Passing tests are evidence, not proof](../concepts/tests-are-evidence.md); tests and implementation can share a mistaken assumption.
- **Keep responsibilities clear.** Identify who decides, reviews, and approves consequential work.

Scale the process to the work: a small change may need only a short issue and focused check; larger or ambiguous work can justify an agreed specification. Recording the request and results also supports [traceability](traceability.md).

## Explore further

- [Unit tests in the age of AI](unit-tests-in-the-age-of-ai.md) — focused feedback and its limits.
- [Evals](../concepts/evals.md) — compare agent behavior on representative tasks when repeatable assessment is useful.
- [Repository context for agents](repository-context-for-agents.md) — developing notes on broader questions about documentation and discoverability.
- [From agile roles to agent-assisted workflows](agent-role-boundaries.md) — a perspective on adapting familiar responsibilities and handoffs.
- [Lo-fi software factory case study](lo-fi-software-factory-case-study.md) — an example of specifications, role handoffs, and human review.
