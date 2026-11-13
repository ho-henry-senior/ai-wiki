# Code Review Bottleneck — Transcript Notes

> **Status:** Exploratory notes for later review. These are potential lessons, not adopted recommendations or a finished wiki article.

## Source

- **Video:** [Code Review Bottleneck](https://www.youtube.com/watch?v=uPCH2axUpbc)
- **Transcript:** [`warp-code-review-bottleneck-dump.txt`](warp-code-review-bottleneck-dump.txt)
- **Title in transcript:** “Code Review Bottleneck”
- **Reviewed:** 2026-11-13
- The transcript discusses Warp Factories. Its product-specific examples and reported results are noted as such below.

## Summary

The talk frames the agent-generated PR backlog as a human review bottleneck. Its proposed response is to make each change easier to assess before it reaches a person, through three connected practices:

1. **Internal code-review loops** refine changes before opening or returning a PR to a human.
2. **End-to-end verification** checks that the change works in a running application, not only that tests or static checks pass.
3. **Merge-risk assessment** gives the human a concise view of what changed, what was verified, and what risk remains.

The recurring principle is to use evidence and targeted automation to focus human attention, while keeping human approval for decisions that need it.

## Potentially useful lessons

### Review before human handoff

- Use a reviewer in a separate context from implementation to reduce shared assumptions. The reviewer can return a structured verdict, findings, severity, or a request for human input. *(7:46–10:45)*
- Keep agent-to-agent review feedback internal rather than adding every iteration as a public PR comment; preserve an accessible trace for later inspection. *(10:45–12:16)*
- Bound the number of review rounds and filter low-value findings to avoid over-optimization and churn. *(12:05–13:43)*
- Keep PRs small and scoped enough for a human to assess quickly; stacking may help with larger work. *(14:14–15:11)*

### Verify the behavior, not only the code

- Unit tests and static checks are useful but do not prove that a user workflow works. The talk explicitly treats end-to-end verification as complementary to those checks, not a replacement. *(20:50–21:57)*
- For UI work, have the agent start the application, exercise the relevant flow, and provide reviewable evidence such as a recording or screenshot. *(22:06–23:12; 26:19–29:39)*
- A repo-specific verification skill can capture startup steps, tools, debugging details, and gotchas learned through use. *(22:20–23:12)*
- Verification needs a suitable environment. The talk favors isolated, controlled environments with only the required repositories, tools, and test data, and cautions against exposing local credentials or unnecessary services. *(23:25–31:19)*

### Make residual risk legible

The proposed PR risk assessment considers:

- **Alignment:** does the implementation and PR description match the request, and are unrelated changes called out?
- **Impact:** what is the blast radius, including sensitive code paths and downstream consumers?
- **Verification:** what was actually checked, and is the evidence sufficient for the change?
- **Rollback cost:** how difficult would it be to reverse the change after an incident?
- **Error detection:** how would problems be observed after deployment?

The assessment can guide attention and help reduce risk—for example, by splitting a change, adding missing verification, or clarifying rollback and monitoring. Some risk may remain and require human judgment. *(37:23–44:14; 48:44–49:57)*

### Use specs and feedback to improve future work

- For larger features, a reviewed spec can provide numbered, testable behaviors and edge cases that guide later verification. Smaller bug fixes may not need a separate spec. *(33:49–34:59)*
- Repeated experience can improve verification skills and agent profiles, such as by adding setup instructions or known gotchas. Treat this as a learning loop that needs evaluation, not automatic rule accumulation. *(22:43–23:12)*
- Benchmark proposed workflow changes against representative prior tasks. The speaker reports a code-review loop that improved accuracy at roughly three times the cost in one benchmark, and recommends testing the tradeoff on a team's own work. *(6:37–7:39; 16:50–17:26; 47:35–48:24)*
- A useful benchmark set should be curated and include tasks of different difficulty. The transcript describes this as empirical work, not a settled formula. *(54:44–55:20)*

## Possible connections to the wiki

- **Unit tests in the age of AI:** distinguish fast local tests from end-to-end workflow evidence; avoid treating a green unit-test suite as sufficient proof.
- **Agent role responsibilities and boundaries:** describe the independent reviewer, its handoff to implementation, and the human's final approval authority.
- **Repository context for agents:** explain the local setup, tools, test data, environment, and reusable verification instructions needed for agents to exercise a system.
- **Future guide on verification and PR readiness:** connect review loops, behavior verification, risk summaries, evidence, and cost/quality benchmarking.
- **Skills and profiles:** consider how recurring verification failures or friction can inform skill/profile updates, with examples used to assess whether the change helped.

## Questions to revisit

- Which changes merit a separate review agent, and what evidence justifies its additional cost?
- Which findings should block handoff, and when should the reviewer escalate to a human?
- What verification evidence is appropriate for different kinds and risks of change?
- How should risk levels affect review effort without implying that a score guarantees safety?
- How should benchmark tasks be selected, and how should quality, cost, and latency be compared?
- How can skills and profiles learn from incidents without overfitting to one-off cases?

## Caveats

The transcript contains product-specific examples and reports results from the speaker's own setup. In particular, its cost/accuracy figures are not general evidence that a review loop will produce the same tradeoff elsewhere. Treat the practices as hypotheses and examples to assess in context.
