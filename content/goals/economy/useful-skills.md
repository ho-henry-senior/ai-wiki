---
type: reference
summary: What agent skills are, when a reusable procedure is worth adding, how Copilot finds skills, and how to test their value.
status: developing
lane: guides
goal: economy
order: 2
checked: 2026-11-15
tags:
  - Copilot
  - Economy
  - Skills
---

# Skills

## What a skill is, and when to add one

A **skill** is a reusable package of task-specific instructions in a `SKILL.md` file, optionally accompanied by reference material, scripts and templates. In agents that support skills, the name and description help the agent decide when to load the instructions, instead of putting every procedure in every task's context.

Add a skill only when a task keeps coming up, the agent does not already handle it well, and the skill improves the result on a real case. Do not start by installing one: a skill adds to what the agent loads and needs upkeep, and without trying the task first you cannot tell whether it helps.

## Choose where to begin

Use this page to decide whether a skill helps your task. To create one, go to [Write a SKILL.md](../../reference/writing-agent-skills.md); to inspect existing examples, go to the [agent skills directory](../../reference/agent-skills-directory.md). Read the resources in that order for a practical introduction, or jump directly to whichever you need.

## Decide whether you need one

1. **Name the recurring task.** For example, "turn a discussion into a specification".
2. **Try it without a skill.** Copilot may already do it, or a line in `AGENTS.md` may be enough.
3. **Try the skill on one real case.** Keep it only if the result is clearly better and worth the setup and upkeep.
4. **Record what you found:** the task, the agent and version you used, the result, and the date.

Agents build features in over time. When Copilot gains a built-in equivalent, record that and retire the skill.

## Where Copilot finds skills

Put project skills in `.agents/skills/NAME/SKILL.md`. Copilot reads it, and the folder is not named after one product. Copilot also reads `.github/skills/` and `.claude/skills/`. The `SKILL.md` format is the open Agent Skills standard, so the same skill can work in other agents that support it.

| Copilot feature                                     |  Loads project skills   |
| --------------------------------------------------- | :---------------------: |
| Cloud agent and code review on GitHub.com           |           Yes           |
| Copilot CLI and the Copilot app                     |           Yes           |
| Agent mode in VS Code, Visual Studio, and JetBrains | Yes (version-dependent) |

In the Copilot features that support skills, the agent uses each skill's name and description to choose one, then loads its instructions when the task calls for it. Personal skills go in `~/.copilot/skills/` or `~/.agents/skills/`, but cloud sessions do not see them; put any skill the cloud agent needs in the repository. `gh skill` in the GitHub CLI can find and install skills from GitHub repositories.

Source: GitHub's [agent skills documentation](https://docs.github.com/en/copilot/concepts/customizations/agent-skills).

## Find an existing skill

The [agent skills directory](../../reference/agent-skills-directory.md) lists GitHub-provided and community examples, with original sources and inspection notes. Inspect the instructions and bundled scripts before adopting one; the directory's entries are **not** evidence that a skill improves results in your project.

You can also [write a SKILL.md](../../reference/writing-agent-skills.md) with a worked example.
