---
type: guide
summary: "Without restrictions, a local agent runs commands with your access, so a mistake or an injected instruction can affect your files and credentials."
status: established
lane: goals
goal: security
order: 1
---

# Excessive agent access

Without restrictions, a local agent runs commands with your access, so a mistake or an injected instruction can affect your files and credentials.\n\nApproval prompts alone do not isolate those commands, and [a worktree is not a sandbox](../../concepts/worktrees-not-sandboxes.md).\n\nLocally, turn on Copilot's sandbox, which is off by default: [secure a local coding agent](local-agent-security.md). In the cloud, GitHub enforces a firewall and workflow approval, with gaps: [secure the Copilot cloud agent](cloud-agent-security.md).
