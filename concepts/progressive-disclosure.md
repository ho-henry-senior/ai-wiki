---
type: pattern
summary: Keep what the agent loads for every task small, and let detail load only when a task needs it; in Copilot, through a short AGENTS.md, path-specific instructions, and skills.
status: established
lane: guidance
goal: concepts
order: 4
checked: 2026-11-15
---

# Load context through focused entrypoints

Keep what the agent loads for every task small, and let detail load only when a task needs it. This is often called **progressive disclosure**. Material loaded routinely takes up context and can add to token costs across requests, and detail that does not apply to the task can crowd out detail that does.

## In Copilot

| Loads                                    | When                                                                                                          |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `AGENTS.md`                              | Every task, in the Copilot features that read it                                                              |
| `.github/instructions/*.instructions.md` | Only when working on files that match `applyTo`                                                               |
| Skills in `.agents/skills/`              | The agent sees each available skill's name and description; the full instructions load when the skill is used |
| A linked document                        | Only if the agent decides to open it                                                                          |

So keep `AGENTS.md` to what every task needs, and move the rest into path-specific files, skills, or linked documents. A release procedure belongs in a skill or a linked page, not in `AGENTS.md`.

## Make the links worth following

Write each link so the agent can tell when it matters, for example "Before changing the export format, read `docs/export.md`." Keep each explanation in one place and update links when it moves. Small files alone do not help if their names are unclear.

## Limits

Copilot CLI loads a file referenced as `@path` from `AGENTS.md` immediately, so an `@` reference is not on demand. An ordinary link is followed only if the agent chooses to. Keep rules that every task needs in `AGENTS.md` itself.

See [write repository instructions in AGENTS.md](../pages/repository-instructions.md) and [choose and add skills](../pages/useful-skills.md).

## Sources

- [Agent Skills specification: Progressive disclosure](https://agentskills.io/specification#progressive-disclosure)
- [GitHub Docs: Add custom instructions for Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions)
