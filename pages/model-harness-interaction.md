---
type: guide
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

1. The harness assembles a request containing instructions, relevant conversation context, and definitions of available tools.
2. The model generates a response or requests a tool call.
3. For a tool call, the harness applies its permission and validation rules. It may execute the request, ask for approval, or return an error or denial.
4. The harness supplies the tool result to the model as part of the next request.
5. The model continues using that information, potentially requesting more tools before producing an answer.

A single user request can therefore involve many model requests. The model requests actions; the harness and connected tools perform them.

### A small example

Suppose the user asks, "What files are in the project root?" The harness exposes a tool named `list_files`, with a description and a schema specifying a required string argument named `path`.

The following is illustrative, not the wire format of a particular API:

```text
Harness -> Model:
  User: What files are in the project root?
  Tool: list_files(path: string) lists entries in a directory.

Model -> Harness:
  Tool call: id="call-1", name="list_files", arguments={"path":"."}

Harness:
  Checks the request and runs the tool.

Harness -> Model:
  Tool result: call_id="call-1", entries=["README.md", "src/"]

Model -> Harness:
  Assistant message: The root contains README.md and src/.

Harness -> User:
  Displays the assistant message.
```

The model does not need the implementation of `list_files` to request it. It needs a description of what the tool does and how to supply valid arguments. A tool-call identifier lets the application associate a result with its request.

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

The **session** is the ongoing interaction and its associated state. A harness typically manages the conversation, pending tool calls, and any saved artifacts. It may persist these locally or use remote services; storage location and retention depend on the product and configuration.

The **context window** is the model's limited working context for an inference request. Instructions, tool definitions, messages, and tool results consume space, and the request must leave room for generated output. Limits and input/output accounting vary by model and API.

Saved session history can be much larger than the context supplied on any one request. A harness may select relevant history, truncate large tool results, or replace older conversation details with a summary. This last technique is often called **compaction**. A summary can lose details; the model should not be assumed to have every earlier exchange available verbatim.

For example, Anthropic's [session and context explanation](https://code.claude.com/docs/en/how-claude-code-works#work-with-sessions) distinguishes saved conversation history from the active context window and describes automatic compaction.

## Does the model remember the conversation?

It is useful to think of continuity as something the harness and API provide, rather than as the model privately remembering earlier turns.

With a stateless API, the application supplies the history needed for each request. Some APIs instead support provider-managed conversation state or references to previous responses; see OpenAI's [conversation-state guide](https://developers.openai.com/api/docs/guides/conversation-state). These are different ways of supplying context; neither means that ordinary conversation updates the model's learned parameters.

Avoid the absolute claim that every model API is stateless. The practical questions are who stores the history, how it is supplied to inference, and what the next request actually includes.

## Why the distinction matters

Small, indexed documentation and focused tool results help a harness supply relevant information without loading everything. Clear tool descriptions help a model choose an appropriate action.

This architecture also provides a starting point for examining sensitive-data flows: data can exist in repository files, tool results, model requests, and saved session records. Those are distinct locations, with different access and retention properties; permission to read a file does not itself explain where its contents may subsequently go. See [Sensitive data in agent workflows](sensitive-data-in-agent-workflows.md) for risks and controls.

## References

- [How Claude Code works](https://code.claude.com/docs/en/how-claude-code-works) — first-party explanation of models, the harness, tools, sessions, and context management.
- [Unrolling the Codex agent loop](https://openai.com/index/unrolling-the-codex-agent-loop/) — first-party walkthrough of the agent loop, request construction, message roles, and tool definitions.
- [Conversation state](https://developers.openai.com/api/docs/guides/conversation-state) — first-party explanation of manually supplied history and API-managed state.

These references explain shared architectural concepts. Product-specific setup and usage guidance for other harnesses is outside this wiki's scope.
