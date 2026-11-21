---
type: case-study
summary: An anonymized account of using local agents and polling scripts to coordinate a refactor, with human approval and observed limitations.
lane: case-studies
date: 2026-11-14
tags:
  - Agent roles
  - Permissions and sandboxing
---

# Case study: a lo-fi software factory

A team tried a structured agent-assisted workflow on a partially completed, cross-cutting refactor of a web application. The work was a relatively AI-friendly technical change: the desired behavior and technical direction were reasonably clear, with few competing product priorities.

The team first coordinated specialist agents manually, then used local polling scripts to dispatch implementation and review work. The aim was to test whether a lightweight software factory could support a familiar delivery process while keeping people involved in important decisions.

## Read the case study

The original account and the preserved workflow are now explored in four connected chapters. Each chapter can also be read independently.

1. [From a refactor idea to actionable issues](lo-fi-factory-issues.md) — how a technical change became approved, dependency-aware tickets.
2. [Dispatching development with GitHub labels](lo-fi-factory-dispatch.md) — readiness, worktrees, verified handoffs and recovery.
3. [Agent reviews and human decisions](lo-fi-factory-reviews.md) — findings that exposed missed cases, maintainability concerns and regressions.
4. [What worked, what failed, and what remains](lo-fi-factory-lessons.md) — outcomes, operational constraints, security and the limits of the evidence.

## The workflow

The team used four specialist agent roles: Product, Business Analyst, Developer and Reviewer. People approved the specification and tickets, authorised ready issues, reviewed implementation findings and retained merge authority. Local polling scripts later coordinated development and review using GitHub labels. The workflow deliberately separated a published review from human approval.

## What happened

The ticketed refactor was implemented and merged into a fork, with unit tests, static checks and representative manual testing. A participant estimated roughly one to two days for ticket creation, review and implementation, but no measured human-only baseline or complete cost record exists. At the time of the original account, final integration still awaited another person's sign-off and broader testing was planned.

Reviews raised specific concerns, and occasional agent failures needed manual recovery. The agents were not independently sandboxed. The exercise shows a workable local coordination pattern for bounded work, not a fully autonomous or production-ready delivery system.

## Assessment against the goals

- **Alignment:** approved requirements and bounded, dependency-aware tickets helped agents work towards a clear outcome.
- **Economy:** the participant believed the process was quicker; no comparative measurement proves savings.
- **Traceability:** issues, PRs, tests and reviews recorded useful evidence for human decisions.
- **Security:** broad unattended tool access remained a significant limitation.

## Limits

The dispatcher ran locally with deliberately limited concurrency; worktrees separated working directories but did not provide a security sandbox. A completed review was not an approval, passing checks were not proof of full correctness, and the current preserved demo includes safeguards that may have been developed after the trial. The chapters distinguish documented implementation from observed events and retrospective assessment.

## Evidence and related guidance

This account is based on a participant's retrospective and inspection of workflow documentation and issue and pull-request records. The expanded chapters also draw on preserved role profiles, handover guidance, dispatcher scripts, workflow-label definitions, recovery notes and dashboard documentation. Project names, identifying repository details, local configuration and security-sensitive material are not reproduced here. The account is not an independently measured comparison.

The source material supports descriptions of **how the preserved workflow is designed**. It does not by itself establish which later safeguards were in place during the exercise, how reliably unattended runs completed, or whether the project would have been faster under a different process.

- [How agent roles use skills](../reference/agent-roles-directory.md) — original Product, Business Analyst, Developer and Reviewer role files, with their actual skill references and limits.
- [Agile roles in agentic development](agent-role-boundaries.md) — an illustrative perspective on familiar responsibilities and human handoffs, not an account of this exercise.
- [Define, steer, and verify a task](../goals/alignment/define-and-verify-tasks.md) — write the task, steer it, and record the evidence.
- [Agent data-flow checklist](../reference/agent-data-flow-checklist.md) — review permissions, data flows, and controls before running agents.
