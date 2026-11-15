---
type: overview
summary: Get results that match what you intended; define the work, give the agent context and checks, steer it, and verify the result.
status: established
---

# Alignment

Get results that match what you intended. Write the task down, give the agent the context and checks it needs, correct it while it works, and check the result against what you wrote. Here, alignment means one task's outcome; the [glossary](glossary.md#alignment) has the broader AI meaning.

## Try this first

For your next task, write one "Done when" line you can observe and the check that would show it was missed. Hand the task to Copilot, then check the result against that line, not against Copilot's summary.

## Core advice

- **Define the work.** Write the outcome, "Done when" lines, checks, and what is out of scope. [Define, steer, and verify a task](define-and-verify-tasks.md#write-the-task).
- **Give it context.** Put the rules every task needs in `AGENTS.md`. [Write repository instructions in AGENTS.md](repository-instructions.md).
- **Give it checks.** List the commands it should run and what each does. [Let the agent run your repository's commands](agent-tool-delegation.md).
- **Steer the work.** Correct the agent in its session or on its pull request, not on the issue. [Steer it](define-and-verify-tasks.md#steer-it).
- **Verify the result.** Check each "Done when" line against the diff, and read the tests. [Passing tests are evidence, not proof](../concepts/tests-are-evidence.md).
- **Keep someone else as approver.** The person who asked should not be the only reviewer. [Verify the result](define-and-verify-tasks.md#verify-the-result).

A small change needs only a short issue. Larger or ambiguous work needs an agreed specification first.

## Explore further

- [Furnish repositories with context for agents](repository-context-for-agents.md) — domain, decisions, and ADRs.
- [From agile roles to agent-assisted workflows](agent-role-boundaries.md) — one way to split work between roles.
- [Case study: a lo-fi software factory](lo-fi-software-factory-case-study.md) — specifications, role handoffs, and human review in practice.
- [Evals](../concepts/evals.md) — background on comparing agent behavior across tasks.
