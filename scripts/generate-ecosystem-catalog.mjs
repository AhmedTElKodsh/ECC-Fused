import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { requiredRules } from "./scaffold-required-artifacts.mjs";
import { skillCategories } from "./validate-ecc-fusion.mjs";

const root = process.cwd();

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function escapeCell(value) {
  return String(value ?? "")
    .replace(/\r?\n/g, "<br>")
    .replace(/\|/g, "\\|");
}

async function readJson(relativePath) {
  return JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
}

async function readText(relativePath) {
  return readFile(path.join(root, relativePath), "utf8");
}

async function write(relativePath, text) {
  const absolutePath = path.join(root, relativePath);
  await mkdir(path.dirname(absolutePath), { recursive: true });
  await writeFile(absolutePath, text, "utf8");
}

function extractSection(markdown, heading) {
  const pattern = new RegExp(`^## ${heading}\\s*$([\\s\\S]*?)(?=^## |\\z)`, "m");
  const match = markdown.match(pattern);
  return match ? match[1].trim().replace(/\s+/g, " ") : "";
}

function table(headers, rows) {
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map(escapeCell).join(" | ")} |`)
  ].join("\n");
}

function skillMirror(skill, sourceMarkdown) {
  return `# ${skill.name}

> Generated mirror. Canonical source: \`${skill.file}\`.

| Field | Value |
| --- | --- |
| Skill id | \`${skill.id}\` |
| Category | ${skill.category} |
| Path availability | ${skill.pathAvailability.join(", ")} |
| Shared skill | ${skill.sharedSkill ? "yes" : "no"} |
| Source inspiration | ${skill.sourceInspiration.join(", ")} |

${sourceMarkdown}
`;
}

function commandMirror(command, sourceMarkdown) {
  return `# ${command.command}

> Generated mirror. Canonical source: \`${command.file}\`.

| Field | Value |
| --- | --- |
| Command id | \`${command.id}\` |
| Category | ${command.category} |
| Related skill | \`${command.relatedSkill}\` |
| Path availability | ${command.pathAvailability.join(", ")} |
| State required | ${command.stateRequired ? "yes" : "no"} |
| Source inspiration | ${command.sourceInspiration.join(", ")} |

${sourceMarkdown}
`;
}

function ruleMirror(rule, sourceMarkdown) {
  return `# ${rule}

> Generated mirror. Canonical source: \`rules/${rule}.md\`.

${sourceMarkdown}
`;
}

function ecosystemReadme(skills, commands, harness) {
  return `# ECC-Fusion Ecosystem Catalog

This catalog is generated from the canonical manifests and local skill, command, and rule files. It gives maintainers and users a stable way to inspect the Harness Ecosystem without moving the executable surfaces.

## Backbone

\`\`\`mermaid
flowchart TD
  H["manifests/harness.json"] --> R["/ecc-help router"]
  S["manifests/skills.json"] --> R
  C["manifests/commands.json"] --> R
  R --> P{"Path"}
  P -->|Short Path| WP["Work packet"]
  P -->|Regular Path| KR["Kiro-style requirements/design/tasks"]
  P -->|Ralph| RL["Ralph loop"]
  WP --> V["Verification evidence"]
  KR --> V
  RL --> V
  V --> L["Handoff, release, learn"]
\`\`\`

## Generated Areas

- \`ecosystem/skills/MAP.md\`: all skills grouped by category.
- \`ecosystem/skills/<category>/MAP.md\`: category-specific skill map and generated markdown mirrors.
- \`ecosystem/orchestration/MAP.md\`: commands, controller skills, and workflow rules that regulate paths and skill relations.

## Counts

| Surface | Count |
| --- | ---: |
| Skills | ${skills.length} |
| Commands | ${commands.length} |
| Categories | ${skillCategories.length} |
| Harness phases | ${harness.phases.length} |
| Orchestration rules | ${harness.orchestration.rules.length} |

Regenerate with:

\`\`\`powershell
node scripts/generate-ecosystem-catalog.mjs
\`\`\`
`;
}

function categoryMap(category, skills) {
  const rows = skills.map((skill) => [
    `\`${skill.id}\``,
    skill.name,
    extractSection(skill.markdown, "Purpose"),
    skill.pathAvailability.join(", "),
    skill.sharedSkill ? "yes" : "no",
    skill.sourceInspiration.join(", "),
    `skills/${skill.id}.md`
  ]);

  return `# ${category} Skill Map

## 🟢 For Users
These are the specific skills under **${category}**. If you're running a command related to this category, it's using one of these skills under the hood.

## 🔴 For Maintainers
This folder mirrors skills whose primary category is **${category}**. The canonical executable files remain under \`skills/\`.

${table(["Skill", "Name", "Description", "Paths", "Shared", "Source or GitHub library", "Mirror"], rows)}
`;
}

