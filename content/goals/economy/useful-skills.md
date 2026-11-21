---
type: reference
summary: What agent skills are, when a reusable procedure is worth adding, and how to test whether one helps before you keep it.
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

A **skill** is a reusable package of task-specific instructions in a `SKILL.md` file, optionally accompanied by reference material, scripts and templates. In agents that support skills, the name and description help the agent decide when to load the instructions, instead of putting every procedure in every task's context; see [progressive disclosure](../../concepts/progressive-disclosure.md).

Add a skill only when a task keeps coming up, the agent does not already handle it well, and the skill improves the result on a real case. Do not start by installing one: a skill adds to what the agent loads and needs upkeep, and without trying the task first you cannot tell whether it helps.

## Decide whether you need one

1. **Name the recurring task.** For example, "turn a discussion into a specification".
2. **Try it without a skill.** Copilot may already do it, or a line in `AGENTS.md` may be enough.
3. **Try the skill on one real case.** Keep it only if the result is clearly better and worth the setup and upkeep.
4. **Record what you found:** the task, the agent and version you used, the result, and the date.

Agents build features in over time. When Copilot gains a built-in equivalent, record that and retire the skill.

## Next steps

- **[Find an existing skill](../../reference/agent-skills-directory.md).** The directory lists GitHub-provided and community skills, with their sources and what is known about each. An entry is not evidence that a skill improves results in your project, so inspect its instructions and scripts, then try it on a real case.
- **[Write a SKILL.md](../../reference/writing-agent-skills.md)** when nothing fits: the file format, where Copilot finds it, and a worked example.
