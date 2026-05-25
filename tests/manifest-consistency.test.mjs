import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { skillCategories, validate } from "../scripts/validate-ecc-fusion.mjs";
import { requiredCommands, requiredSkills } from "../scripts/scaffold-required-catalog.mjs";

const root = process.cwd();

test("ECC-Fusion scaffold validates", async () => {
  await assert.doesNotReject(validate());
});

test("skill manifest uses canonical categories and source attribution", async () => {
  const skills = JSON.parse(await readFile(path.join(root, "manifests/skills.json"), "utf8"));

  assert.ok(skills.length > 0);
  assert.equal(skills.length, requiredSkills.length);
  for (const skill of skills) {
    assert.ok(skillCategories.includes(skill.category), `${skill.id} category`);
    assert.ok(skill.sourceInspiration.length > 0, `${skill.id} source attribution`);
    assert.ok(existsSync(path.join(root, skill.file)), `${skill.id} file exists`);
  }
});

test("command manifest links command files to skills", async () => {
  const commands = JSON.parse(await readFile(path.join(root, "manifests/commands.json"), "utf8"));
  const skills = JSON.parse(await readFile(path.join(root, "manifests/skills.json"), "utf8"));
  const skillIds = new Set(skills.map((skill) => skill.id));

  assert.equal(commands.length, requiredCommands.length);
  for (const command of commands) {
    assert.ok(command.command.startsWith("/"));
    assert.ok(skillIds.has(command.relatedSkill), `${command.id} related skill`);
    assert.ok(existsSync(path.join(root, command.file)), `${command.id} file exists`);
  }
});
