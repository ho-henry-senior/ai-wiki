---
type: overview
summary: Get good results with less time and fewer tokens, without giving up quality or security; clear tasks, listed commands, focused checks and context.
status: established
---

# Economy

Get good results with less time and fewer tokens, without giving up quality or security. Most waste comes from rework and from the agent working out what you could have told it. A cheaper run is no saving if it misses the outcome.

## Try this first

Add your focused test command and your full check command to `AGENTS.md`, saying what each covers and whether it changes files. On the next task, see whether Copilot runs them instead of guessing.

## Core advice

- **Clarify the work early.** A clear "Done when" list prevents the most expensive rework. [Define, steer, and verify a task](define-and-verify-tasks.md#write-the-task).
- **Let tools do bounded work.** List the commands the agent should run, so it does not reconstruct them or approximate checks by reading code. [Let the agent run your repository's commands](agent-tool-delegation.md).
- **Run focused checks first.** Run the test for the behavior being changed, then the full check before handoff. [Passing tests are evidence, not proof](../concepts/tests-are-evidence.md).
- **Keep context small.** Keep `AGENTS.md` short and load detail only when a task needs it. [Load context through focused entrypoints](../concepts/progressive-disclosure.md).
- **Match the model to the task.** Use Auto or a mid-tier model by default, and keep it for the whole session. [Choose a model and control cost](choose-a-model-and-control-cost.md).
- **Add skills only when they pay off.** Try the task without one first. [Choose and add skills](useful-skills.md).

Do not trade away [security](security.md) controls for speed.

## Explore further

- [Evals](../concepts/evals.md) — background on comparing time, tokens, and outcomes across setups.
- [Case study: a lo-fi software factory](lo-fi-software-factory-case-study.md) — an observed workflow, without a measured cost baseline.
