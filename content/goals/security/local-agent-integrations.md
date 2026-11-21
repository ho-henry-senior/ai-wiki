---
type: how-to
summary: Find out what a local agent runs outside its sandbox, such as remote MCP servers and some built-in tools, and review an MCP server or skill before you enable it.
status: developing
lane: guides
goal: security
checked: 2026-11-21
recheck: every-run
check-against:
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-and-local-sandboxes
  - https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers
tags:
  - Copilot
  - Security
  - Permissions and sandboxing
  - MCP
---

# Check integrations and sandbox boundaries

The sandbox restricts the processes it starts. An agent also uses tools that run inside Copilot itself, servers on other systems, and code you install as extensions, so check what each one can reach rather than assuming the sandbox covers it.

## Know what the sandbox covers

| Runs                                   | Sandboxed?                                                                                                                              |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Shell commands and their file searches | Yes, when the sandbox is on.                                                                                                            |
| Local MCP and language (LSP) servers   | Yes by default, in the CLI, the app and VS Code. You can turn this off, so check the setting.                                           |
| Copilot's built-in file tools          | Not by the operating system. In the CLI they run inside Copilot, and only best-effort policy checks apply. VS Code uses its own checks. |
| Remote MCP servers                     | Never. They run on someone else's system with whatever access you granted them.                                                         |
| Servers you start yourself             | No. In VS Code, only the MCP servers it manages are sandboxed.                                                                          |

In VS Code, Claude and Codex agent sessions don't use Copilot's sandbox settings.

The sandbox also doesn't decide what an integration sends on. A local server can call a hosted service, and a remote one can pass your data to another provider; see [local MCP servers and data access](../../concepts/local-and-remote-mcp.md).

## Review an MCP server before you enable it

An MCP server is code that runs with access you give it, and its tools are offered to the model alongside Copilot's own. Before adding one, check:

- **Who publishes it,** and whether that is the source you meant. Prefer servers listed in the [GitHub MCP Registry](https://github.com/mcp) or published by the service's own vendor.
- **What it runs.** A command such as `npx -y some-server` downloads and runs the latest version each time it starts; pin a version you have reviewed.
- **What it can reach.** Which credentials you pass it, for example a token in `-e`, which files it can read, and which hosts it contacts. Give it a token scoped to the job, as for [the agent itself](local-agent-credentials.md#give-copilot-a-narrow-github-token).
- **Which tools it exposes.** Enable only the tools the task needs, and prefer read-only ones.

In Copilot CLI, `copilot mcp list` shows configured servers and `copilot mcp get NAME` shows a server's tools. Limit a server to named tools in its configuration, in `~/.copilot/mcp-config.json`, or deny one with `--deny-tool='SERVER(tool_name)'`. If your organization sets an MCP allowlist, only servers on it can run.

## Treat repository configuration as code

A repository can define MCP servers in files such as `.mcp.json` or `.vscode/mcp.json`, and can include skills with scripts. Trusting a folder lets those run: in VS Code, trusting a workspace lets its MCP servers start without a separate prompt, and Copilot CLI asks you to trust the folder you launch it in. Read a repository's MCP configuration and skill scripts before you trust a repository you didn't write. For dependencies the agent installs, see [invented dependencies and supply-chain attacks](../../concepts/hallucinated-dependencies.md).

## When the sandbox isn't enough

The local sandbox is lightweight: commands still run as you, on your machine. For unfamiliar or untrusted code, run the agent in a container or a virtual machine, such as a dev container. Isolation there still depends on what you share with it, so limit mounted folders, credentials and network access in the same way.

## Sources

- [GitHub Docs: About cloud and local sandboxes](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-and-local-sandboxes)
- [GitHub Docs: Adding MCP servers for Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers)
- [GitHub Docs: Configuring GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/configure-copilot-cli)
- [VS Code docs: Sandbox agent terminal commands](https://code.visualstudio.com/docs/agents/run/agent-sandboxing)
- [VS Code docs: Manage and troubleshoot MCP servers](https://code.visualstudio.com/docs/agents/run/manage-mcp-servers)
