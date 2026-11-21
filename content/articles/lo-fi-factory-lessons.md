---
type: case-study
lane: case-studies
summary: Observed outcomes, operational limits and transferable lessons from the lo-fi software factory.
tags:
  - Permissions and sandboxing
---

# What worked, what failed, and what remains

The exercise demonstrated that local scripts could coordinate specialist coding agents through GitHub issues, PRs and review comments while people retained approval points. It did not establish that the process was autonomous, cheaper or ready for production.

## What was observed

The ticketed refactor was implemented and merged into a fork. A participant estimated roughly one to two days for ticket creation, review and implementation, including a team workshop and individual follow-up. That is a retrospective estimate, not measured total person-time.

Agents and people ran unit tests and static checks; a participant also exercised representative application interactions manually. At the time of the original account, the final integration PR awaited another person's sign-off, with broader QA and regression testing planned. Some scenarios could not be tested locally, and one integration error had an uncertain cause.

The participant judged the structured process quicker than a human-led approach or giving the whole task to a single Developer agent. Without a measured comparison or complete cost record, this remains an assessment rather than demonstrated savings.

## What required human intervention

The workflow had explicit approval points for specification, tickets, issue readiness and merge decisions. Occasional agent failures required an operator to inspect work, reset workflow labels and restart the process. Review findings could also prompt human-directed changes.

The preserved dispatcher verifies expected PRs and review comments, and retains failed worktrees for inspection. These are valuable design choices, but the current demo includes later operational refinements. They should not all be counted as observed features of the original trial.

## Limits of the architecture

Only one local Developer and one local Reviewer ran at a time, with separate worktrees. This reduced concurrent changes but did not prove conflicts could not occur. Local locks do not coordinate separate machines or clones. The dashboard provides visibility rather than control, and labels are snapshots of workflow state, not authenticated proof of process health.

The unattended agents had broad tool access and were not independently sandboxed. Human approval gates governed workflow progression; they did not enforce a security boundary around every tool action. A comparable deployment would need access controls, credential scoping and sandboxing appropriate to the environment.

## Lessons for another experiment

- **Make approvals distinct.** An agreed specification, published ticket and ready-to-run issue represent different decisions.
- **Use checkable handoffs.** Confirm the expected PR or findings comment exists on the intended revision instead of trusting a successful process exit.
- **Keep failures inspectable.** Preserve partial work and require deliberate recovery rather than automatic blind retries.
- **Use review as evidence, not authority.** Different reviews may identify different defects; a completed review is not permission to merge.
- **Measure claims before generalising.** Record person-time, cost, failures and a meaningful comparison if efficiency is a goal.
- **Treat security separately.** Worktrees and workflow labels do not replace sandboxing or scoped credentials.

The strongest conclusion is modest: a well-bounded refactor, explicit issue contracts and verified agent handoffs made a small local software factory workable for this exercise. Whether it generalises to less bounded work or scales safely remains open.
