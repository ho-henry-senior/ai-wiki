---
type: reference
summary: Hill climbing improves a candidate through local changes evaluated against an objective, with trade-offs between repeatability, exploration, and cost.
---

# Hill climbing

Hill climbing is a local search approach: start with a candidate, evaluate nearby alternatives, and move to an improvement. Repeat until a stopping condition is met, such as no better nearby candidate or a budget limit. It is an analogy for some agent improvement loops, not a description of every agent interaction.

## Deterministic and stochastic approaches

- **Deterministic:** given the same starting candidate, evaluation, and rules for choosing changes, the same sequence follows. This makes a run easier to reproduce.
- **Stochastic:** randomness influences the search, such as how promising changes are selected. Runs can follow different paths. Separate random restarts can explore other starting points, but require additional work.

Randomness in a model's responses or an evaluation is a separate issue from randomness in the search strategy. An evaluation that varies between runs can make a change appear better or worse by chance, even when the search rule is deterministic.

## Example: improving a prompt

Choose representative tasks and criteria, establish a baseline, then change one part of a prompt and compare the results. An [eval](evals.md) can provide this feedback. Keep a change if the evidence supports an improvement. For variable model outputs, repeat trials and compare results across the same cases rather than trusting one response. Set a limit on time, tokens, or trials.

Reserve cases for a final check rather than optimizing only against the examples used during iteration. A higher score on those examples may reflect a narrow test or a poor proxy for what users actually need. As with [passing tests](tests-are-evidence.md), a favorable evaluation is evidence, not proof.

## Limits

A search can reach a **local optimum**: no nearby change improves the score, although a better result may exist elsewhere. Different starting points or broader changes can help explore alternatives, but do not guarantee a better result. Repeated trials and restarts cost time and tokens, so use them where the likely benefit justifies the expense.

## Sources and applications

- [Artificial Intelligence: Foundations of Computational Agents, section 4.6](https://artint.info/3e/html/ArtInt3e.Ch4.S6.html) — local search, iterative improvement, local optima, and randomized alternatives.
- Related: [Passing tests are evidence, not proof](tests-are-evidence.md) — fast feedback and the limits of a green test suite.
