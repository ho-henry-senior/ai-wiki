---
type: guide
summary: How to evaluate and verify sandbox restrictions for a coding agent running on your computer.
status: developing
---

# Sandbox a local coding agent

A sandbox places **enforced limits** on what the agent's tools can read, change, or contact. It reduces the damage from mistakes and malicious instructions. It is different from an approval prompt, a Git branch, or a worktree: [a worktree is not a sandbox](../concepts/worktrees-not-sandboxes.md).

## Try this first

1. Check whether your coding-agent harness offers a supported sandbox mode on your operating system.
2. Read what that mode actually restricts: filesystem writes, filesystem reads, network access, subprocesses, and integrations may be treated differently.
3. Start with only the project and the tools the task requires. Do not expose unrelated home directories or credentials for convenience.
4. Verify the restrictions using harmless, disposable test files before relying on them for sensitive work.

If the built-in sandbox cannot provide the boundary you need, consider a dedicated OS account, a container, or a VM. Each has different setup costs and limitations; none is automatically sufficient without checking mounts, credentials, and networking.

## A small verification exercise

Use **synthetic data only**. Create a temporary test directory outside the agent's authorised workspace and put a file containing a harmless marker in it. Create a second marker file inside the workspace.

1. Configure the intended sandbox restrictions.
2. Ask the agent to read both marker files, without asking it to bypass any controls.
3. Confirm that reading the inside file works and that the outside file is denied **by the tool or operating system**, not just declined by the model.
4. Where supported, similarly check whether a harmless write outside the workspace and an outbound connection to a controlled test destination are blocked.
5. Delete the test files and record what was and was not enforced.

**Important:** An agent saying "I cannot access that file" is not proof of a sandbox boundary. Look for an actual permission error or other independent evidence. Avoid probing real secrets or sending data to an unknown test endpoint.

## What can escape the sandbox?

- A container may mount host directories, expose a credential helper, or allow unrestricted network access.
- A shell sandbox may not apply to an MCP server, browser tool, or remote integration.
- A sandbox that restricts writes may still permit reading files or sending data over the network.
- A local agent may still send approved task context to a remote model provider.

See [Local MCP does not mean local-only data](../concepts/local-and-remote-mcp.md) and [Sensitive data in agent workflows](sensitive-data-in-agent-workflows.md).

## Choosing a level of isolation

For routine work in a trusted repository, a verified built-in sandbox plus meaningful approval may be a low-friction starting point. For unknown code, sensitive data, or unattended runs, stronger isolation and restricted credentials may be necessary. Prefer the simplest option that **actually enforces** the boundaries required for the task, not the one with the strongest-sounding label.

Return to [Secure a local coding agent](local-agent-security.md) for the broader checklist.
