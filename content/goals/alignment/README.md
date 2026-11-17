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

- **Begin with the agent questioning you.** Instead of describing what you want and asking for it, ask the agent to grill you: "Before writing code, question me about this request. Ask about unclear behavior, edge cases, and constraints, and challenge vague answers." Its questions surface the aspects you had not considered. [Agree on the problem](define-and-verify-tasks.md#agree-on-the-problem).
- **Answer each point, or declare it out of scope.** Either way, it becomes a decision rather than something the agent guesses later. Write the out-of-scope points down too; they stop nearby work the agent might think helps. [Agree on the problem](define-and-verify-tasks.md#agree-on-the-problem).
- **Let the answers become a detailed specification, and build from it.** Have the agent turn the answers into intended behavior, "Done when" lines you can observe, and open questions, and review it before any issues are created. The detail is what brings the result close to what you wanted. [Turn the specification into issues](define-and-verify-tasks.md#turn-the-specification-into-issues).
- **Steer early, and verify against the agreement.** A wrong turn costs more the longer it runs, so correct it in the session or on the pull request. Then check each "Done when" line against the diff, not the agent's summary, and read the tests it wrote: they share its understanding of the task. [Steer it](define-and-verify-tasks.md#steer-it) and [passing tests are evidence, not proof](../../concepts/tests-are-evidence.md).

Scale the formality to the risk: a small change may need only a brief agreed description, while larger or ambiguous work needs a reviewed specification before issues are created. In either case, do not let unanswered product decisions silently become implementation choices.

## Try this first

Before your next non-trivial task, ask Copilot to grill you rather than implement it. Answer or rule out each point it raises, then have it draft acceptance criteria for you to review before coding.

## Explore further

Who approves the result is covered under [Traceability & Trust](../traceability/README.md). For more depth, see [from agile roles to agent-assisted workflows](../../articles/agent-role-boundaries.md) for one way to split work between roles, the [lo-fi software factory case study](../../articles/lo-fi-software-factory-case-study.md) for specifications and handoffs in practice, and [evals](../../concepts/evals.md) for comparing agent behavior across tasks.
