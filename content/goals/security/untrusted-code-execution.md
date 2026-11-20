---
type: guide
summary: "An agent can install compromised dependencies, run repository scripts, or load untrusted skills and MCP servers."
status: established
lane: goals
goal: security
order: 4
tags:
  - Security
  - Untrusted content and code
---

# Untrusted code execution

An agent can install compromised dependencies, run repository scripts, or load untrusted skills and MCP servers.

Models also invent package names, often the same ones, so attackers register them in advance.

Check [new dependencies](../../concepts/hallucinated-dependencies.md) in the diff, and the source and permissions of a skill or MCP server before enabling it: [local MCP does not mean local-only data](../../concepts/local-and-remote-mcp.md).
