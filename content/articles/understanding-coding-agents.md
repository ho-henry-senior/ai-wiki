---
type: explanation
summary: A three-part illustrated explanation of what coding agents are made of, what model requests contain, and how a task unfolds through tool calls.
status: developing
lane: articles
series: understanding-coding-agents
seriesOrder: 0
tags:
  - Context and tokens
---

# Understanding how coding agents work

A coding agent can look like a chat box that reads code, fixes bugs and runs tests. Behind that interface, a model and an application exchange messages, request tools and interpret results. This series opens that black box.

Follow one illustrative task throughout: **fix a failing test in a repository**. The diagrams show different views of the same process. The payload examples explain the information crossing each boundary; they are not captures of Copilot's private requests.

## Read the series

1. [Inside a coding agent](inside-coding-agent.md) — identify the model, harness, tools and environment, and which component can actually act.
2. [What the model receives and returns](model-requests-and-responses.md) — examine the instructions, messages and tool definitions passed to a model, and the structured outputs it can produce.
3. [How a coding agent carries out a task](../concepts/tool-call-loop.md) — follow a failing test through tool calls, results, a code change and verification.

## Why this matters

The mechanism explains both capabilities and limitations. A model can propose a command but cannot run it without the surrounding application; tool output may be incomplete or untrusted; repeated model requests use time and tokens. Understanding those boundaries helps make sense of the wiki's advice on [agent permissions](../goals/security/local-agent-security.md), [context](../concepts/session-history-vs-context.md), [cost](../goals/economy/choose-a-model-and-control-cost.md), and [verifying a task](../goals/alignment/define-and-verify-tasks.md).

These are **explanations**, not instructions for implementing an agent or a claim that all products work identically.