function skillsIndex(grouped) {
  const rows = skillCategories.map((category) => {
    const skills = grouped.get(category) ?? [];
    const slug = slugify(category);
    return [
      category,
      String(skills.length),
      skills.map((skill) => `\`${skill.id}\``).join(", ") || "None yet",
      `${slug}/MAP.md`
    ];
  });

  return `# Skill Category Index

## 🟢 For Users
ECC-Fusion groups tools by what you are trying to achieve (e.g., "Architecture & Planning"), not by where the tool came from. If you're looking for help, check the table below to find the right category for your task.

## 🔴 For Maintainers
ECC-Fusion skills are grouped by stable functional categories, not by source-library brand. This preserves routing clarity and prevents duplicate imported workflows from bloating context.

${table(["Category", "Skill count", "Skills", "Map"], rows)}
`;
}

function orchestrationMap({ commands, controllerSkills, rules, harness }) {
  const commandRows = commands.map((command) => [
    `\`${command.command}\``,
    command.category,
    `\`${command.relatedSkill}\``,
    command.pathAvailability.join(", "),
    command.stateRequired ? "yes" : "no",
    command.sourceInspiration.join(", "),
    `commands/${command.id}.md`
  ]);

  const skillRows = controllerSkills.map((skill) => [
    `\`${skill.id}\``,
    skill.name,
    skill.category,
    extractSection(skill.markdown, "Purpose"),
    skill.sourceInspiration.join(", "),
    `skills/${skill.id}.md`
  ]);

  const ruleRows = rules.map((rule) => [
    `\`${rule}\``,
    `rules/${rule}.md`
  ]);

  return `# Orchestration Map

## 🟢 For Users
This section controls how ECC-Fusion guides you. It maps the commands you type (like \`/ecc-help\`) to the hidden logic that keeps your project safe.

## 🔴 For Maintainers
This folder mirrors the commands, controller skills, and workflow rules that keep Short Path, Regular Path, Auto mode, Ralph mode, and skill relations coherent.

## Controller Diagram

\`\`\`mermaid
flowchart TD
  H["Harness manifest"] --> EH["ecc-help"]
  EH --> PS["path-switch"]
  PS --> TG["transition-guard"]
  TG --> WP["create-work-packets"]
  WP --> IW["implement-work-packet"]
  IW --> VW["verify-work"]
  EH --> PC["package-check"]
  PC --> SL["skill-lint"]
  EH --> RL["ralph-loop when eligible"]
\`\`\`

## Commands

${table(["Command", "Category", "Related skill", "Paths", "State required", "Source or GitHub library", "Mirror"], commandRows)}

## Controller Skills

${table(["Skill", "Name", "Category", "Description", "Source or GitHub library", "Mirror"], skillRows)}

## Workflow Rules

${table(["Rule", "Canonical file"], ruleRows)}

## Modification Guard

Any change to commands, controller skills, rules, or \`manifests/harness.json\` must keep these invariants:

- every path has an entry and escalation rule,
- every phase maps to at least one category,
- every controller skill exists in \`manifests/skills.json\`,
- every command references an existing skill,
- every rule mirror points to an existing canonical rule.

Harness paths: ${harness.paths.map((pathEntry) => pathEntry.id).join(", ")}.
`;
}

export async function generateEcosystemCatalog() {
  const skills = await readJson("manifests/skills.json");
  const commands = await readJson("manifests/commands.json");
  const harness = await readJson("manifests/harness.json");

  for (const skill of skills) {
    skill.markdown = await readText(skill.file);
  }

  for (const command of commands) {
    command.markdown = await readText(command.file);
  }

  const grouped = new Map(skillCategories.map((category) => [category, []]));
  for (const skill of skills) {
    grouped.get(skill.category)?.push(skill);
  }

  await write("ecosystem/README.md", ecosystemReadme(skills, commands, harness));
  await write("ecosystem/skills/MAP.md", skillsIndex(grouped));

  for (const category of skillCategories) {
    const slug = slugify(category);
    const categorySkills = grouped.get(category) ?? [];
    await write(`ecosystem/skills/${slug}/MAP.md`, categoryMap(category, categorySkills));
    for (const skill of categorySkills) {
      await write(`ecosystem/skills/${slug}/skills/${skill.id}.md`, skillMirror(skill, skill.markdown));
    }
  }

  const controllerIds = new Set(harness.orchestration.controllerSkills);
  const controllerSkills = skills.filter((skill) => controllerIds.has(skill.id));
  const orchestrationCommands = commands.filter((command) => harness.orchestration.commands.includes(command.id));
  const orchestrationRules = requiredRules.filter((rule) => harness.orchestration.rules.includes(rule));

  await write(
    "ecosystem/orchestration/MAP.md",
    orchestrationMap({
      commands: orchestrationCommands,
      controllerSkills,
      rules: orchestrationRules,
      harness
    })
  );

  for (const command of orchestrationCommands) {
    await write(`ecosystem/orchestration/commands/${command.id}.md`, commandMirror(command, command.markdown));
  }

  for (const skill of controllerSkills) {
    await write(`ecosystem/orchestration/skills/${skill.id}.md`, skillMirror(skill, skill.markdown));
  }

  for (const rule of orchestrationRules) {
    const markdown = await readText(`rules/${rule}.md`);
    await write(`ecosystem/orchestration/rules/${rule}.md`, ruleMirror(rule, markdown));
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  await generateEcosystemCatalog();
}
