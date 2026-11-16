---
type: overview
summary: Agree on the problem before delegating the solution; use an agent to challenge requirements, review a specification, then verify implementation against it.
status: established
lane: guidance
goal: alignment
order: 1
---

# Alignment

An agent can produce a convincing solution to the wrong problem. It may fill missing requirements with plausible assumptions and then judge success by its own interpretation. **Agree on the problem before delegating the solution.** Use the agent to question what you want, expose decisions and draft a specification; review that specification before implementation. Here, alignment means agreeing what this work should achieve; the [glossary](glossary.md#alignment) has the broader AI meaning.

## Core advice

- **Question the request before coding.** Ask the agent to grill you about unclear requirements, challenge assumptions and identify decisions that have not been made. A precise implementation of a misunderstood request is still the wrong result. [Define, steer, and verify a task](define-and-verify-tasks.md#agree-on-the-problem).\n- **Approve the specification before delegating.** Have the agent draft the intended behavior, observable acceptance criteria, constraints and open questions. Review and agree it yourself; only then ask the agent to turn it into issues and implement them. [Define, steer, and verify a task](define-and-verify-tasks.md#turn-the-specification-into-issues).
- **Give it context.** Some rules cannot be read from the code, such as why a column order matters to another team. Put the ones every task needs in `AGENTS.md`, which Copilot's agents load for every task. [Write repository instructions in AGENTS.md](repository-instructions.md).
- **Give it checks.** An agent that can run your tests checks its work against them; one that cannot will judge it by reading the code. List the commands and what each does. [Let the agent run your repository's commands](agent-tool-delegation.md).
- **Steer the work.** A wrong turn costs more the longer it runs, so correct it early, in the session or on the pull request. The cloud agent does not see issue comments made after it starts. [Steer it](define-and-verify-tasks.md#steer-it).
- **Verify the result.** Tests the agent wrote share its understanding of the task, so they can pass while missing what you meant. Check each "Done when" line against the diff, and read the tests. [Passing tests are evidence, not proof](../concepts/tests-are-evidence.md).
- **Keep someone else as approver.** The person who asked may share the agent's assumptions; an independent reviewer brings another view and may catch what both missed. [Verify the result](define-and-verify-tasks.md#verify-the-result).

Scale the formality to the risk: a small change may need only a brief agreed description, while larger or ambiguous work needs a reviewed specification before issues are created. In either case, do not let unanswered product decisions silently become implementation choices.

## Try this first

Before your next non-trivial task, ask Copilot to question your request rather than implement it. Have it identify one assumption you had not stated, then draft acceptance criteria for you to review before coding.

## Explore further

- [Furnish repositories with context for agents](repository-context-for-agents.md) — domain, decisions, and ADRs.
- [From agile roles to agent-assisted workflows](agent-role-boundaries.md) — one way to split work between roles.
- [Case study: a lo-fi software factory](lo-fi-software-factory-case-study.md) — specifications, role handoffs, and human review in practice.
- [Evals](../concepts/evals.md) — background on comparing agent behavior across tasks.
