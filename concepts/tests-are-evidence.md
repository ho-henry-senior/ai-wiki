---
type: reference
summary: A green test suite establishes that assertions passed, not that those assertions completely capture the intended behavior.
status: established
---

# Passing tests are evidence, not proof

A passing suite demonstrates that the implementation satisfies the assertions that ran. It does not by itself establish that those assertions match the request or cover every important behavior.

[View the short slide](../slides/tests-are-evidence.md).

Agents can generate code and tests from the same mistaken assumption. Derive expectations from the specification or an established behavioral contract, rather than treating the implementation as its own oracle.

## Example

If a request requires rejecting expired credentials, a test that merely confirms successful authentication leaves that requirement unchecked. Many more happy-path tests do not repair that gap.

Prefer the smallest set of tests covering distinct behaviors and meaningful risks. A useful test asserts an observable result, would fail for a plausible regression, and adds confidence beyond existing tests. Checking that a configured mock returns its configured value usually tests the setup rather than the system.

## Limits

When expected behavior is materially ambiguous, clarify it before encoding a guess as a test. Unit tests provide focused feedback; integration checks, workflow validation, and review against requirements may still be needed.

## Sources and applications

- [Matt Pocock: Good and Bad Tests](https://github.com/mattpocock/skills/blob/main/skills/engineering/tdd/tests.md) — behavior-focused assertions and weak test patterns.
- [pstack: Test Behavior, Not Implementation](https://github.com/backnotprop/pstack/blob/main/skills/principle-test-behavior-not-implementation/SKILL.md) — regression detection and refactor tolerance.
- Applied in [Unit tests in the age of AI](../pages/unit-tests-in-the-age-of-ai.md); illustrated in the [agent-workflow perspective](../pages/agent-role-boundaries.md).
