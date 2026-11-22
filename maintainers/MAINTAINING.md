# Maintaining the wiki

Requires [Just](https://just.systems/), Node.js 22 or later, and npm. Run `just --list` to discover tasks, `just setup` to install the pinned development tools, then `just verify` to test and check Markdown formatting, and internal links, including heading anchors. Checks include `content/concepts/`, `content/slides/`, repository skills under `.agents/skills/`, and workflow Markdown. External URLs and raw material under `data/` are excluded.

`just style` fails when pages in `content/goals/`, `content/concepts/`, `content/articles/` and `content/reference/` don't meet [the writing standard](STYLE.md). It reads the hedge words and length ceilings from `STYLE.md` itself, so change the rules there. It reports:

- pages more than 10% over their length ceiling (the rule says "about"), counting prose only (not code, tables, or source lists). References, case studies, and pages that give a `long-because` reason have no ceiling;
- hedge words from rule 6;
- pages in `content/goals/<goal>/` whose `goal` front matter names a different goal, since the site's navigation reads the field and GitHub shows the folder;
- `checked` dates that are not real past dates written YYYY-MM-DD, and dates of checking written in the text instead;
- sentences that closely repeat a sentence on another page, which usually means advice should move to its [owner](#who-owns-what). Overviews, headings, "See …" pointers, and "Checked …" notes are skipped.

`just verify` runs it and its tests, and fails on any warning. The [Verify workflow](../.github/workflows/verify.yml) runs the same checks on every pull request, so a contributor who cannot run them locally still sees the result; a ruleset on `main` can require it, and the Website build, to pass before merging. To see warnings without failing, run `node scripts/style.mjs`. If a warning is wrong, improve the check or the rule in `maintainers/STYLE.md` rather than working around it.

When you add or remove a page, update `content/README.md` and the relevant concept, slide or source index if applicable, which is how readers browse on GitHub. The website builds its navigation and its own sitemap from front matter, so it needs no index edits.

Use `just format` to apply formatting or `just links` to check local links alone. Formatting preserves prose line breaks and leaves embedded code examples unchanged. Recipes delegate to npm scripts, which can also be run directly. See [the agent entrypoint](../AGENTS.md) for context pointers.

For a review of a page, the whole site, or its dated claims, follow [the review method](PAGE-REVIEWS.md); agents run it through [the wiki-review skill](../.agents/skills/wiki-review/SKILL.md). Reviews report their coverage and evidence; a structural review does not imply that every external claim has been reverified.

The dependency overrides pin patched `glob` and `minimatch` releases while the link-checking toolchain still requests older versions.

## Website

Project instructions in `maintainers/` are for this wiki's contributors and agents; the published `content/` tree is for readers. Do not put project-maintenance instructions in published indexes. The wiki is also built as a website with [Eleventy](https://www.11ty.dev/) and the [GOV.UK Eleventy Plugin](https://github.com/x-govuk/govuk-eleventy-plugin), and published to GitHub Pages from `main` by the [website workflow](../.github/workflows/site.yml). Every pull request builds the site, so a change that breaks the build fails its checks. The Markdown stays the source, and must keep working on GitHub and in editors:

- **Keep links as relative `.md` paths.** The build rewrites them for the site; links to files that are not on the site, such as `AGENTS.md`, go to GitHub. The rules are in `scripts/site-links.mjs`, with tests.
- **Let the build mark links that leave the wiki.** A link to another site, including a repository file that the build sends to GitHub, gets an arrow icon and the screen-reader description "Goes to another site"; links within the wiki get no marker. Write link text that names the destination anyway, such as "GitHub Docs: …". The rule is `isExternalLink` in `scripts/site-links.mjs`, with tests.
- **Do not put template syntax in pages.** Markdown is never processed as a template, so code examples such as `${{ github.ref }}` appear as written.
- **Share a diagram or short fragment with an include, rather than copying it.** Put the asset in `content/includes/` as a Markdown file, and on each page that uses it, put `<!-- include -->` on its own line before a descriptive link to it:

  ```markdown
  <!-- include -->

  [Diagram: a tool call, from the model's request to the harness's decision and back](../includes/tool-call-loop-diagram.md)
  ```

  On GitHub, readers see the link, and the asset renders when they open it. The website replaces the marker and link with the asset's Markdown before rendering, so an included ` ```mermaid ` block is drawn like any other diagram, and its `##` headings count towards the page's contents list. Assets are not published as pages. They have no front matter and no `#` title, may start with a comment saying which pages use them, and write links relative to themselves; the build rewrites those links for each page. An asset cannot include another asset, so there are no cycles. A missing asset, a path outside `content/includes/`, or a marker without a link fails the build with the page and line; `just links` also catches a missing asset. `just style` does not read assets, so their text does not count towards a page's length ceiling: use includes to share material, not to hide length. The rules are in `scripts/site-includes.mjs`, with tests. Preview with `just serve`.

- **Do not use GOV.UK's typeface or crown.** Only GOV.UK may use the GDS Transport typeface, the crown, or the GOV.UK logotype, and the site must not suggest it is part of GOV.UK. `assets/application.scss` replaces the typeface, the build removes the font files and crown icons the plugin copies in, and CI fails if either appears.

**Keep checks in step with site changes.** When changing templates, navigation, or generated content, review the corresponding assertions in [the Website workflow](../.github/workflows/site.yml) and tests under `scripts/`. Update them in the same pull request so they check the new behaviour and still catch regressions. Run both Verify and Website before merging.

The [information architecture specification](INFORMATION-ARCHITECTURE.md) is the single authority for the website's lanes, page types, Goals, tags, Guides, navigation contexts, reader journeys, and sitemap/search requirements. It distinguishes the agreed design from the current implementation and proposed migrations. Review it before changing page placement or navigation. The following notes describe the current build mechanics, while the specification defines their intended meaning.

### Navigation and front-matter mechanics

The five lanes are defined in `site/lanes.mjs`. Pages use `lane: goals`, `guides`, `articles`, `case-studies`, or `reference` for their primary navigation; a page without `lane` remains published and searchable but does not appear in a lane's navigation. Goal overview pages have `lane: goals`. Each goal has two to five core points, each with one home: an existing page, a routing page, or a section of the overview; the [information architecture](INFORMATION-ARCHITECTURE.md#core-points) says which to use. A routing page sits under the goal's folder, with `type: advice`, the matching `goal`, and an `order`. The Goals sidebar nests routing pages under their overview, each overview links to them with one-sentence summaries, and each routing page opens with that sentence so the site need not repeat its `summary` under the title.

For articles, use `lane: articles`. For evidence-led studies use `lane: case-studies` and `type: case-study`; see the [editorial format](INFORMATION-ARCHITECTURE.md#case-study-editorial-format). Set `goal: alignment`, `economy`, `security`, or `traceability` only when the page clearly has one primary goal. Where an Article is under `content/goals/<goal>/`, its `goal` field must agree with that folder; `just style` enforces this. Dated Articles use `date` and appear in the Atom feed at `/articles/feed.xml`, newest first. The feed is built from the articles collection, so a dated page outside the Articles lane is not automatically an Atom feed entry.

Tags use a flat controlled vocabulary defined in `site/tags.mjs`. Use a topic only when a page addresses it substantially, not merely mentions it. Add new allowed tags to that file before using them: `just style` rejects unknown tags. The published site renders tags beneath the page title with links to their topic indexes, and `/tags/` lists all tags.

Guide and multi-page case-study entries, members, and reading order are defined in one registry, `site/guides.mjs`. Its `readingRoutes` includes both kinds, while the exported `guides` contains only Guide entries. Case-study chapters remain in the Case studies lane, nest beneath their entry in the sidebar, and use unnumbered Previous/Next links; only the entry appears on the Case studies listing. The site's templates resolve membership from the page's canonical URL rather than repeating `guide` and `guideOrder` in front matter; see the [IA specification](INFORMATION-ARCHITECTURE.md#guide-metadata-and-validation). The Guides sidebar nests Guides-lane chapters beneath their entry; Reference members retain their Reference home. Ordered Guides provide Previous/Next and chapter numbers, or Previous/Next alone with `numbered: false`; thematic Guides link related resources without implying a required sequence. Existing URLs remain canonical. Do not introduce new series front matter; the shared reading-route registry replaces the old series navigation. A **guide group** (`guideGroups` in the same file) puts closely related Guides under one navigation entry with a short overview page: the Guides listing and sidebar show the group, alphabetically, with its Guides beneath it, and the sidebar expands only the active Guide's chapters. A group is not a Guide and has no chapters; add one only when two Guides are read together and would otherwise sit far apart.

The site's footer links to the tags index, the plugin's generated sitemap, this maintainer documentation, and the repository. Put links there that are useful from any page but are not pages of a lane. The glossary is a Reference page; link a term to it where a page first uses it without explaining it.

Each page's title comes from its first `#` heading and its description from `summary`; Published Markdown under `content/` retains its existing public URL; indexes have explicit paths. These are set in `site/_data/eleventyComputed.js`, and the build configuration is `site/eleventy.config.mjs`. Under the title, each page shows a subdued metadata line with its `checked` date and completeness `status` when present, and pages with three or more `##` sections get a contents list of them; the layout is `site/_includes/wiki.njk`. Heading IDs follow GitHub's rules, so `page.md#section` links work on both. Mermaid diagrams (` ```mermaid ` blocks) render on GitHub and on the site; the site loads Mermaid's script only on pages that have a diagram. Search uses the plugin's search box with our own ranking, in `assets/search-ranking.js`: whole-word matches, with title matches first, then descriptions, then page text.

The website's build tools have their own `site/package.json` and lock file, so `just setup` and the daily review do not install them; they need only the checks' tools. Install them with `just site-setup`, which skips install scripts, then preview with `just serve`. Update them deliberately, in their own pull request, rather than on the day a new version appears.

## Articles and concepts

Put a standalone explanation or reusable distinction in `content/concepts/` when extracting it helps readers reuse or find it. Follow the [concept conventions](#writing-a-concept). Keep articles coherent: summarize the idea where it supports the narrative, then link to the canonical explanation rather than duplicate its example and caveats.

Length alone is not a reason to split. Keep tightly coupled explanations together; catalogs, checklists, and concrete workflow examples can remain complete pages. Concepts may provide the basis for [short slides](../content/slides/README.md), but slide size is not a required format.

Short slides are standalone summaries of selected concepts, not replacements for their fuller explanations.

Use lightweight YAML front matter to identify each page's primary purpose and summarize it. A page may also serve other purposes:

```yaml
---
type: reference
summary: A concise description of what this page explains.
---
```

For the supported page types, their meanings, and how type differs from lane or Guide membership, see [Information architecture](INFORMATION-ARCHITECTURE.md#dimensions-of-the-content-model). Choose the type that describes the page's editorial purpose, then follow the relevant writing standard.

Focused reusable concepts live in `content/concepts/` and use the types described in the [concept conventions](#writing-a-concept). An explanatory article may bring several concepts together without replacing them.

The homepage and outcome overviews are the navigation layer, not a directory scheme. Link a page from every relevant outcome rather than duplicating it. The homepage answers "where should I start, and which way should I go?": First steps first, with one destination each, then the four goals with a short outcome each, then a single link to the Guides landing page and links to the other lanes. It doesn't list individual Guides or lane contents; their landing pages own those listings. Links to a lane's section of `content/README.md`, such as `content/README.md#guides`, go to that lane's landing page on the site.

Give reusable material, whether prose, a diagram or an example, one canonical home, and compose it elsewhere by linking rather than copying. A technical way to include shared assets in several pages is tracked in [#133](https://github.com/ho-henry-senior/ai-wiki/issues/133).

Match content to the page's purpose. Advice on making a repository ready for agents, for example, is about properties of the repository; how to define and approve a task, or what an agent is permitted to do at runtime, are separate topics with their own pages.

Before polishing a page, ask whether it should exist: keep it, refine it, merge it into another page, remove it, or defer it. Do not assume every page should be kept and expanded. [Reviewing the wiki](PAGE-REVIEWS.md) sets out how to decide, and records the decisions made so far.

## Writing a concept

Use descriptive, lowercase, hyphenated filenames and the same `type` and `summary` front matter as authored pages. Concepts normally use `type: reference` or `type: pattern`.

Use the shared [completeness status conventions](#completeness-status) when a concept has been assessed.

State the core idea first. Keep its explanation, a useful example or diagram, essential caveats, and supporting sources together. Link to articles that apply it and to related concepts where that helps navigation.

Extract a concept when it is useful independently or needed in multiple places. Keep its detailed explanation canonical in `content/concepts/`; articles should summarize it in their own narrative and link to it. A concept may suit a short slide, but neither a fixed word count nor slide-sized formatting is required. Keep brief definitions in the [glossary](../content/reference/glossary.md), linking to the concept for depth.

[Short slides](../content/slides/README.md) summarize selected concepts and link back to their fuller explanation.

Follow the [freshness guidance](#keeping-content-current) when editing concepts. Add new concepts to the [concept index](../content/concepts/README.md) and the relevant outcome overviews linked from the [homepage](../README.md).

## Maintaining sources

Keep provenance lightweight: enough to find a resource again and judge whether it may have changed. Add simple links to the [source index](../content/sources/README.md) with a title and, when useful, a short note. Give a resource its own Markdown file when it needs substantive notes, relevant sections or timestamps, or a more durable record. Prefer linking to the original over copying it.

Authored pages can link to sources selectively, especially where a source supports an important, time-sensitive, or contested point.

## Who owns what

Each idea below is explained in full on one page. Anywhere else, give a one-line summary and link to the owner. Overviews and the homepage summarize; they do not own detail. When you add a new core idea, add it here.

| Idea                                                                                                                       | Owner                                                                                                                |
| -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| The define, steer and verify cycle, and scaling it to the work                                                             | [Define, steer, and verify a task](../content/goals/alignment/define-and-verify-tasks.md)                            |
| Requirements discovery, scope negotiation and agreeing a specification                                                     | [Agree on the problem](../content/goals/alignment/agree-on-the-problem.md)                                           |
| Writing an issue: outcome, acceptance criteria, checks, out of scope                                                       | [Turn the specification into issues](../content/goals/alignment/turn-specification-into-issues.md)                   |
| Handing an issue to Copilot, steering it, and checking the result before accepting                                         | [Hand off an issue and steer the implementation](../content/goals/alignment/hand-off-and-steer.md)                   |
| Accountable approval: who approves, separating requester and approver, `CODEOWNERS`, automatic approval                    | [Accountable approval](../content/goals/traceability/accountable-approval.md)                                        |
| The record: the delivery process, agent attribution, the five questions                                                    | [A record through your delivery process](../content/goals/traceability/delivery-record.md)                           |
| Review and approval as responsibility; verification, review, approval and merge told apart                                 | [Review and approve agent work](../content/goals/traceability/review-and-approve-agent-work.md)                      |
| Prompting for reviewable work: change size, scope, tests, stop conditions, the handoff                                     | [Ask for small, focused changes](../content/goals/traceability/ask-for-small-focused-changes.md)                        |
| Agent-specific failure patterns, impact and verification risks                                  | [Identify the risks in a change](../content/goals/traceability/identify-risks-in-a-change.md)                                        |
| Agent review as evidence; the approval decision; what doesn't count as approval; recording the decision                    | [Review, decide and approve](../content/goals/traceability/review-decide-and-approve.md)                             |
| Judging tests: one per requirement, see it fail, read them                                                                 | [Hand off an issue and steer the implementation](../content/goals/alignment/hand-off-and-steer.md#verify-the-result) |
| Repository instructions: `AGENTS.md`, which Copilot features read which file, path-specific files, other agents' support   | [Write repository instructions in AGENTS.md](../content/goals/alignment/repository-instructions.md)                  |
| Loading context on demand                                                                                                  | [Progressive disclosure](../content/concepts/progressive-disclosure.md)                                              |
| Listing commands for the agent, task runners, `copilot-setup-steps.yml`                                                    | [Enable agents to run repository commands](../content/goals/alignment/agent-tool-delegation.md)                      |
| Where files go in a repository                                                                                             | [Set up a repository for agents](../content/goals/alignment/agent-facing-repository-structure.md)                    |
| Agent roles: contracts, custom-agent configuration and tool limits                                                         | [Agent roles](../content/concepts/skills-profiles-and-tools.md)                                                      |
| What a skill is, how Copilot uses one, and the steps                                                                       | [Skills](../content/goals/economy/useful-skills.md)                                                                  |
| How agent roles use skills, with original role examples                                                                    | [How agent roles use skills](../content/reference/agent-roles-directory.md)                                          |
| Built-in skills, and the community skills the wiki refers to                                                               | [Skills worth trying](../content/reference/agent-skills-directory.md)                                                |
| Reviewing, installing and checking someone else's skill; `gh skill`                                                        | [Install an existing skill](../content/reference/install-agent-skills.md)                                            |
| Where Copilot finds skills; writing a SKILL.md and its description; checking it loads                                      | [Write your own skill](../content/reference/writing-agent-skills.md)                                                 |
| Comparing a task with and without a skill; retiring one                                                                    | [Test whether a skill helps](../content/reference/test-agent-skills.md)                                              |
| AGENTS.md, skills, agent roles and tools compared                                                                          | [Shared include](../content/includes/skills-instructions-roles-tools.md), used by Skills and Agent roles             |
| Domain, decisions, and ADRs                                                                                                | [Repository context for coding agents](../content/goals/alignment/repository-context-for-agents.md)                  |
| The full security checklist, sensitive data, and destinations                                                              | [Agent data-flow checklist](../content/reference/agent-data-flow-checklist.md)                                       |
| Turning on a local agent's sandbox; its folders, network and bypass; Copilot CLI deny and URL rules; testing a restriction | [Configure the sandbox and tool restrictions](../content/goals/security/local-sandbox-and-tool-restrictions.md)      |
| Credentials a local agent's commands can use; a narrow token for Copilot; secrets in tool output                           | [Protect credentials and sensitive data](../content/goals/security/local-agent-credentials.md)                       |
| What a local sandbox doesn't cover; reviewing MCP servers and repository configuration; containers for untrusted code      | [Check integrations and sandbox boundaries](../content/goals/security/local-agent-integrations.md)                   |
| Copilot cloud agent protections and settings                                                                               | [Secure the Copilot cloud agent](../content/goals/security/cloud-agent-security.md)                                  |
| Prompt injection                                                                                                           | [Prompt injection](../content/goals/security/prompt-injection.md)                                                    |
| What Copilot sends, keeps, and trains on                                                                                   | [Inference, data retention, and model training](../content/concepts/inference-retention-training.md)                 |
| Instructions versus enforced controls                                                                                      | [Instructions and enforced controls](../content/concepts/instructions-vs-controls.md)                                |
| Using worktrees for parallel agent tasks                                                                                   | [Git worktrees for parallel agent work](../content/reference/git-worktrees-for-agents.md)                            |
| Where MCP servers run and send data                                                                                        | [Local MCP servers and data access](../content/concepts/local-and-remote-mcp.md)                                     |
| Secrets in tool output                                                                                                     | [Unexpected data exposure](../content/goals/security/unexpected-data-exposure.md)                                    |
| Hallucinated and malicious dependencies                                                                                    | [Invented dependencies and supply-chain attacks](../content/concepts/hallucinated-dependencies.md)                   |
| The model requests; the harness acts                                                                                       | [The model requests; the harness acts](../content/concepts/tool-call-loop.md)                                        |
| Session history versus context                                                                                             | [Session history and active context](../content/concepts/session-history-vs-context.md)                              |
| How Copilot charges, model tiers, the cache, session limits                                                                | [Choose a model and control cost](../content/goals/economy/choose-a-model-and-control-cost.md)                       |

## Writing a slide

Keep the takeaway and a small visual or example understandable on their own. Link to the canonical concept rather than duplicating its full explanation. When the slide and its concept show the same diagram or sentence, [include](#website) one shared asset in both rather than keeping two copies. Keep essential qualifications, and check a slide against its concept when either changes; follow the [freshness guidance](#keeping-content-current). Add it to the [slide index](../content/slides/README.md) and the relevant [goal navigation](../README.md).

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

`checked` is the oldest date on which the page's dated facts were verified, in a change to the page. If you re-verify only some of them, leave it unchanged. Do not write "Checked …" dates in the text; `just style` flags them, and the website shows the field under each page's title. List the sources you checked in the page's Sources section. When the scope of a check needs explanation, add an optional short `verification` string in front matter: the site shows this in a keyboard- and touch-accessible disclosure beside the visible checked date. Do not copy the full Sources list into this field, and keep caveats needed to follow the advice in the page body. Do not add verification notes to pages without a `checked` date; the disclosure is not an endorsement or a claim of ongoing accuracy. Record a version where it helps readers judge whether advice applies. Git history already shows when a page last changed, so pages carry no separate "updated" date. Follow [the source conventions](../content/sources/README.md) for provenance.

Some pages hold figures that change month to month, such as prices, allowances, and model names. Mark such a page in its front matter, and list the primary sources its figures come from:

```yaml
recheck: every-run
check-against:
  - https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing
```

The [daily review](#daily-reviews) checks marked pages against their sources before anything else, then re-checks one other dated page, in rotation, so every page with a `checked` date is re-verified about every three weeks. It moves the page's `checked` date only when it has compared every listed source and updated the page. A run that finds nothing changed records that in its findings and leaves the page alone, so a page may have been checked more recently than its date says. Each source's domain must be on the workflow's network allowlist; `just style` fails if it is not, or if `recheck` has no sources. Keep the changing figures in one dated section, so checking them is a comparison rather than new research, and leave the rest of the page general enough not to date.

Keep edit-time review focused on the affected material and directly dependent guidance, including concepts. Treat a whole-wiki review as a separate periodic task, following [the review method](PAGE-REVIEWS.md#how-to-review-the-whole-site), not a prerequisite for every change.

## Daily reviews

The [daily wiki review](../.github/workflows/daily-wiki-review.md) uses [GitHub Agentic Workflows](https://github.github.com/gh-aw/) and Copilot to propose small content improvements. It runs daily at a compiler-selected UTC time or manually from Actions, only on the default branch. An open PR with the `[wiki-review]` title prefix pauses further reviews until it is merged or closed. The agent also checks prior review PRs; duplicate detection is best-effort, not an exactly-once guarantee.

Each run re-checks the dated page checked longest ago, and remembers what it checked in [gh-aw cache-memory](https://github.github.com/gh-aw/reference/cache-memory/), at `/tmp/gh-aw/cache-memory/rotation.json`. The file holds only page paths, dates, source URLs, and results. A run that finds nothing new updates only that file, so it opens no pull request. Cache-memory lasts 7 days without a run; if it expires, the rotation restarts from the pages' `checked` dates. A source on a domain outside the workflow's network allowlist is recorded as unavailable.

Reviews use the existing skill, check the baseline before starting, and must run `just verify` after their edits before requesting a draft PR. Safe outputs restrict patches to the root topic map and Markdown under `content/`, with at most 12 changed files. Policies, instructions, slides, automation, tooling, and raw archives are outside the edit scope. Nothing merges automatically. Reviews report their actual coverage and evidence; uncertain claims are left unchanged.

The workflow installs a temporary copy of the review skill under `.github/skills/wiki-review/`. Formatting and link checks ignore that generated copy and check the maintained source under `.agents/skills/wiki-review/` instead.

Each review has a 100-AI-credit inference budget split between the main agent (80) and threat detection (20). The agent has a 20-minute execution timeout and a 40-turn limit. A per-user 24-hour guardrail also uses 100 credits; it checks prior usage at activation rather than reserving a shared daily allowance. These are usage guardrails, not a hard dollar billing cap: an in-flight request can exceed the remaining budget, and GitHub Actions runner charges are separate. See [the budget reference](https://github.github.com/gh-aw/reference/cost-management/). Failed agent runs or failed threat detection block PR publication.

Before the first run:

1. Add the source workflow and generated `.lock.yml` to the default branch. GitHub Actions executes the generated file.
2. Follow [Copilot authentication for personal repositories](https://github.github.com/gh-aw/reference/auth/#copilot_github_token): create a fine-grained PAT owned by your user account with the **Copilot Requests: Read** account permission, and store it as the Actions repository secret `COPILOT_GITHUB_TOKEN`. Enter it directly in GitHub or with `gh secret set COPILOT_GITHUB_TOKEN`; keep it out of chat and source control. An active Copilot license is required. This workflow deliberately does not use organization-billed `copilot-requests: write`.
3. In repository **Settings > Actions > General > Workflow permissions**, enable **Allow GitHub Actions to create and approve pull requests**. Keep the default token permissions read-only; only compiler-managed publication and reporting jobs carry repository write permissions, not the agent. The workflow never requests PR approval.
4. Manually run **Daily wiki review** from Actions and inspect its logs, credit usage, and any draft PR. A local compilation is not an end-to-end execution test.

PRs use the repository's `GITHUB_TOKEN` and do not automatically trigger other Actions workflows. Review and verify the proposed branch before merging. Missing credentials and other failures are recorded in Actions rather than creating daily failure issues. Disable the workflow in Actions to pause it.

To change the automation, edit its Markdown source, then run `gh aw compile daily-wiki-review --validate` with the [gh-aw CLI extension](https://github.github.com/gh-aw/setup/quick-start/) and commit both source and regenerated lock file. The initial lock was compiled with gh-aw v1.0.1. `just verify` includes the workflow Markdown; compilation separately checks the generated Actions configuration.

## Source watch

The [weekly source watch](../.github/workflows/weekly-source-watch.md) is an experiment ([#122](https://github.com/ho-henry-senior/ai-wiki/issues/122)) to learn whether an agent can find what matters to the wiki in the sources it follows. Each week a script, `scripts/source-watch.mjs`, fetches the feeds listed in [source-watch.md](source-watch.md) and keeps only new, dated items, without using the model; the agent then judges that short list, records anything new in one file under `data/source-watch/`, and opens a draft PR whose description lists items worth investigating as possible changes to the wiki's advice. Those are candidates, judged from a title and summary only, so open the original and corroborate it before changing any advice. An item counts as recorded only once its PR is merged, so closing a PR offers its items again next week. It never edits wiki pages: fetched feeds are untrusted text, so it runs separately from the daily review, with permission to add only that one records file. The records are not published on the site, so their quality can be judged first.

To change the sources, edit `source-watch.md` and add each new domain to the workflow's `network.allowed` list. After changing the workflow, recompile its lock file with `gh aw compile weekly-source-watch --validate`.
