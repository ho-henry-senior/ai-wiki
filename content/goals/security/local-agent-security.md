---
type: how-to
summary: Secure a local coding agent by enabling its sandbox, limiting tools and network access, keeping credentials out of reach, and retaining approvals.
status: established
lane: articles
goal: security
order: 1
checked: 2026-11-16
tags:
  - Copilot
  - Security
  - Permissions and sandboxing
---

# Secure a local coding agent

A local coding agent runs tools and commands on your computer, often with access to your files, credentials, and network. Instructions such as “do not push” are not access restrictions. Set boundaries that your tools and operating system enforce, even when the agent makes a mistake or follows [an injected instruction](prompt-injection.md).

## Enable the sandbox

Copilot's local sandbox limits what commands and their child processes can read, change, or contact. It is off by default, so turn it on for the environment you use:

- **Copilot CLI:** run `/sandbox enable`. Use `/sandbox` to configure filesystem paths, network access, and credentials; settings are stored under `sandbox` in the CLI's `settings.json`.
- **Copilot app:** enable sandboxing with `/sandbox` for a session, or in the project's settings. The app and CLI have separate settings.
- **VS Code:** sandboxing applies to sessions using Agent Host.

Choose which project paths and network destinations the task actually needs. A sandbox is an enforced boundary for the commands it covers, **not** a guarantee that every integration is isolated. See [GitHub's local sandbox configuration](https://docs.github.com/en/copilot/how-tos/cloud-and-local-sandboxes/configuring-local-sandbox-settings).

## Restrict tools and network actions

Deny commands that could do substantial harm if requested by mistake or by untrusted content. In Copilot CLI, for example:

```sh
copilot --deny-tool='shell(git push)' --deny-tool='shell(rm)'
```

Deny rules take precedence over allow rules. Keep approval prompts for consequential commands; `--allow-all` (`--yolo`) removes prompts and path and URL restrictions, so reserve it for disposable environments.

Copilot's `--allow-url` and `--deny-url` rules cover its web fetch tool and recognized network commands such as `curl`, but they are **not** general network isolation: a script can make its own connections. Enforce the necessary network boundaries in the sandbox.

## Keep credentials and sensitive data out of reach

Don't run an agent with production credentials, cloud CLI logins, or unrelated SSH keys available to its tools. Limit the environment to the files, repositories, and credentials needed for the task. Commands can print tokens, environment variables or customer data into tool output sent to the model and saved in session history. Use synthetic fixtures and diagnostics that mask secrets before printing them; redaction after the request cannot undo disclosure. If a credential appears in tool output, revoke or rotate it instead of relying on deleting the log. See the [agent data-flow checklist](../../reference/agent-data-flow-checklist.md).

## Know where the limits end

- **Approvals are not isolation.** A prompt requires you to notice a dangerous command; enforcement restricts it even when you miss one.
- **MCP servers and other integrations** may run as separate processes outside the sandbox. Check their own permissions.
- **Read-only access isn't confidentiality.** A command that cannot change a secret might still read or transmit it.
- **Containers and virtual machines** can add isolation for unfamiliar code, but host mounts, credentials, and network access still need restricting.

The sandbox restricts local execution; it does not stop context you deliberately supply from being sent to the model provider. For Copilot's settings, consult [CLI configuration](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/configure-copilot-cli) and [local sandboxing](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-and-local-sandboxes).
