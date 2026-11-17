---
type: overview
summary: Where an agent's time and tokens go, and how to spend less of both without giving up quality or security; signposted commands, small instructions, a watched context, and the right model.
status: established
lane: goals
goal: economy
order: 2
---

# Economy

The biggest waste is a run that misses, because you pay for the run and then for the redo; avoiding that is [Alignment](alignment.md)'s job. The next biggest is the agent working out what you could have told it, such as which test command to use. And because the model keeps nothing between requests, each one resends the session's context: instructions, the conversation so far, and tool output. Caching makes the repeated part cheaper, but a longer context still costs more on every turn. Cutting cost means cutting that waste, not cutting corners: a cheaper run is no saving if it misses the outcome.

## Core advice

- **Delegate repeatable work to well-signposted deterministic tools.** A test runner or linter gives the same answer every time, for no tokens, but only if the agent knows the command exists, what it does, and how to call it. Give it a command for one test, which answers in seconds while it edits, and a full gate to run once before handoff, and list both in `AGENTS.md`. [Give agents a command interface with Just](justfile-agent-workflows.md).
- **Keep instructions small.** `AGENTS.md` loads with every request, so every line in it costs on every turn. Keep it short, and point to detail that loads only when a task needs it. [Load context through focused entrypoints](../concepts/progressive-disclosure.md).
- **Watch the context.** Long sessions and large tool output make every later request bigger. In Copilot CLI, `/context` shows what the next request will carry, and `/compact` summarizes older parts before a new phase of work. [Session history versus context](../concepts/session-history-vs-context.md).
- **Match the model to the task.** Per token, the dearest Copilot models cost about a hundred times the cheapest. Use Auto or a mid-tier model by default, and switch only when a harder step is worth it, because switching mid-session loses the cache. [Choose a model and control cost](choose-a-model-and-control-cost.md).

Do not trade away [security](security.md) controls for speed. A faster run that leaks a credential is the most expensive run of all.

## Try this first

Expose a command for one test file or case, plus a full verification gate, and list both in `AGENTS.md`. On the next task, see whether Copilot runs the focused command while editing and the full gate before handoff.

## Explore further

Add a skill only when it pays off, since each one adds to what the agent loads: see [choose and add skills](useful-skills.md). For background, [evals](../concepts/evals.md) compare time, tokens, and outcomes across setups, and the [lo-fi software factory case study](lo-fi-software-factory-case-study.md) is an observed workflow, without a measured cost baseline.
