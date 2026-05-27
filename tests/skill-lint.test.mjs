import test from "node:test";
import assert from "node:assert/strict";
import { lintSkills } from "../scripts/skill-lint.mjs";

test("skill-lint passes on current repository skills", async () => {
  const success = await lintSkills();
  assert.equal(success, true, "skill-lint should pass cleanly on the existing repository");
});
