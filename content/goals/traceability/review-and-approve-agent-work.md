---
type: explanation
summary: When you approve an agent's change, you take responsibility for it. How to get agent work into a form you can approve, decide where to look, assess it, and make the decision.
status: developing
lane: guides
goal: traceability
tags:
  - Pull requests and review
  - Testing
---

# Review and approve agent work

When you approve a change, you are saying you stand behind it. An agent can't take that responsibility, so it stays with the person who approves. Agents can produce more changes, and larger ones, than a team is used to reviewing. This guide is about keeping approval meaningful anyway: getting agent work into a form you can approve, and assessing it well. Working faster helps, but only in service of that.

## Verification, review and approval are different things

Take an agent's pull request that adds a CSV export:

- **Verification** is evidence from checks. The tests and linting pass in CI. That shows those checks passed; it says nothing about what they don't cover, such as whether a 10,000-row export finishes.
- **Review** is a person examining the change. Reading the diff commit by commit, you notice the agent also changed the date format in an unrelated report, and added fourteen tests, three of which only check that the function returns a string.
- **Approval** is the decision to accept responsibility. You ask for the unrelated change and the three tautological tests to be removed, and try a large export yourself. One successful run is more evidence, not proof, so you also weigh what is still unchecked before you approve. Your name is on it.

**Merging** is separate again, and may happen later under the repository's rules. An agent's own review, however good its points, is review, not approval.

## What changes when agents do the work

- **There's more to review,** and changes tend to grow. Agents tend to cover more angles than the task needs, and a large diff costs an agent little to read, so it doesn't see size as a problem the way a reviewer does.
- **Tests multiply.** Agents add many tests, and some test nothing that matters. More tests can mean more to check, not more confidence.
- **Scope needs defending.** The agent doesn't share your context or your judgement about what is worth doing, so you need informed views about scope and to insist they are kept.

The record of who approved what, and why, comes from the delivery process teams already use: tickets, small commits with clear messages, small documented pull requests and a named approver. See [Trust & Traceability](README.md).

## What this guide will cover

This guide is being written. Its chapters will cover:

- **Ask for work you can approve:** the smallest coherent change, firm scope, meaningful tests, and when the agent should stop and ask.
- **Decide where to look:** what makes a change easier or harder to approve, such as how far it reaches, how hard it is to undo, and how you would notice a problem.
- **Assess the change:** what a reviewer needs from their tools, and running checks locally before CI.
- **Review, decide and approve:** using an agent's review as evidence, asking for changes or more evidence, and making the decision.

For the checks to run when an agent hands back a single task, see [hand off an issue and steer the implementation](../alignment/hand-off-and-steer.md#verify-the-result).
