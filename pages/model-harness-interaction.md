---
type: explanation
summary: How a harness supplies context and tools to a model, handles tool requests, and manages session history and context limits.
---

# How models and harnesses interact

A coding assistant is more than a language model. The model generates responses; the surrounding software supplies context, exposes tools, and coordinates actions. Understanding this division helps explain how an assistant can work across files, remember a conversation, and act on external systems.

## Model, harness, and agent

The **model** processes input and generates output. Its response may be text for the user or a structured request to use a tool.

The **harness** is the surrounding software that manages the interaction: assembling model requests, providing tool definitions, handling tool requests, and managing conversation context. Tools may run locally, on a server, or through an external service.

An **agent** usually refers to the overall system pursuing a task using a model and tools. The terms are not universally standardized: some sources also use "agent" for the harness itself. When the distinction matters, name the model, harness, and tool separately.

Anthropic's [architecture explanation](https://code.claude.com/docs/en/how-claude-code-works) explicitly separates the model from the harness. OpenAI's [agent-loop explanation](https://openai.com/index/unrolling-the-codex-agent-loop/) describes the same broad pattern, while sometimes using "agent" and "harness" interchangeably.

## The interaction loop

The model requests an action; the harness checks and dispatches it, then supplies its result for the model to continue. One user turn can involve many such exchanges before an answer is displayed.

See [The model requests; the harness acts](../concepts/tool-call-loop.md) for the canonical loop, tool-definition details, and the difference between requesting and executing an action.

### A small example

Listing project files illustrates the division: the model requests `list_files(path=".")`, the harness returns the entries, and the model turns the result into an answer. The [complete example exchange](../concepts/tool-call-loop.md#example) shows each message.

## What goes into a model request?

A request can contain much more than the user's latest message:

- standing instructions and repository-specific guidance;
- conversation history, including previous tool calls and results;
- selected file contents, search results, or other retrieved context; and
- tool names, descriptions, and argument schemas.

Having access to a repository does not mean every file is included in every request. The harness and the agent's tool choices determine which material is loaded.

There is no single universal message schema. APIs commonly use structured payloads with role-tagged messages, tool definitions, tool-call items, and tool results. The exact fields, roles, and representation vary by provider and endpoint. Tool arguments are often described using JSON Schema.

OpenAI's [agent-loop article](https://openai.com/index/unrolling-the-codex-agent-loop/) includes concrete examples of request payloads and tool definitions. These illustrate one implementation, not a format every harness must use.

## Session history is not the context window

Saving a conversation and supplying context to a model are different operations. The next request may contain only selected history or a summary, even when the harness retains the original exchanges.

[Session history is not active context](../concepts/session-history-vs-context.md) explains the storage/context distinction, token limits, and compaction. This is why a long-running conversation can continue without every earlier detail remaining visible to the model.

## Does the model remember the conversation?

Continuity comes from context supplied through the harness and API, not an assumption that ordinary conversation updates the model's learned parameters. APIs may require supplied history or offer stored state; the [continuity explanation](../concepts/session-history-vs-context.md#who-manages-continuity) covers both. Avoid the absolute claim that every API is stateless.

## Why the distinction matters

Small, indexed documentation and focused tool results support [progressive disclosure](../concepts/progressive-disclosure.md): making the relevant detail available without loading everything. Clear tool descriptions help a model choose an appropriate action.

This architecture also provides a starting point for examining sensitive-data flows: data can exist in repository files, tool results, model requests, and saved session records. Those are distinct locations, with different access and retention properties; permission to read a file does not itself explain where its contents may subsequently go. See the [agent data-flow checklist](agent-data-flow-checklist.md).

## References

- [How Claude Code works](https://code.claude.com/docs/en/how-claude-code-works) — first-party explanation of models, the harness, tools, sessions, and context management.
- [Unrolling the Codex agent loop](https://openai.com/index/unrolling-the-codex-agent-loop/) — first-party walkthrough of the agent loop, request construction, message roles, and tool definitions.
- [Conversation state](https://developers.openai.com/api/docs/guides/conversation-state) — first-party explanation of manually supplied history and API-managed state.

These references explain shared architectural concepts. Product-specific setup and usage guidance for other harnesses is outside this wiki's scope.
