---
type: reference
summary: Sending data for a response, keeping it, and training on it are separate questions; for Copilot, the answers depend on your plan and which feature you use.
status: developing
lane: articles
goal: security
order: 25
checked: 2026-11-15
tags:
  - Data and privacy
---

# Inference, retention, and training are separate

Ask three questions about any agent that handles sensitive data: what is sent, what is kept and for how long, and whether it is used for training. "Not used for training" does not mean "never sent" or "never stored".

## The answers for Copilot

| Question                    | Copilot Business and Enterprise                                                                                                                                                                                                                         | Copilot Free, Pro, and Pro+                                                                             |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| What is sent?               | Prompts and context go to GitHub's service and its model providers to produce a response, on every plan.                                                                                                                                                | The same.                                                                                               |
| What is kept?               | In an editor, chat and completion prompts are not kept. On GitHub.com, in GitHub Mobile, and in the CLI, prompts and responses are kept for 28 days. Cloud agent session logs stay on GitHub; see [traceability](../goals/traceability/README.md#core-advice). | See GitHub's privacy statement for your plan.                                                           |
| Is it used to train models? | No.                                                                                                                                                                                                                                                     | Yes, by default since 24 April 2026, unless you turn it off in your Copilot settings under **Privacy**. |

**For work code, use a Business or Enterprise seat**, or check that model training is turned off in your personal Copilot settings. An organization seat also lets administrators set policies such as content exclusion.

The retention figures are from GitHub's Copilot Trust Center FAQ.

## Other agents and tools

Ask the same three questions of every other agent and integration, including MCP servers, which may send data to their own services. Turning off session sync does not stop requests to the model, and a model running locally does not stop a tool from sending data elsewhere. Local history, cloud sessions, and the provider's records can each have different retention and deletion rules.

## Sources

- [GitHub Changelog: Updates to our Privacy Statement and Terms of Service (25 March 2026)](https://github.blog/changelog/2026-03-25-updates-to-our-privacy-statement-and-terms-of-service-how-we-use-your-data/)
- [GitHub Copilot Trust Center](https://copilot.github.trust.page)
- [GitHub Docs: Copilot session data](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/session-data)
- [GitHub Docs: Managing agent sessions](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents)

Applied in [the agent data-flow checklist](../reference/agent-data-flow-checklist.md).
