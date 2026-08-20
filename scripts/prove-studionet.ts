import { createAccount, createClient } from "genlayer-js";
import { studionet } from "genlayer-js/chains";
import { TransactionStatus } from "genlayer-js/types";

const address = process.env.CONTRACT_ADDRESS as `0x${string}` | undefined;
if (!address) throw new Error("Set CONTRACT_ADDRESS");
const account = createAccount();
const client = createClient({ chain: studionet, account });
const suffix = process.env.PROOF_SUFFIX ?? String(Date.now());
const agent = "0x1111111111111111111111111111111111111111";

async function write(functionName: string, args: any[]) {
  const hash = await client.writeContract({ address, functionName, args, account, value: 0n });
  console.log(`${functionName}=${hash}`);
  const receipt = await client.waitForTransactionReceipt({ hash: hash as never,
    status: TransactionStatus.FINALIZED, interval: 5000, retries: 180 }) as any;
  const executions = receipt.consensus_data?.leader_receipt ?? [];
  const fatal = executions.filter((x: any) => x.execution_result !== "SUCCESS" &&
    x.genvm_result?.error_code !== "CONSENSUS_VALIDATOR_QUORUM_REACHED");
  if (receipt.result_name !== "MAJORITY_AGREE" || fatal.length) {
    throw new Error(`${functionName} failed: ${JSON.stringify({ hash, consensus: receipt.result_name, fatal })}`);
  }
  return { hash, explorer: `https://explorer-studio.genlayer.com/tx/${hash}` };
}

const auditId = `audit-${suffix}`;
const translationId = `translation-${suffix}`;
const unavailableId = `unavailable-${suffix}`;
const rawBase = "https://raw.githubusercontent.com/Al1ranger/trustgraph/main/evidence";

const proofs: any[] = [];
proofs.push(await write("create_commitment", [auditId, agent, "security_audit",
  "Deliver a security audit covering authentication and authorization controls.",
  "Report substantive findings with reproduction or remediation guidance.",
  "Minor formatting issues are acceptable.", "2026-09-01"]));
proofs.push(await write("adjudicate", [`assessment-${auditId}`, auditId,
  JSON.stringify([`${rawBase}/security-audit-success.json`])]));
proofs.push(await write("create_commitment", [translationId, agent, "translation",
  "Translate the supplied release notice into Spanish while preserving all version numbers and links.",
  "All sections, version numbers and links must be preserved.",
  "Minor stylistic variation is acceptable.", "2026-09-01"]));
proofs.push(await write("adjudicate", [`assessment-${translationId}`, translationId,
  JSON.stringify([`${rawBase}/translation-success.json`])]));
proofs.push(await write("create_commitment", [unavailableId, agent, "security_audit",
  "Deliver a security audit.", "A public audit artifact must be available.",
  "No missing artifact is acceptable.", "2026-09-01"]));
proofs.push(await write("adjudicate", [`assessment-${unavailableId}`, unavailableId,
  JSON.stringify([`${rawBase}/intentionally-missing.json`])]));

const audit = await client.readContract({ address, functionName: "get_assessment", args: [`assessment-${auditId}`] });
const translation = await client.readContract({ address, functionName: "get_assessment", args: [`assessment-${translationId}`] });
const unavailable = await client.readContract({ address, functionName: "get_assessment", args: [`assessment-${unavailableId}`] });
const auditProfile = await client.readContract({ address, functionName: "get_behavior_profile", args: [agent, "security_audit"] });
const translationProfile = await client.readContract({ address, functionName: "get_behavior_profile", args: [agent, "translation"] });
console.log(JSON.stringify({ contract: address, agent, proofs, storedState: {
  audit, translation, unavailable, auditProfile, translationProfile } }, null, 2));
