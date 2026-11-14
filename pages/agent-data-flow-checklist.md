---
type: reference
summary: A reusable checklist for tracing sensitive data through an agent setup and checking controls at each destination.
---

# Agent data-flow checklist

Use this when configuring an agent, enabling an integration, or preparing to work with sensitive material. The [companion guide](sensitive-data-in-agent-workflows.md) explains the risks, example flows, and limitations of these controls.

## Map the setup

- [ ] Identify the harness, model endpoint, account, execution environment, and enabled tools or MCP servers.
- [ ] Distinguish local from remote MCP servers; check local file and credential access, remote data handling, and further network requests from either kind. See [local and remote MCP servers](sensitive-data-in-agent-workflows.md#local-and-remote-mcp-servers).
- [ ] Identify sensitive source material: credentials, private code and plans, personal or customer data, and security findings.
- [ ] Record each relevant flow: **data type -> source -> trigger -> destination -> persistence and visibility -> control**.
- [ ] Include automatic context selection, indexing, debug output, delegated agents, and generated summaries, not only deliberate uploads.
- [ ] Distinguish transmission, storage, and training use; record unknowns rather than assuming safe defaults.

## Check each destination

| Destination               | Questions to resolve                                                                                                                                                                           |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Model provider            | Is this endpoint and account approved for the data? What leaves the machine? What are the retention, access, and training-use policies? Can sensitive content be excluded before transmission? |
| Local storage             | Where are histories, indexes, caches, and logs stored? Who can read them? Are disk encryption and suitable retention in place? Can commands avoid printing secrets?                            |
| Cloud history and backups | Is syncing needed? Who can access shared sessions? What is backed up, and what does deletion actually remove?                                                                                  |
| Tools and services        | What arguments and data are sent? Where does each tool execute? What does it log or retain? Are credentials, permissions, and outbound destinations limited?                                   |
| Repository and artifacts  | Could changes, reports, commits, PRs, issues, CI logs, or exports disclose data? Are scanning, review, branch protection, and publication approval in place?                                   |
| Unintended destinations   | Can an agent or integration send data to arbitrary hosts? Are outbound restrictions and isolation enforced independently of model instructions?                                                |

## Check actions as well as data

- [ ] Grant only the filesystem, network, and service permissions the task needs; avoid production credentials where possible.
- [ ] Review the provenance and access of tools, skills, dependencies, and MCP servers before enabling them.
- [ ] Verify which boundaries cover each tool; do not assume one sandbox covers all integrations.
- [ ] Require meaningful approval for destructive, costly, privileged, or externally visible actions.
- [ ] Review generated changes and run relevant tests and security checks before accepting the result.
- [ ] Inspect artifacts before sharing, and know how to revoke credentials and respond if data is exposed.

This checklist is a review aid, not proof of security. Controls and defaults vary by product, version, account, and organization policy.
