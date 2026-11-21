---
type: how-to
summary: Decide which credentials a local agent's commands can use, give Copilot a narrowly scoped token, and keep secrets and real data out of what the agent reads and prints.
status: developing
lane: guides
goal: security
checked: 2026-11-21
recheck: every-run
check-against:
  - https://docs.github.com/en/copilot/how-tos/cloud-and-local-sandboxes/configuring-local-sandbox-settings
  - https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/authenticate-copilot-cli
tags:
  - Copilot
  - Security
  - Permissions and sandboxing
  - Data and privacy
---

# Protect credentials and sensitive data

A command can use any credential it can read: SSH keys, cloud CLI logins, tokens in environment variables, `.env` files, and your GitHub login. Without a sandbox, that is everything in your account. List what the task needs, then remove the rest.

## Control what the sandbox passes through

With the sandbox on, Copilot doesn't give commands your real Git and GitHub CLI credentials. They get placeholders, and a local proxy adds the real credentials only for approved HTTPS destinations. In the CLI these are the **Authenticate git** and **Authenticate gh** settings, both on by default; the app has matching toggles. Turn them off when the task doesn't need to fetch, push or call GitHub.

Other secrets need a decision:

- **Environment variables.** In the CLI, list a variable as masked and name the hosts allowed to receive its real value. Set the variable in the shell that starts Copilot, and never type the secret into the settings:

  ```json
  {
    "sandbox": {
      "enabled": true,
      "credentials": {
        "envVars": {
          "EXAMPLE_API_TOKEN": { "injectHosts": ["api.example.com"] }
        }
      }
    }
  }
  ```

- **Files.** Deny the folders that hold keys and logins, such as `~/.ssh` and `~/.aws`, unless the task needs them. In VS Code, developer-tool access is on by default and includes tool configuration and caches, which can contain package-registry tokens; turn off `chat.agent.sandbox.fileSystem.allowDevToolAccess` or deny those paths if they hold anything you can't risk.
- **The macOS keychain.** The CLI's sandbox keeps it out of reach by default. Leave it that way unless a task needs it.

A credential that a command receives can still be misused within its scope. Combine pass-through with [deny rules](local-sandbox-and-tool-restrictions.md#deny-the-commands-you-never-want-run), such as denying `git push`, when the agent shouldn't change anything remotely.

## Give Copilot a narrow GitHub token

Copilot CLI uses the first token it finds in `COPILOT_GITHUB_TOKEN`, `GH_TOKEN` or `GITHUB_TOKEN`, before your stored login. A broad token you exported for another tool is therefore the one it uses. Unset those variables, or give Copilot a token that can do nothing but make Copilot requests:

1. Create a [fine-grained personal access token](https://github.com/settings/personal-access-tokens/new) owned by your personal account, not an organization.
2. Under **Repository access**, choose **Public repositories**.
3. Under **Account** permissions, add **Copilot Requests**, and nothing else.
4. Set a short expiry, and pass it as `COPILOT_GITHUB_TOKEN` in the shell that starts the agent.

That token is only for talking to Copilot. The `git` and `gh` commands the agent runs use your own logins, through the sandbox's pass-through above, so limit those with the **Authenticate git** and **Authenticate gh** settings and with deny rules.

Classic tokens, which start `ghp_`, aren't supported, and the CLI ignores them.

## Keep secrets out of what the agent sees

Whatever a command prints goes into the model request and the saved session. A test that dumps environment variables, or a log with customer records, discloses them even if every write is blocked. Use synthetic fixtures and test accounts, and choose diagnostics that mask secrets before printing them; redacting the session afterwards can't undo the disclosure.

If a real credential appears in tool output, revoke or rotate it. Deleting the log doesn't remove the copy in the session or with the model provider. For a full trace of where data goes, use the [agent data-flow checklist](../../reference/agent-data-flow-checklist.md).

## Sources

- [GitHub Docs: Configuring local sandbox settings](https://docs.github.com/en/copilot/how-tos/cloud-and-local-sandboxes/configuring-local-sandbox-settings)
- [GitHub Docs: Authenticating GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/authenticate-copilot-cli)
- [GitHub Docs: Copilot CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference)
- [VS Code docs: Sandbox agent terminal commands](https://code.visualstudio.com/docs/agents/run/agent-sandboxing)
