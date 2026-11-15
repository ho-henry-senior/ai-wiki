---
type: guide
summary: Practical starting controls for coding agents that execute tools on a developer's own machine.
status: developing
---

# Secure a local coding agent

**Local** means the agent's tools execute on your computer, even if the model itself runs remotely. A local agent may be able to read files, run commands, access credentials, and reach services available to your user account. Do not assume it is confined to the open repository.

## Try this first

1. **Check the execution boundary.** Find out which directories, commands, network destinations, and integrations the agent can actually access. Do not infer restrictions from its instructions or from a Git worktree.
2. **Keep approval for consequential actions.** Inspect unfamiliar commands, dependency installation, changes outside the project, and actions affecting remote services. Avoid broad automatic approval merely to save prompts.
3. **Use enforced isolation where available.** Prefer a supported sandbox that limits filesystem and network access; see [Sandbox a local coding agent](local-agent-sandboxing.md). Check what it covers, including subprocesses and integrations.
4. **Reduce exposed credentials.** Avoid running with production credentials or access to unrelated accounts. Use task-scoped credentials and remove unnecessary integrations.
5. **Review the result.** Inspect diffs and shared artifacts for unwanted changes and leaked information; keep a recoverable working state.

## A concrete failure mode

You ask an agent to diagnose a failing test. It runs a command that prints environment variables into its output. That output may be saved in a session or included in a later model request. No explicit request to upload secrets was necessary. See [Secrets can leak through tool output](../concepts/secrets-in-tool-output.md) and [Sensitive data in agent workflows](sensitive-data-in-agent-workflows.md).

## What to check before trusting a setup

| Boundary     | Question                                                                                        |
| ------------ | ----------------------------------------------------------------------------------------------- |
| Files        | Can tools read your home directory, SSH keys, other repositories, or files outside the project? |
| Commands     | Which commands require approval, and can subprocesses run without further prompts?              |
| Network      | Can the agent or executed code contact arbitrary hosts?                                         |
| Credentials  | Which tokens, SSH agents, credential helpers, and cloud CLI sessions are available?             |
| Integrations | Do MCP servers or other tools run outside the shell sandbox?                                    |

**Approval is not isolation.** An approval prompt asks a person to authorise an action; a sandbox restricts what the action can do. Both may be useful. An agent's promise to stay inside the repository is not an enforced boundary; see [Instructions are not enforced controls](../concepts/instructions-vs-controls.md).

## When to go further

Use stronger isolation for unfamiliar repositories, third-party scripts, sensitive material, or unattended work. Consider a disposable container or VM with only the required files mounted, limited credentials, and explicit network rules. Containers are not automatically safe: mounting your home directory or exposing host credentials can defeat much of the benefit.

For suspicious instructions embedded in issues, source files, or tool responses, see [Prompt injection in coding-agent workflows](prompt-injection-coding-agents.md). For a fuller review of data destinations, use the [agent data-flow checklist](agent-data-flow-checklist.md).

## Limitations

Sandbox features and defaults vary by operating system, harness, version, and integration. Confirm the actual enforcement rather than assuming that a product's "safe" or "workspace" mode provides a particular boundary. Even well-isolated tools may send task content to an approved model endpoint; [inference, retention, and training](../concepts/inference-retention-training.md) are separate questions.
