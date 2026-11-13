---
type: guide
summary: Explore unit tests as fast, deterministic feedback for agents, and the risks of treating test volume or a green suite as proof of correctness.
---

# Unit tests in the age of AI

Unit tests can help agents produce changes that match intended behavior. They provide fast, repeatable feedback and preserve examples of how a component is expected to behave. This makes them useful both as regression protection and as a tool an agent can run while iterating.

## What AI changes

Agents can produce code and tests quickly, which makes a useful test suite more valuable as an automated feedback loop. But generating tests is not the same as generating confidence. An agent can write many tests that add little coverage, mirror the implementation, or encode the same mistaken assumption as the code.

A passing suite demonstrates that the implementation satisfies the assertions that exist. It does not by itself prove those assertions match the request or the user's intent.

## Prefer meaningful tests over more tests

For a change, add the smallest set of tests that covers its distinct behaviors and meaningful risks. There is no fixed number or coverage target that makes a test suite good.

A useful test should:

- be grounded in the request, specification, or an existing behavioral contract;
- assert an externally observable result, not merely repeat private implementation steps;
- fail for a plausible regression in the behavior it is meant to protect; and
- add confidence beyond tests that already cover the same behavior.

For example, asserting that a configured mock returns the value it was given usually tests the mock setup rather than the system behavior. Prefer assertions about what the component under test returns, changes, or causes in response to a meaningful input.

## Handle unclear expectations honestly

When expected behavior is materially ambiguous, an agent should ask for clarification rather than invent behavior and write a test that confirms its own choice. For a minor assumption, state it so a reviewer can see what the test treats as expected.

Tests written alongside an implementation can share its blind spots. Deriving expectations from the request or an established contract helps make the test an independent check rather than a restatement of the code.

## Treat unit tests as one signal

Unit tests are best suited to focused, local behavior. Passing unit tests do not establish that components work together, that a complete workflow is correct, or that the change meets every product expectation. Use them as one fast and valuable layer of feedback, alongside other validation appropriate to the change.

For making test commands discoverable and inexpensive to run, see [Get more from agents by delegating repo tasks to tools](agent-tool-delegation.md).

## Related agent skills

These are examples of agent-facing guidance related to test quality, not universal standards or endorsements:

- Matt Pocock's [TDD skill](https://github.com/mattpocock/skills/tree/main/skills/engineering/tdd) includes [guidance on good and bad tests](https://github.com/mattpocock/skills/blob/main/skills/engineering/tdd/tests.md), including avoiding implementation-detail and tautological assertions.
- Lauren Tan's pstack includes a [TDD skill](https://github.com/backnotprop/pstack/blob/main/skills/tdd/SKILL.md) and [Test Behavior, Not Implementation](https://github.com/backnotprop/pstack/blob/main/skills/principle-test-behavior-not-implementation/SKILL.md), which asks whether a test would catch broken behavior and survive an internal refactor.
