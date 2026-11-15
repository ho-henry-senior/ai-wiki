---
type: guide
summary: Turn on Copilot's local sandbox, restrict files, network, and credentials, and prove the limits are enforced with harmless test files.
status: developing
---

# Sandbox a local coding agent

Turn on Copilot's local sandbox so that commands Copilot runs can only reach the files, network, and credentials you allow. It limits the damage from a mistake or a malicious instruction, whatever the model decides.

## Turn it on

- **Copilot CLI:** run `/sandbox enable` in a session. Use `/sandbox` to set filesystem paths, network access, and credentials. Settings are stored under the `sandbox` key in your Copilot CLI `settings.json`.
- **Copilot app:** enable it per session with `/sandbox`, or per project in the project's settings. The app's settings are separate from the CLI's.
- **VS Code:** sandboxing applies to sessions using Agent Host.

Local sandboxing is generally available at no extra cost, but it is off by default. Organizations can enforce it through managed settings.

Checked 15 November 2026 against GitHub's documentation on [local sandboxing](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-and-local-sandboxes).

## Prove it works

Use harmless, made-up files only.

1. Create a marker file inside the project and another in a temporary folder outside it.
2. Ask Copilot to read both. Do not ask it to bypass anything.
3. Confirm that reading the outside file fails with a **permission error from the system**, not because Copilot chose not to. A model saying "I cannot access that file" is not evidence.
4. Repeat for a harmless write outside the project, and for a connection to a host you control.
5. Delete the files and note what was and was not blocked.

## What the sandbox may not cover

- MCP servers and other integrations may run outside it.
- Restricting writes may still allow reads or network access.
- Approved task context still goes to the model provider.
- A container is only as isolated as its mounts, credentials, and network rules.

See [local MCP does not mean local-only data](../concepts/local-and-remote-mcp.md). Return to [secure a local coding agent](local-agent-security.md) for the other settings.

## Sources

- [GitHub Changelog: Local sandboxing for GitHub Copilot now generally available (7 October 2026)](https://github.blog/changelog/2026-10-07-local-sandboxing-for-github-copilot-now-generally-available)
- [GitHub Docs: Configuring local sandbox settings](https://docs.github.com/en/copilot/how-tos/cloud-and-local-sandboxes/configuring-local-sandbox-settings)
- [GitHub Docs: Configure local sandboxing in the Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/configure-local-sandboxing)
