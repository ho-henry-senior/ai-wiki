---
type: overview
summary: Start with a grilling, not a prompt; answer or rule out each point the agent raises, let the answers become the specification, then steer and verify against it.
status: established
lane: goals
goal: alignment
order: 1
---

# Alignment

Start with a grilling, not a prompt. A short prompt leaves the agent to guess at everything it does not say, and an agent can then build a convincing solution to the wrong problem. Being questioned first makes you face those gaps before any code exists, and the answers become the specification the work is built and checked against. Here, alignment means agreeing what this work should achieve; the [glossary](../../reference/glossary.md#alignment) has the broader AI meaning.

## Core advice

- **[Agent-led requirements discovery](begin-with-the-agent-questioning-you.md)** — Give it a brief description of what you want, then ask it to question you before proposing a solution.
- **[Explicit decisions and scope boundaries](answer-or-declare-out-of-scope.md)** — Either way, it becomes a decision rather than something the agent guesses later.
- **[Specification from agreed requirements](build-from-a-detailed-specification.md)** — Have the agent turn the answers into intended behavior, "Done when" lines you can observe, and open questions, and review it before any issues are created.
- **[Early steering and outcome verification](steer-and-verify-against-the-agreement.md)** — A wrong turn costs more the longer it runs, so correct it in the session or on the pull request.

Scale the formality to the risk: a small change may need only a brief agreed description, while larger or ambiguous work needs a reviewed specification before issues are created. In either case, do not let unanswered product decisions silently become implementation choices.

## Explore further

Who approves the result is covered under [Traceability & Trust](../traceability/README.md). For more depth, see [from agile roles to agent-assisted workflows](../../articles/agent-role-boundaries.md) for one way to split work between roles, the [lo-fi software factory case study](../../articles/lo-fi-software-factory-case-study.md) for specifications and handoffs in practice, and [evals](../../concepts/evals.md) for comparing agent behavior across tasks.
