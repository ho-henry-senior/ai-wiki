---
type: explanation
summary: How Copilot's harness gives the model context and tools, runs its tool requests, and manages session history, and why that decides where limits and data controls belong.
status: established
lane: goals
goal: economy
order: 20
checked: 2026-11-15
tags:
  - Context and tokens
  - Data and privacy
---

# How models and harnesses interact

Copilot is a model plus a harness. The model writes text and asks for tools; the harness, such as Copilot CLI, the cloud agent, or agent mode in your editor, builds each request, runs the tools, and keeps the session. Knowing which part does what tells you where to put instructions, limits, and data controls.

## Model, harness, and agent

- **Model:** the language model you pick, for example with `/model` in Copilot CLI. It reads a request and writes a reply or a tool request.
- **Harness:** the software around the model. It decides what goes into each request, which tools exist, what may run, and what is saved.
- **Agent:** the whole system working on your task. Some documentation uses "agent" for the harness alone.

## What goes into one request

- Copilot's system prompt and your instructions, such as `AGENTS.md`;
- descriptions of the available tools, including MCP servers;
- the conversation so far, or a summary of it; and
- file contents, search results, and earlier tool results.

Access to the repository does not mean every file is sent. The harness, and the tools the model asks for, decide what is loaded. Run `/context` in Copilot CLI to see the breakdown.

## Why it matters

- **Limits go in the harness.** The model only asks; the harness runs. See [the model requests; the harness acts](../../concepts/tool-call-loop.md).
- **Context is chosen per request.** Keep standing context small and load detail on demand. See [load context through focused entrypoints](../../concepts/progressive-disclosure.md).
- **Saved is not sent.** Long sessions are summarized, and the history stays saved. See [session history is not active context](../../concepts/session-history-vs-context.md).
- **Data can sit in several places:** repository files, tool results, model requests, and saved sessions, each with its own access and retention. See the [agent data-flow checklist](../../reference/agent-data-flow-checklist.md).

Other agents use the same split. Claude Code and Codex both publish explanations of their loops: [How Claude Code works](https://code.claude.com/docs/en/how-claude-code-works) and [Unrolling the Codex agent loop](https://openai.com/index/unrolling-the-codex-agent-loop/).

## Sources

- [GitHub Docs: Managing context in Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/context-management)
- [GitHub Docs: Configuring Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/configure-copilot-cli)
