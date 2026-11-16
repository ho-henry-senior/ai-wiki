---
type: reference
summary: Git branches and worktrees separate changes, while a security sandbox restricts what executing code can access or do.
status: established
lane: guidance
goal: security
order: 22
---

# A worktree is not a sandbox

A branch or Git worktree helps organize changes. It does not, by itself, restrict the filesystem, network, credentials, or external systems available to an agent or command.

[View the short slide](../slides/worktrees-not-sandboxes.md).

For example, an agent working in a disposable worktree may still use the same operating-system account and accessible credentials as the main checkout. Reverting its Git changes cannot undo an external API action or retrieve data already transmitted.

## Choose the right isolation

Use worktrees for parallel changes and clean working directories. Separately enforce the execution restrictions the task needs: filesystem permissions, an appropriately configured container or sandbox, limited credentials, and network controls.

The actual restrictions matter more than the environment's label. A container with broad host mounts or privileged credentials may still expose sensitive resources.

## Sources and applications

- [Git: git-worktree](https://git-scm.com/docs/git-worktree) — linked working trees share a repository and most repository metadata.
- [OWASP: Excessive Agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/) — independently limit permissions and high-impact actions.
- Applied in [the security overview](../pages/security.md) and [the data-flow checklist](../pages/agent-data-flow-checklist.md).
