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

# Ask for work you can approve

Review starts before the agent writes anything. Your request decides how big the result will be, how focused it is, and how easy it is to check. Ask for work in the form you want to review, rather than reshaping it afterwards.

## Ask for the smallest coherent change

Ask for one change that does one thing, and keep to the pull request and commit sizes your team already uses for work written by people. A change you can hold in your head is one you can stand behind.

Smallest _coherent_ matters. Don't split a change whose parts only make sense together, such as renaming a function and updating every caller; each half is harder to judge alone. When one change has to be large, ask for small commits inside it, one step each with a clear message, so you can review it step by step.

## Keep it to the task

Agents tend to add more than you asked for: a refactor nearby, an extra option, handling for cases nobody raised. Each addition is more to review and more to own. Say what is out of scope before it starts, as in an issue's [out of scope](../alignment/turn-specification-into-issues.md) list, and ask it to suggest ideas rather than act on them:

> Make only the changes needed for the acceptance criteria. If you notice other improvements, list them at the end; don't make them.

The agent doesn't share your judgement about what is worth doing, so you may need to repeat this when you review the result.

## Ask for tests that matter

Ask for one test per acceptance criterion, checking a result someone could observe, and ask the agent to say which criterion each new test covers. Tell it not to add tests that only restate the code, such as checking that a function returns a string, or mocking everything the code calls. Fewer tests that each check something real are easier to judge than many that don't. For how to read the tests it writes, see [verify the result](../alignment/hand-off-and-steer.md#verify-the-result).

## Tell it when to stop and ask

Once a task is agreed, an agent carries on to a first draft unless something stops it. Tell it in advance which situations need you. Conditions that apply to every task belong in [`AGENTS.md`](../alignment/repository-instructions.md), so you don't have to repeat them; the [AGENTS.md example](../../reference/agents-md-example.md) has one. Conditions for one task go in its prompt:

> If the change needs a new dependency, a database schema change, or an edit to another service, stop and ask before going further.

Approval prompts also stop it, before the actions you haven't allowed it to take on its own; see [deny the commands you never want run](../security/local-sandbox-and-tool-restrictions.md#deny-the-commands-you-never-want-run). Anything else you catch by watching the diffs as it works, and you can interrupt it at any point; see [steer it](../alignment/hand-off-and-steer.md#steer-it).

## Ask for a handoff you can check

At the end, ask the agent to say:

- what it changed, and why;
- which commands it ran, and what they showed;
- what it didn't check, or couldn't;
- any decisions it made that you should know about.

This is the agent's account, not evidence in itself: check it against the diff and the checks. Next, [decide where to look](decide-where-to-look.md).
