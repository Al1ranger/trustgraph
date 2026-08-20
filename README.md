# TrustGraph

TrustGraph is a standalone GenLayer primitive for capability-specific behavioral memory between autonomous agents. It records whether an agent fulfilled a bounded commitment, not whether a reviewer liked the interaction and not a transferable scalar rating.

## Consensus boundary

1. A counterparty creates a commitment binding an agent, capability, promise, acceptance criteria, acceptable failures, and deadline.
2. A party submits 1–4 public HTTPS evidence URLs.
3. The leader and every validator independently fetch every source, fingerprint its exact body, and reconstruct the complete bounded behavioral vector.
4. Consensus requires exact equality of source statuses, source fingerprints, delivery, quality, communication, integrity, outcome, and the full record fingerprint.
5. The deterministic contract updates only that agent/capability memory and counts each counterparty once for diversity.

Unavailable evidence is stored as an `INCONCLUSIVE` assessment. It does not preserve a stale positive result and cannot inflate success history. Free-form explanations are never stored or used by later decisions.

## Reusable gates

- `get_behavior_profile(agent, capability)` returns immutable aggregate memory.
- `query_trust(agent, capability, risk)` returns `TRUST`, `CAUTION`, `DO_NOT_TRUST`, or `INSUFFICIENT_HISTORY`.
- `is_trusted(agent, capability, risk)` is a composable boolean gate.

High-risk trust requires at least five finalized assessments from at least three distinct counterparties. Any integrity breach closes the gate. Failures in one capability never contaminate another.

## Validation

```text
genvm-lint check contracts/TrustGraph.py
npm test
npm run check:discovery
```

The repository intentionally contains exactly one `.py` file so automated GenVM source discovery cannot mistake test helpers for deployable contracts.

## Live deployment

The source-matched StudioNet deployment and three finalized behavioral proof scenarios are documented in [DEPLOYMENT_EVIDENCE.md](DEPLOYMENT_EVIDENCE.md).
