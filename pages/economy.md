---
type: overview
summary: Where an agent's time and tokens go, and how to spend less of both without giving up quality or security; clear tasks, listed commands, focused checks, small context, and the right model.
status: established
---

# Economy

The model keeps nothing between requests, so each one resends the session's current context: instructions, the conversation so far (summarized once it grows too long), and tool output. Caching makes the repeated part cheaper, but a longer context still costs more on every turn, which is why large outputs and long sessions add up. See [session history versus context](../concepts/session-history-vs-context.md). But the biggest waste is not a long session; it is a run that misses, because you pay for the run and then for the redo. The next biggest is the agent working out what you could have told it, such as which test command to use. Cutting cost means cutting those, not cutting corners: a cheaper run is no saving if it misses the outcome.

## Core advice

- **Clarify the work early.** A clear "Done when" list prevents the most expensive waste, a whole run spent on the wrong thing. [Define, steer, and verify a task](define-and-verify-tasks.md#write-the-task).
- **Let tools do bounded work.** List the commands the agent should run, so it does not spend turns reconstructing them or approximate a check by reading code. [Let the agent run your repository's commands](agent-tool-delegation.md).
- **Run focused checks first.** The test for the behavior being changed gives an answer in seconds and keeps output short; run the full check once, before handoff. [Passing tests are evidence, not proof](../concepts/tests-are-evidence.md).
- **Keep context small.** Instructions load with every request, so a long `AGENTS.md` costs on every turn. Keep it short and load detail only when a task needs it. [Load context through focused entrypoints](../concepts/progressive-disclosure.md).
- **Match the model to the task.** Prices per token vary widely between models. Switching model mid-session means the next request cannot reuse the cache, so switch when a harder step is worth it, not by habit. Use Auto or a mid-tier model by default. [Choose a model and control cost](choose-a-model-and-control-cost.md).
- **Add skills only when they pay off.** A skill adds to what the agent loads and is one more thing to maintain, so try the task without one first. [Choose and add skills](useful-skills.md).

Do not trade away [security](security.md) controls for speed. A faster run that leaks a credential is the most expensive run of all.

## Try this first

Add your focused test command and your full check command to `AGENTS.md`, saying what each covers and whether it changes files. On the next task, see whether Copilot runs them instead of guessing.

## Explore further

- [Evals](../concepts/evals.md) — background on comparing time, tokens, and outcomes across setups.
- [Case study: a lo-fi software factory](lo-fi-software-factory-case-study.md) — an observed workflow, without a measured cost baseline.
