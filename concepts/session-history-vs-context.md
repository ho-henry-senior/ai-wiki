---
type: reference
summary: What a session has saved is not what the model sees in its next request; in Copilot CLI, check with /context and summarize with /compact.
---

# Session history is not active context

What a session has saved is not the same as what the model sees next. Each request to the model carries a selection of the conversation, and long sessions get summarized. In Copilot CLI, run `/context` to see what the current context holds.

|            | Session history                                      | Active context                                                    |
| ---------- | ---------------------------------------------------- | ----------------------------------------------------------------- |
| What       | The saved conversation, tool calls, and results      | What is sent to the model in one request                          |
| Limited by | Storage and retention rules                          | The model's context window                                        |
| In Copilot | Saved locally, and synced to your account by default | Shown by `/context`: system prompt, instructions, tools, messages |

## How Copilot keeps long sessions going

When the conversation reaches about 80% of the context window, Copilot CLI summarizes older parts in the background. This is called **compaction**, and it can lose detail. Run `/compact` yourself before a new phase of work, optionally with a focus, such as `/compact focus on the export module`.

Compaction does not delete the saved history. A long debugging log can stay in the session while the model sees only a summary, and both may still contain sensitive data; see [secrets can leak through tool output](secrets-in-tool-output.md).

The model does not learn from the conversation. Continuity comes from what the harness sends with each request.

Checked 15 November 2026. Other agents work the same way under different commands.

## Sources

- [GitHub Docs: Managing context in Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/context-management)
- [GitHub Docs: Context management](https://docs.github.com/en/copilot/concepts/prompting-and-context/context-management)

Applied in [how models and harnesses interact](../pages/model-harness-interaction.md) and [the data-flow checklist](../pages/agent-data-flow-checklist.md).
