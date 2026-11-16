---
type: reference
summary: An MCP server's location determines where code runs, but does not guarantee where the data it handles stays.
status: established
lane: guidance
goal: security
order: 23
checked: 2026-11-15
---

# Local MCP does not mean local-only data

An MCP server can run locally or on another system. **Either kind can make further network requests if its environment permits them.** Execution location and downstream data destinations are separate questions.

## Local versus remote

A **local MCP server** runs code on your machine, possibly inside a container or sandbox. Depending on permissions and configuration, it may read files, inherit environment variables or credentials, and execute programs. Installing and launching it requires trust in its code and dependencies, not just its advertised tool descriptions.

A **remote MCP server** runs on another system. Arguments and other data supplied to it cross that boundary, where its operator's access, logging, and retention policies apply. It does not automatically gain local filesystem access, but may access connected systems using granted credentials or permissions.

For example, a local documentation-search server might read project files and send text to a hosted embedding service. A remote search server might forward received queries to another provider. Neither flow is determined solely by the label "MCP server."

## What to check

Review the immediate server, the data and credentials it can access, its downstream destinations, and its retention behavior. Verify which filesystem, credential, and network restrictions actually cover that process or service. A harness's shell sandbox does not necessarily cover its MCP integrations. For example, the Copilot cloud agent's firewall applies only to processes started through its shell, not to MCP servers.

Transport is not a complete security classification: stdio is commonly used for local processes, while HTTP can be used for remote servers or a local service.

## Sources and applications

- [MCP architecture](https://modelcontextprotocol.io/docs/learn/architecture) — local and remote servers and their transports.
- [OWASP: Excessive Agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/) — limiting tool functionality, permissions, and autonomy.
- Applied in [the security overview](../pages/security.md) and [the data-flow checklist](../pages/agent-data-flow-checklist.md).
