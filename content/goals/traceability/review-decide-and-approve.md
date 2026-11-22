---
type: how-to
summary: Use an agent's review as evidence, decide what to do with its findings, approve, ask for changes or decline, and leave a record of the decision through the process your team already uses.
status: developing
lane: guides
goal: traceability
checked: 2026-11-22
recheck: every-run
check-against:
  - https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review
verification: Copilot code review behaviour is checked against GitHub Docs, which the daily review rechecks.
tags:
  - Copilot
  - Pull requests and review
---

# Review, decide and approve

The last step is yours. Agents can review a change well, but the decision to accept it, and the responsibility for it, stay with the person who approves.

## Use an agent's review as evidence

An agent's review often raises good points, including ones a person would miss, such as an unhandled error or a case the tests don't reach. People tend to notice different things: whether the change suits its users, fits the product, or does more than was asked. Use both.

Addressing an agent's findings doesn't mean the change can go ahead. Decide what to do with each one, and say so on the pull request:

- **fix it** in this change;
- **defer it,** opening an issue so it isn't lost;
- **reject it,** with a reason, such as being out of scope.

## Decide

You have three choices:

- **Approve** when you can stand behind the change: it does what was agreed, you have checked what matters for this change, and you accept what remains unchecked.
- **Request changes** when it isn't ready. Say what needs to change to make it complete, then review it again when it comes back. That round trip is normal review, not a failure.
- **Decline** when it shouldn't go in, for example because the approach is wrong or the work is no longer needed.

If the evidence is incomplete, ask for what's missing before you decide: a test, a check you can run, a smaller change, or a narrower scope. Don't approve on the agent's assurance that it works.

## What doesn't count as approval

- **The agent's own review or summary.** By default, Copilot's code review leaves a comment review, which doesn't count toward a repository's required approvals. Every Copilot review also includes an assessment of whether it thinks the pull request is ready; that doesn't count either.
- **A risk score or a passing check.** Both are evidence for your decision, not the decision.
- **An agent's approval.** Copilot can be configured to submit approvals that count toward required approvals. This is in public preview and off by default. An agent's approval can't carry responsibility for the change, so this guide doesn't recommend turning it on.

## Record the decision

Use the process your team already follows: the ticket, small commits with clear messages, a documented pull request, and an approving review from a named person. GitHub records who approved and when. Add a short comment with what a later reader couldn't otherwise tell: anything you knowingly left unchecked, limitations you accepted, and why you approved despite them. For what the record should answer, see [Trust & Traceability](README.md#example).

Merging is a separate step, and it may happen later under the repository's rules, such as required reviews from code owners.

## Sources

- [GitHub Docs: Using GitHub Copilot code review](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review)
- [GitHub Docs: Approving a pull request with required reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/approving-a-pull-request-with-required-reviews)
