---
type: guide
summary: Why a local agent's commands are as powerful as you are, and how to limit them in Copilot with the sandbox, tool and URL rules, and credentials kept out of reach.
status: established
lane: guidance
goal: security
order: 1
checked: 2026-11-16
tags:
  - Copilot in the editor
  - Copilot CLI
  - Copilot app
---

# Secure a local coding agent

When Copilot CLI, the Copilot app, or agent mode in your editor runs a command, the model only asks for it; the command itself runs on your computer, with your account. Without restrictions it could reach whatever you can: your SSH keys, tokens, other repositories, and the network. A mistaken command or an [injected instruction](prompt-injection-coding-agents.md) is limited only by what Copilot's settings allow, so set those limits rather than relying on instructions, which the model can be talked out of.

## Try this first

1. **Turn on the sandbox.** It makes the operating system enforce limits on files, network, and credentials, so a command that goes beyond them fails even if you approve it. In Copilot CLI, run `/sandbox enable`; it is off by default. See [sandbox a local coding agent](local-agent-sandboxing.md).
2. **Deny the commands that would do most harm if the agent were misled,** such as publishing or deleting: `copilot --deny-tool='shell(git push)' --deny-tool='shell(rm)'`. Deny rules take precedence over allow rules, so a broad allow elsewhere cannot switch them back on.
3. **Keep the approval prompts,** your last chance to see a command before it runs. `--allow-all`, also called `--yolo`, removes every prompt and every path and URL restriction, so use it only in a disposable environment. Allow narrowly instead: `--allow-tool='write'` lets Copilot edit files without asking, which you can review and undo with Git, while shell commands still ask.
4. **Restrict URLs, and know what that covers.** `--allow-url` and `--deny-url` apply to Copilot's web fetch tool and to network commands it recognizes, such as `curl` and `wget`. A script or program the agent runs can still connect elsewhere, so use the sandbox's network settings for a real limit.
5. **Log out of what you would not hand over.** Any credential your session can use, a command the agent runs can use too, and its output goes to the model. Do not run with production credentials or cloud CLI sessions logged in. The sandbox can also block access to your Git and GitHub CLI credentials.

## What to check

| Boundary     | Question                                                                            | Why it matters                                                                                                                                                              |
| ------------ | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Files        | Can commands read your home directory, SSH keys, or other repositories?             | Copilot CLI's path rules allow the current directory, its subdirectories, and the temporary directory by default; the sandbox enforces file limits in the operating system. |
| Commands     | Which commands run without asking, and do the programs they start inherit that?     | A test runner or package install can run any code in the repository.                                                                                                        |
| Network      | Can commands, or code they run, reach any host?                                     | The network is how stolen data leaves and how unvetted code arrives.                                                                                                        |
| Credentials  | Which tokens, SSH agents, credential helpers, and cloud CLI sessions are available? | Whatever is available can be used, or printed into output the model sees.                                                                                                   |
| Integrations | Do MCP servers run outside the sandbox?                                             | An MCP server runs as its own process, and the sandbox may not cover it.                                                                                                    |

**Approval is not isolation.** An approval prompt depends on you reading each command, and after dozens of harmless ones, people stop reading. A sandbox limits what the command can do whether or not you read it. Use both.

**Use a container or virtual machine when you trust the work less.** An unfamiliar repository can run its own code the moment the agent installs dependencies or runs tests, and an unattended run has nobody reading the prompts. Give the container only the files it needs, limited credentials, and explicit network rules.

Source: GitHub's documentation on [configuring Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/configure-copilot-cli). Other local agents offer similar controls under different names; look for the equivalent of each step above. For where data goes, use the [agent data-flow checklist](agent-data-flow-checklist.md).
