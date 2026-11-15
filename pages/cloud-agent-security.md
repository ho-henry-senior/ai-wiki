---
type: guide
summary: Practical controls for coding agents executing in hosted workspaces, CI, or other cloud environments.
status: developing
---

# Secure a cloud coding agent

**Cloud** means the agent's tools execute in a hosted environment rather than on your computer. A remote model used by a local CLI does not make that CLI a cloud-executing agent. A cloud workspace may isolate the developer's laptop, but it can still reach repositories, secrets, external services, or infrastructure granted to it.

## Try this first

1. **Identify the execution environment.** Is it a disposable workspace, a persistent machine, or a CI runner? What files, network destinations, and services are reachable?
2. **Scope repository and service permissions.** Prefer access only to the necessary repository and branch. Use short-lived, narrowly scoped tokens; avoid production or organisation-wide credentials where possible.
3. **Separate proposing changes from applying them.** Let the agent produce a branch or pull request, with independent checks and human review before merge, deployment, publishing, or infrastructure changes.
4. **Restrict triggers and external input.** Determine who can start a run and what issues, PRs, comments, or web content the agent consumes. Treat that content as untrusted; see [Prompt injection in coding-agent workflows](prompt-injection-coding-agents.md).
5. **Check logs and cleanup.** Know what the environment retains, who can read transcripts and artifacts, when workspaces are destroyed, and how to revoke credentials.

## A concrete failure mode

An agent triggered by a repository issue receives a malicious instruction inside the issue text. If the agent also has a token that can change repository settings or deploy software, a prompt-injection attempt may have consequences far beyond the issue itself. A disposable VM does not reduce the authority of a powerful external token.

## Interactive and unattended runs

For an interactive cloud task, a person may inspect proposed tool calls and approve significant actions. For unattended tasks, that approval may be absent. **The less human oversight a run has, the more important independently enforced limits become.**

Before enabling unattended execution, decide:

- Which events and users are allowed to trigger it?
- Which repository contents and third-party material can influence it?
- Which credentials, tools, outbound destinations, and spending limits apply?
- Which actions must stop at a PR or another human approval boundary?
- Where are logs, artifacts, and alerts available if something goes wrong?

Do not confuse a PR approval gate with a restriction on what the agent can do *during* its run. The [lo-fi software factory case study](lo-fi-software-factory-case-study.md) illustrates that distinction.

## Check the boundaries

| Boundary | What to verify |
| --- | --- |
| Workspace | Isolation between runs, filesystem mounts, persistence, and cleanup |
| Repository | Read/write scope, branch protection, and whether the agent can alter its own workflow or permissions |
| Credentials | Token scope, lifetime, exposure to tools, and revocation |
| Network | Whether executed code and integrations can send data to arbitrary destinations |
| Outputs | Access to logs, artifacts, transcripts, PRs, and deployment results |

See [Sensitive data in agent workflows](sensitive-data-in-agent-workflows.md) and the [agent data-flow checklist](agent-data-flow-checklist.md) for destinations and retention questions. [Instructions are not enforced controls](../concepts/instructions-vs-controls.md) applies here too.

## Limitations

Hosted agents differ substantially in sandboxing, credential handling, network access, and approval features. Check the provider's current documentation and the actual configuration; do not assume "cloud" means sandboxed, ephemeral, or unable to access production.
