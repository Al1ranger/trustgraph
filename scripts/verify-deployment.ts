import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { createClient } from "genlayer-js";
import { studionet } from "genlayer-js/chains";

const address = process.env.CONTRACT_ADDRESS as `0x${string}` | undefined;
if (!address) throw new Error("Set CONTRACT_ADDRESS");
const client = createClient({ chain: studionet });
const local = fs.readFileSync(path.resolve("contracts/TrustGraph.py"), "utf8").replace(/\r\n/g, "\n");
const deployedRaw = await client.getContractCode(address) as any;
const deployed = (typeof deployedRaw === "string" ? deployedRaw : deployedRaw?.code ?? "").replace(/\r\n/g, "\n");
const sha = (value: string) => crypto.createHash("sha256").update(value).digest("hex");
if (!deployed || local !== deployed) throw new Error(JSON.stringify({ localSha256: sha(local), deployedSha256: sha(deployed), exactMatch: false }));
console.log(JSON.stringify({ address, exactMatch: true, sha256: sha(local) }, null, 2));
