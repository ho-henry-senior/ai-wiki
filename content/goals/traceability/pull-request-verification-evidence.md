---
type: guide
summary: "Add one comment saying which checks ran, what they showed, and which did not."
status: established
lane: goals
goal: traceability
order: 2
checked: 2026-11-15
---

# Pull request verification evidence

Actions keeps checks, runs, and logs for 90 days by default, and public repositories cannot keep them longer, while CLI and editor sessions are yours to delete.\n\nSo add one comment saying which checks ran, what they showed, and which did not, and make corrections in pull request comments, [as when steering](../alignment/define-and-verify-tasks.md#steer-it).\n\nSummarize logs rather than pasting them, and never record secrets: a record is shared more widely than the session it came from.

If you must keep records longer, check your organization's records policy; GitHub Enterprise Cloud can stream agent audit-log events to long-term storage.

## Sources

- [GitHub Changelog: Actions retention will cover checks, workflow runs, and statuses](https://github.blog/changelog/2026-08-27-actions-retention-will-cover-checks-workflow-runs-and-statuses)
- [GitHub Docs: Agent management for enterprises](https://docs.github.com/en/enterprise-cloud@latest/copilot/concepts/enterprise/agent-management)
