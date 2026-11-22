---
type: advice
summary: "A named person approves each change and can answer for it; an agent's review, a passing check or a risk score is evidence for that decision, not the decision."
status: established
lane: goals
goal: traceability
order: 1
checked: 2026-11-22
tags:
  - Copilot
  - Pull requests and review
---

# Accountable approval

A named person approves each change and can answer for it; an agent's review, a passing check or a risk score is evidence for that decision, not the decision.

An agent can't answer for what it produced, so responsibility stays with the person who approves. Approval means something only if that person understood the change well enough to stand behind it. How to get there is in the [Review and approve agent work](review-and-approve-agent-work.md) guide.

## Choose the safeguards your risk calls for

How you enforce accountable approval is a team decision, based on its risk and governance. Two common safeguards:

- **Separate the requester from the approver.** The person who asked for a change may share the agent's assumptions, so a second person catches what both missed. GitHub builds this in for pull requests the Copilot cloud agent opens: when approvals are required, the approval of the person who asked Copilot doesn't count towards them.
- **Name owners for sensitive paths.** A `CODEOWNERS` file names who owns paths such as `.github/workflows/`; GitHub requests their review whenever those files change, and a repository admin can make that review required.

## Automatic approval

<div class="app-developing-card">
  <p class="govuk-body-s"><strong>Developing — an area to watch, not a recommendation</strong></p>
  <p>Some teams are exploring automatic approval of changes judged low-risk, and tools now allow it: Copilot's code review can be set to submit approvals that count, in public preview.</p>
  <p>This wiki doesn't recommend automatic approval for its UK public-sector audience. Its approach is to keep an accountable person as approver, with automated checks helping direct review effort.</p>
</div>

## Sources

- [GitHub Docs: Review output from Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/review-copilot-output)
- [GitHub Docs: About code owners](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)
- [GitHub Docs: Using GitHub Copilot code review](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review)
