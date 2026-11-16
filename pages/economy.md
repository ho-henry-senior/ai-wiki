---
type: overview
summary: Where an agent's time and tokens go, and how to spend less of both without giving up quality or security; clear tasks, listed commands, focused checks, small context, and the right model.
status: established
lane: goals
goal: economy
order: 2
---

# Economy

The model keeps nothing between requests, so each one resends the session's current context: instructions, the conversation so far (summarized once it grows too long), and tool output. Caching makes the repeated part cheaper, but a longer context still costs more on every turn, which is why large outputs and long sessions add up. See [session history versus context](../concepts/session-history-vs-context.md). But the biggest waste is not a long session; it is a run that misses, because you pay for the run and then for the redo. The next biggest is the agent working out what you could have told it, such as which test command to use. Cutting cost means cutting those, not cutting corners: a cheaper run is no saving if it misses the outcome.

## Core advice

- **Clarify the work early.** A clear "Done when" list prevents the most expensive waste, a whole run spent on the wrong thing. [Define, steer, and verify a task](define-and-verify-tasks.md#write-the-task).
- **Advertise commands and run focused checks.** Give the agent a discoverable interface for individual tests and a composed final gate, so it does not spend turns reconstructing commands or run the whole suite after every edit. [Give agents a command interface with Just](justfile-agent-workflows.md).
- **Run focused checks first.** The test for the behavior being changed gives an answer in seconds and keeps output short; run the full check once, before handoff. [Passing tests are evidence, not proof](../concepts/tests-are-evidence.md).
- **Keep context small.** Instructions load with every request, so a long `AGENTS.md` costs on every turn. Keep it short and load detail only when a task needs it. [Load context through focused entrypoints](../concepts/progressive-disclosure.md).
- **Match the model to the task.** Prices per token vary widely between models. Switching model mid-session means the next request cannot reuse the cache, so switch when a harder step is worth it, not by habit. Use Auto or a mid-tier model by default. [Choose a model and control cost](choose-a-model-and-control-cost.md).
- **Add skills only when they pay off.** A skill adds to what the agent loads and is one more thing to maintain, so try the task without one first. [Choose and add skills](useful-skills.md).

Do not trade away [security](security.md) controls for speed. A faster run that leaks a credential is the most expensive run of all.

## Try this first

Expose a command for one test file or case, plus a full verification gate, and list both in `AGENTS.md`. On the next task, see whether Copilot runs the focused command while editing and the full gate before handoff.

## Explore further

- [Evals](../concepts/evals.md) — background on comparing time, tokens, and outcomes across setups.
- [Case study: a lo-fi software factory](lo-fi-software-factory-case-study.md) — an observed workflow, without a measured cost baseline.
