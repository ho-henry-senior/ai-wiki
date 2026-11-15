---
type: overview
summary: Core advice for protecting sensitive information and limiting unsafe actions in agent-assisted work.
status: stub
---

# Security

**Stub:** Security guidance is at an early stage. This overview and its links provide a starting point, not comprehensive protection; practical techniques and examples for handling untrusted content need more development.

Security means protecting sensitive information and limiting unsafe actions while using agents. The right controls depend on the data, permissions, integrations, and environment involved; essential safeguards still matter when they take effort.

## Try this first

Before an agent works on a repository, identify sensitive data and credentials it can access, where data may be sent or stored, and what actions it can perform. Limit access to the task and verify restrictions and approval requirements in the actual environment. Use the [agent data-flow checklist](agent-data-flow-checklist.md) to record known flows and investigate unknowns.

## Core advice

- **Trace data and actions.** Examine the model endpoint, local and remote tools, logs, session storage, and shared artifacts. Distinguish [transmission, retention, and training use](../concepts/inference-retention-training.md); use the [data-flow checklist](agent-data-flow-checklist.md) to trace a particular setup.
- **Limit and enforce access.** Grant only the filesystem, network, and service permissions the task needs. [Instructions are not enforced controls](../concepts/instructions-vs-controls.md), and a [worktree is not a sandbox](../concepts/worktrees-not-sandboxes.md).
- **Review integrations.** Check the provenance, permissions, and data destinations of tools, skills, dependencies, and MCP servers before enabling them. A local integration can still send data elsewhere. [Local MCP does not mean local-only data](../concepts/local-and-remote-mcp.md); use the [data-flow checklist](agent-data-flow-checklist.md#check-actions-as-well-as-data) to check integrations and their boundaries.
- **Treat retrieved content as untrusted.** Files, issues, and tool results can contain instructions intended to redirect the agent. Combine careful review with enforced limits on access and outbound actions. [Sensitive data in agent workflows](sensitive-data-in-agent-workflows.md#controls-across-the-workflow).
- **Review consequential actions and outputs.** Require appropriate human approval for privileged, destructive, costly, or externally visible actions. Review generated changes and inspect artifacts for sensitive information before sharing or accepting them. The [data-flow checklist](agent-data-flow-checklist.md#check-actions-as-well-as-data) includes these checks.

## Explore further

- [Agent data-flow checklist](agent-data-flow-checklist.md) — a practical review of a particular setup.
- [Secrets can leak through tool output](../concepts/secrets-in-tool-output.md) — accidental exposure and containment.
- [Lo-fi software factory case study](lo-fi-software-factory-case-study.md) — security limitations of an unattended local workflow.
