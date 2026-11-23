---
type: reference
summary: The full checklist for tracing sensitive data through an agent setup and checking the controls at each destination and action, with Copilot detail.
status: established
lane: reference
order: 2
checked: 2026-11-15
tags:
  - Copilot
  - Security
  - Data and privacy
  - MCP
---

# Agent data-flow checklist

Data reaches more places than anyone chose to send it: the model provider, saved sessions, logs, pull requests, and the services behind each integration. This checklist traces each flow so you can see where it goes and what limits it. Work through it once for each agent setup, and again when you enable an integration or start work with sensitive data. It is the full list; the [security overview](../goals/security/README.md) explains the risks behind it.

## Map the setup

- [ ] Identify the agent, the Copilot plan or account, where its tools run, and the enabled tools and [MCP](glossary.md#model-context-protocol-mcp) servers. Each of these decides where data goes and which limits apply.
- [ ] List the sensitive data it could reach (see the table below).
- [ ] For each flow, record: **data → source → trigger → destination → how long it is kept and who can see it → control**. A flow with no control in the last column is the gap to fix.
- [ ] Include context the agent picks up on its own, debug output, generated summaries, and delegated agents, not only files you hand it, because an agent can expose data you never chose to share. Trace [unexpected data exposure](../goals/security/unexpected-data-exposure.md) through tool output and [saved session history](../concepts/session-history-vs-context.md) separately from what the model sees.
- [ ] Answer the [inference, retention, and training](../concepts/inference-retention-training.md) questions, and write down what is unknown rather than assuming a safe default.

| Data                                                                                       | How it can reach the agent                                                                                |
| ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| Credentials: tokens, private keys, cookies, connection strings, environment variables      | Reading config; commands that print the environment; test failures and debug output                       |
| Private code and plans: source, internal documents, unreleased designs                     | File reads, workspace search, attached diffs, pasted prompts, context the editor selects                  |
| Personal or customer data: support tickets, application logs, production records, fixtures | Investigating real cases; querying logs, databases, or issue trackers; copying production data into tests |
| Security information: vulnerabilities, incidents, internal endpoints                       | Security investigations, scans, threat-model discussions                                                  |
| Derived information: summaries, generated code, test results, reports                      | The agent repeats or combines what it was given. A summary is not anonymised just because it is shorter.  |

## Example: one data flow

This fictional entry shows how to record a flow, including unknowns.

| Field                    | Example                                                                                                                                                                                  |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Data and source          | A synthetic application log from a local test fixture                                                                                                                                    |
| Trigger and destination  | Copilot CLI reads the file; the output goes to the model in the next request                                                                                                             |
| Kept, and who can see it | The plan's retention for the CLI (see [the answers for Copilot](../concepts/inference-retention-training.md#the-answers-for-copilot)); the local session is synced to the user's account |
| Controls                 | Sandbox on; the task is limited to the fixture; real logs stay out of the workspace                                                                                                      |

## Check each destination

| Destination              | Questions to resolve                                                                                                                                                                                                                                                                                           |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Model provider           | Is the plan approved for this data? With Copilot, a Business or Enterprise seat excludes it from training; individual plans train on it unless you opt out. Is content exclusion set, and does it apply here? It does not apply to agent mode in editors, and GitHub does not document it for the cloud agent. |
| Local storage            | Where are histories, caches, and logs stored, and who can read them? Can commands avoid printing secrets?                                                                                                                                                                                                      |
| Session history          | Is syncing needed? Copilot syncs CLI sessions to your account by default, and cloud agent session logs are visible to anyone with access to the repository and cannot be deleted.                                                                                                                              |
| Tools and MCP servers    | What data do they send, where do they run, and what do they keep? Are their credentials and network access limited?                                                                                                                                                                                            |
| Repository and artefacts | Could commits, pull requests, issues, CI logs, or reports disclose data? Are secret scanning, review, and branch protection on?                                                                                                                                                                                |
| Anywhere else            | Can the agent or an integration reach any host? Are the local sandbox's network rules or the cloud agent's firewall on, and what do they not cover?                                                                                                                                                            |

## Check actions as well as data

- [ ] Grant only the file, network, and service access the task needs, and keep production credentials out. A mistake or an injected instruction can use whatever the agent can reach.
- [ ] Check where each tool, skill, dependency, and MCP server comes from and what it can reach before enabling it, because each runs code with the agent's access. Models can also [invent package names that attackers register](../concepts/hallucinated-dependencies.md).
- [ ] Check which enforced limits cover each tool, including integrations such as MCP servers that may run outside the agent's sandbox.
- [ ] Make sure limits are [enforced, not just instructions](../concepts/instructions-vs-controls.md), because the text that misleads the agent can override an instruction.
- [ ] Require approval for destructive, costly, privileged, or public actions.
- [ ] Review generated changes and run tests and security checks before accepting them, because the agent's summary may not mention a weakened test or check.
- [ ] Inspect reports and logs before sharing, and know how to revoke credentials if data leaks, since a leaked secret stays valid until you rotate it.

A completed checklist is a review, not proof of security. Controls and defaults vary by product, version, account, and organisation policy.
