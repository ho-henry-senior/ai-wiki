# Passing tests are evidence, not proof

```text
Request -> Expected behavior -> Tests -> Results
```

**Green means the assertions that ran passed.** It does not prove they cover the request.

For example, a successful login test does not show that expired credentials are rejected. Derive tests from the intended behavior, not just the implementation.

[Full concept, examples, and sources](../concepts/tests-are-evidence.md) · [All slides](README.md)
