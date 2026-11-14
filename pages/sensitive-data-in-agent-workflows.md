---
type: guide
summary: The main risks of running coding agents, how sensitive data can move through their workflows, and controls for each destination.
---

# Sensitive data in agent workflows

Using an agent safely requires understanding both what it can access and what it can do. A locally installed harness may send context to a remote model, call external services, and save conversation history. Local inference does not by itself prevent sensitive data from reaching logs, tools, or published artifacts.

This guide covers AI-assisted software work, not the full subject of securing AI-powered applications. See [How models and harnesses interact](model-harness-interaction.md) for the underlying interaction loop, and use the [data-flow checklist](agent-data-flow-checklist.md) to review a particular setup.

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

Sending data for inference, retaining it, and using it for training are separate questions. Disabling training use does not establish that data never leaves the machine or is never retained. Likewise, disabling session sync does not disable model requests or external tool calls.

### Local and remote MCP servers

A **local MCP server** runs code on your machine, possibly inside a container or sandbox. Depending on its permissions and configuration, it may read local files, inherit environment variables or credentials, and execute other programs. Installing and launching one therefore requires trust in its code and dependencies, not just its advertised tool descriptions.

A **remote MCP server** runs on another system. Tool arguments and other data supplied to it cross that boundary, where the operator's access, logging, and retention policies apply. It does not automatically gain access to your local filesystem, but may access connected systems through credentials or permissions granted to it.

**Either kind can make further network requests** if its environment permits them. A local server can forward local data to an external API; a remote server can pass received data to downstream services. "Local" describes where the server runs, not a guarantee that data stays on the machine. Review both the immediate server and its downstream destinations, and verify which filesystem, credential, and network restrictions actually apply.

### Exposure without an explicit upload

An illustrative accidental flow:

1. A diagnostic command prints a credential in an error message.
2. Its output becomes a tool result.
3. The harness records the result in local history and includes it in a subsequent model request.
4. Session syncing or a shared debugging transcript may create further copies.

Each later step depends on the product and configuration. The important point is that asking the agent to "upload a secret" is not necessary for exposure to occur.

## Controls across the workflow

Before a task, minimize accessible data and credentials. Prefer synthetic or sanitized fixtures, read-only access where sufficient, and an isolated environment with only the required filesystem and network access. A separate branch or worktree helps organize changes but is not a security sandbox.

During work, treat retrieved material as data, not authority to change permissions or send information elsewhere. Check consequential tool requests against the intended action and destination. A local shell restriction does not necessarily constrain a remote MCP service; evaluate each integration's actual execution boundary.

Before handoff, review generated changes, run relevant tests and security checks, and inspect outputs for sensitive information. Keep human approval for high-impact actions such as publishing, infrastructure changes, and use of privileged credentials. Preserve an appropriate audit trail without collecting secrets unnecessarily.

**Enforced boundaries matter more than instructions.** "Do not reveal secrets" is weaker than keeping those secrets inaccessible. Redaction, scanning, approval prompts, and model instructions can all miss problems; use them in combination with access and network controls.

Disk encryption protects data at rest, not against an agent or process already permitted to read it. Deleting a local transcript does not necessarily delete remote copies, backups, or published artifacts. If a credential is exposed, revoke or rotate it rather than relying only on removing the visible text.

## References

- [OWASP: Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) — untrusted inputs, possible impacts, and layered mitigations.
- [OWASP: Excessive Agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/) — risks from excessive functionality, permissions, and autonomy.
