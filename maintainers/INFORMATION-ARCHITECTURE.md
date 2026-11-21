# Information architecture

This is the **single owner of the wiki's navigation taxonomy and reader-facing information architecture**. For build commands, Markdown handling and website maintenance, see [Maintaining the wiki](MAINTAINING.md); for editorial purposes and writing limits, see [Design goals](DESIGN-GOALS.md) and [the writing standard](STYLE.md).

The architecture is informed by [issue #173](https://github.com/ho-henry-senior/ai-wiki/issues/173). Guides should simplify Articles navigation without concealing content. Current implementation details and preferred future behaviour are distinguished where they differ.

## Principles

1. **A Guide simplifies navigation.** Group related pages under a meaningful entry instead of listing each chapter separately in broad Articles navigation. Do not create a Guide just to fill a category.
2. **One canonical page; multiple paths to it.** A page may be linked from Goals, a Guide, another Article, Reference, tags, featured links, search, or the sitemap. Do not copy it to make another entry.
3. **A deep link is a complete reading experience.** A reader landing directly on a chapter or Reference page must understand what it does without reading a preceding page. Give unobtrusive context and a route to the Guide.
4. **Primary navigation is not the complete inventory.** A concise Articles list must not imply that the hidden Guide chapters are unsearchable, unlinked or omitted from the sitemap.
5. **Order is meaningful, not automatic.** Ordered Guides use Previous/Next, and may use chapter numbers. Thematic Guides should offer independent, unnumbered choices.
6. **Different kinds of metadata answer different questions.** Editorial content type, intended outcome, topic tags, navigation home, and Guide membership do not stand for one another.

## Dimensions of the content model

**Primary navigation lane** (`lane`): Which top-level section and sidebar provide primary context? One lane per navigated page: `goals`, `guides`, `articles`, `reference`.

**Editorial type** (`type`): What kind of page is this? `overview`, `advice`, `how-to`, `pattern`, `explanation`, `reference`, `case-study`, `exploration`; **not** a second lane.

**Outcome** (`goal`): Which of the four outcomes does this most directly support? `alignment`, `economy`, `security`, `traceability`; optional when a single primary outcome is not clear.

**Topic discovery** (`tags`): What topics does this page substantially cover? Flat, controlled vocabulary; a complementary way in, not a hierarchy.

**Curated collection** (`site/guides.mjs`): Which Guide connects this page to related material? Membership does not imply that every page must move to the Guides lane.

**Reading structure** (ordered/thematic Guide definition in `site/guides.mjs`): Is there a necessary sequence? Show Previous/Next only for an ordered Guide, and number its chapters unless the sequence is a suggestion rather than steps.

**Stable identity** (published URL and source file): Where can the page always be linked? Keep one canonical published URL; section membership does not create copies.

The file's location under `content/` is an authoring arrangement, **not** a navigation taxonomy. For example, content authored under `content/reference/` can be linked from Guides without moving the source or URL.

### Page types

A page's editorial type describes **how to use the content**, not where it appears in the website:

- `overview` — entry point to an outcome or coherent group of approaches.
- `advice` — concise recommendation under a Goal, with its rationale and where to act.
- `how-to` — practical steps for a task and how to check the result.
- `pattern` — reusable practice or building block.
- `explanation` — why an idea works and how concepts relate.
- `reference` — reusable facts, instructions, examples, catalogues or checklists for lookup.
- `case-study` — an observed application, results and limitations.
- `exploration` — a provisional investigation rather than established advice or a case study.

A Guide is a collection, **not** an editorial page type. A `reference`-type page may appear in the Guides lane when it serves as the entry to a group, and a `how-to` may be a canonical Reference resource when direct lookup is its primary purpose. Review actual reader needs rather than enforcing a one-to-one type/lane mapping.

### Four lanes

- **Goals** — four desired outcomes: Alignment, Economy, Security, and Trust & Traceability. Each overview states its [core points](#core-points) and links to supporting content. A goal overview's advice is organised under that goal.
- **Guides** — coherent collections presented through one clear entry point. A Guide may be ordered, or thematic with independent resources. A Guides-lane chapter can be nested under its entry in the section navigation.
- **Articles** — independent explanations, patterns, perspectives and case studies that readers can browse without first choosing a Guide. Do not force all practical how-tos into Guides.
- **Reference** — reusable instructions, checklists, catalogues, examples, definitions and source material that readers often need directly.

Each published page has at most one primary lane; pages with no lane may remain accessible without an active primary navigation section. **Lane** affects the active top navigation item and its sidebar; **type** describes the editorial form, so a chapter can still be an `explanation`, and a Reference resource may also be part of Skills.

### Core points

A goal has **two to five core points**: the few things a reader should take away. This is a guideline, not a quota. Fewer than two suggests it is not a collection; more than five, that it has not decided what matters most.

Each core point has **one clear home for its substantive explanation**. The home can be any of these:

- **An existing page,** when one page already covers the point. Security's _Prompt injection_ point links straight to its page, which states the point and routes readers to the controls.
- **A routing page** (`type: advice`), when several pages each contribute part of the advice. Economy's two points work this way.
- **A section of the overview,** when nothing substantial sits behind the point. Trust & Traceability's four points work this way.

Choose the home that serves the reader; don't create a page just to fill the structure. A routing page must earn the extra click with a decision, a synthesis or a route that the overview doesn't already give. If it only repeats the overview's summary and lists links, make it a section instead.

Guides don't follow this count. A Guide is a reading route, so its length follows the reader's journey, and its chapters needn't be core points.

Trust & Traceability's overview sections are a recent pilot from [#183](https://github.com/ho-henry-senior/ai-wiki/issues/183). Assess how readers find them before using overview sections, or routing pages, as the default for every goal.

### Primary navigation, section listings and Guide context

These are three separate reader experiences, even if today's implementation shares underlying navigation data:

1. **Primary site navigation** offers `Goals | Guides | Articles | Reference`.
2. **Section listings and sidebars** offer a navigable, intentionally _selective_ view. The Guides index shows Guide entries, not a duplicate list of every chapter. Articles navigation should not regain every coding-agent chapter just because that chapter is a meaningful explanation.
3. **Contextual Guide navigation** connects members of a particular collection. A deep-linked member should show a short `Part of the … guide` route near the top and suitable Guide links in context. An ordered Guide can also show Previous/Next. This context never changes the page's canonical URL or primary lane according to how the reader arrived.

The navigation tree's structure and the lane's purpose together determine broad visibility in the _current_ site; no separate navigation-visibility front-matter field is part of the agreed model.

## Guides are collections, not mandatory containers

A Guide can gather pages whose **primary purposes differ**. The Guides can include ordered chapters whose primary lane is Guides and independently useful Reference resources:

- **How coding agents work** — Guides lane; ordered entry; discoverable via Guides.

- **Inside a coding agent** — Guides lane; ordered chapter; discoverable within How coding agents work.

- **What the model receives and returns** — Guides lane; ordered chapter; discoverable within How coding agents work.

- **The tool-call loop** — Guides lane; ordered chapter; discoverable within How coding agents work.

- **Session history and active context** — Guides lane; fourth ordered chapter of How coding agents work.

- **Skills** — Guides lane; ordered but unnumbered entry explaining what a skill is and when to add one; discoverable via Guides.

- **Write a SKILL.md** — Guides lane; final Skills chapter: where Copilot finds skills and the file format; retains its canonical URL.

- **Agent skills directory** — Reference lane; first Skills chapter, for finding an existing skill, and standalone lookup resource, discoverable via Reference **and** Skills.

- **Agent roles** — Guides lane; ordered entry that also explains what a role is.

- **Agile roles in agentic development** — Guides lane; first Agent roles chapter.

- **How agent roles use skills** — Guides lane; second Agent roles chapter.

- **Set up a repository for agents** — Guides lane; ordered but unnumbered entry, the repository-layout map, followed by its four resources.

- **Write repository instructions in AGENTS.md, Repository context for coding agents, Enable agents to run repository commands, Give agents a command interface with Just** — Guides lane; members of Set up a repository for agents, with Previous/Next but no chapter numbers.

- **Secure a local coding agent** — Guides lane; ordered but unnumbered entry, the setup overview, followed by three chapters. The Security goal explains the risks; this Guide is the setup route.

- **Configure the sandbox and tool restrictions, Protect credentials and sensitive data, Check integrations and sandbox boundaries** — Guides lane; members of Secure a local coding agent, with Previous/Next but no chapter numbers.

The coding-agent and Agent roles chapters stay in Guides to simplify Articles navigation. The Skills directory stays in Reference because direct lookup there remains useful, despite its place in the ordered Skills reading route. A page may be linked or featured elsewhere without its active lane changing.

**Sidebar rule for the design:** the Guides sidebar should expose Guide entries, with chapter children only where they belong to the Guides navigation tree. It should not pull canonical Reference pages into the Guides sidebar. Cross-lane members instead show contextual links in the page body or Guide navigation. Avoid creating two exhaustive trees containing the same resources.

### Ordered and thematic Guides

- **Ordered:** the order is part of the Guide's instructional intent; chapter number and Previous/Next are appropriate. Each chapter must still support direct entry.
- **Ordered, unnumbered** (`numbered: false`): Previous/Next implies a sensible reading sequence, but there are no chapter numbers, because the pages are not a set of steps. Set up a repository for agents works this way.
- **Thematic:** members can be explored independently; show descriptive, unnumbered destinations rather than artificial Previous/Next. Identify the current destination accessibly.
- An ordered Guide may include a Reference page as a step in a recommended reading route without changing that page's canonical home. Reader progression does not erase independent reference use.
- Both kinds need a useful entry page and at least one additional worthwhile resource. A Guide need not have a newly written, thin introduction if an existing page already orients the reader.
- A page may conceptually relate to several Guides, but **multiple formal memberships are deferred**. Validate at most one membership until a real example justifies the UI and data model.

## Example reader journeys

**Guides → Skills → Agent skills directory → Write a SKILL.md:** the reader starts with the Skills introduction and its decision, follows Previous/Next to the source-linked directory in Reference to look for an existing skill, then to the writing chapter in Guides if nothing fits. The directory still works on direct entry from Reference or search.

**Articles or search → The tool-call loop:** the page opens at its canonical URL, explains itself, indicates that it is in the ordered _How coding agents work_ Guide, and offers optional chapter navigation. No prior chapter is required to understand its basic purpose.

**Goals → practical how-to:** a Goal can link directly to a standalone Article or Reference page where that is the best action. The destination's primary navigation state is determined by its own lane, not the referring link.

**Sitemap or direct URL → any page:** the reader can reach the same canonical resource whether or not it has a separate entry in a broad Articles listing.

## Sitemap, search and canonical URL invariants

**Navigation simplification must never hide published content.**

- Every published Guide entry and member must remain reachable at its canonical URL and through ordinary internal and inbound links.
- The complete published page inventory must remain discoverable through the sitemap and search index even if a Guides-lane chapter is not listed separately under Articles.
- Prefer a **single canonical sitemap entry per published page**; a Guide can express relationships through links rather than duplicate canonical URLs.
- Do not filter a page out of the Eleventy navigation collection merely to hide it from a sidebar until the resulting sitemap behaviour has been checked.
- The GOV.UK Eleventy plugin's generated sitemap and search index have been checked against published pages with a lane: each appears exactly once in both outputs. `scripts/site-discovery.test.mjs` enforces this result on Website builds.
- The checks also ensure that Guides-lane pages do not appear in the Articles landing page or sidebar. They compare canonical URLs rather than assuming the sitemap and search index share a raw data format.
- The plugin's internal dependency on the navigation tree has **not** been established by these output tests. Do not remove a page from the navigation collection merely to hide a sidebar item without verifying the generated sitemap and search output again.

## Guide metadata and validation

**Implemented model:** `site/guides.mjs` is the single authority for Guide titles, entries, member URLs, ordered/thematic behaviour and reading order. Page front matter does not repeat `guide`, `guideOrder` or an entry marker. The Guides index derives entries from the registry; templates and the navigation tree look up a page's Guide through its canonical URL.

Every registry member must resolve to a published Markdown page. Validation rejects unresolved URLs, duplicate membership (including across Guides), and ordered Guides without at least two chapters. The registry's title must also match its entry page's heading, which is used as a navigation key. A thematic Guide's display order is **not** a prerequisite reading order. Independently useful Reference members retain their own lane and primary sidebar.

The Website regression checks in `scripts/site-discovery.test.mjs` verify that published navigable pages remain in the sitemap and search index, with Guides-lane pages absent from broad Articles navigation. Changes to Guide metadata and navigation must keep those tests passing. Track further implementation decisions in [#173](https://github.com/ho-henry-senior/ai-wiki/issues/173) and revisit these rules if actual reader journeys contradict them.
