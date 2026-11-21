---
type: explanation
summary: An illustrative agile workflow using separate agent responsibilities, explicit human approvals and reviewable handoffs.
status: developing
lane: guides
date: 2026-11-14
checked: 2026-11-15
tags:
  - Agent roles
---

# Agile roles in agentic development

Start with one agent and a human reviewer. Split work into separate agent roles only when repeated work and reviewable handoffs justify the extra coordination. This is one possible workflow, not a standard arrangement or evidence that it performs better; the [lo-fi software factory case study](lo-fi-software-factory-case-study.md) records one attempt.

Four roles illustrate the division: a **Product** agent explores requirements, a **Business Analyst** turns approved decisions into tasks, a **Developer** implements them, and a **Reviewer** independently examines the changes. A human retains authority over scope and release. Each additional handoff needs a clear deliverable.

For how to define a role contract and restrict a Copilot custom agent's tools, see [Agent roles, skills and tools](../concepts/skills-profiles-and-tools.md). The original four role files, and their use of skills, are examined in [How agent roles use skills](../reference/agent-roles-directory.md).

## Example responsibilities

**R** does the work; **A** is accountable; **C** is consulted; **I** is informed. This deliberately small RACI illustrates the important handoffs, not every activity a team performs.

| Activity                              | Product | Analyst | Developer | Reviewer | Human |
| ------------------------------------- | :-----: | :-----: | :-------: | :------: | :---: |
| Clarify problem and acceptance intent |    R    |    C    |     I     |    I     |   A   |
| Approve specification and scope       |    C    |    C    |     I     |    I     |  R/A  |
| Implement, test and open PR           |    I    |    C    |     R     |    I     |   A   |
| Review PR and report findings         |    I    |    I    |     C     |    R     |   A   |
| Approve merge or release              |    C    |    I    |     I     |    C     |  R/A  |

## The handoffs

```mermaid
sequenceDiagram
    actor Human as Human owner
    participant Product as Product agent
    participant BA as Analyst agent
    participant Dev as Developer agent
    participant Reviewer as Reviewer agent

    Human->>Product: Problem, outcome, constraints
    Product->>BA: Outcome and acceptance intent
    BA->>Human: Draft specification and tasks
    Human->>BA: Approve scope and priorities
    BA->>Dev: Approved task
    Dev->>Reviewer: PR with summary and check results
    loop Until findings are resolved
        Reviewer->>Dev: Findings
        Dev->>Reviewer: Updated PR
    end
    Reviewer->>Human: Recommendation
    Human->>Dev: Merge or release approval
```

Roles prepare work and recommend; the human decides and stays accountable. Copilot custom-agent instructions cannot enforce approvals on their own. Keep independent [review and approval controls](../goals/traceability/independent-change-approval.md) around the pull request.

## Sources

- [GitHub Docs: About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- [GitHub Docs: Custom agents configuration](https://docs.github.com/en/copilot/reference/custom-agents-configuration)
