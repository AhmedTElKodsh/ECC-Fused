import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { requiredCommands, requiredSkills } from "../scripts/scaffold-required-catalog.mjs";

const root = process.cwd();

test("all required command files define behavior and Transition Notice handling", async () => {
  for (const [id, command] of requiredCommands) {
    const text = await readFile(path.join(root, "commands", `${id}.md`), "utf8");
    assert.match(text, new RegExp(`# ${command.replace("/", "\\/")}`));
    assert.match(text, /Behavior/);
    assert.match(text, /## Workflow/);
    assert.match(text, /## Guardrails/);
    assert.match(text, /Transition Notice/);
  }
});

test("all required skills include governance sections", async () => {
  for (const [id] of requiredSkills) {
    const text = await readFile(path.join(root, "skills", id, "SKILL.md"), "utf8");
    assert.match(text, /## Purpose/);
    assert.match(text, /## Trigger/);
    assert.match(text, /## Detailed Workflow/);
    assert.match(text, /## Required Evidence/);
    assert.match(text, /## Verification Requirements/);
    assert.match(text, /## Escalation Rules/);
    assert.match(text, /sourceInspiration:/);
  }
});

test("catalog files contain command-specific and skill-specific workflow content", async () => {
  const shortPath = await readFile(path.join(root, "commands", "ecc-path-short.md"), "utf8");
  assert.match(shortPath, /bounded low-risk objective/);
  assert.match(shortPath, /Regular Path/);

  const ralphRun = await readFile(path.join(root, "commands", "ecc-ralph-run.md"), "utf8");
  assert.match(ralphRun, /freeze, overload, repeated failure, no progress, or boundary breach/);

  const workPacket = await readFile(path.join(root, "skills", "implement-work-packet", "SKILL.md"), "utf8");
  assert.match(workPacket, /Read the packet completely before editing/);
  assert.match(workPacket, /red-green-refactor/);

  const securityReview = await readFile(path.join(root, "skills", "security-review", "SKILL.md"), "utf8");
  assert.match(securityReview, /Threat-model changed surfaces/);
});
