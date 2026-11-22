---
type: how-to
summary: Shape what the agent hands back before it starts, by asking for the smallest coherent change, nothing beyond the task, tests that matter, stop conditions, and a handoff you can check.
status: developing
lane: guides
goal: traceability
tags:
  - Pull requests and review
  - Testing
---

# Ask for small, focused changes

Ask for a small, focused change before the agent starts. A clear scope, meaningful tests and a checkable handoff make the result easier to review.

## Ask for the smallest coherent change

Ask for one change that does one thing, and keep to the pull request and commit sizes your team already uses for work written by people. Small changes are easier to understand and approve.

Keep the change coherent. Don't split a change whose parts only make sense together, such as renaming a function and updating every caller; each half is harder to judge alone. When one change has to be large, ask for small commits inside it, one step each with a clear message, so you can review it step by step. Commits help you follow a change, but review the complete diff as well: problems can sit in how the commits fit together.

## Keep it to the task

Agents tend to add more than you asked for: a refactor nearby, an extra option, handling for cases nobody raised. Each addition is more to review and more to own. Say what is out of scope before it starts, as in an issue's [out of scope](../alignment/turn-specification-into-issues.md) list, and ask it to suggest ideas rather than act on them:

> Make only the changes needed for the acceptance criteria. If you notice other improvements, list them at the end; don't make them.

## Ask for tests that matter

Ask for tests that show each acceptance criterion is met, by checking a result someone could observe, and have the agent say which criteria each test covers. Some criteria need several checks; one integration test may cover several criteria. Tell it not to add tests that only restate the code, such as checking that a function returns a string, or mocking everything the code calls. Fewer tests that each check something real are easier to judge than many that don't. For how to read the tests it writes, see [verify the result](../alignment/hand-off-and-steer.md#verify-the-result).

## Tell it when to stop and ask

Once a task is agreed, an agent carries on to a first draft unless something stops it. Tell it in advance which situations need you. Conditions that apply to every task belong in [`AGENTS.md`](../alignment/repository-instructions.md), so you don't have to repeat them; the [AGENTS.md example](../../reference/agents-md-example.md) has one. Conditions for one task go in its prompt:

> If the change needs a new dependency, a database schema change, or an edit to another service, stop and ask before going further.

A stop condition is an instruction, not an enforced control. Approval prompts and deny rules are enforced. They stop the agent before the actions you haven't allowed it to take on its own; see [deny the commands you never want run](../security/local-sandbox-and-tool-restrictions.md#deny-the-commands-you-never-want-run). Anything else you catch by watching the diffs as it works, and you can interrupt it at any point; see [steer it](../alignment/hand-off-and-steer.md#steer-it).

## Ask for a handoff you can check

At the end, ask the agent to say:

- what it changed, and why;
- which commands it ran, and what they showed;
- what it didn't check, or couldn't;
- any decisions it made that you should know about.

This is the agent's account, not evidence in itself: check it against the diff and the checks. Next, [identify the risks in the change](identify-risks-in-a-change.md).
