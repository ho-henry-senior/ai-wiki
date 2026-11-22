---
type: how-to
summary: Identify the risks in an agent's change by checking for agent-specific mistakes, the impact of failure, and the evidence available.
status: developing
lane: guides
goal: traceability
checked: 2026-11-22
tags:
  - Pull requests and review
  - Testing
---

# Identify the risks in a change

Not every change needs the same depth of review. Look at what agents tend to get wrong, then consider the impact of a failure and the evidence available.

## Start with what agents tend to get wrong

| Question                                  | Look harder when                                                                                                |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Does it do what was asked, and only that? | The diff has changes nobody asked for, or doesn't match the agent's description of it                           |
| Did it change tests?                      | Assertions were removed or loosened, tests were skipped, snapshots were regenerated, or many new tests appeared |
| Who ran the checks?                       | Only the agent ran them, or nothing exercised the behaviour people will use                                     |
| Is it bigger than it needs to be?         | It's too big to hold in your head; ask for it to be [split](ask-for-small-focused-changes.md)                   |

## Weigh the risk of the change

The code-review bottleneck talk from Warp suggests five questions for deciding where to focus attention:

- **Alignment:** Does the change match the request, with unrelated work identified?
- **Impact:** How far could a failure reach, including shared code, sensitive paths and downstream users?
- **Verification:** What was checked, by whom, and what remains untested?
- **Rollback cost:** How difficult would it be to reverse the change?
- **Error detection:** How would a failure become visible after deployment?

These questions complement the agent-specific checks above. Pay particular attention to authentication, access rules, dependencies, data migrations and changes to other systems. A documentation fix may need a careful read; an authentication change may need line-by-line review and an owner's approval, which a [`CODEOWNERS` file](accountable-approval.md) can request.

Next, [review the change and decide](review-decide-and-approve.md).

## Sources

- [Warp: Code Review Bottleneck (talk)](https://www.youtube.com/watch?v=uPCH2axUpbc)
