import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { requiredPlanningTemplates, requiredRules, requiredSchemas } from "../scripts/scaffold-required-artifacts.mjs";

const root = process.cwd();

test("all required rules include the mandatory safety controls", async () => {
  for (const rule of requiredRules) {
    const text = await readFile(path.join(root, "rules", `${rule}.md`), "utf8");
    assert.match(text, /no secret exposure/);
    assert.match(text, /no files outside work-packet scope/);
    assert.match(text, /missing prerequisites must trigger a Transition Notice/);
    assert.match(text, /OSS\/local models may not perform high-risk changes without escalation/);
  }
});

test("all required schemas exist and parse as JSON Schema objects", async () => {
  for (const schema of requiredSchemas) {
    const parsed = JSON.parse(await readFile(path.join(root, "schemas", schema), "utf8"));
    assert.equal(parsed.$schema, "https://json-schema.org/draft/2020-12/schema");
    assert.ok(["object", "array"].includes(parsed.type), `${schema} type`);
    const required = parsed.type === "array" ? parsed.items?.required : parsed.required;
    assert.ok(Array.isArray(required), `${schema} required`);
  }
});

test("all required planning templates include purpose and verification structure", async () => {
  for (const template of requiredPlanningTemplates) {
    const text = await readFile(path.join(root, "planning-templates", template), "utf8");
    if (template.endsWith(".json")) {
      const parsed = JSON.parse(text);
      assert.ok(Array.isArray(parsed.stopConditions));
    } else {
      assert.match(text, /## Purpose/);
      assert.match(text, /## Verification/);
      assert.match(text, /## Blockers/);
    }
  }
});
