# Making the most of agents

Practical guidance for developers using AI agents, mostly GitHub Copilot. Pick a goal and try its first step; each link goes to the page that explains it.

## [Alignment](pages/alignment.md)

Get results that match what you intended.

- [Define the work](pages/define-and-verify-tasks.md#write-the-task)
- [Give it context](pages/repository-instructions.md)
- [Give it checks](pages/agent-tool-delegation.md)
- [Steer the work](pages/define-and-verify-tasks.md#steer-it)
- [Verify the result](concepts/tests-are-evidence.md)
- [Keep someone else as approver](pages/define-and-verify-tasks.md#verify-the-result)

## [Economy](pages/economy.md)

Get good results with less time and fewer tokens, without giving up quality or security.

- [Clarify the work early](pages/define-and-verify-tasks.md#write-the-task)
- [Let tools do bounded work](pages/agent-tool-delegation.md)
- [Run focused checks first](concepts/tests-are-evidence.md)
- [Keep context small](concepts/progressive-disclosure.md)
- [Add skills only when they pay off](pages/useful-skills.md)

## [Traceability](pages/traceability.md)

Leave a record someone else can follow later.

- [Record who did the work](pages/traceability.md#core-advice)
- [Copy the evidence onto the pull request](pages/traceability.md#core-advice)
- [Steer in the open](pages/define-and-verify-tasks.md#steer-it)
- [Separate who asked from who approved](pages/traceability.md#core-advice)
- [Keep records safe](pages/traceability.md#core-advice)

## [Security](pages/security.md)

Limit what an agent can reach and do. **Status: developing.**

- [Secure a local coding agent](pages/local-agent-security.md)
- [Secure the Copilot cloud agent](pages/cloud-agent-security.md)
- [Keep work data out of model training](concepts/inference-retention-training.md)
- [Treat repository content as untrusted](pages/prompt-injection-coding-agents.md)
- [Trace data and actions](pages/agent-data-flow-checklist.md)

## Explore further

- [Sitemap](pages/sitemap.md) — goal paths and a generated inventory of the wiki
- [Short slides](slides/README.md) — concise, standalone ideas
- [Reusable concepts](concepts/README.md) — focused explanations, plus background on evals, RAG, and vector stores
- [Authored pages](pages/README.md) — all articles, patterns, and checklists
- [AI glossary](pages/glossary.md) — shared vocabulary for AI and agents
- [Source index and records](sources/README.md) — provenance and research notes
