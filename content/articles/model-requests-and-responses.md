---
type: explanation
summary: Annotated illustrative payloads show what a harness gives the model, how a model asks for a tool, and how results become later context.
status: developing
lane: guides
tags:
  - Context and tokens
---

# What the model receives and returns

The model does not automatically see everything in your repository or session. For each interaction, the harness assembles an input that may contain instructions, messages, tool definitions and selected context. The model returns generated content, sometimes including a structured request for a tool.

## A request assembled by the harness

When a developer asks an agent to fix a failing test, the harness constructs a request containing information such as the following. The examples on this page are simplified; real formats vary by product.

```json
{
  "instructions": [
    "You are assisting with repository changes.",
    "Run the project's checks before reporting completion."
  ],
  "messages": [
    {"role": "user", "content": "Fix the failing test."}
  ],
  "tools": [
    {"name": "run_command", "parameters": {"command": "string"}},
    {"name": "read_file", "parameters": {"path": "string"}}
  ]
}
```

**Instructions** describe desired behaviour; **messages** carry the conversation; **tool definitions** tell the model which actions it may request and how to specify their arguments. A request can also include repository instructions, selected source files and earlier tool results. Access to a whole repository does not mean every file is in this input. Only the context included in that particular request is visible to the model; search and retrieval are two ways of selecting it. See [how the agent finds task-related code](inside-coding-agent.md#how-the-agent-finds-task-related-code).

## A tool request is output, not execution

The model can respond with a tool request:

```json
{
  "tool_call": {
    "name": "run_command",
    "arguments": {"command": "just test"}
  }
}
```

The model chose the tool name and arguments, but the harness must still process the request and decide whether the operation is permitted. An interface may instead show an approval prompt or return a refusal.

## Tool results become information for another request

The harness runs the permitted command and returns the result:

```json
{
  "tool_result": {
    "command": "just test",
    "exit_code": 1,
    "output": "AssertionError: expected 200, got 500"
  }
}
```

On a later model call, that result can accompany the original task and additional context. The model can use the failure to choose another action, such as reading the test file. The output is **evidence to interpret**, not a trusted instruction; a file or command result can contain misleading or malicious text, which is how [prompt injection](../goals/security/prompt-injection.md) reaches an agent.

## The next request is not necessarily identical

The harness builds each request from the information available at that point. Earlier tool results may be included, summarized or omitted as sessions grow. Tool schemas and repeated context also contribute to [token](../reference/glossary.md#token) use, so a single chat message may result in several separately processed model requests.

This is distinct from what the session **stores**. For the difference between saved history and active context, and Copilot CLI's `/context` and `/compact` commands, see [session history and active context](../concepts/session-history-vs-context.md).

The next part, [the tool-call loop](../concepts/tool-call-loop.md), shows how these exchanges repeat until the task is done.

## Sources

- [OpenAI: Function calling](https://platform.openai.com/docs/guides/function-calling)
- [GitHub: Managing context in Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/context-management)
- [MCP architecture](https://modelcontextprotocol.io/docs/learn/architecture)
- [VS Code: How Copilot understands your workspace](https://code.visualstudio.com/docs/agents/reference/workspace-context)
