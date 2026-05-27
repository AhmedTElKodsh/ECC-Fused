import test from "node:test";
import assert from "node:assert/strict";
import { writeFile, rm } from "node:fs/promises";
import path from "node:path";
import { runRalphLoop } from "../scripts/ralph-runner.mjs";

const statePath = path.join(process.cwd(), ".planning/state.yaml");

test("ralph-runner exits if not in Ralph mode", async () => {
  await writeFile(statePath, "activePath: Auto\n", "utf8");
  const result = await runRalphLoop();
  assert.equal(result.stopRuleHit, false);
});

test("ralph-runner increments iteration when in Ralph mode", async () => {
  await writeFile(statePath, "activePath: Ralph\n", "utf8");
  const result = await runRalphLoop();
  assert.equal(result.stopRuleHit, false);
});

test("ralph-runner escalates to Regular Path after max iterations", async () => {
  await writeFile(statePath, "activePath: Ralph\nralphIteration: 3\n", "utf8");
  const result = await runRalphLoop();
  assert.equal(result.stopRuleHit, true);
  assert.equal(result.escalated, true);
});
