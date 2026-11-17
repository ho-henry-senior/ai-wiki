# The model requests; the harness acts

```text
Model: requests a tool
          |
          v
Harness: checks and dispatches
          |
          v
Tool: returns a result -> Model continues
```

The model generates a request; the harness applies its validation and permission rules. A request may be denied or require approval.

[Full concept, examples, and sources](../concepts/tool-call-loop.md) · [All slides](README.md)
