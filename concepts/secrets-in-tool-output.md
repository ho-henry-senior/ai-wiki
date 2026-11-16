---
type: reference
summary: Anything a command prints goes to the model and into session history, so keep secrets out of output and out of reach; if one leaks, rotate it.
status: established
lane: guidance
goal: security
order: 24
checked: 2026-11-15
---

# Secrets can leak through tool output

Keep secrets out of what commands print. Anything a tool prints becomes part of the conversation: it goes to the model in the next request and is saved in the session, with no one asking to upload it.

## How it happens

1. You ask the agent to diagnose a failing test.
2. It runs a command that prints environment variables, including a token.
3. The output is sent to the model and saved in the session.
4. Session sync, a shared log, or a pull request comment makes more copies.

The same applies to private code, customer data in application logs, and summaries that repeat them.

## Reduce exposure at the source

- **Keep secrets out of reach.** Use made-up fixtures, and keep credentials the task does not need out of the environment: [locally](../pages/local-agent-security.md) and [in the cloud agent](../pages/cloud-agent-security.md).
- **Stop them being printed.** Prefer diagnostics that mask secrets. Redacting later cannot undo a request that was already sent.

## If a secret leaks

Rotate or revoke it; do not rely on deleting text. Copies may exist in synced sessions and in cloud agent session logs, which cannot be deleted; see [traceability](../pages/traceability.md#core-advice). Deleting a local copy does not remove the others.

## Sources

- [GitHub Docs: Copilot session data](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/session-data)
- [GitHub Docs: Managing agent sessions](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents)
- [GitHub Docs: Responsible use of Copilot cloud agent](https://docs.github.com/en/copilot/responsible-use/copilot-cloud-agent)

Applied in [the security overview](../pages/security.md) and [the data-flow checklist](../pages/agent-data-flow-checklist.md).
