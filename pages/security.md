---
type: overview
summary: The five ways a coding agent can cause harm, how each happens, and what stops it in Copilot; start from where the agent's tools run.
status: established
---

# Security

A chat model's risks are mostly about what goes in and what comes out. An agent adds what it can do: it runs commands, edits files, and calls services with real access, choosing actions from text it reads, some of which you did not write. So for each risk below, ask what stops the damage if the model is wrong or tricked. Asking it to be careful does not; limits Copilot enforces whatever the model decides do.

## Core advice

**1. Data goes somewhere you did not expect.** Everything the agent reads goes to the model provider, and copies can land in session logs, pull requests, CI logs, and MCP servers' own services. Use a Business or Enterprise seat for work code, because individual plans train on interactions by default, and keep secrets out of the agent's reach. See [inference, retention, and training](../concepts/inference-retention-training.md), [secrets in tool output](../concepts/secrets-in-tool-output.md), and the [data-flow checklist](agent-data-flow-checklist.md).

**2. Text it reads takes control.** The model cannot reliably tell data from instructions, so a hidden line in an issue, web page, or tool output can steer it into revealing data or acting for someone else. This is [prompt injection](prompt-injection-coding-agents.md). Rules in `AGENTS.md` cannot prevent it, because [instructions are not enforced controls](../concepts/instructions-vs-controls.md); the limits in risk 3 contain it.

**3. It can reach too much.** A local agent runs commands as you, so a mistake or an injected instruction can do anything you can. Approval prompts ask rather than limit, and [a worktree is not a sandbox](../concepts/worktrees-not-sandboxes.md). Locally, turn on Copilot's sandbox, which is off by default, and deny the most harmful commands: [secure a local coding agent](local-agent-security.md). In the cloud, GitHub enforces a firewall and workflow approval, with gaps you need to know: [secure the Copilot cloud agent](cloud-agent-security.md).

**4. Unsafe changes get merged.** Generated code can weaken a test or loosen an access rule to make a task pass, and the agent's summary will not say so. Read the diff, especially tests and configuration, and require approval from someone other than the person who asked for the change. See [passing tests are evidence, not proof](../concepts/tests-are-evidence.md).

**5. Untrusted code runs.** Models invent package names, the same ones across models, so attackers register them; the agent then installs malware with its own access. Skills and MCP servers are code too. Check every new dependency in the diff, and check where each skill and MCP server comes from before enabling it: [local MCP does not mean local-only data](../concepts/local-and-remote-mcp.md).

A wrong answer alone is a reliability problem, covered under [Alignment](alignment.md). It becomes a security problem when the agent acts on it, so risk 3 matters even without an attacker.

## Try this first

Where the agent's tools run decides which limits you have. For Copilot CLI, the app, or agent mode in your editor, start with the [local guide](local-agent-security.md) and its [sandbox](local-agent-sandboxing.md). For the Copilot cloud agent, start with the [cloud guide](cloud-agent-security.md). For either, work through the [data-flow checklist](agent-data-flow-checklist.md) once.

## Explore further

- [Case study: a lo-fi software factory](lo-fi-software-factory-case-study.md) — limits observed in an unattended local workflow.
- [OWASP: Prompt injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) and [excessive agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/).
- [Cloud Security Alliance: slopsquatting](https://labs.cloudsecurityalliance.org/research-rb/csa-research-note-slopsquatting-ai-coding-assistant-supply-c/) — how often models invent package names.
