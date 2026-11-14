---
type: reference
summary: A living, problem-oriented shortlist of skills with practical value, including harness compatibility and built-in equivalents.
---

# Useful skills right now

This is intended to be a curated, changing list—not an exhaustive directory or a permanent ranking. A skill belongs here when it addresses a recurring need, adds value beyond current built-in harness capabilities, and has practical evidence behind it.

The entries below are researched candidates, not skills we have tried or endorsed. Keep that distinction visible as the list develops.

## Specifications and task breakdown

### Matt Pocock — to-spec

- **Problem addressed:** turning an existing discussion and codebase context into a structured specification.
- **Why it may be useful:** it captures the problem, decisions, testing, and scope without repeating the interview. It asks for agreement on testing seams, then publishes the spec to the configured issue tracker with a `ready-for-agent` label; it does not explicitly require approval of the finished spec before publishing. A local draft or approval-first workflow requires adaptation.
- **Harness support:** published in an agent-skills repository; check its current installation and compatibility instructions for the target harness. It requires issue-tracker and triage-label configuration.
- **Built-in equivalent:** not assessed.
- **Status and review date:** researched candidate; not tried; reviewed 2026-11-14.
- **Source:** [to-spec skill](https://github.com/mattpocock/skills/tree/main/skills/engineering/to-spec)

### Matt Pocock — to-tickets

- **Problem addressed:** breaking a plan or specification into independently verifiable work with explicit dependencies.
- **Why it may be useful:** it proposes vertical slices and blocking relationships, then asks the user to approve the breakdown before publishing. It also describes an expand–contract approach for wide refactors that cannot be sliced safely.
- **Harness support:** published in an agent-skills repository; check its current installation and compatibility instructions for the target harness. It requires tracker and triage-label configuration and supports local ticket files or a real issue tracker.
- **Built-in equivalent:** not assessed.
- **Status and review date:** researched candidate; not tried; reviewed 2026-11-14.
- **Source:** [to-tickets skill](https://github.com/mattpocock/skills/tree/main/skills/engineering/to-tickets)

## Testing and test quality

### Matt Pocock — TDD and good/bad tests

- **Problem addressed:** writing focused tests that check behavior without coupling to implementation details.
- **Why it may be useful:** the supporting notes contrast observable behavior with implementation-detail and tautological tests.
- **Harness support:** published in an agent-skills repository; check its current installation and compatibility instructions for the target harness.
- **Built-in equivalent:** not assessed.
- **Status and review date:** researched candidate; not tried; reviewed 2026-11-13.
- **Sources:** [TDD skill](https://github.com/mattpocock/skills/tree/main/skills/engineering/tdd) · [Good and Bad Tests](https://github.com/mattpocock/skills/blob/main/skills/engineering/tdd/tests.md)

### Lauren Tan — pstack TDD and behavior-focused testing

- **Problem addressed:** choosing when to add a regression test and keeping tests focused on behavior rather than implementation.
- **Why it may be useful:** the TDD skill recommends a focused failing-before/passing-after test when the path is clear and cheap, and explicitly says to prefer no test over a bad one. A companion principle gives a behavior-versus-refactor check for test quality.
- **Harness support:** the pstack repository describes installation across several coding-agent harnesses; compatibility has not been independently tested here.
- **Built-in equivalent:** not assessed.
- **Status and review date:** researched candidate; not tried; reviewed 2026-11-13.
- **Sources:** [pstack TDD skill](https://github.com/backnotprop/pstack/blob/main/skills/tdd/SKILL.md) · [Test Behavior, Not Implementation](https://github.com/backnotprop/pstack/blob/main/skills/principle-test-behavior-not-implementation/SKILL.md)

## Suggested entry format

For each candidate, record:

- **Skill and source:** name and a link to its canonical location.
- **Problem addressed:** the recurring task or pain point it helps with.
- **Why it is useful:** practical evidence or experience, including limitations.
- **Harness support:** where it works and any harness-specific setup.
- **Built-in equivalent:** whether a harness now provides similar support.
- **Status and review date:** current recommendation state and when it was last checked.

Organize entries by the problem or capability they address, not by harness. Keep implementation details and compatibility notes with each entry so readers can judge whether it applies to their setup.
