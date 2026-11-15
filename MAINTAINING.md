# Maintaining the wiki

Requires [Just](https://just.systems/), Node.js 22 or later, and npm. Run `just --list` to discover tasks, `just setup` to install the pinned development tools, then `just verify` to test and check the sitemap, Markdown formatting, and internal links, including heading anchors. Checks include `concepts/`, `slides/`, repository skills under `.agents/skills/`, and workflow Markdown. External URLs and raw material under `data/` are excluded.

The [sitemap](pages/sitemap.md) lists pages from their metadata and shows the links curated in the four outcome overviews. After adding or removing content, changing its title or metadata, or changing overview links, run `just sitemap`; `just verify` reports stale output without changing it. The sitemap excludes directory indexes and raw material from its generated inventory.

Use `just format` to apply formatting or `just links` to check local links alone. Formatting preserves prose line breaks and leaves embedded code examples unchanged. Recipes delegate to npm scripts, which can also be run directly. See [the agent entrypoint](AGENTS.md) for context pointers.

For a periodic structural or freshness review, use [the wiki-review skill](.agents/skills/wiki-review/SKILL.md). Reviews report their coverage and evidence; a structural review does not imply that every external claim has been reverified.

The dependency overrides pin patched `glob` and `minimatch` releases while the link-checking toolchain still requests older versions.

## Articles and concepts

Put a standalone explanation or reusable distinction in `concepts/` when extracting it helps readers reuse or find it. Follow the [concept conventions](concepts/README.md#writing-a-concept). Keep articles coherent: summarize the idea where it supports the narrative, then link to the canonical explanation rather than duplicate its example and caveats.

Length alone is not a reason to split. Keep tightly coupled explanations together; catalogs, checklists, and concrete workflow examples can remain complete pages. Concepts may provide the basis for [short slides](slides/README.md), but slide size is not a required format.

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

Focused reusable concepts live in `concepts/` and use the types described in the [concept conventions](concepts/README.md#writing-a-concept). An explanatory article may bring several concepts together without replacing them.

The homepage and outcome overviews are the navigation layer, not a directory scheme. Link a page from every relevant outcome rather than duplicating it. The [sitemap](pages/sitemap.md) groups goal links from each overview's `Try this first` and `Core advice` sections separately from `Explore further`; links elsewhere appear as other links. Its inventory comes from page metadata. Regenerate it with `just sitemap` rather than editing it directly.

## Writing a slide

Keep the takeaway and a small visual or example understandable on their own. Link to the canonical concept rather than duplicating its full explanation. Keep essential qualifications, and check a slide against its concept when either changes; follow the [freshness guidance](#keeping-content-current). Add it to the [slide index](slides/README.md) and the relevant [goal navigation](README.md).

## Completeness status

An assessed page or concept may include `status` in its front matter. This is an editorial judgment about completeness for the page's stated purpose, not a guarantee of correctness, safety, or freshness. A missing status means **unassessed**, not established.

- `stub` — an early outline, placeholder, or starting point with too little coverage to fulfill its stated purpose on its own. It may still link to useful material.
- `developing` — useful content with significant gaps in fulfilling its stated purpose.
- `established` — fulfills its stated purpose with useful content and important limitations explained; it can still improve.

Choose a status based on the content, not its age, length, or `type`. For example, an exploration can have any completeness status: an established exploration fulfills its purpose without implying that its ideas are settled. Explain material gaps in the page or its navigation context. Prefer usable guidance on central routes; keep incomplete material discoverable and make important gaps visible rather than hiding them. Reassess status when the content changes or a review finds evidence for a change; promotion is a judgment, not an automatic consequence of editing.

## Keeping content current

For substantive edits, review the affected pages for claims that may have become stale, especially tool capabilities, configuration paths, API behavior, model limits, and provider security or data-handling policies. Mechanical formatting fixes do not require a freshness review.

Check those claims against current primary sources. Update outdated guidance and its supporting links; where verification is unavailable or inconclusive, flag the uncertainty rather than presenting it as confirmed. Distinguish durable principles from product-, version-, or account-specific behavior.

For time-sensitive claims or recommendations, record the relevant version or review date where it helps readers judge applicability. A review date should describe what was actually checked, not imply that every claim in the page was reverified. Follow [the source conventions](sources/README.md) for provenance.

Keep edit-time review focused on the affected material and directly dependent guidance, including concepts. Treat a whole-wiki review as a separate periodic task, using [the wiki-review skill](.agents/skills/wiki-review/SKILL.md), not a prerequisite for every change.

## Daily reviews

The [daily wiki review](.github/workflows/daily-wiki-review.md) uses [GitHub Agentic Workflows](https://github.github.com/gh-aw/) and Copilot to propose small content improvements. It runs daily at a compiler-selected UTC time or manually from Actions, only on the default branch. An open PR with the `[wiki-review]` title prefix pauses further reviews until it is merged or closed. The agent also checks prior review PRs; duplicate detection is best-effort, not an exactly-once guarantee.

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
