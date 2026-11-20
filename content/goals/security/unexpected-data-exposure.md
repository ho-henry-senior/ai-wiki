---
type: guide
summary: "Files and tool output included in model requests go to the model provider, and copies can appear in session logs, pull requests, or CI logs; MCP integrations can send it to their own services."
status: established
lane: goals
goal: security
order: 2
tags:
  - Security
  - Data and privacy
---

# Unexpected data exposure

Files and tool output included in model requests go to the model provider, and copies can appear in session logs, pull requests, or CI logs; MCP integrations can send it to their own services.

Use a Business or Enterprise seat for work code, because individual plans train on interactions by default, and keep secrets out of the agent's reach.

Commands can disclose credentials or private data through diagnostic output without an intentional upload. Prevent sensitive output at its source; deleting a local log cannot retract data already sent or copied into synced sessions. Revoke or rotate exposed credentials.

More detail: [inference, retention, and training](../../concepts/inference-retention-training.md), [session history](../../concepts/session-history-vs-context.md), and the [data-flow checklist](../../reference/agent-data-flow-checklist.md).
