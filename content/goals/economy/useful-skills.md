---
type: explanation
summary: What an agent skill is, how Copilot decides to use one, how it differs from AGENTS.md and agent roles, and the steps for finding, installing, writing and testing one.
status: developing
lane: guides
goal: economy
checked: 2026-11-21
tags:
  - Copilot
  - Economy
  - Skills
---

# Skills

A **skill** is a reusable procedure for one kind of task, in a `SKILL.md` file, optionally with reference material, scripts and templates alongside it. Instead of putting every procedure in every task's context, the agent loads a skill only when a task needs it; see [progressive disclosure](../../concepts/progressive-disclosure.md).

## How Copilot uses a skill

1. **It knows the skill exists.** Copilot sees each available skill's name and description, not its instructions.
2. **It decides to use it.** When your prompt matches a skill's description, Copilot loads that `SKILL.md` into the agent's context. In Copilot CLI you can also call a skill by name, for example `/review-api-changes`.
3. **It follows the instructions.** The agent works through the steps and opens the skill's scripts, references or templates when the instructions point to them.

So the description decides whether a skill is ever used, and the instructions decide what happens when it is. A skill only guides the agent: it can't do anything the agent couldn't already do.

## Skills, instructions and roles

A skill sits between instructions that apply to every task and a role with its own responsibilities. Use a skill for a procedure you want repeated; put rules every task needs in `AGENTS.md`; and add an [agent role](../../concepts/skills-profiles-and-tools.md) only when the work needs separate responsibilities.

<!-- include -->

[Table: how a skill compares with AGENTS.md, an agent role and a tool](../../includes/skills-instructions-roles-tools.md)

## The steps

Before anything else, try the task without a skill. Copilot may already do it well, or a line in `AGENTS.md` may be enough. Add a skill only when a task keeps coming up and the agent doesn't handle it well.

- **[Skills worth trying](../../reference/agent-skills-directory.md):** the skills built into Copilot, and a few community skills this wiki refers to.
- **[Install an existing skill](../../reference/install-agent-skills.md):** read it, install it with `gh skill`, and check that Copilot can see it.
- **[Write your own skill](../../reference/writing-agent-skills.md):** where to put it, a description that gets it used at the right time, and a worked example.
- **[Test whether a skill helps](../../reference/test-agent-skills.md):** compare the same task with and without it, record the result, and retire it when it's no longer needed.

## Sources

- [GitHub Docs: About agent skills](https://docs.github.com/en/copilot/concepts/customizations/agent-skills)
- [GitHub Docs: Adding agent skills for Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills)
- [Agent Skills specification](https://agentskills.io/specification)
