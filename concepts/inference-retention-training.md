---
type: reference
summary: Sending data for a model response, retaining it, and using it to train models are separate policy and data-flow questions.
---

# Inference, retention, and training are separate

"Not used for training" does not mean "never transmitted" or "never stored." Assess all three questions for every provider and integration handling sensitive data.

| Question     | What to establish                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------------- |
| Inference    | What data is sent to which endpoint to produce a response?                                          |
| Retention    | What request content, outputs, metadata, or logs are stored, for how long, and who can access them? |
| Training use | Can the data be used to train or improve models, under which policy and account settings?           |

For example, an approved hosted service could process a request without using it for training while retaining some records under its applicable policy. This is an illustrative combination, not a statement about a particular provider's terms.

## Check the actual configuration

Policies can differ by product, endpoint, account, organization, and enabled features. Check current primary documentation and contractual terms rather than inferring one answer from another.

Disabling session sync does not disable inference requests or external tool calls. Local inference does not prevent an external tool from transmitting data. Local history, cloud session storage, and model-provider records may have separate retention and deletion rules.

## Sources and applications

- [OpenAI: Your data](https://developers.openai.com/api/docs/guides/your-data) — an example of provider documentation separating training use, logs, and application state; consult current terms for the actual service.
- Applied in [Sensitive data in agent workflows](../pages/sensitive-data-in-agent-workflows.md) and [the data-flow checklist](../pages/agent-data-flow-checklist.md).
