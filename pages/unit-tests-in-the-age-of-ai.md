---
type: explanation
summary: Explore unit tests as fast, deterministic feedback for agents, and the risks of treating test volume or a green suite as proof of correctness.
status: established
---

# Unit tests in the age of AI

Unit tests can help agents produce changes that match intended behavior. They provide fast, repeatable feedback and preserve examples of how a component is expected to behave. This makes them useful both as regression protection and as a tool an agent can run while iterating.

## Try this first

Choose one important behavior from the request and identify an existing focused test or add a test that would fail if that behavior broke. Run the focused check, then the broader verification appropriate to the change. Review the result against the acceptance criteria, not just the test output. This provides inexpensive feedback without assuming a green suite covers every requirement.

When comparing successive changes against a test-based objective, the iteration can resemble [hill climbing](../concepts/hill-climbing.md). Its usefulness depends on whether the objective captures the behavior that matters.

## What AI changes

Agents can produce code and tests quickly, which makes a useful test suite more valuable as an automated feedback loop. But generating tests is not the same as generating confidence. An agent can write many tests that add little coverage, mirror the implementation, or encode the same mistaken assumption as the code.

[Passing tests are evidence, not proof](../concepts/tests-are-evidence.md). Derive expectations from the request or an established contract so the tests provide an independent check rather than confirming the implementation's assumptions.

## Prefer meaningful tests over more tests

Choose tests for distinct behaviors and meaningful risks, not volume or an arbitrary coverage target. The [test-evidence concept](../concepts/tests-are-evidence.md#example) explains observable assertions, plausible regressions, and why checking mock configuration adds little confidence.

## Handle unclear expectations honestly

When expected behavior is materially ambiguous, an agent should ask for clarification rather than invent behavior and write a test that confirms its own choice. For a minor assumption, state it so a reviewer can see what the test treats as expected.

Keep those assumptions visible during review; a green suite cannot resolve a requirement the tests guessed incorrectly.

## Treat unit tests as one signal

Unit tests are best suited to focused, local behavior. Passing unit tests do not establish that components work together, that a complete workflow is correct, or that the change meets every product expectation. Use them as one fast and valuable layer of feedback, alongside other validation appropriate to the change.

For making test commands discoverable and inexpensive to run, see [Get more from agents by delegating repo tasks to tools](agent-tool-delegation.md).

## Related agent skills

These are examples of agent-facing guidance related to test quality, not universal standards or endorsements:

- Matt Pocock's [TDD skill](https://github.com/mattpocock/skills/tree/main/skills/engineering/tdd) includes [guidance on good and bad tests](https://github.com/mattpocock/skills/blob/main/skills/engineering/tdd/tests.md), including avoiding implementation-detail and tautological assertions.
- Lauren Tan's pstack includes a [TDD skill](https://github.com/backnotprop/pstack/blob/main/skills/tdd/SKILL.md) and [Test Behavior, Not Implementation](https://github.com/backnotprop/pstack/blob/main/skills/principle-test-behavior-not-implementation/SKILL.md), which asks whether a test would catch broken behavior and survive an internal refactor.
