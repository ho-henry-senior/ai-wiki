---
type: overview
summary: Core advice for protecting sensitive information and limiting unsafe actions in agent-assisted work.
status: developing
---

# Security

An agent can read information, run tools, and act using permissions available to its execution environment. Security means limiting sensitive-data exposure and unsafe actions **even if the agent makes a mistake or follows malicious instructions**.

**First choose where its tools execute.** A local CLI using a remote model is still a *local-execution* agent. Hosted workspaces and CI runners are *cloud-execution* environments. Both may use external models and integrations.

## Try this first

- **[Secure a local coding agent](local-agent-security.md)** — protect files and credentials on your own machine, manage command approvals, and understand local tool access.
  - [Sandbox a local coding agent](local-agent-sandboxing.md) — configure and verify enforced filesystem and network restrictions.
- **[Secure a cloud coding agent](cloud-agent-security.md)** — scope repository and service credentials, restrict triggers, and keep independent review before high-impact actions.
- **[Prompt injection in coding-agent workflows](prompt-injection-coding-agents.md)** — recognise instructions hidden in issues, files, web pages, and tool output. Applies to both environments.

## Core advice

- **Map access and data destinations.** Identify the model endpoint, accessible files, credentials, enabled integrations, logs, and shared artifacts. Use the [agent data-flow checklist](agent-data-flow-checklist.md); [inference, retention, and training](../concepts/inference-retention-training.md) are separate questions.
- **Enforce boundaries rather than relying on instructions.** Restrict filesystem, network, and service permissions to the task. [Instructions are not enforced controls](../concepts/instructions-vs-controls.md); [worktrees are not sandboxes](../concepts/worktrees-not-sandboxes.md).
- **Review integrations.** Check tools, skills, dependencies, and MCP servers for permissions and downstream destinations. [Local MCP does not mean local-only data](../concepts/local-and-remote-mcp.md).
- **Treat external content as untrusted.** Files, issues, and tool results may try to redirect the agent. Limit the damage possible if it follows them; see [prompt injection](prompt-injection-coding-agents.md).
- **Keep meaningful oversight.** Require review for destructive, privileged, costly, or externally visible actions. Inspect generated changes and artifacts before sharing or accepting them.

## Explore further

- [Sensitive data in agent workflows](sensitive-data-in-agent-workflows.md) — a detailed explanation of data sources, destinations, and controls.
- [Agent data-flow checklist](agent-data-flow-checklist.md) — review a particular agent setup.
- [Secrets can leak through tool output](../concepts/secrets-in-tool-output.md) — a common accidental exposure path.
- [Lo-fi software factory case study](lo-fi-software-factory-case-study.md) — observed security limitations of unattended local agents.

**Scope:** These are practical starting points, not proof of security. Verify product-specific controls against the actual harness, account, operating system, and environment.
