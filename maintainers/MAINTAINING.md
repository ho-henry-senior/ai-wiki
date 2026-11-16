# Maintaining the wiki

Requires [Just](https://just.systems/), Node.js 22 or later, and npm. Run `just --list` to discover tasks, `just setup` to install the pinned development tools, then `just verify` to test and check Markdown formatting, and internal links, including heading anchors. Checks include `concepts/`, `slides/`, repository skills under `.agents/skills/`, and workflow Markdown. External URLs and raw material under `data/` are excluded.

`just style` fails when pages in `pages/` and `concepts/` don't meet [the writing standard](STYLE.md). It reads the hedge words and length ceilings from `STYLE.md` itself, so change the rules there. It reports:

- pages more than 10% over their length ceiling (the rule says "about"), counting prose only (not code, tables, or source lists). References, case studies, and pages that give a `long-because` reason have no ceiling;
- hedge words from rule 6; and
- `checked` dates that are not real past dates written YYYY-MM-DD, and dates of checking written in the text instead;
- sentences that closely repeat a sentence on another page, which usually means advice should move to its [owner](#who-owns-what). Overviews, headings, "See …" pointers, and "Checked …" notes are skipped.

`just verify` runs it and its tests, and fails on any warning. To see warnings without failing, run `node scripts/style.mjs`. If a warning is wrong, improve the check or the rule in `maintainers/STYLE.md` rather than working around it.

When you add or remove a page, update its folder's index (`pages/README.md`, `concepts/README.md`, and so on), which is how readers browse on GitHub. The website builds its navigation and its own sitemap from front matter, so it needs no index edits.

Use `just format` to apply formatting or `just links` to check local links alone. Formatting preserves prose line breaks and leaves embedded code examples unchanged. Recipes delegate to npm scripts, which can also be run directly. See [the agent entrypoint](../AGENTS.md) for context pointers.

For a periodic structural or freshness review, use [the wiki-review skill](../.agents/skills/wiki-review/SKILL.md). Reviews report their coverage and evidence; a structural review does not imply that every external claim has been reverified.

The dependency overrides pin patched `glob` and `minimatch` releases while the link-checking toolchain still requests older versions.

## Website

Project instructions in `maintainers/` are for this wiki's contributors and agents; the published `pages/`, `concepts/`, and `sources/` are for readers. Do not put project-maintenance instructions in published indexes. The wiki is also built as a website with [Eleventy](https://www.11ty.dev/) and the [GOV.UK Eleventy Plugin](https://github.com/x-govuk/govuk-eleventy-plugin), and published to GitHub Pages from `main` by the [website workflow](../.github/workflows/site.yml). Every pull request builds the site, so a change that breaks the build fails its checks. The Markdown stays the source, and must keep working on GitHub and in editors:

- **Keep links as relative `.md` paths.** The build rewrites them for the site; links to files that are not on the site, such as `AGENTS.md`, go to GitHub. The rules are in `scripts/site-links.mjs`, with tests.
- **Do not put template syntax in pages.** Markdown is never processed as a template, so code examples such as `${{ github.ref }}` appear as written.
- **Do not use GOV.UK's typeface or crown.** Only GOV.UK may use the GDS Transport typeface, the crown, or the GOV.UK logotype, and the site must not suggest it is part of GOV.UK. `assets/application.scss` replaces the typeface, the build removes the font files and crown icons the plugin copies in, and CI fails if either appears.

Each page says where it belongs in the site's navigation with front matter. `lane` is `guidance`, `reference`, or `articles`; guidance pages also give a `goal` (`alignment`, `economy`, `traceability`, `security`, or `concepts`), and `order` sets their place within it. Articles give a `date` and are listed newest first. A page with no `lane` stays on the site and in search, but not in the navigation. The lanes are defined in `site/lanes.mjs`.

A page can also list the parts of Copilot it applies to, in `applies-to`, one per line, such as `cli` or `cloud-agent`. List a part the page gives instructions or behavior for, not one it only mentions. The site shows their names under the page's title, so readers can tell whether a page is for the Copilot they use. The parts are defined in `site/applies-to.mjs`, and `just style` rejects any that are not listed there.

The site's footer links to the glossary, the plugin's generated sitemap, this maintainer documentation, and the repository. Put links there that are useful from any page but are not pages of a lane.

Each page's title comes from its first `#` heading and its description from `summary`; `README.md` files become their folder's index page. These are set in `site/_data/eleventyComputed.js`, and the build configuration is `site/eleventy.config.mjs`. Under the title, each page shows its completeness `status` as a tag and its `checked` date, and pages with three or more `##` sections get a contents list of them; the layout is `site/_includes/wiki.njk`. Heading IDs follow GitHub's rules, so `page.md#section` links work on both. Mermaid diagrams (` ```mermaid ` blocks) render on GitHub and on the site; the site loads Mermaid's script only on pages that have a diagram. Search uses the plugin's search box with our own ranking, in `assets/search-ranking.js`: whole-word matches, with title matches first, then descriptions, then page text.

The website's build tools have their own `site/package.json` and lock file, so `just setup` and the daily review do not install them; they need only the checks' tools. Install them with `just site-setup`, which skips install scripts, then preview with `just serve`. Update them deliberately, in their own pull request, rather than on the day a new version appears.

## Articles and concepts

Put a standalone explanation or reusable distinction in `concepts/` when extracting it helps readers reuse or find it. Follow the [concept conventions](#writing-a-concept). Keep articles coherent: summarize the idea where it supports the narrative, then link to the canonical explanation rather than duplicate its example and caveats.

Length alone is not a reason to split. Keep tightly coupled explanations together; catalogs, checklists, and concrete workflow examples can remain complete pages. Concepts may provide the basis for [short slides](../slides/README.md), but slide size is not a required format.

Short slides are standalone summaries of selected concepts, not replacements for their fuller explanations.

Use lightweight YAML front matter to identify each page's primary purpose and summarize it. A page may also serve other purposes:

```yaml
---
type: reference
summary: A concise description of what this page explains.
---
```

Suggested `type` values:

- `overview` — an entrypoint to an outcome or a group of related approaches.
- `guide` — applied guidance for approaching a task or problem.
- `pattern` — a reusable practice or building block.
- `explanation` — an article explaining how related ideas fit together and why they matter.
- `reference` — information or a checklist to consult.
- `case-study` — an account of an approach applied in practice and what happened.
- `exploration` — a provisional investigation or path, rather than a case study or established practice.

Focused reusable concepts live in `concepts/` and use the types described in the [concept conventions](#writing-a-concept). An explanatory article may bring several concepts together without replacing them.

The homepage and outcome overviews are the navigation layer, not a directory scheme. Link a page from every relevant outcome rather than duplicating it.

## Writing a concept

Use descriptive, lowercase, hyphenated filenames and the same `type` and `summary` front matter as authored pages. Concepts normally use `type: reference` or `type: pattern`.

Use the shared [completeness status conventions](#completeness-status) when a concept has been assessed.

State the core idea first. Keep its explanation, a useful example or diagram, essential caveats, and supporting sources together. Link to articles that apply it and to related concepts where that helps navigation.

Extract a concept when it is useful independently or needed in multiple places. Keep its detailed explanation canonical in `concepts/`; articles should summarize it in their own narrative and link to it. A concept may suit a short slide, but neither a fixed word count nor slide-sized formatting is required. Keep brief definitions in the [glossary](../pages/glossary.md), linking to the concept for depth.

[Short slides](../slides/README.md) summarize selected concepts and link back to their fuller explanation.

Follow the [freshness guidance](#keeping-content-current) when editing concepts. Add new concepts to the [concept index](../concepts/README.md) and the relevant outcome overviews linked from the [homepage](../README.md).

## Maintaining sources

Keep provenance lightweight: enough to find a resource again and judge whether it may have changed. Add simple links to the [source index](../sources/README.md) with a title and, when useful, a short note. Give a resource its own Markdown file when it needs substantive notes, relevant sections or timestamps, or a more durable record. Prefer linking to the original over copying it.

Authored pages can link to sources selectively, especially where a source supports an important, time-sensitive, or contested point.

## Who owns what

Each idea below is explained in full on one page. Anywhere else, give a one-line summary and link to the owner. Overviews and the homepage summarize; they do not own detail. When you add a new core idea, add it here.

| Idea                                                                                                                             | Owner                                                                                       |
| -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Write the task, hand it to Copilot, steer it, verify it, second approver                                                         | [Define, steer, and verify a task](../pages/define-and-verify-tasks.md)                        |
| The record: authorship, evidence on the PR, where records live, why corrections go on the PR, the agent's explanation is a claim | [Traceability](../pages/traceability.md)                                                       |
| Judging tests: one per requirement, see it fail, read them                                                                       | [Passing tests are evidence, not proof](../concepts/tests-are-evidence.md)                     |
| Repository instructions: `AGENTS.md`, which Copilot features read which file, path-specific files, other agents' support         | [Write repository instructions in AGENTS.md](../pages/repository-instructions.md)              |
| Loading context on demand                                                                                                        | [Load context through focused entrypoints](../concepts/progressive-disclosure.md)              |
| Listing commands for the agent, task runners, `copilot-setup-steps.yml`                                                          | [Let the agent run your repository's commands](../pages/agent-tool-delegation.md)              |
| What to say about each command                                                                                                   | [Task names need explicit contracts](../concepts/task-interface-contracts.md)                  |
| Where files go in a repository                                                                                                   | [A structure for agent-facing repositories](../pages/agent-facing-repository-structure.md)     |
| Skills versus profiles (custom agents) versus tools                                                                              | [Skills, profiles, and tools have different jobs](../concepts/skills-profiles-and-tools.md)    |
| When to add a skill, where Copilot finds skills, candidates                                                                      | [Choose and add skills](../pages/useful-skills.md)                                             |
| Domain, decisions, and ADRs                                                                                                      | [Furnish repositories with context for agents](../pages/repository-context-for-agents.md)      |
| The full security checklist, sensitive data, and destinations                                                                    | [Agent data-flow checklist](../pages/agent-data-flow-checklist.md)                             |
| Local agent settings: Copilot CLI permissions, credentials, boundaries                                                           | [Secure a local coding agent](../pages/local-agent-security.md)                                |
| Copilot's local sandbox and how to verify it                                                                                     | [Sandbox a local coding agent](../pages/local-agent-sandboxing.md)                             |
| Copilot cloud agent protections and settings                                                                                     | [Secure the Copilot cloud agent](../pages/cloud-agent-security.md)                             |
| Prompt injection                                                                                                                 | [Prompt injection in coding-agent workflows](../pages/prompt-injection-coding-agents.md)       |
| What Copilot sends, keeps, and trains on                                                                                         | [Inference, retention, and training are separate](../concepts/inference-retention-training.md) |
| Instructions versus enforced controls                                                                                            | [Instructions are not enforced controls](../concepts/instructions-vs-controls.md)              |
| Worktrees versus sandboxes                                                                                                       | [A worktree is not a sandbox](../concepts/worktrees-not-sandboxes.md)                          |
| Where MCP servers run and send data                                                                                              | [Local MCP does not mean local-only data](../concepts/local-and-remote-mcp.md)                 |
| Secrets in tool output                                                                                                           | [Secrets can leak through tool output](../concepts/secrets-in-tool-output.md)                  |
| Hallucinated and malicious dependencies                                                                                          | [Invented package names can be real attacks](../concepts/hallucinated-dependencies.md)         |
| The model requests; the harness acts                                                                                             | [The model requests; the harness acts](../concepts/tool-call-loop.md)                          |
| Session history versus context                                                                                                   | [Session history is not active context](../concepts/session-history-vs-context.md)             |
| How Copilot charges, model tiers, the cache, session limits                                                                      | [Choose a model and control cost](../pages/choose-a-model-and-control-cost.md)                 |

## Writing a slide

Keep the takeaway and a small visual or example understandable on their own. Link to the canonical concept rather than duplicating its full explanation. Keep essential qualifications, and check a slide against its concept when either changes; follow the [freshness guidance](#keeping-content-current). Add it to the [slide index](../slides/README.md) and the relevant [goal navigation](../README.md).

## Completeness status

An assessed page or concept may include `status` in its front matter. This is an editorial judgment about completeness for the page's stated purpose, not a guarantee of correctness, safety, or freshness. A missing status means **unassessed**, not established.

- `stub` — an early outline, placeholder, or starting point with too little coverage to fulfill its stated purpose on its own. It may still link to useful material.
- `developing` — useful content with significant gaps in fulfilling its stated purpose.
- `established` — fulfills its stated purpose with useful content and important limitations explained; it can still improve.

Choose a status based on the content, not its age, length, or `type`. For example, an exploration can have any completeness status: an established exploration fulfills its purpose without implying that its ideas are settled. Explain material gaps in the page or its navigation context. Prefer usable guidance on central routes; keep incomplete material discoverable and make important gaps visible rather than hiding them. Reassess status when the content changes or a review finds evidence for a change; promotion is a judgment, not an automatic consequence of editing.

## Keeping content current

For substantive edits, review the affected pages for claims that may have become stale, especially tool capabilities, configuration paths, API behavior, model limits, and provider security or data-handling policies. Mechanical formatting fixes do not require a freshness review.

Check those claims against current primary sources. Update outdated guidance and its supporting links; where verification is unavailable or inconclusive, flag the uncertainty rather than presenting it as confirmed. Distinguish durable principles from product-, version-, or account-specific behavior.

For time-sensitive claims, such as what a Copilot feature does or what it costs, record when you verified them in the page's front matter:

```yaml
checked: 2026-11-15
```

`checked` is the oldest date on which the page's dated facts were verified, in a change to the page. If you re-verify only some of them, leave it unchanged. Do not write "Checked …" dates in the text; `just style` flags them, and the website shows the field under each page's title. List the sources you checked in the page's Sources section. Record a version where it helps readers judge whether advice applies. Git history already shows when a page last changed, so pages carry no separate "updated" date. Follow [the source conventions](../sources/README.md) for provenance.

Some pages hold figures that change month to month, such as prices, allowances, and model names. Mark such a page in its front matter, and list the primary sources its figures come from:

```yaml
recheck: every-run
check-against:
  - https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing
```

The [daily review](#daily-reviews) checks marked pages against their sources before anything else, then re-checks one other dated page, in rotation, so every page with a `checked` date is re-verified about every three weeks. It moves the page's `checked` date only when it has compared every listed source and updated the page. A run that finds nothing changed records that in its findings and leaves the page alone, so a page may have been checked more recently than its date says. Each source's domain must be on the workflow's network allowlist; `just style` fails if it is not, or if `recheck` has no sources. Keep the changing figures in one dated section, so checking them is a comparison rather than new research, and leave the rest of the page general enough not to date.

Keep edit-time review focused on the affected material and directly dependent guidance, including concepts. Treat a whole-wiki review as a separate periodic task, using [the wiki-review skill](../.agents/skills/wiki-review/SKILL.md), not a prerequisite for every change.

## Daily reviews

The [daily wiki review](../.github/workflows/daily-wiki-review.md) uses [GitHub Agentic Workflows](https://github.github.com/gh-aw/) and Copilot to propose small content improvements. It runs daily at a compiler-selected UTC time or manually from Actions, only on the default branch. An open PR with the `[wiki-review]` title prefix pauses further reviews until it is merged or closed. The agent also checks prior review PRs; duplicate detection is best-effort, not an exactly-once guarantee.

Each run re-checks the dated page checked longest ago, and remembers what it checked in [gh-aw cache-memory](https://github.github.com/gh-aw/reference/cache-memory/), at `/tmp/gh-aw/cache-memory/rotation.json`. The file holds only page paths, dates, source URLs, and results. A run that finds nothing new updates only that file, so it opens no pull request. Cache-memory lasts 7 days without a run; if it expires, the rotation restarts from the pages' `checked` dates. A source on a domain outside the workflow's network allowlist is recorded as unavailable.

Reviews use the existing skill, check the baseline before starting, and must run `just verify` after their edits before requesting a draft PR. Safe outputs restrict patches to the root topic map and Markdown under `pages/`, `concepts/`, and `sources/`, with at most 12 changed files. Policies, instructions, slides, automation, tooling, and raw archives are outside the edit scope. Nothing merges automatically. Reviews report their actual coverage and evidence; uncertain claims are left unchanged.

The workflow installs a temporary copy of the review skill under `.github/skills/wiki-review/`. Formatting and link checks ignore that generated copy and check the maintained source under `.agents/skills/wiki-review/` instead.

Each review has a 100-AI-credit inference budget split between the main agent (80) and threat detection (20). The agent has a 20-minute execution timeout and a 40-turn limit. A per-user 24-hour guardrail also uses 100 credits; it checks prior usage at activation rather than reserving a shared daily allowance. These are usage guardrails, not a hard dollar billing cap: an in-flight request can exceed the remaining budget, and GitHub Actions runner charges are separate. See [the budget reference](https://github.github.com/gh-aw/reference/cost-management/). Failed agent runs or failed threat detection block PR publication.

Before the first run:

1. Add the source workflow and generated `.lock.yml` to the default branch. GitHub Actions executes the generated file.
2. Follow [Copilot authentication for personal repositories](https://github.github.com/gh-aw/reference/auth/#copilot_github_token): create a fine-grained PAT owned by your user account with the **Copilot Requests: Read** account permission, and store it as the Actions repository secret `COPILOT_GITHUB_TOKEN`. Enter it directly in GitHub or with `gh secret set COPILOT_GITHUB_TOKEN`; keep it out of chat and source control. An active Copilot license is required. This workflow deliberately does not use organization-billed `copilot-requests: write`.
3. In repository **Settings > Actions > General > Workflow permissions**, enable **Allow GitHub Actions to create and approve pull requests**. Keep the default token permissions read-only; only compiler-managed publication and reporting jobs carry repository write permissions, not the agent. The workflow never requests PR approval.
4. Manually run **Daily wiki review** from Actions and inspect its logs, credit usage, and any draft PR. A local compilation is not an end-to-end execution test.

PRs use the repository's `GITHUB_TOKEN` and do not automatically trigger other Actions workflows. Review and verify the proposed branch before merging. Missing credentials and other failures are recorded in Actions rather than creating daily failure issues. Disable the workflow in Actions to pause it.

To change the automation, edit its Markdown source, then run `gh aw compile daily-wiki-review --validate` with the [gh-aw CLI extension](https://github.github.com/gh-aw/setup/quick-start/) and commit both source and regenerated lock file. The initial lock was compiled with gh-aw v1.0.1. `just verify` includes the workflow Markdown; compilation separately checks the generated Actions configuration.
