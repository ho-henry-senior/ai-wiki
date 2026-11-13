# Justfile patterns across Node.js and Python repositories

These local examples informed the guide on agent tool delegation and the purpose-based tool reference. They were reviewed on 2026-11-13. Repository names are intentionally omitted; the examples span Node.js/JavaScript, Node.js/TypeScript, Python REST APIs, and Python queue consumers. Recipe names and composition can change, so consult the relevant current Justfile before relying on a detail.

## Observations

The repositories share a pattern of discoverable recipes, focused test execution, routine checks, and broader diagnostics kept apart from routine verification. They differ in underlying language tools and in the exact composition of `check` and `verify`.

- Node.js/JavaScript and Node.js/TypeScript examples use Mocha or Jest, with TypeScript checks, ESLint, Prettier, template checks, and Dockerfile lint represented.
- Python REST API and queue-consumer examples use `unittest` and Ruff; some also use mypy. Coverage behavior differs between projects.
- Focused test commands avoid some of the work performed by a full suite, such as coverage collection.
- Dependency audits, Trivy filesystem scans, and Semgrep scans are available separately from routine verification; some advisory results may need triage.
- Formatting and fix recipes can modify files, unlike read-only format checks.

Treat these as examples of repository-specific contracts, not normative command names or a complete inventory of tools.
