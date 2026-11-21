---
type: how-to
summary: Compare the same real task with and without a skill, against results you can observe, record what you found, recheck after changes, and retire the skill when Copilot no longer needs it.
status: developing
lane: guides
tags:
  - Skills
  - Testing
---

# Test whether a skill helps

A skill adds to what the agent loads and needs upkeep. Keep one only if it makes a real task clearly better, and keep checking that it still does.

## 1. Choose a real task and what "better" means

Pick a task from your own work that the skill is meant for, such as turning a discussion into a specification. Before you run anything, write down what you will look for, in terms you can observe: the specification covers every agreed decision, the tests pass first time, or you made fewer corrections.

## 2. Run it without the skill

Start a fresh session and do the task without the skill. In Copilot CLI you can turn a skill off for the run with `/skills`. Note the result against your criteria.

## 3. Run it with the skill, under the same conditions

Use the same starting point, the same model and a fresh session, and do the task again with the skill. Check that the skill was actually used, for example by calling it by name. Otherwise you are comparing two runs without it.

## 4. Record what you found

Write down the task, the agent and its version, the model, the result for each run, and the date. Keep the record where the skill's users will find it, such as the pull request that adds the skill or a note beside it.

One comparison is evidence, not proof. If the difference is small, try a second task before deciding.

## 5. Keep, change or remove it

- **Keep it** if the result was clearly better and worth the upkeep.
- **Change it** if it helped but loaded at the wrong time or missed a step; then test again.
- **Remove it** if the results were the same, or worse.

## 6. Keep checking

Test again after you change the skill, after an update to an installed skill, and occasionally as Copilot changes. Agents build features in over time: when Copilot gains a built-in equivalent, record that and retire the skill.

## Sources

- [GitHub Docs: About agent skills](https://docs.github.com/en/copilot/concepts/customizations/agent-skills)
- [GitHub Docs: Adding agent skills for Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills)
