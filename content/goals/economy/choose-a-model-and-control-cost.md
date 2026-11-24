---
type: explanation
summary: Compare Copilot models by capability, speed, context and token price, choose one for the task, and estimate and control what a completed agent run costs.
status: developing
long-because: Combines model selection, practical failure modes and Copilot pricing in one reference.
recheck: every-run
check-against:
  - https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing
  - https://docs.github.com/en/copilot/reference/ai-models/model-comparison
  - https://docs.github.com/en/copilot/reference/ai-models/supported-models
  - https://docs.github.com/en/copilot/tutorials/optimize-ai-usage
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/individuals/billing
lane: articles
goal: economy
order: 1
checked: 2026-11-24
tags:
  - Copilot
  - Economy
  - Context and tokens
---

# Choose a model and control cost

A cheaper model can produce convincing code while missing requirements, dependencies or edge cases. Model choice affects how much investigation and verification a developer must do, as well as the cost of inference.

## What differs between models?

A model choice trades off several things:

- **Reasoning and reliability.** Hard debugging, architectural decisions and ambiguous requirements can justify a stronger model. A straightforward, specified edit may not need that capability.
- **Speed.** A fast response matters for interactive iteration; a slower, more capable model may still finish an entire difficult task sooner.
- **Context.** Models differ in how much code, history and tool output they can work with. A larger window does not guarantee that the model will use every detail well.
- **Tools and inputs.** Models differ in support for images, tools and configurable reasoning. Availability also depends on your Copilot plan and surface.
- **Price.** Fresh input, cached input, cache writes and output may have different rates. Long-context pricing may apply beyond a threshold.

OpenAI, Anthropic, Google and other providers offer overlapping models. The provider name alone is not a reliable quality ranking. GitHub's [model comparison](https://docs.github.com/en/copilot/reference/ai-models/model-comparison) describes strengths by task, and its [supported models](https://docs.github.com/en/copilot/reference/ai-models/supported-models) page shows availability and capabilities.

## What can cheaper models get wrong?

Price is not a reliable ranking of capability. The following are illustrative failure modes to look for when comparing models, not measured deficiencies of every inexpensive model.

| Failure mode | Example and consequence |
| --- | --- |
| Incomplete impact analysis | Changes an API contract but misses a background worker that consumes it; the main application works while queued jobs fail. |
| Superficial pattern matching | Copies a service without its transaction boundary; partial writes become possible. |
| Weak edge-case reasoning | Date filtering passes ordinary tests but fails across daylight saving changes. |
| Tests that confirm the implementation | Implements the wrong business rule and writes tests that encode the same misunderstanding; all checks pass. |
| Symptom-driven debugging | Suppresses an exception rather than fixing the underlying state transition; the defect becomes harder to diagnose. |
| Premature completion | Updates the main migration path but misses imports or exports; the diff does not reveal the omission. |

These failures matter because omissions are harder to review than visible mistakes. A successful build or a sequence of successful routine tasks is not evidence that the next task is safe. Repeated local fixes can also accumulate duplicated logic and inconsistent abstractions.

Consider adding a customer field. Updating the schema, entity and form may be straightforward, but deciding whether to backfill existing records, restrict access, redact audit logs or preserve API compatibility requires investigation. If those decisions are already agreed, a lightweight model may be suitable for implementation. If they are not, use a model capable of investigating the wider system, and have a person review the findings before implementation. A stronger model can miss these issues too.

## How to tell whether a model is suitable

Compare models on representative repository tasks from the same starting revision, with equivalent instructions, tools and acceptance criteria. Include a task with an integration boundary or a non-obvious edge case, not just mechanical edits. Define independent checks before running the agents. Inspect affected callers and negative cases, not only the tests each agent writes.

Record missed requirements, unnecessary edits, human corrections, review time and total credits across attempts. If a model repeatedly misses an explicitly supplied constraint, try a different model on the same task. If both miss it, investigate the specification, context and checks before attributing the failure to model capability. A small sample is local evidence, not a general model ranking.

## Choose by the task

| Work | Starting point | When to move up |
| --- | --- | --- |
| Formatting, documentation, simple transformations | Lightweight model | It misunderstands constraints or introduces unwanted edits |
| A well-specified feature, tests, routine refactor | Versatile or mid-priced model | It struggles with integration or repeated failures |
| Unfamiliar code, tricky bugs, design decisions | Powerful reasoning model | It still cannot establish a sound plan or check the result |
| Long autonomous implementation | A powerful agentic model, with bounded tasks | Compare its completed work against a cheaper alternative before standardising |

For a complicated feature, a powerful model can help agree the plan, then a cheaper model can implement a [small, independently reviewable change](../../concepts/change-granularity.md) in a **new session**. This avoids changing model halfway through a large cached conversation.

