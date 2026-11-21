---
type: how-to
summary: Set limits that your tools and operating system enforce on a local coding agent, for what its commands can reach, which credentials it holds, and what runs outside its sandbox.
status: developing
lane: guides
goal: security
checked: 2026-11-21
recheck: every-run
check-against:
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-and-local-sandboxes
  - https://docs.github.com/en/copilot/how-tos/cloud-and-local-sandboxes/configuring-local-sandbox-settings
tags:
  - Copilot
  - Security
  - Permissions and sandboxing
---

# Secure a local coding agent

A local coding agent runs commands on your computer with your access: your files, your credentials, and every network your machine can reach. A mistake, or [an injected instruction](prompt-injection.md), works through that access. Telling the agent "do not push" or "stay in this folder" is not an access limit; see [instructions and enforced controls](../../concepts/instructions-vs-controls.md). An approval prompt helps only when you notice the dangerous command.

Set limits that hold even when the agent gets it wrong. They are enforced by the sandbox, the tool's permission rules, or the service a credential belongs to, not by the model.

## The steps

- **[Configure the sandbox and tool restrictions](local-sandbox-and-tool-restrictions.md).** Turn on Copilot's local sandbox, which is off by default in the CLI, the app and VS Code. Choose the folders and network destinations the task needs, deny the commands you never want run, and test that a restriction actually blocks something.
- **[Protect credentials and sensitive data](local-agent-credentials.md).** Decide which credentials the agent's commands can use, give it a narrowly scoped token, and keep secrets and real customer data out of what it reads and prints.
- **[Check integrations and sandbox boundaries](local-agent-integrations.md).** Find out what runs outside the sandbox, such as remote MCP servers and some built-in tools, and review an MCP server or skill before you enable it.

The steps are complementary rather than a strict sequence. The sandbox does most of the work, and the other two cover what it doesn't.

## Which tools this covers

The guide covers GitHub Copilot on your computer: Copilot CLI, the GitHub Copilot app, and agent sessions in VS Code. Their settings are separate, so turning on the sandbox in one does not turn it on in another. The Copilot cloud agent runs on GitHub's infrastructure and has its own controls; see [secure the Copilot cloud agent](cloud-agent-security.md). Other agents have their own sandboxes and permission rules, but the same three questions apply.

## Sources

- [GitHub Docs: About cloud and local sandboxes](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-and-local-sandboxes)
- [GitHub Docs: Configuring local sandbox settings](https://docs.github.com/en/copilot/how-tos/cloud-and-local-sandboxes/configuring-local-sandbox-settings)
- [VS Code docs: Sandbox agent terminal commands](https://code.visualstudio.com/docs/agents/run/agent-sandboxing)
