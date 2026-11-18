---
type: guide
summary: "Who looks, and how closely, should depend on what a change touches and what the checks showed, not the agent's confidence."
status: established
lane: goals
goal: traceability
order: 4
checked: 2026-11-17
---

# Independent change approval

Who looks, and how closely, should depend on what a change touches and what the checks showed, not the agent's confidence. Have someone other than the requester approve, because the person who asked may share the agent's assumptions. Add a `CODEOWNERS` file naming who owns sensitive paths, such as `.github/workflows/`; GitHub then requests their review on any pull request that changes those files, and a repository admin can make their approval required.

## Sources

- [GitHub Docs: About code owners](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)
