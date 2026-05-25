import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

test("/ecc-help command defines advisory route note and safety stop", async () => {
  const text = await readFile(path.join(root, "commands/ecc-help.md"), "utf8");

  assert.match(text, /Route: <Short Path \| Regular Path \| Auto \| Ralph \| Shared skill>/);
  assert.match(text, /advisory by default/i);
  assert.match(text, /must not create artifacts/i);
});

test("ecc-help skill distinguishes advisory help from stateful next action", async () => {
  const text = await readFile(path.join(root, "skills/ecc-help/SKILL.md"), "utf8");

  assert.match(text, /category: Discovery & Help/);
  assert.match(text, /When Not To Use/);
  assert.match(text, /stateful `\/ecc-next` decision/);
  assert.match(text, /Transition Notice/);
});

test("ecc-help docs include source precedence and decision matrix", async () => {
  const text = await readFile(path.join(root, "docs/ecc-help.md"), "utf8");

  assert.match(text, /Source Precedence/);
  assert.match(text, /Decision Matrix/);
  assert.match(text, /Bounded bug fix/);
  assert.match(text, /Ralph request/);
});
