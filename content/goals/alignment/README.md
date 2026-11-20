---
type: overview
summary: Start with a grilling, not a prompt; answer or rule out each point the agent raises, let the answers become the specification, then steer and verify against it.
status: established
lane: goals
goal: alignment
order: 1
---

# Alignment

Start with a grilling, not a prompt. A short request leaves the agent guessing, and it can build a convincing solution to the wrong problem. Have it question you first, answer or rule out each point, then turn those decisions into a specification to steer and verify the work against. Here, alignment means agreeing what the work should achieve; the [glossary](../../reference/glossary.md#alignment) covers the broader AI meaning.

## Core advice

- **[Requirements discovery with coding agents](agent-led-requirements-discovery.md)** — Give it a brief description of what you want, then ask it to question you before proposing a solution.
- **[Explicit decisions and scope boundaries](explicit-decisions-and-scope-boundaries.md)** — Challenge unnecessary scope suggested by the agent, agree what to exclude, and focus effort on what matters.
- **[Detailed specification from agreed decisions](define-and-verify-tasks.md#turn-the-specification-into-issues)** — Have the agent turn the answers into intended behavior, acceptance criteria you can observe, and open questions, and review it before any issues are created.
- **[Steering and verification against the specification](define-and-verify-tasks.md#steer-it)** — A wrong turn costs more the longer it runs, so correct it in the session or on the pull request.

## Explore further

Who approves the result is covered under [Traceability & Trust](../traceability/README.md). For more depth, see [from agile roles to agent-assisted workflows](../../articles/agent-role-boundaries.md) for one way to split work between roles, the [lo-fi software factory case study](../../articles/lo-fi-software-factory-case-study.md) for specifications and handoffs in practice, and [evaluation (eval)](../../reference/glossary.md#evaluation-eval) for comparing agent behavior across tasks.
