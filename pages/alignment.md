---
type: overview
summary: Why an agent's result can differ from what you meant, and how to close the gap; define the work, give the agent context and checks, steer it, and verify the result.
status: established
---

# Alignment

An agent does what it can work out from what it was given. Wherever you leave a gap, it fills it with a plausible guess, and it judges "done" by what it can check, such as tests passing, not by what you meant. Its summary then describes what it set out to do, which may not be what it did. So the result can be confident, tidy, and wrong in a way only you would notice. Each piece of advice below closes one of those gaps. Here, alignment means one task's outcome; the [glossary](glossary.md#alignment) has the broader AI meaning.

## Core advice

- **Define the work.** The agent guesses at whatever you leave out, so write the outcome, "Done when" lines you can observe, and what is out of scope. That gives you and the agent the same target. [Define, steer, and verify a task](define-and-verify-tasks.md#write-the-task).
- **Give it context.** Some rules cannot be read from the code, such as why a column order matters to another team. Put the ones every task needs in `AGENTS.md`, which Copilot's agents load for every task. [Write repository instructions in AGENTS.md](repository-instructions.md).
- **Give it checks.** An agent that can run your tests checks its work against them; one that cannot will judge it by reading the code. List the commands and what each does. [Let the agent run your repository's commands](agent-tool-delegation.md).
- **Steer the work.** A wrong turn costs more the longer it runs, so correct it early, in the session or on the pull request. The cloud agent does not see issue comments made after it starts. [Steer it](define-and-verify-tasks.md#steer-it).
- **Verify the result.** Tests the agent wrote share its understanding of the task, so they can pass while missing what you meant. Check each "Done when" line against the diff, and read the tests. [Passing tests are evidence, not proof](../concepts/tests-are-evidence.md).
- **Keep someone else as approver.** The person who asked shares the agent's picture of the task, so a second reader catches what both missed. [Verify the result](define-and-verify-tasks.md#verify-the-result).

The cost of a wrong guess grows with the size of the work. A small change needs only a short issue; larger or ambiguous work needs an agreed specification first.

## Try this first

For your next task, write one "Done when" line you can observe and the check that would show it was missed. Hand the task to Copilot, then check the result against that line, not against Copilot's summary.

## Explore further

- [Furnish repositories with context for agents](repository-context-for-agents.md) — domain, decisions, and ADRs.
- [From agile roles to agent-assisted workflows](agent-role-boundaries.md) — one way to split work between roles.
- [Case study: a lo-fi software factory](lo-fi-software-factory-case-study.md) — specifications, role handoffs, and human review in practice.
- [Evals](../concepts/evals.md) — background on comparing agent behavior across tasks.