**Automatic selection:** Copilot **Auto** chooses a model for the task; on paid plans its model charges receive a 10% discount in supported surfaces. **Copilot Fusion** can select an execution pattern involving one or more models, with Standard, High and Max effort levels. GitHub lists a 30% Fusion model-cost discount for paid plans **through 30 November 2026**. These are different selection modes; check which your Copilot client offers. A predictable, repeatable task is also a good reason to pin a model for comparison.

## What the models cost

GitHub bills model usage in **AI Credits**, with **1 AI Credit = US$0.01**. The figures below are selected examples, **US dollars per million tokens**, at the standard context tier, as recorded in the page's pricing review. They are not a full catalogue or an independent performance ranking.

| Model | Typical role | Input | Cached input | Output |
| --- | --- | ---: | ---: | ---: |
| GPT-6 Luna | Lightweight | $0.10 | $0.01 | $0.50 |
| Claude Haiku 5.5 | Lightweight | $0.10 | $0.01 | $0.50 |
| Gemini 3.8 Flash | Versatile, inexpensive | $0.75 | $0.075 | $3.75 |
| GPT-6.1 Terra | General-purpose | $1.00 | $0.05 | $5.00 |
| GPT-6.2 Sol | Powerful coding | $2.00 | $0.10 | $10.00 |
| Claude Sonnet 5.5 | Versatile coding | $2.00 | $0.10 | $10.00 |
| Claude Opus 5.5 | Difficult work | $4.00 | $0.20 | $20.00 |
| GPT-6.2 Astra | Long-horizon work | $8.00 | $0.40 | $40.00 |

Some models, including the OpenAI and Anthropic examples, **also charge for cache writes**, not shown in this compact comparison. Longer-context tiers can cost more; for example, GPT-6.2 Sol's input price doubles above 272,000 input tokens. Promotional prices and model availability change. Look up the exact model, cache-write charge and context tier in [GitHub's live pricing table](https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing) before estimating a large run.

### Estimate a task, not just a request

A useful approximation is:

`cost in USD = (fresh input tokens × input rate + cached tokens × cached rate + output tokens × output rate + cache-write tokens × cache-write rate) / 1,000,000`

Apply any long-context rate and applicable discount; divide dollars by $0.01 to get AI Credits. For illustration, **100,000 fresh input, 400,000 cached input and 20,000 output tokens**, excluding cache-write fees and discounts, cost about **$0.024 (2.4 credits)** with GPT-6 Luna or **$0.44 (44 credits)** with GPT-6.2 Sol. These token totals are across calls, not a claim about one model request.

Actual agent runs include many requests, tool results and retries. Retries consume some of the price advantage; whether they erase it depends on the rates and token usage. Human review and remediation can dominate the inference cost. Compare completed tasks on **accepted output, time, credits and review effort**, not a model's rate alone.

## Control the cost of a session

1. **Agree the outcome and checks first.** Less guessing means fewer requests and fewer wrong turns; see [turn the specification into issues](../alignment/turn-specification-into-issues.md).
2. **Choose the model, reasoning effort and tools before starting.** Switching them can invalidate the context cache. If the task changes significantly, start a new session. For older CLI conversations, `/compact` reduces the history to rebuild.
3. **Keep the context focused.** Short repository instructions, targeted file reads and focused test output avoid repeatedly billing for irrelevant context; see [progressive disclosure](../../concepts/progressive-disclosure.md).
4. **Give work a boundary.** Small changes are easier to verify and retry without spending more credits redoing unrelated work; see [change granularity](../../concepts/change-granularity.md).
5. **Set limits and inspect usage.** In Copilot CLI, `/limits set max-ai-credits 100` sets a soft session limit (30 credits minimum). `/limits unset` removes it; `--max-ai-credits NUMBER` works for scripted runs. The current response can finish beyond the soft limit. Review spending under **AI usage** in [GitHub billing settings](https://github.com/settings/billing), and set a monthly budget separately.

Paid individual plans currently include monthly credits (Pro: 1,500 for $10; Pro+: 7,000 for $39; Max: 20,000 for $100). Those allowances can include a variable flex portion and do not roll over. Business and Enterprise allowances and organisational budgets differ; [GitHub's billing documentation](https://docs.github.com/en/copilot/concepts/billing-and-usage/individuals/billing) is the source for current plans. Code completions and next edit suggestions do not consume AI Credits on paid plans. Copilot code review has separate token charges and GitHub Actions minutes.

## Sources

- [GitHub Docs: Models and pricing for GitHub Copilot](https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing)
- [GitHub Docs: AI model comparison](https://docs.github.com/en/copilot/reference/ai-models/model-comparison)
- [GitHub Docs: Supported AI models](https://docs.github.com/en/copilot/reference/ai-models/supported-models)
- [GitHub Docs: Optimising AI usage](https://docs.github.com/en/copilot/tutorials/optimize-ai-usage)
- [GitHub Docs: Usage-based billing for individuals](https://docs.github.com/en/copilot/concepts/billing-and-usage/individuals/billing)
