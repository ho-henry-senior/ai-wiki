---
type: reference
summary: Add a skill only for a recurring task the agent does not already handle well, try it on a real case first, and know where Copilot finds skills; includes candidates to evaluate.
status: developing
lane: guidance
goal: economy
order: 2
checked: 2026-11-15
---

# Choose and add skills

Add a skill only when a task keeps coming up, the agent does not already handle it well, and the skill improves the result on a real case. Do not start by installing one: a skill adds to what the agent loads and needs upkeep, and without trying the task first you cannot tell whether it helps.

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

## Candidates to evaluate

None of these has been tried here, and built-in equivalents have not been checked. Treat them as ideas to test with the steps above.

| Skill                                                                                                   | Task                                                                 | Notes                                                                                                                                                                                       | Reviewed   |
| ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| [Matt Pocock: to-spec](https://github.com/mattpocock/skills/tree/main/skills/engineering/to-spec)       | Turn a discussion and codebase into a specification                  | Publishes to your issue tracker with a `ready-for-agent` label without asking you to approve the finished spec first; adapt it if you want approval.                                        | 2026-11-14 |
| [Matt Pocock: to-tickets](https://github.com/mattpocock/skills/tree/main/skills/engineering/to-tickets) | Break a plan into independently verifiable tickets with dependencies | Asks you to approve the breakdown before publishing; works with local ticket files or an issue tracker.                                                                                     | 2026-11-14 |
| [Matt Pocock: TDD](https://github.com/mattpocock/skills/tree/main/skills/engineering/tdd)               | Write tests that check behavior, not implementation                  | Includes notes on [good and bad tests](https://github.com/mattpocock/skills/blob/main/skills/engineering/tdd/tests.md).                                                                     | 2026-11-13 |
| [pstack: TDD](https://github.com/backnotprop/pstack/blob/main/skills/tdd/SKILL.md)                      | Decide when to add a regression test                                 | Prefers no test over a bad one; pairs with [Test Behavior, Not Implementation](https://github.com/backnotprop/pstack/blob/main/skills/principle-test-behavior-not-implementation/SKILL.md). | 2026-11-13 |

When a candidate passes a trial, record the task, the agents it works with, the evidence, any built-in equivalent, and the review date, and move it into a "Tried" section.

For how skills differ from custom agents and tools, see [skills, profiles, and tools have different jobs](../concepts/skills-profiles-and-tools.md).
