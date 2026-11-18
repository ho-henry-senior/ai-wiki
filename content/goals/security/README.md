---
type: overview
summary: Four ways a coding agent can cause harm, how each happens, and what stops it in Copilot; start from where the agent's tools run.
status: established
lane: goals
goal: security
order: 3
---

# Security

A coding agent can run commands, edit files and call services with real access, so its risks extend beyond what a chat model reads and writes. Mistakes or instructions hidden in untrusted text can steer those actions. Rather than asking the agent to be careful, limit what its tools can reach and use controls enforced independently of the model.

## Core advice

1. **[Excessive agent access](excessive-agent-access.md)** — Without restrictions, a local agent runs commands with your access, so a mistake or an injected instruction can affect your files and credentials.
2. **[Unexpected data exposure](unexpected-data-exposure.md)** — Files and tool output included in model requests go to the model provider, and copies can appear in session logs, pull requests, or CI logs; MCP integrations can send it to their own services.
3. **[Hidden instructions in content](hidden-instructions-in-content.md)** — The model cannot reliably tell data from instructions, so a hidden line in an issue, web page, or tool output can steer it: prompt injection.
4. **[Untrusted code execution](untrusted-code-execution.md)** — An agent can install compromised dependencies, run repository scripts, or load untrusted skills and MCP servers.

Changes that weaken a test or loosen an access rule to make a task pass are caught at review: see [Traceability & Trust](../traceability/README.md). A wrong answer alone is a reliability problem, covered under [Alignment](../alignment/README.md); it becomes a security problem when the agent acts on it, so risk 1 matters even without an attacker.

## Explore further

The [lo-fi software factory case study](../../articles/lo-fi-software-factory-case-study.md) describes an unattended local workflow. For outside references, see OWASP on [prompt injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) and [excessive agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/), and the Cloud Security Alliance on [slopsquatting](https://labs.cloudsecurityalliance.org/research-rb/csa-research-note-slopsquatting-ai-coding-assistant-supply-c/), how often models invent package names.
