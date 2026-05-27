import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { requiredCommands, requiredSkills } from "./scaffold-required-catalog.mjs";
import { requiredPlanningTemplates, requiredRules, requiredSchemas } from "./scaffold-required-artifacts.mjs";
import { requiredDocs } from "./scaffold-required-docs.mjs";
import Ajv from "ajv/dist/2020.js";

const ajv = new Ajv({ strict: false });

const root = process.cwd();

export const skillCategories = [
  "Discovery & Help",
  "Clarification & Research",
  "Specification & Product",
  "Architecture & Planning",
  "Work Packet & Delegation",
  "Implementation",
  "Testing & Verification",
  "Review & Security",
  "QA & Release",
  "Documentation & Handoff",
  "Memory & Context Management",
  "Governance & Maintenance",
  "Automation Accelerators"
];

function requireFile(relativePath) {
  const absolutePath = path.join(root, relativePath);
  if (!existsSync(absolutePath)) {
    throw new Error(`Missing required file: ${relativePath}`);
  }
}

async function readJson(relativePath) {
  const text = await readFile(path.join(root, relativePath), "utf8");
  return JSON.parse(text);
}

function unique(values, label) {
  const seen = new Set();
  for (const value of values) {
    if (seen.has(value)) throw new Error(`Duplicate ${label}: ${value}`);
    seen.add(value);
  }
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function validate() {
  const requiredFiles = [
    ...requiredCommands.map(([id]) => `commands/${id}.md`),
    ...requiredSkills.map(([id]) => `skills/${id}/SKILL.md`),
    ...requiredRules.map((id) => `rules/${id}.md`),
    ...requiredSchemas.map((id) => `schemas/${id}`),
    ...requiredPlanningTemplates.map((id) => `planning-templates/${id}`),
    ...requiredDocs.map((id) => `docs/${id}`),
    "manifests/skills.json",
    "manifests/commands.json",
    "manifests/harness.json",
    "ecosystem/README.md",
    "ecosystem/skills/MAP.md",
    "ecosystem/orchestration/MAP.md",
    "README.md",
    "CONTEXT.md",
    ".planning/CONTEXT.md"
  ];

  requiredFiles.forEach(requireFile);

  const skills = await readJson("manifests/skills.json");
  const commands = await readJson("manifests/commands.json");
  const harness = await readJson("manifests/harness.json");

  const harnessSchema = await readJson("schemas/harness-manifest.schema.json");
  const skillSchema = await readJson("schemas/skill-manifest.schema.json");
  const commandSchema = await readJson("schemas/command-manifest.schema.json");

  const validateHarness = ajv.compile(harnessSchema);
  const validateSkill = ajv.compile(skillSchema);
  const validateCommand = ajv.compile(commandSchema);

  if (!validateHarness(harness)) {
    throw new Error(`Invalid harness.json: ${JSON.stringify(validateHarness.errors, null, 2)}`);
  }

  unique(skills.map((skill) => skill.id), "skill id");
  unique(commands.map((command) => command.id), "command id");
  unique(commands.map((command) => command.command), "command alias");

  const skillIds = new Set(skills.map((skill) => skill.id));
  const commandIds = new Set(commands.map((command) => command.id));

  for (const [id] of requiredSkills) {
    if (!skillIds.has(id)) throw new Error(`Missing required skill manifest entry: ${id}`);
  }

  for (const [id] of requiredCommands) {
    if (!commandIds.has(id)) throw new Error(`Missing required command manifest entry: ${id}`);
  }

  if (!validateSkill(skills)) {
    throw new Error(`Invalid skills.json: ${JSON.stringify(validateSkill.errors, null, 2)}`);
  }
  if (!validateCommand(commands)) {
    throw new Error(`Invalid commands.json: ${JSON.stringify(validateCommand.errors, null, 2)}`);
  }

  for (const skill of skills) {
    if (!skillCategories.includes(skill.category)) {
      throw new Error(`Invalid skill category for ${skill.id}: ${skill.category}`);
    }
    for (const field of ["pathAvailability", "prerequisites", "sourceInspiration", "conflictsWith"]) {
      if (!Array.isArray(skill[field])) {
        throw new Error(`Skill ${skill.id} must define array field ${field}`);
      }
    }
    requireFile(skill.file);
  }

  for (const command of commands) {
    if (!skillCategories.includes(command.category)) {
      throw new Error(`Invalid command category for ${command.id}: ${command.category}`);
    }
    for (const field of ["pathAvailability", "sourceInspiration"]) {
      if (!Array.isArray(command[field])) {
        throw new Error(`Command ${command.id} must define array field ${field}`);
      }
    }
    requireFile(command.file);
    if (!skillIds.has(command.relatedSkill)) {
      throw new Error(`Command ${command.id} references missing skill ${command.relatedSkill}`);
    }
  }

  const ruleIds = new Set(requiredRules);

  for (const pathEntry of harness.paths) {
    if (!["Short Path", "Regular Path", "Auto", "Ralph"].includes(pathEntry.id)) {
      throw new Error(`Invalid harness path: ${pathEntry.id}`);
    }
    for (const field of ["requiredArtifacts", "mustNeverSkip"]) {
      if (!Array.isArray(pathEntry[field]) || pathEntry[field].length === 0) {
        throw new Error(`Harness path ${pathEntry.id} must define non-empty ${field}`);
      }
    }
  }

  for (const phase of harness.phases) {
    if (!Array.isArray(phase.categories) || phase.categories.length === 0) {
      throw new Error(`Harness phase ${phase.id} must define categories`);
    }
    for (const category of phase.categories) {
      if (!skillCategories.includes(category)) {
        throw new Error(`Harness phase ${phase.id} references unknown category ${category}`);
      }
    }
    if (!Array.isArray(phase.subphases) || phase.subphases.length === 0) {
      throw new Error(`Harness phase ${phase.id} must define subphases`);
    }
  }

  for (const skillId of harness.orchestration.controllerSkills) {
    if (!skillIds.has(skillId)) {
      throw new Error(`Harness orchestration references missing skill ${skillId}`);
    }
    requireFile(`ecosystem/orchestration/skills/${skillId}.md`);
  }

  for (const commandId of harness.orchestration.commands) {
    if (!commandIds.has(commandId)) {
      throw new Error(`Harness orchestration references missing command ${commandId}`);
    }
    requireFile(`ecosystem/orchestration/commands/${commandId}.md`);
  }

  for (const ruleId of harness.orchestration.rules) {
    if (!ruleIds.has(ruleId)) {
      throw new Error(`Harness orchestration references missing rule ${ruleId}`);
    }
    requireFile(`ecosystem/orchestration/rules/${ruleId}.md`);
  }

  for (const category of skillCategories) {
    const categorySlug = slugify(category);
    requireFile(`ecosystem/skills/${categorySlug}/MAP.md`);
  }

  for (const skill of skills) {
    const categorySlug = slugify(skill.category);
    requireFile(`ecosystem/skills/${categorySlug}/skills/${skill.id}.md`);
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  validate()
    .then(() => console.log("ECC-Fusion validation passed."))
    .catch((error) => {
      console.error(error.message);
      process.exitCode = 1;
    });
}
