import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../contracts/TrustGraph.py', import.meta.url), 'utf8');

function queryTrust(p, risk) {
  const needed = risk === 'LOW' ? [1, 1] : risk === 'MEDIUM' ? [3, 2] : [5, 3];
  if (p.finalized < needed[0] || p.diversity < needed[1]) return 'INSUFFICIENT_HISTORY';
  if (p.breaches > 0 || p.failures * 3 >= p.finalized) return 'DO_NOT_TRUST';
  if (p.successes * 4 >= p.finalized * 3) return 'TRUST';
  return 'CAUTION';
}

assert.match(source.split(/\r?\n/)[0], /py-genlayer:[a-z0-9]+/);
assert.doesNotMatch(source, /py-genlayer:(test|latest)/);
assert.match(source, /validator = build_candidate\(\)/);
assert.match(source, /evidence_fingerprints_json/);
assert.match(source, /_negative_candidate/);
assert.equal(queryTrust({finalized: 2, diversity: 2, breaches: 0, failures: 0, successes: 2}, 'MEDIUM'), 'INSUFFICIENT_HISTORY');
assert.equal(queryTrust({finalized: 5, diversity: 3, breaches: 0, failures: 0, successes: 4}, 'HIGH'), 'TRUST');
assert.equal(queryTrust({finalized: 5, diversity: 3, breaches: 1, failures: 0, successes: 5}, 'HIGH'), 'DO_NOT_TRUST');
assert.equal(queryTrust({finalized: 6, diversity: 3, breaches: 0, failures: 2, successes: 4}, 'HIGH'), 'DO_NOT_TRUST');
console.log('TrustGraph model checks: 9 passed');

