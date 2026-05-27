import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { existsSync } from "node:fs";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const skillsDir = path.join(root, "skills");

export async function lintSkills() {
  const dirs = await readdir(skillsDir, { withFileTypes: true });
  const skillFolders = dirs.filter(d => d.isDirectory()).map(d => d.name);

  const errors = [];

  for (const folder of skillFolders) {
    const skillPath = path.join(skillsDir, folder, "SKILL.md");
    if (!existsSync(skillPath)) {
      errors.push(`Missing SKILL.md in ${folder}`);
      continue;
    }

    const content = await readFile(skillPath, "utf8");
    const lines = content.split("\n");

    if (lines.length > 200) {
      errors.push(`Skill ${folder} exceeds 200 lines (${lines.length} lines). Reduce context bloat.`);
    }

    if (!content.match(/^# .+/m)) {
      errors.push(`Skill ${folder} is missing a title`);
    }
    
    if (!content.includes("## Trigger")) {
      errors.push(`Skill ${folder} is missing "## Trigger"`);
    }

    if (!content.includes("## When To Use")) {
      errors.push(`Skill ${folder} is missing "## When To Use"`);
    }
  }

  if (errors.length > 0) {
    console.error("Skill Lint Errors:");
    errors.forEach(e => console.error(`- ${e}`));
    return false;
  }

  console.log("Skill lint passed successfully.");
  return true;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  lintSkills().then(success => {
    if (!success) process.exit(1);
  }).catch(console.error);
}
