---
type: guide
summary: "Files and tool output included in model requests go to the model provider, and copies can appear in session logs, pull requests, or CI logs; MCP integrations can send it to their own services."
status: established
lane: goals
goal: security
order: 2
---

# Unexpected data exposure

Files and tool output included in model requests go to the model provider, and copies can appear in session logs, pull requests, or CI logs; MCP integrations can send it to their own services.

Use a Business or Enterprise seat for work code, because individual plans train on interactions by default, and keep secrets out of the agent's reach.

More detail: [inference, retention, and training](../../concepts/inference-retention-training.md), [secrets in tool output](../../concepts/secrets-in-tool-output.md), and the [data-flow checklist](../../reference/agent-data-flow-checklist.md).
