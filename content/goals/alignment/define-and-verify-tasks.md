---
type: how-to
summary: Agree what success means before an agent starts, turn the agreement into issues it can check its work against, then steer it and check the result against that agreement.
status: established
lane: guides
goal: alignment
checked: 2026-11-15
tags:
  - Copilot
  - Specifications
  - Pull requests and review
  - Testing
---

# Define, steer, and verify a task

An agent can complete the task you described and still solve the wrong problem. So agree what success means before it starts, give it work it can check itself against, and judge the result against that agreement rather than against the agent's summary of its own work.

## The cycle

- **[Agree on the problem](agree-on-the-problem.md).** Have the agent question your request, decide the scope together, and agree a specification before anything is built.
- **[Turn the specification into issues](turn-specification-into-issues.md).** Split the agreement into small issues, each with an outcome, acceptance criteria, checks and what is out of scope.
- **[Hand off an issue and steer the implementation](hand-off-and-steer.md).** Give an issue to the agent, correct it where the work is recorded, and check the result against the acceptance criteria before you accept it.

Corrections belong on the pull request, where the work is recorded, so reviewers can see why the result differs from the request. Who approves the result, and what evidence they need, is covered under [Trust & Traceability](../traceability/README.md).

## Scale it to the work

A small, clear change may need only a brief agreement and one issue. Larger or ambiguous work warrants a reviewed specification and linked issues. The principle stays the same: establish what success means before delegating implementation.

The examples use GitHub Copilot, but the cycle works with any coding agent that reads an issue or a prompt.
