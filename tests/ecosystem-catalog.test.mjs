import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { skillCategories } from "../scripts/validate-ecc-fusion.mjs";

const root = process.cwd();

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function readJson(relativePath) {
  return JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
}

async function readText(relativePath) {
  return readFile(path.join(root, relativePath), "utf8");
}

test("harness manifest regulates known paths, phases, and orchestration surfaces", async () => {
  const harness = await readJson("manifests/harness.json");
  const skills = await readJson("manifests/skills.json");
  const commands = await readJson("manifests/commands.json");

  const skillIds = new Set(skills.map((skill) => skill.id));
  const commandIds = new Set(commands.map((command) => command.id));

  assert.deepEqual(
    harness.paths.map((entry) => entry.id),
    ["Short Path", "Regular Path", "Auto", "Ralph"]
  );

  for (const phase of harness.phases) {
    assert.ok(phase.subphases.length > 0, `${phase.id} subphases`);
    assert.ok(phase.kiroArtifact, `${phase.id} kiro artifact`);
    for (const category of phase.categories) {
      assert.ok(skillCategories.includes(category), `${phase.id} category ${category}`);
    }
  }

  for (const skillId of harness.orchestration.controllerSkills) {
    assert.ok(skillIds.has(skillId), `missing controller skill ${skillId}`);
  }

  for (const commandId of harness.orchestration.commands) {
    assert.ok(commandIds.has(commandId), `missing orchestration command ${commandId}`);
  }
});

test("ecosystem skill category maps mirror every manifest skill", async () => {
  const skills = await readJson("manifests/skills.json");
  const index = await readText("ecosystem/skills/MAP.md");

  for (const category of skillCategories) {
    const slug = slugify(category);
    const map = await readText(`ecosystem/skills/${slug}/MAP.md`);
    assert.match(index, new RegExp(category.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(map, new RegExp(`# ${category} Skill Map`));
  }

  for (const skill of skills) {
    const slug = slugify(skill.category);
    const map = await readText(`ecosystem/skills/${slug}/MAP.md`);
    const mirror = await readText(`ecosystem/skills/${slug}/skills/${skill.id}.md`);
    assert.match(map, new RegExp(skill.id));
    assert.match(mirror, new RegExp(`Canonical source: \`${skill.file.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\``));
  }
});

test("orchestration map mirrors controller commands, skills, and rules", async () => {
  const harness = await readJson("manifests/harness.json");
  const map = await readText("ecosystem/orchestration/MAP.md");

  for (const commandId of harness.orchestration.commands) {
    assert.match(map, new RegExp(commandId));
    const mirror = await readText(`ecosystem/orchestration/commands/${commandId}.md`);
    assert.match(mirror, /Canonical source: `commands\//);
  }

  for (const skillId of harness.orchestration.controllerSkills) {
    assert.match(map, new RegExp(skillId));
    const mirror = await readText(`ecosystem/orchestration/skills/${skillId}.md`);
    assert.match(mirror, /Canonical source: `skills\//);
  }

  for (const ruleId of harness.orchestration.rules) {
    assert.match(map, new RegExp(ruleId));
    const mirror = await readText(`ecosystem/orchestration/rules/${ruleId}.md`);
    assert.match(mirror, /Canonical source: `rules\//);
  }
});

test("Kiro-style planning templates expose requirements, design, tasks, and QA traceability", async () => {
  const requirements = await readText("planning-templates/kiro-spec/requirements-template.md");
  const design = await readText("planning-templates/kiro-spec/design/architecture-template.md");
  const packets = await readText("planning-templates/kiro-spec/design/work-packets-template.md");
  const tasks = await readText("planning-templates/kiro-spec/tasks-template.md");
  const qa = await readText("planning-templates/kiro-spec/qa-tasks-template.md");

  assert.match(requirements, /User Stories/);
  assert.match(requirements, /Optional Developer Decisions/);
  assert.match(requirements, /Traceability/);
  assert.match(design, /Implementation Direction/);
  assert.match(packets, /Escalation Rules/);
  assert.match(tasks, /\[ \] not started/);
  assert.match(qa, /Required Gates/);
});
