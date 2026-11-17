---
type: overview
summary: Agree on the problem before delegating the solution; use an agent to challenge requirements, review a specification, then verify implementation against it.
status: established
lane: goals
goal: alignment
order: 1
---

# Alignment

An agent can produce a convincing solution to the wrong problem. It may fill missing requirements with plausible assumptions and then judge success by its own interpretation. **Agree on the problem before delegating the solution.** Here, alignment means agreeing what this work should achieve; the [glossary](../../reference/glossary.md#alignment) has the broader AI meaning.

## Core advice

- **Agree on the problem before delegating.** A precise implementation of a misunderstood request is still the wrong result. Ask the agent to question you about unclear requirements and challenge your assumptions, then review the specification it drafts before any code is written: "Before writing code, question me about this request, then draft acceptance criteria for me to review." [Agree on the problem](define-and-verify-tasks.md#agree-on-the-problem).
- **Give it the context the code can't tell it.** Some rules cannot be read from the code, such as why a column order matters to another team. Add them to `AGENTS.md`, which Copilot's agents load for every task. [Write repository instructions in AGENTS.md](repository-instructions.md).
- **Give it checks it can run.** An agent that can run your tests checks its work against them; one that cannot will judge it by reading the code. List the test commands in `AGENTS.md`, with what each one checks. [Let the agent run your repository's commands](agent-tool-delegation.md).
- **Steer early, and verify against the agreement.** A wrong turn costs more the longer it runs, so correct it in the session or on the pull request. Then check each "Done when" line against the diff, not against the agent's summary, and read the tests it wrote: they share its understanding of the task. [Steer it](define-and-verify-tasks.md#steer-it) and [passing tests are evidence, not proof](../../concepts/tests-are-evidence.md).

Scale the formality to the risk: a small change may need only a brief agreed description, while larger or ambiguous work needs a reviewed specification before issues are created. In either case, do not let unanswered product decisions silently become implementation choices.

## Try this first

Before your next non-trivial task, ask Copilot to question your request rather than implement it. Have it identify one assumption you had not stated, then draft acceptance criteria for you to review before coding.

## Explore further

Who approves the result is covered under [Traceability & Trust](../traceability/README.md). For more depth, see [furnish repositories with context for agents](repository-context-for-agents.md) for domain facts and decision records, [from agile roles to agent-assisted workflows](../../articles/agent-role-boundaries.md) for one way to split work between roles, the [lo-fi software factory case study](../../articles/lo-fi-software-factory-case-study.md) for specifications and handoffs in practice, and [evals](../../concepts/evals.md) for comparing agent behavior across tasks.
