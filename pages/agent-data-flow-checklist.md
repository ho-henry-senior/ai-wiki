---
type: reference
summary: The full checklist for tracing sensitive data through an agent setup and checking the controls at each destination and action, with Copilot detail.
status: established
---

# Agent data-flow checklist

Work through this once for each agent setup, and again when you enable an integration or start work with sensitive data. It is the full list; the [security overview](security.md) summarizes it.

## Map the setup

- [ ] Identify the agent, the Copilot plan or account, where its tools run, and the enabled tools and MCP servers.
- [ ] List the sensitive data it could reach (see the table below).
- [ ] For each flow, record: **data → source → trigger → destination → how long it is kept and who can see it → control**.
- [ ] Include context the agent picks up on its own, debug output, generated summaries, and delegated agents, not only files you hand it. Trace [tool output](../concepts/secrets-in-tool-output.md) and [saved session history](../concepts/session-history-vs-context.md) separately from what the model sees.
- [ ] Answer the [inference, retention, and training](../concepts/inference-retention-training.md) questions, and write down what is unknown rather than assuming a safe default.

| Data                                                                                       | How it can reach the agent                                                                                |
| ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| Credentials: tokens, private keys, cookies, connection strings, environment variables      | Reading config; commands that print the environment; test failures and debug output                       |
| Private code and plans: source, internal documents, unreleased designs                     | File reads, workspace search, attached diffs, pasted prompts, context the editor selects                  |
| Personal or customer data: support tickets, application logs, production records, fixtures | Investigating real cases; querying logs, databases, or issue trackers; copying production data into tests |
| Security information: vulnerabilities, incidents, internal endpoints                       | Security investigations, scans, threat-model discussions                                                  |
| Derived information: summaries, generated code, test results, reports                      | The agent repeats or combines what it was given. A summary is not anonymized just because it is shorter.  |

## Example: one data flow

This fictional entry shows how to record a flow, including unknowns.

| Field                    | Example                                                                                      |
| ------------------------ | -------------------------------------------------------------------------------------------- |
| Data and source          | A synthetic application log from a local test fixture                                        |
| Trigger and destination  | Copilot CLI reads the file; the output goes to the model in the next request                 |
| Kept, and who can see it | Prompts kept 28 days (Business plan, CLI); the local session is synced to the user's account |
| Controls                 | Sandbox on; the task is limited to the fixture; real logs stay out of the workspace          |

## Check each destination

| Destination              | Questions to resolve                                                                                                                                                                                                                                                                                           |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Model provider           | Is the plan approved for this data? With Copilot, a Business or Enterprise seat excludes it from training; individual plans train on it unless you opt out. Is content exclusion set, and does it apply here? It does not apply to agent mode in editors, and GitHub does not document it for the cloud agent. |
| Local storage            | Where are histories, caches, and logs stored, and who can read them? Can commands avoid printing secrets?                                                                                                                                                                                                      |
| Session history          | Is syncing needed? Copilot syncs CLI sessions to your account by default, and cloud agent session logs are visible to anyone with access to the repository and cannot be deleted.                                                                                                                              |
| Tools and MCP servers    | What data do they send, where do they run, and what do they keep? Are their credentials and network access limited?                                                                                                                                                                                            |
| Repository and artifacts | Could commits, pull requests, issues, CI logs, or reports disclose data? Are secret scanning, review, and branch protection on?                                                                                                                                                                                |
| Anywhere else            | Can the agent or an integration reach any host? Are the local sandbox's network rules or the cloud agent's firewall on, and what do they not cover?                                                                                                                                                            |

## Check actions as well as data

- [ ] Grant only the file, network, and service access the task needs, and keep production credentials out.
- [ ] Check where each tool, skill, dependency, and MCP server comes from and what it can reach before enabling it.
- [ ] Check which limits cover each tool; [a worktree is not a sandbox](../concepts/worktrees-not-sandboxes.md), and a sandbox may not cover MCP servers.
- [ ] Make sure limits are [enforced, not just instructions](../concepts/instructions-vs-controls.md).
- [ ] Require approval for destructive, costly, privileged, or public actions.
- [ ] Review generated changes and run tests and security checks before accepting them.
- [ ] Inspect reports and logs before sharing, and know how to revoke credentials if data leaks.

A completed checklist is a review, not proof of security. Controls and defaults vary by product, version, account, and organization policy. Copilot details checked 15 November 2026.
