import { readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = new URL('..', import.meta.url).pathname.replace(/^\/(.:)/, '$1');
const ignored = new Set(['.git', 'node_modules', '.tools', '__pycache__']);
const found = [];
function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (ignored.has(name)) continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name.endsWith('.py')) found.push(relative(root, path).replaceAll('\\', '/'));
  }
}
walk(root);
if (found.length !== 1 || found[0] !== 'contracts/TrustGraph.py') {
  throw new Error(`unexpected Python contract candidates: ${found.join(', ')}`);
}
console.log('Contract discovery: exactly contracts/TrustGraph.py');

