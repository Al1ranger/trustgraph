# Security model

- **Leader manipulation:** rejected because validators repeat all fetches and analysis and require exact full-record equality.
- **Unbound evidence:** URL order, status, HTTP status, content hashes, semantic fields, and commitment ID are committed into the record fingerprint.
- **Stale positives:** fetch failures finalize as inconclusive and advance history.
- **Sybil inflation:** trust thresholds require distinct counterparties; repeated work with one wallet cannot satisfy diversity.
- **Context poisoning:** capability memories are isolated and no free-form summary becomes future model context.
- **Prompt injection:** fetched pages are explicitly labeled untrusted and the response is reduced to fixed enums with deterministic invariants.
- **Ambiguous AI output:** unknown material facts force `INCONCLUSIVE`; invalid candidates cannot be stored.

Counterparty diversity raises the cost of Sybil attacks but is not proof of real-world identity. Consumers should select risk thresholds appropriate to their threat model.

