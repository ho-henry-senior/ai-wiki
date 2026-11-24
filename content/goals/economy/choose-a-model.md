---
type: explanation
summary: Recognise model failure modes and choose a model for the work.
status: developing
lane: guides
goal: economy
tags:
  - Copilot
  - Economy
  - Context and tokens
---

# Choosing a model

Model choice affects the investigation and verification a developer must do, not just inference cost. Price is an imperfect proxy for capability.

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

## Choose by the task

| Work                                              | Starting point                               | When to move up                                                               |
| ------------------------------------------------- | -------------------------------------------- | ----------------------------------------------------------------------------- |
| Formatting, documentation, simple transformations | Lightweight model                            | It misunderstands constraints or introduces unwanted edits                    |
| A well-specified feature, tests, routine refactor | Versatile or mid-priced model                | It struggles with integration or repeated failures                            |
| Unfamiliar code, tricky bugs, design decisions    | Powerful reasoning model                     | It still cannot establish a sound plan or check the result                    |
| Long autonomous implementation                    | A powerful agentic model, with bounded tasks | Compare its completed work against a cheaper alternative before standardising |

For a complicated feature, a powerful model can help agree the plan, then a cheaper model can implement a [small, independently reviewable change](../../concepts/change-granularity.md) in a **new session**. This avoids changing model halfway through a large cached conversation.

For evidence that your choice works, see [Evaluating your model choice](evaluate-model-choice.md).
