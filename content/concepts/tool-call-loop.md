---
type: explanation
summary: How a model requests a tool, the harness permits or refuses it, and returned results inform the next action.
status: developing
lane: guides
tags:
  - Context and tokens
  - Permissions and sandboxing
---

# The tool-call loop

One developer request can trigger several model calls. After each call, the harness may execute a permitted tool, return the result, and ask the model what to do next. That repeating exchange is the **agent loop**.

This is the third chapter of the guide [How coding agents work](../articles/understanding-coding-agents.md). The earlier parts explain [the components](../articles/inside-coding-agent.md) and [the request payloads](../articles/model-requests-and-responses.md).

## One round of the loop

<!-- include -->

[Diagram: a tool call, from the model's request to the harness's decision and back](../includes/tool-call-loop-diagram.md)

The model requests an action; the harness checks its permission rules, runs or refuses it, and returns a result. A tool result becomes information in the next model request, not an instruction with the same authority as the user's request.

<!-- include -->

[Copilot CLI: where the harness's check appears](../includes/tool-call-loop-copilot-cli.md)

## How observations change the next action

Suppose you ask the agent to fix a failing test. It runs the tests, receives an error, and chooses what to inspect. The failure tells the model _what happened_, not necessarily _why_. Its next action might be to search for the failing assertion, read the handler, inspect recent changes or run a narrower test. The model can choose among available tools, and the harness returns the observations.

If the first edit fails, the loop may continue: inspect the new error, revise a hypothesis, edit again and rerun checks. A tool refusal can also lead the model to choose another permitted route or ask you for help. An agent does not have to follow a fixed script, and a final answer may be produced without a tool call.

## What this reveals about cost and trust

Each round can add tool execution time and another model call, with new input and output tokens. Repository search may require a tool request, or the harness may use retrieval to supply matching files before a call; see [inside a coding agent](../articles/inside-coding-agent.md#how-the-agent-finds-task-related-code).

The agent's final explanation, and the passing tests it reports, are evidence to review, not proof that the requirement is met or a record of everything it did; see [verify the result](../goals/alignment/hand-off-and-steer.md#verify-the-result).

## Sources

- [GitHub Docs: Configuring Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/configure-copilot-cli)
- [MCP architecture](https://modelcontextprotocol.io/docs/learn/architecture)
- [OpenAI: Unrolling the Codex agent loop](https://openai.com/index/unrolling-the-codex-agent-loop/)
