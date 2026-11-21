---
type: advice
summary: "Without restrictions, a local agent runs commands with your access, so a mistake or an injected instruction can affect your files and credentials."
status: established
lane: goals
goal: security
order: 1
tags:
  - Security
  - Permissions and sandboxing
---

# Excessive agent access

Without restrictions, a local agent runs commands with your access, so a mistake or an injected instruction can affect your files and credentials.

Neither instructions nor approval prompts restrict that access. What does depends on where the agent runs:

- **On your computer,** nothing is restricted until you turn on Copilot's local sandbox, which is off by default. Then narrow the credentials the agent holds and check what runs outside the sandbox. The [Secure a local coding agent](local-agent-security.md) guide covers all three.
- **In the cloud,** GitHub enforces a firewall and workflow approval, with gaps that you close in the agent's settings: [secure the Copilot cloud agent](cloud-agent-security.md).
