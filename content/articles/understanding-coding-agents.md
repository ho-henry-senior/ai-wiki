---
type: explanation
summary: A three-part illustrated explanation of what coding agents are made of, what model requests contain, and how a task unfolds through tool calls.
status: developing
lane: guides
guide: understanding-coding-agents
guideOrder: 0
tags:
  - Context and tokens
---

# How coding agents work

A coding agent can look like a chat box that reads code, fixes bugs and runs tests. Behind that interface, a model and an application exchange messages, request tools and interpret results. This guide opens that black box.

The pages use diagrams and short request examples to explain the system from three angles: its parts, the information it exchanges, and how its actions repeat.

## Read the guide

1. [Inside a coding agent](inside-coding-agent.md) — identify the model, harness, tools and environment, and which component can actually act.
2. [What the model receives and returns](model-requests-and-responses.md) — examine the instructions, messages and tool definitions passed to a model, and the structured outputs it can produce.
3. [The tool-call loop](../concepts/tool-call-loop.md) — see how the model requests tools and receives their results.

## Why this matters

The mechanism explains both capabilities and limitations. A model can propose a command but cannot run it without the surrounding application; tool output may be incomplete or untrusted; repeated model requests use time and tokens. Understanding those boundaries helps make sense of the wiki's advice on [agent permissions](../goals/security/local-agent-security.md), [context](../concepts/session-history-vs-context.md), [cost](../goals/economy/choose-a-model-and-control-cost.md), and [verifying a task](../goals/alignment/define-and-verify-tasks.md).
