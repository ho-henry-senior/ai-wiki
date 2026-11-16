---
type: guide
summary: Turn on Copilot's local sandbox so the operating system, not the model, limits what commands can reach; then prove the limits hold with harmless test files.
status: developing
lane: guidance
goal: security
order: 2
checked: 2026-11-15
---

# Sandbox a local coding agent

Instructions depend on the model following them, and approval prompts depend on you reading them. Copilot's tool, path, and URL rules are enforced whatever the model decides, but they match the commands Copilot is asked to run, not everything those commands go on to do. The sandbox works at a lower level: the operating system restricts which files, network destinations, and credentials those commands and the programs they start can reach. So an action beyond what you allow fails, even when a mistake or an [injected instruction](prompt-injection-coding-agents.md) leads the model to attempt it.

## Turn it on

- **Copilot CLI:** run `/sandbox enable` in a session. Use `/sandbox` to set filesystem paths, network access, and credentials. Settings are stored under the `sandbox` key in your Copilot CLI `settings.json`.
- **Copilot app:** enable it per session with `/sandbox`, or per project in the project's settings. The app's settings are separate from the CLI's.
- **VS Code:** sandboxing applies to sessions using Agent Host.

Local sandboxing is generally available at no extra cost, but it is off by default, so an agent you have not configured runs without it. Organizations can enforce it through managed settings, which is the way to make sure every developer has it on.

Source: GitHub's documentation on [local sandboxing](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-and-local-sandboxes).

## Prove it works

A model that cannot do something and a model that chooses not to look the same in the conversation. An error from the system shows that the action you tested was blocked by an enforced limit; it says nothing about paths, hosts, or tools you did not test. So test each boundary you rely on, using harmless, made-up files only.

1. Create a marker file inside the project and another in a temporary folder outside it.
2. Ask Copilot to read both. Do not ask it to bypass anything, because you are testing the limit, not the model's willingness.
3. Confirm that reading the outside file fails with a **permission error from the system**. A reply such as "I cannot access that file" is the model's choice, not evidence.
4. Repeat for a harmless write outside the project, and for a connection to a host you control.
5. Delete the files and note what was and was not blocked. Anything you did not test is still unproven.

## What the sandbox may not cover

- **MCP servers and other integrations** may run as separate processes outside it, with their own access. See [local MCP does not mean local-only data](../concepts/local-and-remote-mcp.md).
- **Restricting writes** may still allow reads or network access, so a command could read a secret and send it even if it cannot change anything.
- **Context still goes to the model provider.** The sandbox limits what commands can do on your computer, not what Copilot sends with each request.
- **A container is only as isolated as its configuration.** Mounted folders, passed-in credentials, and open network rules all reach through it.

Return to [secure a local coding agent](local-agent-security.md) for the other settings.

## Sources

- [GitHub Changelog: Local sandboxing for GitHub Copilot now generally available (7 October 2026)](https://github.blog/changelog/2026-10-07-local-sandboxing-for-github-copilot-now-generally-available)
- [GitHub Docs: Configuring local sandbox settings](https://docs.github.com/en/copilot/how-tos/cloud-and-local-sandboxes/configuring-local-sandbox-settings)
- [GitHub Docs: Configure local sandboxing in the Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/configure-local-sandboxing)
