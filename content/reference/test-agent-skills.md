---
type: how-to
summary: Compare a real task with the skill switched on and off, make sure it was actually used, retest after you change it, and retire it when Copilot does the same job.
status: developing
lane: guides
tags:
  - Skills
  - Testing
---

# Test whether a skill helps

A skill adds to what the agent loads and needs upkeep, so keep one only if it makes a real task clearly better. Most of that is an ordinary before-and-after comparison. Four things are specific to skills:

- **Switch it off for the comparison.** In Copilot CLI, `/skills` lets you turn a skill off for a run, so you can do the same task with and without it, in fresh sessions.
- **Make sure it was used.** If the agent didn't load the skill, you are comparing two runs without it. Call it by name, such as `/review-api-changes`, or check that the agent says it used it.
- **Retest after you change it.** The description decides whether the skill is chosen, so an edit to the description can stop it being used at all.
- **Retire it when Copilot does the same job.** Agents gain features over time; when Copilot handles the task as well without the skill, remove it.

Record what you compared and what you found, for example in the pull request that adds the skill, so others know why it's there.

## Sources

- [GitHub Docs: Adding agent skills for Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills)
