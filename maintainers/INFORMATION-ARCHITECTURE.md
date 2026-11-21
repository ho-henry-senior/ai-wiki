# Information architecture

This is the **single owner of the wiki's navigation taxonomy and reader-facing information architecture**. For build commands, Markdown handling and website maintenance, see [Maintaining the wiki](MAINTAINING.md); for editorial purposes and writing limits, see [Design goals](DESIGN-GOALS.md) and [the writing standard](STYLE.md).

This specification records the **agreed design direction from [issue #173](https://github.com/ho-henry-senior/ai-wiki/issues/173)**, including the clarification that Guides must simplify Articles navigation without concealing content. It distinguishes intended behaviour from the present implementation and work that still requires verification or a separate PR. It is **not** an instruction to migrate existing pages immediately.

## Principles

1. **A Guide simplifies navigation.** Group related pages under a meaningful entry instead of listing each chapter separately in broad Articles navigation. Do not create a Guide just to fill a category.
2. **One canonical page; multiple paths to it.** A page may be linked from Goals, a Guide, another Article, Reference, tags, featured links, search, or the sitemap. Do not copy it to make another entry.
3. **A deep link is a complete reading experience.** A reader landing directly on a chapter or Reference page must understand what it does without reading a preceding page. Give unobtrusive context and a route to the Guide.
4. **Primary navigation is not the complete inventory.** A concise Articles list must not imply that the hidden Guide chapters are unsearchable, unlinked or omitted from the sitemap.
5. **Order is meaningful, not automatic.** Ordered Guides may use chapter numbers and Previous/Next. Thematic Guides should offer independent, unnumbered choices.
6. **Different kinds of metadata answer different questions.** Editorial content type, intended outcome, topic tags, navigation home, and Guide membership do not stand for one another.

## Dimensions of the content model

| Dimension | Field / source today | Question it answers | Guidance |
| --- | --- | --- | --- |
| Primary navigation lane | `lane` | Which top-level section and sidebar provide primary context? | One lane per navigated page: `goals`, `guides`, `articles`, `reference`. |
| Editorial type | `type` | What kind of page is this? | `overview`, `advice`, `how-to`, `pattern`, `explanation`, `reference`, `case-study`, `exploration`; **not** a second lane. |
| Outcome | `goal` | Which of the four outcomes does this most directly support? | `alignment`, `economy`, `security`, `traceability`; optional when a single primary outcome is not clear. |
| Topic discovery | `tags` | What topics does this page substantially cover? | Flat, controlled vocabulary; a complementary way in, not a hierarchy. |
| Curated collection | `site/guides.mjs` plus `guide` today | Which Guide connects this page to related material? | Membership does not imply that every page must move to the Guides lane. |
| Reading structure | Ordered/thematic Guide definition and `guideOrder` today | Is there a necessary sequence? | Number and show Previous/Next only for an ordered Guide. |
| Stable identity | Published URL and source file | Where can the page always be linked? | Keep one canonical published URL; section membership does not create copies. |

The file's location under `content/` is an authoring arrangement, **not** a navigation taxonomy. For example, content authored under `content/reference/` can be linked from Guides without moving the source or URL.

### Four lanes

- **Goals** — four desired outcomes: Alignment, Economy, Security, and Traceability & Trust. Their overviews link to concise `advice` pages and supporting content. A goal overview's advice is organised under that goal.
- **Guides** — coherent collections presented through one clear entry point. A Guide may be ordered, or thematic with independent resources. A Guides-lane chapter can be nested under its entry in the section navigation.
- **Articles** — independent explanations, patterns, perspectives and case studies that readers can browse without first choosing a Guide. Do not force all practical how-tos into Guides.
- **Reference** — reusable instructions, checklists, catalogues, examples, definitions and source material that readers often need directly.

Each published page has at most one primary lane; pages with no lane may remain accessible without an active primary navigation section. **Lane** affects the active top navigation item and its sidebar; **type** describes the editorial form, so a chapter can still be an `explanation`, and a Reference resource may also be part of Skills.

### Primary navigation, section listings and Guide context

These are three separate reader experiences, even if today's implementation shares underlying navigation data:

1. **Primary site navigation** offers `Goals | Guides | Articles | Reference`.
2. **Section listings and sidebars** offer a navigable, intentionally *selective* view. The Guides index shows Guide entries, not a duplicate list of every chapter. Articles navigation should not regain every coding-agent chapter just because that chapter is a meaningful explanation.
3. **Contextual Guide navigation** connects members of a particular collection. A deep-linked member should show a short `Part of the … guide` route near the top and suitable Guide links in context. An ordered Guide can also show Previous/Next. This context never changes the page's canonical URL or primary lane according to how the reader arrived.

The navigation tree's structure and the lane's purpose together determine broad visibility in the *current* site; no separate navigation-visibility front-matter field is part of the agreed model.

## Guides are collections, not mandatory containers

A Guide can gather pages whose **primary purposes differ**. The current, deliberately asymmetric arrangement is valid:

| Page | Primary lane | Guide relationship | Broad discovery |
| --- | --- | --- | --- |
| How coding agents work | Guides | Ordered entry | Guides |
| Inside a coding agent | Guides | Ordered chapter | Within How coding agents work |
| What the model receives and returns | Guides | Ordered chapter | Within How coding agents work |
| The tool-call loop | Guides | Ordered chapter | Within How coding agents work |
| Skills | Guides | Thematic entry that also explains skills | Guides |
| Write a SKILL.md | Reference | Thematic Skills member | Reference **and** Skills |
| Agent skills directory | Reference | Thematic Skills member | Reference **and** Skills |

The coding-agent chapters stay in Guides to achieve the *specific navigation-simplification goal*; returning them to the Articles landing page merely to satisfy a conceptual classification would defeat it. The Skills Reference pages stay in Reference because direct lookup there remains useful. A page may be linked or featured elsewhere without its active lane changing.

**Sidebar rule for the design:** the Guides sidebar should expose Guide entries, with chapter children only where they belong to the Guides navigation tree. It should not pull canonical Reference pages into the Guides sidebar. Cross-lane members instead show contextual links in the page body or Guide navigation. Avoid creating two exhaustive trees containing the same resources.

### Ordered and thematic Guides

- **Ordered:** the order is part of the Guide's instructional intent; chapter number and Previous/Next are appropriate. Each chapter must still support direct entry.
- **Thematic:** members can be explored independently; show descriptive, unnumbered destinations rather than artificial Previous/Next. Identify the current destination accessibly.
- Both kinds need a useful entry page and at least one additional worthwhile resource. A Guide need not have a newly written, thin introduction if an existing page already orients the reader.
- A page may conceptually relate to several Guides, but **multiple formal memberships are deferred**. Validate at most one membership until a real example justifies the UI and data model.

## Example reader journeys

**Guides → Skills → Write a SKILL.md:** the reader starts with the Skills introduction, follows an unnumbered link, arrives at the canonical Reference resource, sees Reference as its primary section, and has an optional way back to Skills. The same resource must work when entered from Reference or search.

**Articles or search → The tool-call loop:** the page opens at its canonical URL, explains itself, indicates that it is in the ordered *How coding agents work* Guide, and offers optional chapter navigation. No prior chapter is required to understand its basic purpose.

**Goals → practical how-to:** a Goal can link directly to a standalone Article or Reference page where that is the best action. The destination's primary navigation state is determined by its own lane, not the referring link.

**Sitemap or direct URL → any page:** the reader can reach the same canonical resource whether or not it has a separate entry in a broad Articles listing.

## Sitemap, search and canonical URL invariants

**Navigation simplification must never hide published content.**

- Every published Guide entry and member must remain reachable at its canonical URL and through ordinary internal and inbound links.
- The complete published page inventory must remain discoverable through the sitemap and search index even if a Guides-lane chapter is not listed separately under Articles.
- Prefer a **single canonical sitemap entry per published page**; a Guide can express relationships through links rather than duplicate canonical URLs.
- Do not filter a page out of the Eleventy navigation collection merely to hide it from a sidebar until the resulting sitemap behaviour has been checked.
- Verify the GOV.UK Eleventy plugin's actual sitemap and search-index generation before relying on a navigation-tree change. Its dependency on the tree is **suspected but not yet confirmed**.
- Acceptance tests for a future implementation should separately compare the complete published content inventory against `/sitemap/` and `search-index.json`, assert each expected canonical page occurs exactly once in each, and ensure Guides-lane chapters do not surface as individual Articles index/sidebar items. Check URL normalization and format of each generated index rather than assuming their raw structures are identical.

Sitemap and search completeness are **required outcomes**, not claims that the existing build has already been audited against them.

## Guide metadata: current state and proposed cleanup

**Current implementation:** `site/guides.mjs` contains collection titles, entry URLs, members and ordered/thematic behaviour. Page front matter also repeats `guide` and `guideOrder`, where `guideOrder: 0` doubles as a hidden entry-point marker. The Guides index currently derives entries from lane and that marker. Legacy `series` rendering also remains in code.

**Preferred future model, subject to implementation review:** make `site/guides.mjs` the single authority for entry, membership, kind and ordering; derive Guide context and any navigation-tree nesting from a member's canonical URL. Derive the Guides index from the registry rather than relying on `guideOrder: 0`. Avoid adding a separate visibility field unless implementation evidence demonstrates that it is necessary.

Future validation should reject unresolved entry/member URLs, missing entries, multiple memberships (for now), and ordered Guides that lack a meaningful multi-page sequence. For a thematic Guide, member ordering is a deliberate display choice, **not** a prerequisite reading order.

**Do not apply this proposed registry refactor as part of the documentation PR.** Before retiring fields, inspect Eleventy navigation, sitemap and search output and design backward-compatible migration tests.

## Implementation follow-ups (not authorised by this document)

1. Inspect the rendered homepage, Guides index, ordered and thematic member pages, Articles and Reference lists, sidebars, mobile views, sitemap and search output.
2. Verify the GOV.UK Eleventy plugin's data sources, then add checks for canonical sitemap/search coverage, no duplicate pages, and simplified broad navigation.
3. Consider moving Guide membership and entry detection into the registry, with tested URL lookups, and removing duplicated `guide`/`guideOrder` front matter after review.
4. Add a short Guide-context line on direct-entry pages and accessible current-page semantics in thematic navigation.
5. Remove the obsolete Skills-and-roles `series.mjs` path and correct the Economy overview's outdated description of that series.
6. Keep code and content changes in small PRs; both Verify and Website must pass, and navigation should be visually reviewed. **Do not merge without explicit approval.**

Decisions documented here should be revisited if real reader journeys contradict them. Track scope and unresolved implementation questions in [#173](https://github.com/ho-henry-senior/ai-wiki/issues/173), not by silently altering the taxonomy during unrelated page edits.
