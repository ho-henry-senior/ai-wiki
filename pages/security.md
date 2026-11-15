---
type: overview
summary: Limit what an agent can reach and do, so a mistake or a malicious instruction cannot expose data or cause harm; start from where the agent's tools run.
status: developing
---

# Security

Limit what an agent can reach and do, so that a mistake or a malicious instruction in a file or issue cannot expose data or cause harm. Asking the agent to be careful is not a limit. Start from where its tools run.

## Try this first

- **Copilot CLI, the Copilot app, or agent mode in your editor:** the tools run on your computer. [Secure a local coding agent](local-agent-security.md), and [turn on the sandbox](local-agent-sandboxing.md).
- **Copilot cloud agent:** the tools run in GitHub Actions. [Secure the Copilot cloud agent](cloud-agent-security.md).
- **Either:** work through the [agent data-flow checklist](agent-data-flow-checklist.md) once for your setup.

## Core advice

- **Keep work data out of model training.** Use a Copilot Business or Enterprise seat for work code; individual plans train on interactions by default unless you opt out. See [inference, retention, and training](../concepts/inference-retention-training.md).
- **Enforce limits, not instructions.** Use the local sandbox, the cloud agent's firewall, and narrowly scoped credentials. [Instructions are not enforced controls](../concepts/instructions-vs-controls.md), and [a worktree is not a sandbox](../concepts/worktrees-not-sandboxes.md).
- **Check integrations before enabling them.** An MCP server can send data to its own services, and the sandbox or firewall may not cover it. See [local MCP does not mean local-only data](../concepts/local-and-remote-mcp.md).
- **Treat repository content as untrusted.** Issues, files, and tool output can contain instructions aimed at the agent. See [prompt injection](prompt-injection-coding-agents.md).
- **Review before anything leaves.** Read the diff before approving workflows or merging, and check reports and logs for secrets before sharing them. See [secrets can leak through tool output](../concepts/secrets-in-tool-output.md).

| Risk                   | What goes wrong                                                                                |
| ---------------------- | ---------------------------------------------------------------------------------------------- |
| Data exposure          | Secrets, private code, or personal data reach a service, log, or pull request they should not. |
| Unintended actions     | The agent deletes files, changes settings, spends money, or publishes without approval.        |
| Prompt injection       | Text in an issue, file, or tool result steers the agent into misusing its access.              |
| Unsafe changes         | Generated code weakens tests, access controls, or other safeguards.                            |
| Untrusted integrations | A tool, skill, dependency, or MCP server runs code or reaches data you did not expect.         |

These overlap, and the damage grows with what the agent can access.

## Explore further

- [Case study: a lo-fi software factory](lo-fi-software-factory-case-study.md) — security limits observed in an unattended local workflow.
- [OWASP: Prompt injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) and [excessive agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/).
