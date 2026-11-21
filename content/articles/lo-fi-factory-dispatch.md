---
type: case-study
lane: case-studies
summary: How local dispatchers used GitHub issue and PR labels to coordinate development and review.
tags:
  - Agent roles
---

# Dispatching development with GitHub labels

The team began by coordinating agents manually. It later used local polling scripts to start Developer and Reviewer agents from GitHub workflow state. This was deliberately a lightweight coordination mechanism, not a remote orchestration service.

## Two queues, two sets of labels

The preserved dispatcher implementation uses one queue for implementation and another for review.

| Issue state         | Meaning                                        |
| ------------------- | ---------------------------------------------- |
| `agent-ready`       | A person has authorised the issue for dispatch |
| `agent-in-progress` | The dispatcher has claimed the issue           |
| `agent-pr-opened`   | A matching implementation PR was verified      |
| `agent-failed`      | The attempted handoff needs inspection         |

PRs similarly move through `review-ready`, `review-in-progress`, `review-complete` or `review-failed`. **Review complete means findings were published, not that the code was approved.**

The application issues retained their completed implementation labels in the inspected repository. Current labels establish recorded end states, not the exact historical order or timing of every transition.

## Dispatch only eligible work

A ready issue can still be blocked. The dispatcher checks GitHub's native issue-blocking relationships before starting work; prose in a ticket's dependency section is not a substitute for those relationships. Closing a blocker makes a dependent issue eligible, but does not prove the prerequisite code was merged. The team kept that distinction under human control.

The Developer runs in a separate Git worktree. The dispatcher does not trust an agent's exit code alone: it verifies an open, non-draft PR from the expected issue branch into the configured base branch before queuing review.

The Reviewer works in a separate detached worktree and checks the expected PR revision. Its completion requires a findings comment on that revision. A missing comment or changed PR head is a failed handoff rather than success.

## What happens when a run fails?

There is no automatic retry. The operator inspects the state, retains partial or dirty worktrees where necessary, and deliberately resets the relevant label before restarting. Local locks coordinate processes on one machine, not across multiple clones or hosts.

The preserved implementation includes these safeguards and offline tests with mocked GitHub and agent commands. Some may have been refined after the original exercise; their presence in the current demo is not proof that every safeguard operated throughout the trial.

## Visibility is not control

A later read-only terminal dashboard groups issues and PRs by their labels and flags failed, unqueued or stale work. It does not start agents, approve changes or merge PRs. Labels indicate the dispatchers' recorded state, not necessarily whether an agent process is healthy at this instant.
