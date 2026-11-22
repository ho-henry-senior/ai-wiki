---
type: reference
summary: The skills built into Copilot, and a short list of community skills this wiki refers to, with their sources and cautions.
status: developing
lane: guides
checked: 2026-11-18
recheck: every-run
check-against:
  - https://docs.github.com/en/copilot/reference/github-copilot-app-reference/built-in-skills
  - https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference
tags:
  - Copilot
  - Skills
---

# Skills worth trying

This is a short list, not a catalogue: the skills built into Copilot, and the few community skills that other pages in this wiki refer to. To look further, see [find more](#find-more). Inclusion here is not a tested endorsement.

## Built into Copilot

These are supplied by GitHub rather than installed from a community repository. GitHub's [Copilot app built-in skills reference](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/built-in-skills) lists six **app** skills; this is not a list of skills guaranteed to be available in Copilot CLI, IDEs, code review or the cloud agent. Some are explicitly invoked; others run as part of an app workflow.

| Skill                   | Copilot environment               | When to use it                                                                                               |
| ----------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `/af`                   | Copilot app                       | Find installable MCP servers, tools, skills and agents through Agent Finder.                                 |
| `/orchestrate`          | Copilot app                       | Coordinate child agent sessions across tasks or repositories.                                                |
| `/pr-stack`             | Copilot app                       | Manage dependent pull requests in a stack.                                                                   |
| `/create-canvas`        | Copilot app                       | Build or troubleshoot canvas extensions in the app.                                                          |
| `agent-merge`           | Copilot app, Agent Merge workflow | Respond to PR review comments, failing checks and merge conflicts. The workflow invokes it automatically.    |
| `customize-cloud-agent` | Copilot app                       | Configure the cloud agent's setup steps, dependencies, tools or runner; invoked for relevant setup requests. |

Not every built-in skill has a slash-command entrypoint. Type `/` in the Copilot app to see commands **available in the current context**. Do not confuse these skills with other built-in _slash commands_ or _custom agents_. See [GitHub's app slash-command reference](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/slash-commands).

### Copilot CLI

The [Copilot CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#resource-discovery) documents a built-in `discover-resources` skill for searching public tool and skill catalogues **in experimental mode**. It proposes candidates; it does not install them. This is not evidence that the six app skills above are available in the CLI.

To inspect the skills actually found by your CLI, run `copilot skill list` in a terminal, or `/skills` and `/skills info` in an interactive session. These listings can include built-in, plugin, project and personal skills. See [GitHub's CLI skills guidance](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills).

Product-provided skills and invocation rules may change; consult the live reference rather than treating this as an exhaustive cross-product inventory.

## Community skills this wiki refers to

These come from their credited authors, and other pages in this wiki link to them. They were read on 2026-11-18, **not installed or run**, and none has been [tested against the same task without it](test-agent-skills.md). Read the whole skill and any bundled scripts before you [install it](install-agent-skills.md).

### /grill-me and /grilling

**Author:** [Matt Pocock](https://github.com/mattpocock). **Source:** [grill-me](https://github.com/mattpocock/skills/blob/main/skills/productivity/grill-me/SKILL.md) and [grilling](https://github.com/mattpocock/skills/blob/main/skills/productivity/grilling/SKILL.md).

`/grill-me` delegates to `/grilling`. The latter interviews the user in rounds, clarifying dependencies between decisions before work begins. A deliberately intensive method; the user still owns the decisions.

### /to-spec

**Author:** [Matt Pocock](https://github.com/mattpocock). **Source:** [to-spec/SKILL.md](https://github.com/mattpocock/skills/blob/main/skills/engineering/to-spec/SKILL.md).

Synthesises a conversation and repository context into a specification. **Caution:** the source publishes to a configured tracker without a final approval of the full specification; [this wiki recommends human agreement](../goals/alignment/agree-on-the-problem.md) before implementation.

### /to-tickets

**Author:** [Matt Pocock](https://github.com/mattpocock). **Source:** [to-tickets/SKILL.md](https://github.com/mattpocock/skills/blob/main/skills/engineering/to-tickets/SKILL.md).

Breaks a specification into verifiable vertical-slice tickets with explicit dependencies. Asks the user to approve the ticket breakdown before publishing to the configured tracker or local files.

## Find more

- [github/awesome-copilot](https://github.com/github/awesome-copilot) and [anthropics/skills](https://github.com/anthropics/skills) collect skills that follow the open format.
- `gh skill search TERM` searches GitHub repositories for skills; see [install an existing skill](install-agent-skills.md#1-find-a-candidate).
- In the Copilot app, the built-in `/af` skill searches Agent Finder.

A listing anywhere, including here, is not evidence that a skill improves results in your project.

## Sources

- [GitHub Docs: Built-in skills for the GitHub Copilot app](https://docs.github.com/en/copilot/reference/github-copilot-app-reference/built-in-skills)
- [GitHub Docs: Copilot CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference)
- [GitHub Docs: About agent skills](https://docs.github.com/en/copilot/concepts/customizations/agent-skills)
