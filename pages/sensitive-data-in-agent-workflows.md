---
type: guide
summary: The main risks of running coding agents, how sensitive data can move through their workflows, and controls for each destination.
---

# Sensitive data in agent workflows

Using an agent safely requires understanding both what it can access and what it can do. Through [the tool-call loop](../concepts/tool-call-loop.md), file contents and tool results can become model input or further actions. A locally installed harness may use remote inference and services; local inference does not by itself prevent exposure through other routes.

This guide covers AI-assisted software work, not the full subject of securing AI-powered applications. See [How models and harnesses interact](model-harness-interaction.md) for the underlying interaction loop, and use the [data-flow checklist](agent-data-flow-checklist.md) to review a particular setup.

## Try this first

Before using an agent on a repository, identify the sensitive data and credentials it can access, the services that may receive data, and the actions it can perform. Limit access and credentials to the task, and configure approval or enforced restrictions for consequential actions such as publishing or infrastructure changes. Verify these controls in the actual tool and environment; instructions alone are not enforcement.

Use the [data-flow checklist](agent-data-flow-checklist.md) to record what is known and investigate uncertain destinations. The right safeguards depend on the risk; do not defer essential controls solely because they require more effort.

## The main risks

| Risk                   | What can go wrong                                                                                                 |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Data exposure          | Secrets, private code, or personal data reach unintended services, logs, or shared artifacts.                     |
| Unintended actions     | An agent deletes files, changes infrastructure, spends money, or publishes material without appropriate approval. |
| Prompt injection       | Instructions embedded in issues, files, web pages, or tool results steer the agent into misusing its access.      |
| Unsafe changes         | Generated code introduces vulnerabilities or weakens tests, access controls, or other safeguards.                 |
| Untrusted integrations | Tools, skills, dependencies, or MCP servers execute code or access data beyond what is expected.                  |

These risks overlap. Prompt injection can cause data exposure or destructive actions; a compromised integration can do both. The impact grows with the agent's accessible data, permissions, and autonomy. OWASP describes this relationship in its guidance on [prompt injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) and [excessive agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/).

## What data might be sensitive?

| Data                                                                                                | How it may enter the workflow                                                                                                               |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Credentials: API tokens, private keys, cookies, connection strings, environment variables           | Reading configuration; commands that print environment or credential data; test failures and debug output.                                  |
| Private code and plans: source, internal documentation, unreleased designs                          | File reads, workspace search or indexing, attached diffs, pasted prompts, or automatically selected editor context.                         |
| Personal or customer data: support tickets, application logs, production records, test fixtures     | Investigating real cases; querying logs, databases, or issue trackers; copying production data into tests.                                  |
| Security-sensitive information: vulnerabilities, incident details, architecture, internal endpoints | Security investigations, code scans, tool output, and threat-model discussions.                                                             |
| Derived information: generated summaries, code, test results, and reports                           | The agent repeats, combines, or transforms sensitive information it has received. A summary is not necessarily anonymized or safe to share. |

Sensitivity depends on context and organizational policy. An internal endpoint may be harmless in one setting and confidential in another.

## Where data can go, how, and what to control

The destinations below are possibilities, not claims that every product sends data to all of them. Trace the actual harness, account, model endpoint, and enabled integrations.

| Destination                                    | How data gets there                                                                                                                 | Main controls                                                                                                                                                  |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Model provider                                 | The harness includes prompts, file contents, or tool results in inference requests.                                                 | Use an approved provider and account; verify retention, training use, and access policies; exclude or redact sensitive content before transmission.            |
| Local session files, caches, indexes, and logs | The harness, editor, or tools save conversation history, arguments, results, debug output, or indexed content.                      | Restrict filesystem access; use disk encryption; avoid printing secrets; review logging and indexing; limit retention and remove unneeded records.             |
| Cloud session storage and backups              | Session syncing, device backups, or transcript sharing copies history remotely.                                                     | Disable unnecessary syncing; restrict sharing and access; verify cloud retention, backup, and deletion policies.                                               |
| Tools and external services                    | Tool arguments send content to search engines, APIs, MCP servers, or delegated agents; those services may retain their own records. | Review integrations and their destinations; use narrowly scoped credentials; restrict network access; require approval for sensitive calls.                    |
| Repository and shared artifacts                | Sensitive information is written into files, commits, PRs, issues, CI output, build artifacts, or exported transcripts.             | Review diffs and publication targets; use secret scanning and protected branches; require approval before publishing; inspect generated reports and CI output. |
| Attacker-controlled systems                    | Prompt injection or a malicious integration causes an outbound request or upload containing data.                                   | Combine isolation, restricted outbound networking, minimal credentials, and approval for consequential actions; treat retrieved content as untrusted.          |

Assess [inference, retention, and training separately](../concepts/inference-retention-training.md). A no-training policy is not a no-transmission or no-retention guarantee, and disabling session sync does not disable model requests or external tool calls. [Saved history also differs from active model context](../concepts/session-history-vs-context.md), so reducing context is not evidence that stored data has been deleted.

### Local and remote MCP servers

Local servers execute on your machine; remote servers receive supplied data on another system. **Either can make further network requests** if permitted. [Local MCP does not mean local-only data](../concepts/local-and-remote-mcp.md) explains the different access risks and why downstream destinations must also be checked.

### Exposure without an explicit upload

An ordinary diagnostic can print a credential, which may then enter history, a later model request, and a shared transcript. [Secrets can leak through tool output](../concepts/secrets-in-tool-output.md) traces this accidental flow and explains why redacting after transmission is too late.

## Controls across the workflow

Before a task, minimize accessible data and credentials. Prefer synthetic or sanitized fixtures, read-only access where sufficient, and an isolated environment with only the required filesystem and network access. [A worktree is not a sandbox](../concepts/worktrees-not-sandboxes.md): separating changes does not restrict execution or credentials.

During work, treat retrieved material as data, not authority to change permissions or send information elsewhere. Check consequential tool requests against the intended action and destination. A local shell restriction does not necessarily constrain a remote MCP service; evaluate each integration's actual execution boundary.

Before handoff, review generated changes, run relevant tests and security checks, and inspect outputs for sensitive information. Keep human approval for high-impact actions such as publishing, infrastructure changes, and use of privileged credentials. Preserve an appropriate audit trail without collecting secrets unnecessarily.

Use [enforced controls as well as instructions](../concepts/instructions-vs-controls.md). Guidance, scanning, redaction, and approval can all miss problems; combine them with independently enforced access and network restrictions.

Disk encryption protects data at rest, not against an agent or process already permitted to read it. If exposure occurs, follow [the tool-output containment guidance](../concepts/secrets-in-tool-output.md#reduce-exposure-at-the-source): rotate exposed credentials and consider all copies, not just visible text.

## References

- [OWASP: Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) — untrusted inputs, possible impacts, and layered mitigations.
- [OWASP: Excessive Agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/) — risks from excessive functionality, permissions, and autonomy.
