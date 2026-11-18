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

- **[Agent-led requirements discovery](agent-led-requirements-discovery.md)** — Give it a brief description of what you want, then ask it to question you before proposing a solution.
- **[Explicit decisions and scope boundaries](explicit-decisions-and-scope-boundaries.md)** — Either way, it becomes a decision rather than something the agent guesses later.
- **[Detailed specification from agreed decisions](detailed-specification-from-agreed-decisions.md)** — Have the agent turn the answers into intended behavior, "Done when" lines you can observe, and open questions, and review it before any issues are created.
- **[Steering and verification against the specification](steering-and-verification-against-the-specification.md)** — A wrong turn costs more the longer it runs, so correct it in the session or on the pull request.

Scale the formality to the risk: a small change may need only a brief agreed description, while larger or ambiguous work needs a reviewed specification before issues are created. In either case, do not let unanswered product decisions silently become implementation choices.

## Explore further

Who approves the result is covered under [Traceability & Trust](../traceability/README.md). For more depth, see [from agile roles to agent-assisted workflows](../../articles/agent-role-boundaries.md) for one way to split work between roles, the [lo-fi software factory case study](../../articles/lo-fi-software-factory-case-study.md) for specifications and handoffs in practice, and [evals](../../concepts/evals.md) for comparing agent behavior across tasks.
