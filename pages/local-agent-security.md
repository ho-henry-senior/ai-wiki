---
type: guide
summary: Turn on the sandbox, restrict which tools, paths, and URLs Copilot can use without asking, and keep credentials out of reach when an agent runs on your computer.
status: developing
---

# Secure a local coding agent

When Copilot CLI, the Copilot app, or agent mode in your editor runs a command, it runs on your computer with your account's access, even though the model runs remotely. Limit that access with settings Copilot enforces, not with instructions.

## Try this first

1. **Turn on the sandbox.** In Copilot CLI, run `/sandbox enable`. It is off by default. See [sandbox a local coding agent](local-agent-sandboxing.md).
2. **Deny the commands you never want run without you.** For example: `copilot --deny-tool='shell(git push)' --deny-tool='shell(rm)'`. Deny rules win over allow rules.
3. **Do not approve everything.** Avoid `--allow-all` (also called `--yolo`) and `--allow-all-tools` outside a disposable environment. Allow specific tools instead, such as `--allow-tool='write'` to allow file edits without asking.
4. **Limit network destinations.** Use `--allow-url` and `--deny-url` to control which domains Copilot may reach.
5. **Keep credentials out of reach.** Do not run with production credentials or cloud CLI sessions logged in. The sandbox can block access to your Git and GitHub CLI credentials.

## What to check

| Boundary     | Question                                                                                                                                                                           |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Files        | Can commands read your home directory, SSH keys, or other repositories? By default, Copilot CLI can access the current directory, its subdirectories, and the temporary directory. |
| Commands     | Which commands run without asking, and do child processes inherit that?                                                                                                            |
| Network      | Can commands, or code they run, reach any host?                                                                                                                                    |
| Credentials  | Which tokens, SSH agents, credential helpers, and cloud CLI sessions are available?                                                                                                |
| Integrations | Do MCP servers run outside the sandbox?                                                                                                                                            |

**Approval is not isolation.** An approval prompt asks you whether to run an action; a sandbox limits what the action can do. Use both.

For unfamiliar repositories, third-party scripts, sensitive data, or unattended runs, use stronger isolation: a disposable container or virtual machine with only the files it needs, limited credentials, and explicit network rules.

Checked 15 November 2026 against GitHub's documentation on [configuring Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/configure-copilot-cli). Other local agents offer similar controls under different names; look for the equivalent of each step above.

For data destinations, use the [agent data-flow checklist](agent-data-flow-checklist.md).
