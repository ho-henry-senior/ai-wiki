---
type: reference
summary: Built-in GitHub Copilot skills and curated community and project skills, with availability, original sources and authors.
status: developing
lane: reference
order: 11
checked: 2026-11-18
tags:
  - Skills and custom agents
---

# Agent skills directory

This directory distinguishes **skills built into Copilot** from **community and project skills**. Built-in availability depends on the Copilot environment; third-party and project entries are examples to inspect and adapt, not tested endorsements or installations made by this wiki.

To build one, see [Write a SKILL.md](writing-agent-skills.md). For whether a skill is worth installing, see [Choose and add skills](../goals/economy/useful-skills.md).

## Built-in GitHub Copilot skills

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

### Copilot CLI: a separately documented example

The [Copilot CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#resource-discovery) documents a built-in `discover-resources` skill for searching public tool and skill catalogues **in experimental mode**. It proposes candidates; it does not install them. This is not evidence that the six app skills above are available in the CLI.

To inspect the skills actually found by your CLI, run `copilot skill list` in a terminal, or `/skills` and `/skills info` in an interactive session. These listings can include built-in, plugin, project and personal skills. See [GitHub's CLI skills guidance](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills).

**Checked:** 2026-11-18 against GitHub's documentation. Product-provided skills and invocation rules may change; consult the live reference rather than treating this as an exhaustive cross-product inventory.

## Community and project skills

The following eight skills come from their credited authors or maintainers. Each entry links to the original `SKILL.md` where it is published. Read the whole skill and bundled scripts before installation: a skill can ask an agent to run commands or act in external systems.

## Requirements and planning

### /grill-me and /grilling

**Author:** [Matt Pocock](https://github.com/mattpocock). **Source:** [grill-me](https://github.com/mattpocock/skills/blob/main/skills/productivity/grill-me/SKILL.md) and [grilling](https://github.com/mattpocock/skills/blob/main/skills/productivity/grilling/SKILL.md).

`/grill-me` delegates to `/grilling`. The latter interviews the user in rounds, clarifying dependencies between decisions before work begins. A deliberately intensive method; the user still owns the decisions.

### /to-spec

**Author:** [Matt Pocock](https://github.com/mattpocock). **Source:** [to-spec/SKILL.md](https://github.com/mattpocock/skills/blob/main/skills/engineering/to-spec/SKILL.md).

Synthesises a conversation and repository context into a specification. **Caution:** the source publishes to a configured tracker without a final approval of the full specification; [this wiki recommends human agreement](../goals/alignment/detailed-specification-from-agreed-decisions.md) before implementation.

### /to-tickets

**Author:** [Matt Pocock](https://github.com/mattpocock). **Source:** [to-tickets/SKILL.md](https://github.com/mattpocock/skills/blob/main/skills/engineering/to-tickets/SKILL.md).

Breaks a specification into verifiable vertical-slice tickets with explicit dependencies. Asks the user to approve the ticket breakdown before publishing to the configured tracker or local files.

## Implementation and review

### /tdd

**Author:** [Matt Pocock](https://github.com/mattpocock). **Source:** [tdd/SKILL.md](https://github.com/mattpocock/skills/blob/main/skills/engineering/tdd/SKILL.md).

A test-first workflow focused on observable behaviour at agreed interfaces. Requires test-boundary decisions and repository test tooling.

### /implement-spec

**Author:** [Matt Pocock](https://github.com/mattpocock). **Source:** [implement-spec/SKILL.md](https://github.com/mattpocock/skills/blob/main/skills/engineering/implement-spec/SKILL.md).

Coordinates ticket implementations through separate worktrees, subagents and an integration branch. Needs a configured tracker and supported tooling; [worktrees do not isolate permissions or credentials](git-worktrees-for-agents.md#what-worktrees-do-not-isolate).

### /code-review

**Author:** [Matt Pocock](https://github.com/mattpocock). **Source:** [code-review/SKILL.md](https://github.com/mattpocock/skills/blob/main/skills/engineering/code-review/SKILL.md).

Reviews a diff both against repository coding standards and the originating specification. It uses subagents; human review remains essential.

## Documentation and maintenance

### docs-sync-audit

**Maintainer:** [GitHub Awesome Copilot community](https://github.com/github/awesome-copilot). **Source:** [docs-sync-audit/SKILL.md](https://github.com/github/awesome-copilot/blob/main/skills/docs-sync-audit/SKILL.md).

Checks documentation claims against code/configuration and distinguishes confirmed drift from possible gaps. Its bundled script needs separate inspection. The repository maintainer is credited rather than assuming individual authorship.

### wiki-review

**Maintainer:** [Making the most of agents contributors](https://github.com/ho-henry-senior/ai-wiki). **Source:** [wiki-review/SKILL.md](https://github.com/ho-henry-senior/ai-wiki/blob/main/.agents/skills/wiki-review/SKILL.md).

Reviews this wiki's structure, navigation, duplicated concepts and design goals. Its procedures refer to project-specific conventions.

These eight entries were inspected on 2026-11-18, **not installed or executed** in this review. Their requirements and slash-command availability vary by product and may change. Recheck the source before adoption.
