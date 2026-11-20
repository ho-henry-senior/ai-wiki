---
type: reference
summary: The model only asks to use a tool; the harness, such as Copilot CLI, decides whether it runs, asks you, or refuses, so put limits in the harness, not the prompt.
status: established
lane: articles
goal: security
order: 20
tags:
  - Context and tokens
  - Permissions and sandboxing
---

# The model requests; the harness acts

The model never runs a tool itself. It asks, and the harness (Copilot CLI, the cloud agent, or agent mode in your editor) decides whether to run the tool, ask you first, or refuse. That is why limits belong in Copilot's settings, not in your prompt.

[View the short slide](../slides/tool-call-loop.md).

## The loop

<!-- include -->

[Diagram: a tool call, from the model's request to the harness's decision and back](../includes/tool-call-loop-diagram.md)

1. The harness sends the model your request, its instructions, and descriptions of the tools available.
2. The model replies with an answer or a request to use a tool.
3. The harness checks the request against its permissions, then runs it, asks you, or refuses.
4. The harness sends the result, or the refusal, back to the model. Tool output can enter the model's context this way, including sensitive data; see [secrets can leak through tool output](secrets-in-tool-output.md).
5. The model continues, perhaps asking for more tools, until it answers.

One request from you can involve many rounds.

<!-- include -->

[Copilot CLI: where the harness's check appears](../includes/tool-call-loop-copilot-cli.md)

## Example

An illustrative exchange, not any provider's exact format:

```text
Harness -> Model:  User: What files are in the project root?
                   Tool available: list_files(path) lists a directory.
Model -> Harness:  Call list_files with path "."
Harness:           Checks the request is allowed, then runs it.
Harness -> Model:  Result: README.md, src/
Model -> Harness:  The root contains README.md and src/.
```

The model only needs a tool's name, purpose, and arguments, not its code. A tool may run locally or remotely. MCP standardizes how a harness talks to tool servers, not how it talks to the model.

## Sources

- [GitHub Docs: Configuring Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/configure-copilot-cli)
- [MCP architecture](https://modelcontextprotocol.io/docs/learn/architecture)

Applied in [how models and harnesses interact](../goals/economy/model-harness-interaction.md).
