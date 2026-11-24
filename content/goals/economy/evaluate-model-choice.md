---
type: how-to
summary: Compare models on representative tasks with independent checks and record the human effort and cost.
status: developing
lane: guides
goal: economy
tags:
  - Copilot
  - Economy
  - Context and tokens
---

# Evaluating your model choice

Compare models on representative repository tasks from the same starting revision, with equivalent instructions, tools and acceptance criteria. Include a task with an integration boundary or a non-obvious edge case, not just mechanical edits. Define independent checks before running the agents. Inspect affected callers and negative cases, not only the tests each agent writes.

Record missed requirements, unnecessary edits, human corrections, review time and total credits across attempts. If a model repeatedly misses an explicitly supplied constraint, try a different model on the same task. If both miss it, investigate the specification, context and checks before attributing the failure to model capability. A small sample is local evidence, not a general model ranking. 

## Record the comparison

Use a clean starting revision for each run. Record the model and reasoning effort, task, acceptance criteria, missed requirements, unrelated edits, human interventions, elapsed time, review time and total credits. Repeat where practical: one successful run does not establish reliability.

For example, ask each model to change an API field with a known secondary consumer. Check the consumer independently, even if the agent's tests pass. A model that misses the consumer has not completed the task, regardless of its token cost.

Use the results to decide which kinds of work to delegate to each model. Reassess when the model, repository or task changes. See [Understanding and controlling costs](model-costs.md) for estimating inference costs.
