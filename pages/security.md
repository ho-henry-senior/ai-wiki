---
type: overview
summary: Four ways a coding agent can cause harm, how each happens, and what stops it in Copilot; start from where the agent's tools run.
status: established
lane: goals
goal: security
order: 3
---

# Security

A chat model's risks are mostly about what goes in and what comes out. An agent adds what it can do: it runs commands, edits files, and calls services with real access, choosing actions from text it reads, some of which you did not write. So for each risk below, ask what stops the damage if the model is wrong or tricked. Asking the agent to be careful does not stop it; controls enforced independently of the model do, even when it makes a mistake or follows malicious instructions.

## Core advice

**1. It can reach too much.** Without restrictions, a local agent runs commands with your access, so a mistake or an injected instruction can affect your files and credentials. Approval prompts alone do not isolate those commands, and [a worktree is not a sandbox](../concepts/worktrees-not-sandboxes.md). Locally, turn on Copilot's sandbox, which is off by default: [secure a local coding agent](local-agent-security.md). In the cloud, GitHub enforces a firewall and workflow approval, with gaps: [secure the Copilot cloud agent](cloud-agent-security.md).

**2. Data goes somewhere you did not expect.** Files and tool output included in model requests go to the model provider, and copies can appear in session logs, pull requests, or CI logs; MCP integrations can send it to their own services. Use a Business or Enterprise seat for work code, because individual plans train on interactions by default, and keep secrets out of the agent's reach. See [inference, retention, and training](../concepts/inference-retention-training.md), [secrets in tool output](../concepts/secrets-in-tool-output.md), and the [data-flow checklist](agent-data-flow-checklist.md).

**3. Text it reads takes control.** The model cannot reliably tell data from instructions, so a hidden line in an issue, web page, or tool output can steer it: [prompt injection](prompt-injection-coding-agents.md). Rules in `AGENTS.md` cannot prevent it, because [instructions are not enforced controls](../concepts/instructions-vs-controls.md); the limits in risk 1 contain it. Deny the commands that would do most harm if it obeyed, such as `copilot --deny-tool='shell(git push)'`.

**4. Untrusted code runs.** An agent can install compromised dependencies, run repository scripts, or load untrusted skills and MCP servers. Models also invent package names, often the same ones, so attackers register them in advance. Check [new dependencies](../concepts/hallucinated-dependencies.md) in the diff, and the source and permissions of a skill or MCP server before enabling it: [local MCP does not mean local-only data](../concepts/local-and-remote-mcp.md).

Changes that weaken a test or loosen an access rule to make a task pass are caught at review: see [Traceability & Trust](traceability.md). A wrong answer alone is a reliability problem, covered under [Alignment](alignment.md); it becomes a security problem when the agent acts on it, so risk 1 matters even without an attacker.

## Try this first

Where the agent's tools run decides which limits you have. For Copilot CLI, the app, or agent mode in your editor, start with the [local guide](local-agent-security.md) and its [sandbox](local-agent-sandboxing.md). For the Copilot cloud agent, start with the [cloud guide](cloud-agent-security.md). For either, use the [data-flow checklist](agent-data-flow-checklist.md) once.

## Explore further

The [lo-fi software factory case study](lo-fi-software-factory-case-study.md) describes an unattended local workflow. For outside references, see OWASP on [prompt injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) and [excessive agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/), and the Cloud Security Alliance on [slopsquatting](https://labs.cloudsecurityalliance.org/research-rb/csa-research-note-slopsquatting-ai-coding-assistant-supply-c/), how often models invent package names.
