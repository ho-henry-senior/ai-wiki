---
type: reference
summary: Understand Copilot token pricing, caching, usage allowances and session limits.
status: developing
recheck: every-run
check-against:
  - https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing
  - https://docs.github.com/en/copilot/reference/ai-models/model-comparison
  - https://docs.github.com/en/copilot/reference/ai-models/supported-models
  - https://docs.github.com/en/copilot/tutorials/optimize-ai-usage
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/individuals/billing
  - https://docs.github.com/en/copilot/concepts/billing/usage-based-billing-for-organizations-and-enterprises
  - https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/set-session-limit
lane: guides
goal: economy
checked: 2026-11-15
tags:
  - Copilot
  - Economy
  - Context and tokens
---

# Understanding and controlling costs

Copilot charges for input, cached input, cache writes where applicable, and output. Input includes instructions, conversation history, files and tool results. Repeated context can dominate the cost of an agent session; see [session history and active context](../../concepts/session-history-vs-context.md).

## Control the cost of a session

1. **Agree the outcome and checks first.** Less guessing means fewer requests and fewer wrong turns; see [turn the specification into issues](../alignment/turn-specification-into-issues.md).
2. **Choose the model, reasoning effort and tools before starting.** Switching them can invalidate the context cache. If the task changes significantly, start a new session. For new work, start a new session (`/new` in the CLI) or run `/compact` rather than resume an old one.
3. **Keep the context focused.** Short repository instructions, targeted file reads and focused test output avoid repeatedly billing for irrelevant context; see [progressive disclosure](../../concepts/progressive-disclosure.md).
4. **Give work a boundary.** Small changes are easier to verify and retry without spending more credits redoing unrelated work; see [change granularity](../../concepts/change-granularity.md).
5. **Set limits and inspect usage.** In Copilot CLI, `/limits set max-ai-credits 100` sets a soft session limit. `/limits unset` removes it; `--max-ai-credits NUMBER` works for scripted runs. The current response can finish beyond the soft limit. Review spending under **AI usage** in [GitHub billing settings](https://github.com/settings/billing), and set a monthly budget separately.

## Current figures

The following figures retain the previous pricing review and the rates confirmed in the PR review. Check [GitHub's live pricing table](https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing) for newer models and promotions before estimating a run.

One AI Credit is US$0.01. Prices below are US dollars per million tokens at the standard context tier.

| Model             | Input | Cached input | Output |
| ----------------- | ----: | -----------: | -----: |
| GPT-6 Luna        | $0.10 |        $0.01 |  $0.50 |
| Claude Haiku 5.5  | $0.10 |        $0.01 |  $0.50 |
| Gemini 3.8 Flash  | $0.75 |       $0.075 |  $3.75 |
| GPT-6.1 Sol       | $2.00 |        $0.10 | $10.00 |
| Claude Sonnet 5.5 | $2.00 |        $0.10 | $10.00 |
| Claude Opus 5.5   | $4.00 |        $0.20 | $20.00 |

Gemini 3.8 Flash's promotional price ends 31 December 2026. Cache writes may incur additional charges. Long-context rates apply to some models, including Haiku 5.5 above 100,000 tokens and GPT-6.1 Sol above 272,000. Cache lifetime is one hour of inactivity for most models and 24 hours for OpenAI models.

Copilot Auto selects a model and receives a 10% model-cost discount on paid plans in supported surfaces. Free and Student plans have Auto only. Copilot Fusion offers Standard, High and Max effort levels; check availability and pricing in your client.

| Plan       | Price per month | AI Credits per month   |
| ---------- | --------------- | ---------------------- |
| Pro        | $10             | 1,500                  |
| Pro+       | $39             | 7,000                  |
| Max        | $100            | 20,000                 |
| Business   | $19 per user    | 1,900 per user, pooled |
| Enterprise | $39 per user    | 3,900 per user, pooled |

The CLI session limit has a minimum of 30 credits. Code completions and next edit suggestions do not consume AI Credits on paid plans. Copilot code review has separate token charges and GitHub Actions minutes.

### Estimate a task, not just a request

`cost in USD = (fresh input tokens × input rate + cached tokens × cached rate + output tokens × output rate + cache-write tokens × cache-write rate) / 1,000,000`

Apply any long-context rate and applicable discount; divide dollars by $0.01 to get AI Credits. For illustration, 100,000 fresh input, 400,000 cached input and 20,000 output tokens, excluding cache-write fees and discounts, cost $0.024 (2.4 credits) with GPT-6 Luna or $0.44 (44 credits) with GPT-6.1 Sol. These totals span multiple requests.

Retries consume some of the price advantage. Human review and remediation can dominate inference cost; see [Evaluating your model choice](evaluate-model-choice.md).

## Sources

- [GitHub Docs: Models and pricing for GitHub Copilot](https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing)
- [GitHub Docs: AI model comparison](https://docs.github.com/en/copilot/reference/ai-models/model-comparison)
- [GitHub Docs: Supported AI models](https://docs.github.com/en/copilot/reference/ai-models/supported-models)
- [GitHub Docs: Optimising AI usage](https://docs.github.com/en/copilot/tutorials/optimize-ai-usage)
- [GitHub Docs: Usage-based billing for individuals](https://docs.github.com/en/copilot/concepts/billing-and-usage/individuals/billing)
- [GitHub Docs: Usage-based billing for organisations and enterprises](https://docs.github.com/en/copilot/concepts/billing/usage-based-billing-for-organizations-and-enterprises)
- [GitHub Docs: Set a session limit](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/set-session-limit)
