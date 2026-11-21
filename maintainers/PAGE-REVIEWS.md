# Reviewing the wiki

How to review the wiki, from one page to the whole site, and the decisions recorded so far. This is the single review method: the [wiki-review skill](../.agents/skills/wiki-review/SKILL.md) runs it for agents. Reviews check pages against [the design goals](DESIGN-GOALS.md), [the information architecture](INFORMATION-ARCHITECTURE.md) and [the writing standard](STYLE.md); this file covers only the method and its record.

## Choose the scope

- **A page, or a group of overlapping pages:** when editing, or when pages seem to cover the same ground. Compare the group before deciding about any one page.
- **The whole site:** periodically, or after a structural change. Covers every lane, including Goals and Guides, and the homepage, indexes and glossary.
- **Freshness:** checking dated claims against their sources; see [keeping content current](MAINTAINING.md#keeping-content-current). An editorial or structural review is not a fact-check: say which claims, if any, were checked.

## How to review a page

1. **Read the published page,** not only its Markdown: the reading effort, clarity, density and presentation, and whether its assets help.
2. **Ask first whether it should exist on its own.** What would a reader lose if it disappeared? Could its few distinctive points live better in another page, or as a section of one?
3. **Judge it in this order:** practical usefulness, then relevance to the reader, distinctiveness and overlap with other pages, writing, information density, and presentation within the page.
4. **Count diagrams, examples and other assets in its favour only when they help.** A strong text-only page is not marked down.
5. **Adjust for its type.** A concise piece of advice, a summary of someone else's pattern, a longer case study and a curated directory each do a different job.
6. **Record a decision:** keep, refine, merge, remove or defer, with a one-line reason and the likely changes. Rarely, **extract**: move an explanation that several pages reuse into a page of its own.

Assess navigation and discoverability separately, as a property of the site, not of the page. Scores, if used at all, are notes to support a decision, never the decision.

**Removal is provisional until it is carried out.** Before removing a page, check what is distinctive in it and where that should move, and update every incoming link. The site cannot redirect, so a removed URL stops working; weigh that for pages linked from outside. **Defer** means the topic deserves coverage but isn't a priority now; it is not a removal.

## How to review the whole site

1. **Read every published page** and give each a disposition. Name anything left unread rather than describing a partial review as complete.
2. **Group pages that overlap** and decide about the group: one idea is explained in full on one page, its [owner](MAINTAINING.md#who-owns-what), and summarised with a link elsewhere.
3. **Trace each goal's path** from the homepage through its overview and core advice to how-tos and examples. Note missing guidance separately from guidance that exists but is hard to find.
4. **Check navigation against the information architecture:** lanes, guides, the homepage, indexes, tags, and link text that names its destination.
5. **Note writing themes** against the writing standard, rather than editing page by page as you read.
6. **Report findings and proposals in an issue** for discussion before changing content. Page count is an outcome of sound decisions, not a target.
7. **Apply agreed changes in small pull requests:** tidying first, then clear merges, then structural changes. Pilot a new pattern on one part of the site before extending it. Record each decision below.

## How to record a decision

Add one line under [Decisions](#decisions): the page's title, linked to its file; the decision in bold; then the reason and likely changes. When a decision is carried out, add the pull request number. When a later review changes a decision, replace the line rather than adding a second one.

## Decisions

From the pilot review of five pages ([#135](https://github.com/ho-henry-senior/ai-wiki/issues/135)):

- [The model requests; the harness acts](../content/concepts/tool-call-loop.md) — **Keep; refine the visual.** A good explanation. Make the slide a self-contained, reusable diagram rather than a partial duplicate; reusable includes are tracked in [#133](https://github.com/ho-henry-senior/ai-wiki/issues/133).
- **Repository layout example — Merge into [A structure for agent-facing repositories](../content/goals/alignment/agent-facing-repository-structure.md) in [PR #160](https://github.com/ho-henry-senior/ai-wiki/pull/160).** Preserve the useful instructions-to-checks diagram and real-file links in one structure guide rather than maintaining two overlapping examples.
- [The Home Repo pattern](../content/articles/home-repo-pattern.md) — **Keep; lightly refine.** An informative summary of an external pattern, with useful examples. Shorten it, and make its attribution and source clear.
- [Lo-fi software factory case study](../content/articles/lo-fi-software-factory-case-study.md) — **Keep; lightly refine.** A longer treatment suits a case study, and its related links help. Consider reusing an existing workflow diagram as a shared asset.
- [Agent skills directory](../content/reference/agent-skills-directory.md) — **Keep; restructure in [PR #162](https://github.com/ho-henry-senior/ai-wiki/pull/162).** Retain a source-linked standalone Reference directory; bring candidates into one place and distinguish built-in, inspected and tried skills. _Superseded: the list moved into the Skills guide as Skills worth trying; see the Skills guide entry below._

From reviews 6 to 12:

- [Agile roles in agentic development](../content/articles/agent-role-boundaries.md) — **Keep; shorten in [PR #162](https://github.com/ho-henry-senior/ai-wiki/pull/162).** Retain the handoff diagram and a reduced RACI matrix; move role contracts and the custom-agent example to [Agent roles, skills and tools](../content/concepts/skills-profiles-and-tools.md).
- **Task names need explicit contracts — Remove in [PR #138](https://github.com/ho-henry-senior/ai-wiki/pull/138).** Its four points (scope, cost, side effects and meaning of failure) now live in [Enable agents to run repository commands](../content/goals/alignment/agent-tool-delegation.md); the separate concept repeated that advice.
- **A worktree is not a sandbox — Remove in [PR #140](https://github.com/ho-henry-senior/ai-wiki/pull/140).** The standalone warning addresses an unlikely misconception. [Git worktrees for parallel agent work](../content/reference/git-worktrees-for-agents.md) retains the practical explanation and shared-state caveats.
- **Evals — Merge into the [glossary](../content/reference/glossary.md#evaluation-eval).** The page looked like a how-to but its steps could not be followed without substantial additional research. Keep the definition, not a standalone guide.
- **Passing tests are evidence, not proof — Remove in [PR #139](https://github.com/ho-henry-senior/ai-wiki/pull/139).** Consolidate acceptance-criterion coverage, tests that detect realistic failures, red-first verification, and the limits of unit tests in [Define, steer, and verify a task](../content/goals/alignment/define-and-verify-tasks.md#verify-the-result). Its short slide repeats the same caveat without adding a useful visual.
- [Progressive disclosure](../content/concepts/progressive-disclosure.md) — **Keep as a short concept; refocus.** Explain deliberate context design: a small initial context, good signposts, compact destinations and expansion on demand. One concrete example is enough; leave Copilot's loading mechanics to the repository-instructions guidance. It is distinct from retrieval-augmented generation.
- **Secrets can leak through tool output — Remove in [PR #141](https://github.com/ho-henry-senior/ai-wiki/pull/141).** The risk, masking precautions and credential-rotation response now appear in [Unexpected data exposure](../content/goals/security/unexpected-data-exposure.md) and [Secure a local coding agent](../content/goals/security/local-agent-security.md), with links to retention and session history. The standalone scenario added little.

- **Prompt injection — Consolidate into [Prompt injection](../content/goals/security/prompt-injection.md) in [PR #182](https://github.com/ho-henry-senior/ai-wiki/pull/182).** Keep the substantive explanation under the concise heading and URL; remove the redundant three-paragraph advice page, link directly from the Security overview, and retain the Copilot CLI deny-rule example. No redirects are needed at this stage.

From the whole-wiki editorial review ([#183](https://github.com/ho-henry-senior/ai-wiki/issues/183)):

- **Agent roles (guide introduction) — Merge into [Agent roles](../content/concepts/skills-profiles-and-tools.md) in [PR #185](https://github.com/ho-henry-senior/ai-wiki/pull/185).** It mostly listed the guide's pages; the concept page becomes the entry and takes in what a role is for and when to add one.
- **Skills and agent roles — Remove in [PR #185](https://github.com/ho-henry-senior/ai-wiki/pull/185).** It restated the skill/role distinction that [Agent roles](../content/concepts/skills-profiles-and-tools.md) owns; the rest was links to the two guides.
- **Agent authorship and attribution, Pull request verification evidence, Risk-focused change review, and Independent change approval — Merge into [Trust & Traceability](../content/goals/traceability/README.md#core-advice) in [PR #186](https://github.com/ho-henry-senior/ai-wiki/pull/186).** A pilot: each was a short advice page that repeated its overview's summary line; each is now a section of the overview. Review the result before applying the pattern to the other goals.
- **Justfile example — Merge into [Give agents a command interface with Just](../content/goals/economy/justfile-agent-workflows.md) in [PR #188](https://github.com/ho-henry-senior/ai-wiki/pull/188).** Its recipes and real-file links duplicated the how-to's; only the `format` recipe was distinct.
- [Local checks and tools for coding agents](../content/reference/local-development-tools.md) — **Keep as a catalogue; trimmed in [PR #188](https://github.com/ho-henry-senior/ai-wiki/pull/188).** Its advice on focused commands and handoff gates repeated the Just how-to and [Enable agents to run repository commands](../content/goals/alignment/agent-tool-delegation.md).
- [AGENTS.md example: short repository entrypoint](../content/reference/agents-md-example.md) — **Keep.** A fuller copyable file than the sample in [Write repository instructions in AGENTS.md](../content/goals/alignment/repository-instructions.md), with a contrasting real example found nowhere else.
- [Well-organised repository context](../content/goals/economy/agent-ready-repository-context.md) — **Add as Economy's routing page in [PR #192](https://github.com/ho-henry-senior/ai-wiki/pull/192).** Its how-to is spread across five pages, so a routing page does real work; unlike the thin page removed in #160, it explains why, routes each part, and says how to check.
- [Inference, data retention, and model training](../content/concepts/inference-retention-training.md) — **Keep; revised in [PR #193](https://github.com/ho-henry-senior/ai-wiki/pull/193).** The only page that separates sending, keeping and training. Filled the individual-plan retention gap, made it an explanation, set it to recheck every run, and pointed the data-flow checklist at it instead of repeating figures.
- **Set up a repository for agents — New Guide, with Previous/Next but no chapter numbers, in [PR #196](https://github.com/ho-henry-senior/ai-wiki/pull/196) ([#195](https://github.com/ho-henry-senior/ai-wiki/issues/195)).** The repository-layout page, retitled, is the entry for four existing resources. _Session history and active context_ became chapter four of _How coding agents work_. Home Repo and Git worktrees stay standalone.
- [Enable agents to run repository commands](../content/goals/alignment/agent-tool-delegation.md) and [Give agents a command interface with Just](../content/goals/economy/justfile-agent-workflows.md) — **Keep both; overlap removed in [PR #199](https://github.com/ho-henry-senior/ai-wiki/pull/199).** Next to each other in the repository Guide, they showed two justfiles and gave the use-what-you-have advice twice. The principle page now owns that advice and links to the Just page for the only justfile; the Just page links back. The principle page's old "Next" line went, since the Guide's Previous/Next replaces it.
- **Secure a local coding agent — Made a Guide, with Previous/Next but no chapter numbers, in [PR #201](https://github.com/ho-henry-senior/ai-wiki/pull/201) ([#200](https://github.com/ho-henry-senior/ai-wiki/issues/200)).** The page became the entry, with three new chapters: the sandbox and tool restrictions, credentials, and integrations. Each chapter is checked against GitHub's and VS Code's current documentation and rechecked every run. _Excessive agent access_ now helps a reader choose between the local guide and the cloud page, instead of linking the local page twice.
- **Skills guide — Restructured in [PR #205](https://github.com/ho-henry-senior/ai-wiki/pull/205).** The entry did a chapter's work and ran decide, write, find. It is now a short entry (what a skill is and the trial), then the directory to find an existing skill, then _Write a SKILL.md_, which gains where Copilot finds skills. Previous/Next without chapter numbers. No pages added or moved between lanes; _Progressive disclosure_ and _The Home Repo pattern_ stay where they are and are linked in context.
- **Skills guide — Rebuilt around tasks in [PR #209](https://github.com/ho-henry-senior/ai-wiki/pull/209) ([#208](https://github.com/ho-henry-senior/ai-wiki/issues/208)).** Its subpages weren't functional. Now: the entry (what a skill is, how Copilot uses one, and a shared comparison table of AGENTS.md, skills, roles and tools, which Agent roles also includes), then _Skills worth trying_, _Install an existing skill_, _Write your own skill_ and _Test whether a skill helps_. The directory moved from Reference into the guide and keeps only built-in skills and the three community skills other pages cite; the five unlinked entries and the uninspected candidate went.

## Next

The whole-wiki editorial review in [#183](https://github.com/ho-henry-senior/ai-wiki/issues/183) tracks the remaining agreed steps: extending the Trust & Traceability pilot to the other goals if it works, and the lower-priority candidates (vector stores and the slide).
