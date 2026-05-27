import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const statePath = path.join(process.cwd(), ".planning/state.yaml");
const MAX_ITERATIONS = 3;

export async function runRalphLoop() {
  if (!existsSync(statePath)) {
    throw new Error("Missing .planning/state.yaml");
  }

  let stateContent = await readFile(statePath, "utf8");
  
  const pathMatch = stateContent.match(/^activePath:\s*(.+)$/m);
  if (!pathMatch || !pathMatch[1].includes("Ralph")) {
    console.log("Not in Ralph mode. Exiting loop runner.");
    return { stopRuleHit: false, escalated: false };
  }

  let iteration = 0;
  const iterationMatch = stateContent.match(/^ralphIteration:\s*(\d+)$/m);
  if (iterationMatch) {
    iteration = parseInt(iterationMatch[1], 10);
  } else {
    stateContent = stateContent.replace(/\n$/, "") + "\nralphIteration: 0\n";
  }

  console.log(`Ralph Loop Iteration: ${iteration + 1}/${MAX_ITERATIONS}`);

  if (iteration >= MAX_ITERATIONS) {
    console.log("❌ Stop rule triggered: Max iterations reached. Escalating to Regular Path.");
    stateContent = stateContent.replace(/^activePath:\s*.+$/m, "activePath: Regular Path");
    stateContent = stateContent.replace(/^ralphIteration:\s*\d+$/m, "ralphIteration: 0");
    await writeFile(statePath, stateContent, "utf8");
    return { stopRuleHit: true, escalated: true };
  }

  stateContent = stateContent.replace(/^ralphIteration:\s*\d+$/m, `ralphIteration: ${iteration + 1}`);
  await writeFile(statePath, stateContent, "utf8");
  console.log("✓ Continuing Ralph bounded loop.");
  return { stopRuleHit: false, escalated: false };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  runRalphLoop().catch(console.error);
}
