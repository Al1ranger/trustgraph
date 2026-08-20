# Architecture and invariants

TrustGraph's authoritative state transition is semantic: whether public evidence satisfies the meaning of a prior commitment. GenLayer owns this adjudication. Indexing and presentation belong off-chain.

## State invariants

- Commitments are immutable after creation except for their terminal status.
- Every commitment has exactly one assessment.
- Every stored assessment is the entire validator-agreed record, not a leader-selected summary.
- Evidence failure finalizes a negative freshness signal (`UNAVAILABLE` / `INCONCLUSIVE`) instead of aborting.
- A counterparty contributes at most one unit to diversity for an agent/capability pair.
- Outcomes update only the named capability.
- Trust decisions are deterministic functions of stored counts and requested risk.
- No prose from the LLM enters storage or future prompts.

## Why it is not a review registry

Callers cannot submit stars, scores, or verdicts. They bind themselves to a commitment before adjudication. Validators fetch the evidence and independently derive categorical behavior. The graph's value comes from capability isolation, counterparty diversity, permanent negative history, and consumer-facing trust gates.

