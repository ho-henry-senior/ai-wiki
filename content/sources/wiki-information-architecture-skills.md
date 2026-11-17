---
lane: reference
order: 6
---

# Public agent skills for wiki information architecture

Researched 2026-11-14 for possible complements to `.agents/skills/wiki-review/SKILL.md`. Method: read public repository files through the GitHub API (not installed or run). Counts and dates will drift; re-check before adopting anything.

## Conclusion

No exact match was found for a skill that reviews a wiki's navigation, reader journeys, information hierarchy, and orphaned or duplicated content. This is a negative result from a bounded search (GitHub repository search, plus the `github/awesome-copilot` and `anthropics/skills` catalogs). It is not proof that none exists. The closest option is an analysis suite for Markdown corpora. Others are adjacent. The existing `wiki-review` skill already covers design goals, concept reuse, and navigation (see its steps 1–2), so these tools are only partial supplements.

## Candidates

### 1. `markdown-ia-skills` — closest, three skills (adjacent to strong)

- Source: <https://github.com/JoyceMarieStack/markdown-ia-skills>. MIT licence (repository metadata). Created 2026-07-23, 7 stars, 3 commits at review time, head `13ded92f7174f8d6a5d41f807412a0bb70b28000`. Packaged as a Claude Code plugin ([README](https://github.com/JoyceMarieStack/markdown-ia-skills/blob/main/README.md)).
- Skills ([README](https://github.com/JoyceMarieStack/markdown-ia-skills/blob/main/README.md)):
  - [`markdown-docs-corpus-discovery`](https://github.com/JoyceMarieStack/markdown-ia-skills/blob/main/skills/markdown-docs-corpus-discovery/SKILL.md) produces a corpus inventory and structure map. It compares nav config with folder structure and looks at git provenance and freshness signals.
  - [`markdown-content-model-discovery`](https://github.com/JoyceMarieStack/markdown-ia-skills/blob/main/skills/markdown-content-model-discovery/SKILL.md) infers document types and metadata schemas.
  - [`markdown-vocabulary-governance`](https://github.com/JoyceMarieStack/markdown-ia-skills/blob/main/skills/markdown-vocabulary-governance/SKILL.md) analyses terminology, tags, and taxonomy.
- Fit: the corpus-discovery skill's inventory and nav-versus-folders comparison match the "content inventory" need. Vocabulary governance may help with the glossary and concept naming. Sample output exists in the [Argo CD reports](https://github.com/JoyceMarieStack/markdown-ia-skills/tree/main/examples/sample-reports/argo-cd).
- Limitations:
  - Markdown only. It is built for corpora of dozens to a few hundred files, and states that samples are partial for larger ones (corpus-discovery SKILL.md).
  - Its stated scope is directories, counts, and freshness. It explicitly does not classify document types, and I found no reader-journey analysis.
  - It is a Claude Code plugin; the SKILL.md files themselves are portable text but were not tested with other agents.
  - The skills tell the agent to run `find`/`grep`/`git` and some commands write to `/tmp` (vocabulary-governance SKILL.md). The repo ships no scripts, so the risk is in the instructions.
  - Very new, with one author and little review history.

### 2. `docs-sync-audit` in `github/awesome-copilot` (adjacent)

- Source: <https://github.com/github/awesome-copilot/blob/main/skills/docs-sync-audit/SKILL.md>. MIT licence in frontmatter. Last commit to this file seen: 2026-09-07 (`f32d7c3`). The repository is a large community-contributed catalog.
- Scope: a read-only audit of whether docs match code, config, and commands. It says it is not a general code review. It inventories doc surfaces and separates confirmed drift from inferred gaps. It also treats text in the audited repo as evidence, not instruction (SKILL.md).
- Fit: this helps with the stale-claims and link-checking part of maintenance. It does not address IA or navigation.
- Limitations:
  - It targets code-versus-docs drift. This wiki is mostly conceptual, so little of it applies.
  - It bundles [`scripts/docs_drift.py`](https://github.com/github/awesome-copilot/blob/main/skills/docs-sync-audit/scripts/docs_drift.py), which the skill says to run first. I only skimmed its imports (`subprocess`, `pathlib`, `json`); I saw no network code and did not audit it in full. Its checks cover npm scripts, make targets, relative Markdown links, and env var names.

### 3. `documentation-writer` in `github/awesome-copilot` (adjacent, for structure)

- Source: <https://github.com/github/awesome-copilot/blob/caab1f623bb68a330f294a11279597d7ae7be737/skills/documentation-writer/SKILL.md> (reviewed revision).
- Scope: a prompt for writing new docs under the [Diátaxis](https://diataxis.fr/) four types (tutorial, how-to, reference, explanation). It asks clarifying questions and proposes an outline before writing.
- Fit: its vocabulary could help classify existing pages by reader need.
- Limitations: it is an authoring skill, not a review or audit skill. It has no inventory or navigation step. It assumes the Diátaxis taxonomy, which may not match this wiki's `pages`/`concepts`/`slides` split.

### Considered and not recommended

- [`folder-structure-blueprint-generator`](https://github.com/github/awesome-copilot/blob/main/skills/folder-structure-blueprint-generator/SKILL.md): documents the code folder layout of .NET, Java, React and similar projects, so it doesn't fit a wiki.
- [`doc-coauthoring`](https://github.com/anthropics/skills/blob/main/skills/doc-coauthoring/SKILL.md): a three-stage workflow for writing a single document, ending with reader testing. It targets one document, not wiki-wide IA. I did not verify its licence, because the file had no licence field.
- [`DovahkiinYuzuko/explorations-in-documentation`](https://github.com/DovahkiinYuzuko/explorations-in-documentation): a `doc-refine` skill with a large research paper. It bundles Python scripts and was not reviewed in depth, so I make no claim about its fit.

## Focused trial in this wiki

On 2026-11-14, a read-only trial applied selected corpus-discovery and vocabulary checks to root Markdown and the `pages/`, `concepts/`, `slides/`, and `sources/` directories. It excluded raw `data/`, dependencies, workflow files, and hidden skills. The 46 files counted included indexes and the research note; this is not a full inventory of every Markdown file.

- **Corpus discovery:** counts and sampled pages confirmed the existing shallow directories and indexes. This orientation is useful, but the candidate's suggested scan must be scoped to avoid counting dependencies and raw archives, and a directory-level inventory does not assess reader journeys.
- **Vocabulary:** sampled “alignment,” “harness,” and “vector store” against the glossary and concept pages. The two meanings of alignment are explicitly distinguished, not an unexplained conflict. Frequency or spelling matches alone would not establish a terminology problem; this wiki does not currently need a new facet taxonomy merely because the candidate can produce one.
- **Documentation writer:** assessed against `pages/define-and-verify-tasks.md`, a guide that combines actionable steps with explanation. Its focus on audience and purpose is useful, but mandatory Diátaxis classification, outline approval for every request, and restrictions on external research are a poor default for this wiki's mixed pages and freshness checks.

The trial adapted selected checks rather than installing or executing either skill as written. The review skill now incorporates reader paths, practical priority, and context-aware terminology checks. Keep the external skills as optional references, not automated dependencies; no Docs sync audit was added.

## Supply-chain cautions

A skill is instructions plus optional scripts that an agent follows with the user's tool permissions. Treat third-party skills as untrusted until reviewed:

- Read every file before use, including bundled scripts and referenced files, and pin a specific commit instead of a moving branch.
- Prefer copying a reviewed snapshot into this repository over a live plugin or marketplace install. The README of the closest candidate installs through `/plugin marketplace add`, which tracks the repository.
- Prefer instruction-only skills with narrow, read-only scope. Check shell commands and any file writes, and check that the skill doesn't widen its own permissions.
- Large catalogs such as awesome-copilot are community-contributed, so being listed there is not a security review (the repo has its own [SECURITY.md](https://github.com/github/awesome-copilot/blob/main/SECURITY.md)).
- Star counts and popularity are not evidence of safety.

## Limits of this research

- Searched GitHub repository search for IA, documentation, and skill terms, and listed the skills directories of `github/awesome-copilot` and `anthropics/skills`. `kepano/obsidian-skills` was not reachable at the path I tried. Other catalogs, marketplaces, and private repositories were not searched.
- GitHub code search was unavailable (the API call failed), so results depend on repository descriptions.
- Full external skills were not installed or executed; the focused trial above does not establish how they perform end to end.
