---
type: explanation
summary: When you approve an agent's change, you take responsibility for it. Ask for changes you can review, find the risks, then review and decide.
status: developing
lane: guides
goal: traceability
tags:
  - Pull requests and review
  - Testing
---

# Review and approve agent work

When you approve a change, you stand behind it. An agent can't take that responsibility, so it stays with you. Agents produce more changes, and larger ones, than teams are used to reviewing; this guide is about keeping approval meaningful anyway.

## The steps

**[Ask for work you can approve](ask-for-work-you-can-approve.md)**

- Ask for small changes; they're easier to review.
- Agents usually do more than asked. Set the scope, and hold to it.
- Ask for tests that show each requirement is met, and few enough that you can read them.
- Tell the agent when to stop and ask, and ask for a handoff you can check.

**[Decide where to look](decide-where-to-look.md)**

- Look first where agents go wrong: extra changes, altered tests, checks only the agent ran.
- Then weigh the impact: how far the change reaches, and how hard it is to undo.

**[Review, decide and approve](review-decide-and-approve.md)**

- Review the diff with a good tool; step through the commits when a change is large.
- Use an agent's review as evidence, not as the decision.
- Approve only what you can stand behind.

The record of what was asked, what changed and who approved it comes from your existing delivery process; see [a record through your delivery process](delivery-record.md).
