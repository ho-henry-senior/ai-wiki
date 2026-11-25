---
type: explanation
summary: A four-part illustrated explanation of what coding agents are made of, what model requests contain, how a task unfolds through tool calls, and what the model still sees in a long session.
status: developing
lane: guides
tags:
  - Context and tokens
---

# How coding agents work

A coding agent can look like a chat box that reads code, fixes bugs and runs tests. Behind that interface, a model can propose a command but cannot run it: the surrounding application decides what happens. Tool output it reads back may be incomplete or untrusted, and every repeated model request uses time and tokens.

Those boundaries explain much of the wiki's advice on [agent permissions](../goals/security/local-agent-security.md), [context](../concepts/session-history-vs-context.md), [cost](../goals/economy/choose-a-model-and-control-cost.md), and [verifying a task](../goals/alignment/define-and-verify-tasks.md). This guide uses diagrams and short request examples to show the system from four angles: its parts, the information it exchanges, how its actions repeat, and what it keeps in view as a session grows.

## Read the guide

1. [Inside a coding agent](inside-coding-agent.md) — identify the model, harness, tools and environment, and which component can actually act.
2. [What the model receives and returns](model-requests-and-responses.md) — examine the instructions, messages and tool definitions passed to a model, and the structured outputs it can produce.
3. [The tool-call loop](../concepts/tool-call-loop.md) — see how the model requests tools and receives their results.
4. [Session history and active context](../concepts/session-history-vs-context.md) — see why what a session has saved is not what the model sees next.
