---
type: how-to
summary: Turn on Copilot's local sandbox in the CLI, the app or VS Code, limit its folders and network, deny dangerous commands, and test that a restriction blocks something.
status: developing
lane: guides
goal: security
checked: 2026-11-21
verification: Copilot CLI and app details are checked against GitHub Docs, which the daily review rechecks. VS Code details are checked by hand against VS Code's documentation and are not rechecked automatically.
recheck: every-run
check-against:
  - https://docs.github.com/en/copilot/how-tos/cloud-and-local-sandboxes/configuring-local-sandbox-settings
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-and-local-sandboxes
  - https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/configure-copilot-cli
tags:
  - Copilot
  - Security
  - Permissions and sandboxing
---

# Configure the sandbox and tool restrictions

Without a sandbox, the commands an agent runs can read, change and delete anything you can, and reach any network your machine can. Copilot's local sandbox restricts them at the operating-system level. It is **off by default**, and the CLI, the app and VS Code each have their own setting.

## Turn on the sandbox

| Where              | How                                                                                                                                                                                                                                |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Copilot CLI        | Run `/sandbox enable`. It stays on in later sessions until you run `/sandbox disable`. `/sandbox` opens the settings; `/sandbox status` shows the state.                                                                           |
| GitHub Copilot app | In **Settings**, under **Repositories**, choose the repository and turn on **Sandbox new sessions**. Use `/restart-session` to apply it to an open session.                                                                        |
| VS Code            | Turn on **Sandboxing for terminal** in the session's permissions picker, or set `chat.agent.sandbox.enabled` to `on` for new sessions. On Windows the setting is `chat.agent.sandbox.enabledWindows`, and support is experimental. |

macOS needs no extra software. Linux needs bubblewrap 0.5.0 or later and slirp4netns, and Windows needs a recent Windows 11 build. GitHub's [sandbox settings page](https://docs.github.com/en/copilot/how-tos/cloud-and-local-sandboxes/configuring-local-sandbox-settings) lists the exact requirements.

If the CLI can't sandbox on your machine, it turns the sandbox off for that session and runs commands without it, with a notice. Run `/sandbox status` rather than assuming it is on. The app and VS Code refuse to run the commands instead.

## Limit folders and network

The sandbox restricts shell commands, not every tool; [check integrations and sandbox boundaries](local-agent-integrations.md) covers the rest. For those commands, decide what the task needs:

- **Folders.** The working directory is included by default. Add other folders as read-only or read/write, and deny folders that hold anything sensitive. In the CLI, paths must be absolute, without wildcards.
- **Network.** Turning on the sandbox **does not block outbound connections** by default in the CLI or VS Code. Local-network access is off by default in both. To limit outbound connections, allow only the hosts the task needs; denied hosts win over allowed ones. In the CLI, set host rules in the **Network** tab of `/sandbox`; in the app you can only turn outbound internet and local network on or off.
- **Bypass.** When a command fails in the sandbox, Copilot can ask to retry it outside, and an approved retry runs without any sandbox limits. In VS Code, set `chat.agent.sandbox.allowUnsandboxedCommands` to `false` to make those requests fail instead. In the CLI, the **Allow sandbox bypass** setting controls this, and it is on by default.

The CLI keeps its sandbox settings under `sandbox` in its own `settings.json`, not in repository settings files. In VS Code they are ordinary settings, for example:

```json
{
  "chat.agent.sandbox.enabled": "on",
  "chat.agent.sandbox.fileSystem.userConfiguredPaths": {
    "readonlyPaths": ["/Users/me/projects/shared-library"],
    "deniedPaths": ["/Users/me/.aws"]
  },
  "chat.agent.sandbox.network.allowedDomains": ["registry.npmjs.org", "api.github.com"]
}
```

The sandbox is lightweight: it isn't a virtual machine or a separate user account, and on Windows a program that ignores proxy settings can get round host rules.

## Deny the commands you never want run

Approval prompts and deny rules work alongside the sandbox. In Copilot CLI, deny commands that could do substantial harm, even if requested by mistake:

```sh
copilot --deny-tool='shell(git push)' --deny-tool='shell(rm)'
```

A deny rule wins over any allow rule. For `git` and `gh`, name the subcommand, as in `shell(git push)`. Keep prompts for consequential commands: `--allow-all` (also `--yolo`) approves every tool, path and URL, so keep it for disposable environments.

The CLI's URL rules, `--allow-url` and `--deny-url`, cover its web fetch tool and recognized commands such as `curl`. They miss URLs that a command reads from a file, a configuration or an environment variable, so use the sandbox's network rules for real limits. VS Code's equivalents, `chat.tools.terminal.autoApprove` and `chat.tools.urls.autoApprove`, control which commands and URLs run without asking.

## Check it's working

Test one restriction you rely on, with a harmless command:

1. Run `/sandbox policy` (CLI or VS Code) to see the policy in force. Managed settings from your organization can make it stricter than yours.
2. Create a file in a folder you have denied, then ask the agent to run `cat` on it in the terminal. The command should fail.
3. If you limited the network, ask it to run `curl -sI https://example.com`. That should fail too, unless you allowed the host.

A blocked command shows that one rule works for shell commands. It doesn't prove the whole setup is isolated: the CLI's built-in file tools, for example, are checked on a best-effort basis rather than by the operating system.

## Sources

- [GitHub Docs: Configuring local sandbox settings](https://docs.github.com/en/copilot/how-tos/cloud-and-local-sandboxes/configuring-local-sandbox-settings)
- [GitHub Docs: About cloud and local sandboxes](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-and-local-sandboxes)
- [GitHub Docs: Configuring GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/configure-copilot-cli)
- [VS Code docs: Sandbox agent terminal commands](https://code.visualstudio.com/docs/agents/run/agent-sandboxing)
- [VS Code docs: Manage approvals and permissions](https://code.visualstudio.com/docs/agents/run/approvals)
