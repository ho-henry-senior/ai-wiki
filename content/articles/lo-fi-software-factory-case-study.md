---
type: case-study
summary: An anonymised account of using local agents and polling scripts to coordinate a refactor, with human approval and observed limitations.
lane: case-studies
date: 2026-11-14
tags:
  - Agent roles
  - Permissions and sandboxing
---

# Case study: a lo-fi software factory

A team tried a structured agent-assisted workflow on a partially completed, cross-cutting refactor of a web application. The work was a relatively AI-friendly technical change: the desired behaviour and technical direction were reasonably clear, with few competing product priorities.

The team first coordinated specialist agents manually, then used local polling scripts to dispatch implementation and review work. The aim was to test whether a lightweight software factory could support a familiar delivery process while keeping people involved in important decisions.

## Read the case study

These chapters follow the work from approved tickets to implementation, review and retrospective assessment. Each chapter stands on its own.

- [From a refactor idea to actionable issues](lo-fi-factory-issues.md) — how the change became approved, dependency-aware tickets.
- [Dispatching development with GitHub labels](lo-fi-factory-dispatch.md) — readiness, worktrees, verified handoffs and recovery.
- [Agent reviews and human decisions](lo-fi-factory-reviews.md) — findings that exposed missed cases, duplication and a regression.
- [What worked, what failed, and what remains](lo-fi-factory-lessons.md) — outcomes, operational constraints, security and evidence limits.

## Evidence and related guidance

This account is based on a participant's retrospective and inspection of workflow documentation and issue and pull-request records. The expanded chapters also draw on preserved role profiles, handover guidance, dispatcher scripts, workflow-label definitions, recovery notes and dashboard documentation. Project names, identifying repository details, local configuration and security-sensitive material are not reproduced here. The account is not an independently measured comparison.

The source material supports descriptions of **how the preserved workflow is designed**. It does not by itself establish which later safeguards were in place during the exercise, how reliably unattended runs completed, or whether the project would have been faster under a different process.

- [How agent roles use skills](../reference/agent-roles-directory.md) — original Product, Business Analyst, Developer and Reviewer role files, with their actual skill references and limits.
- [Agile roles in agentic development](agent-role-boundaries.md) — an illustrative perspective on familiar responsibilities and human handoffs, not an account of this exercise.
- [Define, steer, and verify a task](../goals/alignment/define-and-verify-tasks.md) — write the task, steer it, and record the evidence.
- [Agent data-flow checklist](../reference/agent-data-flow-checklist.md) — review permissions, data flows, and controls before running agents.
