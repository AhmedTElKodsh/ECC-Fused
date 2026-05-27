import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

test("path-switch skill enforces .planning/state.yaml and Transition Notice", async () => {
  const text = await readFile(path.join(root, "skills/path-switch/SKILL.md"), "utf8");
  assert.match(text, /\.planning\/state\.yaml/);
  assert.match(text, /activePath/);
  assert.match(text, /Transition Notice/);
});

test("transition-guard skill enforces prerequisites before state change", async () => {
  const text = await readFile(path.join(root, "skills/transition-guard/SKILL.md"), "utf8");
  assert.match(text, /\.planning\/state\.yaml/);
  assert.match(text, /prerequisite/i);
  assert.match(text, /missing artifacts/i);
});

test("ralph-loop skill enforces stop rules and bounds", async () => {
  const text = await readFile(path.join(root, "skills/ralph-loop/SKILL.md"), "utf8");
  assert.match(text, /stop-condition/);
  assert.match(text, /bounded packets/);
  assert.match(text, /Escalate to Regular Path/);
});
