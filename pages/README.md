# Authored pages

This directory holds authored knowledge, not source archives. Pages can be short references, reusable patterns, or broader guides and articles. Let the purpose determine the length; do not force every page into a slide-sized format.

Use lightweight YAML front matter to identify each page's role and summarize it:

```yaml
---
type: reference
summary: A concise description of what this page explains.
---
```

Suggested `type` values:

- `reference` — concise, primarily descriptive information.
- `pattern` — a reusable practice or building block.
- `guide` — an applied or synthesized discussion; it may be broad or compose other pages.

The README topic map is the navigation layer, not a directory scheme. Link a page from every relevant topic rather than duplicating it.
