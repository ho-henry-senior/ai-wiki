---
type: reference
summary: A diagnostic command can expose a secret through its result, saved history, and subsequent model requests without an explicit upload.
---

# Secrets can leak through tool output

An agent does not need an explicit request to upload a secret for exposure to occur. A tool can print sensitive data as an incidental part of otherwise useful work.

## An accidental flow

1. A diagnostic command prints a credential in an error message.
2. The output becomes a tool result.
3. The harness may save it in session history and include it in a subsequent model request.
4. Session syncing or a shared debugging transcript may create further copies.

Each later step depends on the harness, tool, and configuration. This also applies to private code, personal data in application logs, and generated summaries that repeat sensitive details.

## Reduce exposure at the source

Prefer sanitized fixtures and diagnostics that omit secrets, and keep unnecessary credentials outside the execution environment. Redact before returning output to the harness where possible; later redaction cannot undo transmission that already occurred.

Review relevant local and remote records if exposure occurs. Revoke or rotate exposed credentials rather than relying only on deleting visible text. Deleting a local transcript does not necessarily delete remote copies or backups.

## Sources and applications

- [OpenAI: Unrolling the Codex agent loop](https://openai.com/index/unrolling-the-codex-agent-loop/) — how tool results become input to later model requests.
- [Anthropic: How Claude Code works](https://code.claude.com/docs/en/how-claude-code-works#work-with-sessions) — an example of persisted tool results.
- Applied in [the security overview](../pages/security.md) and [the data-flow checklist](../pages/agent-data-flow-checklist.md).
