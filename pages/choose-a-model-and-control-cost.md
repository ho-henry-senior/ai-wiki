---
type: guide
summary: How Copilot charges for tokens, which model tier to use for which task, and how to keep a session's cost down and capped.
status: developing
recheck: every-run
check-against:
  - https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/individuals/billing
  - https://docs.github.com/en/copilot/concepts/billing/usage-based-billing-for-organizations-and-enterprises
  - https://docs.github.com/en/copilot/tutorials/optimize-ai-usage
  - https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/set-session-limit
lane: guidance
goal: economy
order: 1
checked: 2026-11-15
applies-to:
  - editor
  - cli
  - app
  - cloud-agent
---

# Choose a model and control cost

Use Auto or a mid-tier model by default, step up for hard problems and down for routine ones, and keep the model fixed for the session. The model is the biggest cost lever: per token, the dearest Copilot models cost about a hundred times the cheapest.

## Try this first

Cap your next Copilot CLI task with `/limits set max-ai-credits 100`. Afterwards, compare its spend in **AI usage** in your [billing settings](https://github.com/settings/billing) with the [worked example](#current-figures).

## How Copilot charges

Copilot prices each request's tokens at the model's rate and converts the total into AI Credits, at one US cent each. Plans include a monthly allowance, pooled across the organization on Business and Enterprise. Code completions and next edit suggestions are free. Each request is charged for:

- **Input:** instructions, the conversation so far, file contents, and tool output.
- **Cached input:** input stored from a recent request, at a tenth of the input rate or less.
- **Output:** what the model writes, including reasoning, at several times the input rate.

The context is resent with every request, so repeated input can become a large part of an agent session's cost: a long log read early may be included in later requests until compaction removes it, at the cached rate while the cache holds. See [the tool-call loop](../concepts/tool-call-loop.md) and [session history versus context](../concepts/session-history-vs-context.md).

## Choose a tier

| Tier  | Use it for                                                                |
| ----- | ------------------------------------------------------------------------- |
| Small | Renames, formatting, documentation, summarizing output, running subagents |
| Mid   | Most tasks, once the plan is clear                                        |
| Large | Hard debugging, changes across many files, planning                       |
| Top   | The occasional task the large tier cannot do                              |

A stronger model often needs fewer turns, so the gap per task is smaller than per token, and a cheap run you redo costs more than a dear one you accept. For a large change, plan with a stronger model, then implement with a cheaper one in a new session.

**Auto** chooses for you in Copilot Chat, the CLI, the app, and the cloud agent, switches only at cache boundaries, and is discounted on paid plans. Free and Student plans have Auto only. Code review picks its own undisclosed model and also uses Actions minutes.

## Keep the cache

The next request pays full rate for the whole context if you:

- switch model during a session;
- change reasoning effort, context size, or the enabled tools or MCP servers;
- return to a session after the cache has expired.

Choose the model and settings before you start. For new work, start a new session (`/new` in the CLI) or run `/compact` rather than resume an old one.

## Cut tokens

- **Write a clear task** with a "Done when" list: [define, steer, and verify a task](define-and-verify-tasks.md#write-the-task).
- **Keep instructions short;** they load with every task in the features that read them: [load context through focused entrypoints](../concepts/progressive-disclosure.md).
- **List focused commands,** so the agent does not read whole logs: [let the agent run your repository's commands](agent-tool-delegation.md).
- **Enable only the MCP toolsets** the task needs, and raise reasoning effort only for hard tasks.

## Cap a session

In Copilot CLI, `/limits set max-ai-credits NUMBER` caps a session and `/limits unset` removes the cap; scripted runs take `--max-ai-credits NUMBER`. The cap is soft: a response in progress finishes. The lowest cap Copilot accepts is 30 AI Credits. For a monthly ceiling, set a budget in billing settings.

## Current figures

Sources: GitHub's documentation on [pricing](https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing), [individual billing](https://docs.github.com/en/copilot/concepts/billing-and-usage/individuals/billing), [organization billing](https://docs.github.com/en/copilot/concepts/billing/usage-based-billing-for-organizations-and-enterprises), [optimization](https://docs.github.com/en/copilot/tutorials/optimize-ai-usage), and [session limits](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/set-session-limit).

| Plan       | Price per month | AI Credits per month   |
| ---------- | --------------- | ---------------------- |
| Pro        | $10             | 1,500                  |
| Pro+       | $39             | 7,000                  |
| Max        | $100            | 20,000                 |
| Business   | $19 per user    | 1,900 per user, pooled |
| Enterprise | $39 per user    | 3,900 per user, pooled |

Prices per million tokens:

| Tier  | Examples                       | Input  | Cached input | Output  |
| ----- | ------------------------------ | ------ | ------------ | ------- |
| Small | Claude Haiku 5.5, GPT-6 Luna   | $0.10  | $0.01        | $0.50   |
| Mid   | Claude Sonnet 5.5, GPT-6.1 Sol | $2.00  | $0.10        | $10.00  |
| Large | Claude Opus 5.5                | $4.00  | $0.20        | $20.00  |
| Top   | Claude Fable 5.2, GPT-6 Astra  | $8–$10 | $0.20–$1.00  | $40–$50 |

- **Long context:** many models charge about double above a threshold, such as 100,000 tokens for Claude Haiku 5.5 and 272,000 for GPT-6 models.
- **Cache writes:** Anthropic and newer OpenAI models also charge for writing to the cache.
- **Cache lifetime:** 1 hour of inactivity for most models; 24 hours for OpenAI models.
- **Auto discount:** 10% off model costs on paid plans.
- **Worked example:** 40 requests averaging 60,000 tokens of context, 90% cached, with 1,000 output tokens each, cost about 7 credits on small, 110 on mid, 220 on large, and 400 to 660 on top, before cache writes.
