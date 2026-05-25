import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { readmeTopics, requiredDocs } from "../scripts/scaffold-required-docs.mjs";

const root = process.cwd();

test("all required docs exist and include validation guidance", async () => {
  for (const doc of requiredDocs) {
    const text = await readFile(path.join(root, "docs", doc), "utf8");
    assert.match(text, /^# /, `${doc} title`);
    if (doc !== "implementation-log.md") {
      assert.match(text, /ECC-Fusion|Source Library Map|Skill Categories|ECC Help/, `${doc} context`);
    }
  }
});

test("README covers every required topic", async () => {
  const text = await readFile(path.join(root, "README.md"), "utf8");
  const lower = text.toLowerCase();

  for (const topic of readmeTopics) {
    assert.ok(lower.includes(topic.toLowerCase()), `README missing topic: ${topic}`);
  }
});

test("README exposes verification commands", async () => {
  const text = await readFile(path.join(root, "README.md"), "utf8");

  assert.match(text, /npm\.cmd test/);
  assert.match(text, /npm\.cmd run validate/);
});
