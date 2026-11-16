---
type: reference
summary: Write the expected behavior down before the agent writes tests, ask for tests that can fail, and read them; a green suite shows only that the assertions that ran passed.
status: established
lane: goals
goal: alignment
order: 20
---

# Passing tests are evidence, not proof

Write the expected behavior down before the agent writes tests, then check each test against it. A green suite shows only that the assertions that ran passed, not that they cover what you asked for.

[View the short slide](../slides/tests-are-evidence.md).

Agents write code and tests together, often from the same assumption, so many tests can pass while the requirement that matters goes unchecked.

## Example

A request says expired credentials must be rejected. A test that confirms a valid login succeeds leaves that requirement unchecked, and more happy-path tests do not close the gap.

## Ask for tests that can fail

- **One test per requirement.** List the expected behaviors under "Done when" in the task, and ask for a test for each line. See [define, steer, and verify a task](../pages/define-and-verify-tasks.md#write-the-task).
- **See it fail first.** Add to the task's checks: "Write each test first and run it to show it fails, then make it pass." A test that never failed may not test anything.
- **Read the tests.** A good test checks an observable result and would fail for a plausible bug. A test that a mock returns its configured value tests the setup, not the code.
- **Make the agent ask, not guess.** If the expected behavior is unclear, the agent should ask, and state any small assumption in the pull request.

## Limits

Unit tests check local behavior, not whether components work together, so keep integration checks and review against the request. Iterating until tests pass is only as good as the tests.

## Sources and related skills

These skills are examples of agent-facing guidance on test quality, not endorsements:

- [Matt Pocock: TDD skill](https://github.com/mattpocock/skills/tree/main/skills/engineering/tdd), including [good and bad tests](https://github.com/mattpocock/skills/blob/main/skills/engineering/tdd/tests.md).
- [pstack: TDD skill](https://github.com/backnotprop/pstack/blob/main/skills/tdd/SKILL.md) and [Test Behavior, Not Implementation](https://github.com/backnotprop/pstack/blob/main/skills/principle-test-behavior-not-implementation/SKILL.md).

Applied in [define, steer, and verify a task](../pages/define-and-verify-tasks.md); illustrated in the [agent-workflow perspective](../pages/agent-role-boundaries.md).
