---
type: case-study
summary: An anonymized account of using local agents and polling scripts to coordinate a refactor, with human approval and observed limitations.
---

# Case study: a lo-fi software factory

A team tried a structured agent-assisted workflow on a partially completed, cross-cutting refactor of a web application. The work was a relatively AI-friendly technical change: the desired behavior and technical direction were reasonably clear, with few competing product priorities.

The team first coordinated specialist agents manually, then used local polling scripts to dispatch implementation and review work. The aim was to test whether a lightweight software factory could support a familiar delivery process while keeping people involved in important decisions.

## The workflow

1. A Product agent discussed the problem with the team and drafted a specification. The team reviewed and approved it.
2. A Business Analyst agent proposed a sequence of tickets from the approved specification. People reviewed the breakdown and approved the issues.
3. A Developer agent implemented each available issue, ran checks, and opened a pull request.
4. A Reviewer agent examined the change and published findings.
5. A human reviewed the implementation and findings, then decided whether to merge.

The first issue was started manually. For subsequent work, a human applied a readiness label to each issue; a polling script selected ready issues without open blockers and started the Developer agent. Another script watched for pull requests ready for review and started the Reviewer. A review-complete label signaled that a review comment had been published, not that the change was approved.

The scripts checked native issue-blocking relationships, not dependency descriptions in issue text. Closing a blocker could make dependent work eligible; it did not itself prove that the prerequisite changes had been merged. The team merged prerequisite work before allowing dependent work to proceed.

The scripts ran on one local machine. At most one Developer and one Reviewer ran at a time, in separate Git worktrees. This allowed implementation and review to overlap while avoiding concurrent implementation branches that would need to be merged together. There were no code conflicts in this exercise; that does not establish that worktrees prevent conflicts in general.

## What happened

The ticket work was implemented and merged into a fork. The participant estimated roughly one to two days for ticket creation, review, and implementation, involving a team workshop and individual follow-up; this is not a measurement of total person-time. Additional manual testing followed. There was no measured human-only or single-agent baseline and no complete cost record, so the exercise does not establish how much time or money was saved.

Agents and people ran unit tests and static checks. A participant also manually exercised representative application interactions. When this account was recorded, the final integration pull request was awaiting another person's sign-off, with broader QA and regression testing planned after integration. The pull request's test report noted scenarios that could not be exercised locally and an integration error whose cause was uncertain; whether those were resolved was not established.

The Reviewer agents often reported no actionable defects, but some reviews raised concerns. The team considered certain error-handling concerns outside the initial refactor scope and did not address them during the exercise. A published review and passing checks are evidence for a human decision, not proof that all important risks have been resolved.

Occasional agent failures required manual recovery: the operator inspected the state, reset workflow labels, cleared the working state as appropriate, and restarted the polling process. There was no automatic retry or automatic merge.

## Assessment against the goals

The participant considered the exercise particularly successful for three of the wiki's goals:

- **Alignment:** Structured discovery, an agreed specification, and a dependency-aware sequence of well-defined tickets gave Developer agents clear instructions and precise goals.
- **Economy:** The participant judged the work much quicker than a human-led process or giving the whole high-level task to a single Developer agent. This is an experiential assessment, not a measured comparison.
- **Traceability:** The specification, tickets, pull requests, checks, and review comments preserved decisions and evidence for later review. People could steer and sign off at multiple stages.
- **Security:** This was the least well served goal. Review and testing provided some safeguards, but the unattended agents were not independently sandboxed.

## Limits

The exercise showed that a local dispatcher could coordinate specialist agents around issues, pull requests, and review artifacts, while people retained approval points. It does not demonstrate a fully autonomous or production-ready factory. The work was technically well bounded, the scripts depended on one local machine, and concurrency was deliberately limited. Scaling would require further decisions about remote execution, tooling, concurrent work, conflicts, issue readiness, review findings, and merge authority.

The agents ran unattended with broad tool access and were not independently sandboxed. Approval gates controlled workflow handoffs, not every action an agent could take. Separate worktrees isolated changes, but [a worktree is not a security sandbox](../concepts/worktrees-not-sandboxes.md). A similar workflow needs independently enforced access controls appropriate to its data and risks.

## Evidence and related guidance

This account is based on a participant's retrospective and inspection of the workflow documentation and issue and pull-request records. Project names, links, dates, and distinctive implementation details are omitted to preserve anonymity. The account is not an independently measured comparison.

- [From agile roles to agent-assisted workflows](agent-role-boundaries.md) — an illustrative perspective on familiar responsibilities and human handoffs, not an account of this exercise.
- [Define and verify a task](define-and-verify-tasks.md) — clarify intent and preserve proportionate evidence.
- [Sensitive data in agent workflows](sensitive-data-in-agent-workflows.md) — review permissions, data flows, and controls before running agents.
