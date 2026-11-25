---
type: explanation
summary: Choose a model for the work, understand what differs between models, and recognise their failure modes.
status: developing
lane: guides
goal: economy
tags:
  - Copilot
  - Economy
  - Context and tokens
---

# Choosing a model

Choose a model by how much investigation the task needs: a lightweight model for specified, mechanical work, and a stronger one for unfamiliar code, tricky bugs and undecided design. Model choice affects the investigation and verification a developer must do, not just inference cost, and price is an imperfect proxy for capability.

## Choose by the task

If you have no evidence from your own repository yet, start with Copilot Auto or a mid-tier model for a typical implementation task, and check the result against independent acceptance criteria before making that choice routine.

| Work                                              | Starting point                               | When to move up                                                               |
| ------------------------------------------------- | -------------------------------------------- | ----------------------------------------------------------------------------- |
| Formatting, documentation, simple transformations | Lightweight model                            | It misunderstands constraints or introduces unwanted edits                    |
| A well-specified feature, tests, routine refactor | Versatile or mid-priced model                | It struggles with integration or repeated failures                            |
| Unfamiliar code, tricky bugs, design decisions    | Powerful reasoning model                     | It still cannot establish a sound plan or check the result                    |
| Long autonomous implementation                    | A powerful agentic model, with bounded tasks | Compare its completed work against a cheaper alternative before standardising |

For a complicated feature, a powerful model can help agree the plan, then a cheaper model can implement a [small, independently reviewable change](../../concepts/change-granularity.md) in a **new session**. This avoids changing model halfway through a large cached conversation.

## What differs between models?

A model choice trades off several things:

- **Reasoning and reliability.** Hard debugging, architectural decisions and ambiguous requirements can justify a stronger model. A straightforward, specified edit may not need that capability.
- **Speed.** A fast response matters for interactive iteration; a slower, more capable model may still finish an entire difficult task sooner.
- **Context.** Models differ in how much code, history and tool output they can work with. A larger window does not guarantee that the model will use every detail well.
- **Tools and inputs.** Models differ in support for images, tools and configurable reasoning. Availability also depends on your Copilot plan and surface.
- **Price.** Fresh input, cached input, cache writes and output may have different rates. Long-context pricing may apply beyond a threshold.

OpenAI, Anthropic, Google and other providers offer overlapping models. The provider name alone is not a reliable quality ranking. GitHub's [model comparison](https://docs.github.com/en/copilot/reference/ai-models/model-comparison) describes strengths by task, and its [supported models](https://docs.github.com/en/copilot/reference/ai-models/supported-models) page shows availability and capabilities.

## What can cheaper models get wrong?

The following are illustrative failure modes to look for when comparing models, not measured deficiencies of every inexpensive model.

| Failure mode                          | Example and consequence                                                                                                     |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Incomplete impact analysis            | Changes an API contract but misses a background worker that consumes it; the main application works while queued jobs fail. |
| Superficial pattern matching          | Copies a service without its transaction boundary; partial writes become possible.                                          |
| Weak edge-case reasoning              | Date filtering passes ordinary tests but fails across daylight saving changes.                                              |
| Tests that confirm the implementation | Implements the wrong business rule and writes tests that encode the same misunderstanding; all checks pass.                 |
| Symptom-driven debugging              | Suppresses an exception rather than fixing the underlying state transition; the defect becomes harder to diagnose.          |
| Premature completion                  | Updates the main migration path but misses imports or exports; the diff does not reveal the omission.                       |

These failures matter because omissions are harder to review than visible mistakes. A successful build or a sequence of successful routine tasks is not evidence that the next task is safe. Repeated local fixes can also accumulate duplicated logic and inconsistent abstractions.

Suppose you add a customer field. Updating the schema, entity and form may be straightforward, but deciding whether to backfill existing records, restrict access, redact audit logs or preserve API compatibility requires investigation. If those decisions are already agreed, a lightweight model may be suitable for implementation. If they are not, use a model capable of investigating the wider system, and have a person review the findings before implementation. A stronger model can miss these issues too.

For evidence that your choice works, see [Evaluating your model choice](evaluate-model-choice.md).
