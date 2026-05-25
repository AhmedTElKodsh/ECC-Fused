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
    assert.match(text, /Transition Notice/);
  }
});

test("all required skills include governance sections", async () => {
  for (const [id] of requiredSkills) {
    const text = await readFile(path.join(root, "skills", id, "SKILL.md"), "utf8");
    assert.match(text, /## Purpose/);
    assert.match(text, /## Trigger/);
    assert.match(text, /## Verification Requirements/);
    assert.match(text, /## Escalation Rules/);
    assert.match(text, /sourceInspiration:/);
  }
});
