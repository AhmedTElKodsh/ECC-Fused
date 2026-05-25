import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { requiredCommands, requiredSkills } from "./scaffold-required-catalog.mjs";
import { requiredPlanningTemplates, requiredRules, requiredSchemas } from "./scaffold-required-artifacts.mjs";
import { requiredDocs } from "./scaffold-required-docs.mjs";

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
    "README.md",
    "CONTEXT.md",
    ".planning/CONTEXT.md"
  ];

  requiredFiles.forEach(requireFile);

  const skills = await readJson("manifests/skills.json");
  const commands = await readJson("manifests/commands.json");

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
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  validate()
    .then(() => console.log("ECC-Fusion validation passed."))
    .catch((error) => {
      console.error(error.message);
      process.exitCode = 1;
    });
}
