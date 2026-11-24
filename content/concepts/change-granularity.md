---
type: explanation
summary: Choose a unit of change that a person can understand, verify and take responsibility for.
status: developing
lane: articles
goal: traceability
tags:
  - Pull requests and review
  - Specifications
---

# Change granularity

Change granularity is the size of the unit of work a person must understand, verify and approve. With coding agents, the rate at which code can be produced can exceed the rate at which people can make sense of it. The useful boundary is therefore not simply how much an agent can implement in one session.

## What makes a change coherent?

A change should have an identifiable purpose, a bounded impact and evidence that its intended outcome has been achieved. There is no universal line-count target. Renaming a function and updating its callers belong together; splitting them can leave an intermediate state that cannot be verified independently.

For example, adding CSV export to an existing report need not include reorganising the navigation or refactoring the reporting service. Those changes introduce separate decisions and risks. If the export genuinely depends on a refactor, agree that dependency and decide whether the refactor can be verified separately.

## Why granularity matters

- **Understanding:** a reviewer can relate the implementation to a specific requirement without reconstructing several unrelated decisions.
- **Verification:** checks can be tied to the intended behaviour, and omissions are easier to investigate.
- **Diagnosis and reversal:** a regression is easier to attribute and a coherent change may be easier to revert, subject to data and dependency constraints.
- **Accountability:** the person approving the change has a better chance of understanding what they are accepting; see [accountable approval](../goals/traceability/accountable-approval.md).

A small diff is not necessarily safe. A one-line permission change can have a wider impact than a large mechanical rename. Assess the behaviour and affected systems, not just the number of lines.

## Apply the boundary throughout the work

Granularity matters when splitting a specification into issues, defining the agent's task, deciding what belongs in a pull request and organising commits. These boundaries need not be identical. A larger coherent pull request may contain several individually understandable commits, but the reviewer must still assess the complete diff and how the parts interact.

Agree the boundary before implementation. If the agent discovers that the task requires an unrelated change or a new design decision, stop and renegotiate the scope rather than letting it expand silently.

Smaller, well-specified tasks can also reduce the amount of inference required from the model, making cheaper models viable for some implementation work. They do not remove the need for verification.

For practical instructions, see [ask for small, focused changes](../goals/traceability/ask-for-small-focused-changes.md) and [turn the specification into issues](../goals/alignment/turn-specification-into-issues.md).
