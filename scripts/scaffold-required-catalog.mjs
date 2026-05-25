import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();

const sources = {
  ecc: ["ECC"],
  bmad: ["BMAD-METHOD", "ECC"],
  superpowers: ["Superpowers", "Matt Pocock skills", "ECC"],
  gsd: ["GSD Redux", "ECC"],
  ralph: ["Ralph", "ECC"],
  gstack: ["gstack", "ECC"],
  openspec: ["OpenSpec", "ECC"]
};

export const requiredCommands = [
  ["ecc-start", "/ecc-start", "Discovery & Help", "ecc-help", false, sources.ecc],
  ["ecc-start-feature", "/ecc-start-feature", "Discovery & Help", "ecc-help", false, sources.ecc],
  ["ecc-help", "/ecc-help", "Discovery & Help", "ecc-help", false, sources.bmad],
  ["ecc-path-short", "/ecc-path-short", "Work Packet & Delegation", "path-switch", true, sources.gsd],
  ["ecc-path-regular", "/ecc-path-regular", "Architecture & Planning", "path-switch", true, sources.bmad],
  ["ecc-switch-path", "/ecc-switch-path", "Work Packet & Delegation", "path-switch", true, sources.gsd],
  ["ecc-next", "/ecc-next", "Discovery & Help", "ecc-help", true, sources.gsd],
  ["ecc-status", "/ecc-status", "Discovery & Help", "ecc-help", true, sources.ecc],
  ["ecc-grill", "/ecc-grill", "Clarification & Research", "grill-with-context", false, sources.superpowers],
  ["ecc-spec", "/ecc-spec", "Specification & Product", "write-spec", true, sources.bmad],
  ["ecc-prototype", "/ecc-prototype", "Specification & Product", "prototype-ui", true, sources.superpowers],
  ["ecc-architecture", "/ecc-architecture", "Architecture & Planning", "architecture-plan", true, sources.bmad],
  ["ecc-plan", "/ecc-plan", "Architecture & Planning", "architecture-plan", true, sources.bmad],
  ["ecc-packetize", "/ecc-packetize", "Work Packet & Delegation", "create-work-packets", true, sources.gsd],
  ["ecc-route", "/ecc-route", "Work Packet & Delegation", "path-switch", true, sources.ecc],
  ["ecc-execute-packet", "/ecc-execute-packet", "Implementation", "implement-work-packet", true, sources.gsd],
  ["ecc-verify", "/ecc-verify", "Testing & Verification", "verify-work", true, sources.superpowers],
  ["ecc-review", "/ecc-review", "Review & Security", "review-oss-output", true, sources.gstack],
  ["ecc-security-review", "/ecc-security-review", "Review & Security", "security-review", true, sources.gstack],
  ["ecc-qa", "/ecc-qa", "QA & Release", "qa-browser", true, sources.gstack],
  ["ecc-ship", "/ecc-ship", "QA & Release", "ship-release", true, sources.gstack],
  ["ecc-retro", "/ecc-retro", "Documentation & Handoff", "retro-learn", true, sources.gstack],
  ["ecc-package-check", "/ecc-package-check", "Governance & Maintenance", "package-check", false, sources.openspec],
  ["ecc-skill-lint", "/ecc-skill-lint", "Governance & Maintenance", "skill-lint", false, sources.openspec],
  ["ecc-ralph-prepare", "/ecc-ralph-prepare", "Automation Accelerators", "ralph-loop", true, sources.ralph],
  ["ecc-ralph-run", "/ecc-ralph-run", "Automation Accelerators", "ralph-loop", true, sources.ralph],
  ["ecc-ralph-status", "/ecc-ralph-status", "Automation Accelerators", "ralph-loop", true, sources.ralph],
  ["ecc-ralph-stop", "/ecc-ralph-stop", "Automation Accelerators", "ralph-loop", true, sources.ralph]
];

export const requiredSkills = [
  ["ask-interview", "Ask Interview", "Clarification & Research", ["Short Path", "Regular Path", "Auto"], sources.superpowers],
  ["ecc-help", "ECC Help", "Discovery & Help", ["Short Path", "Regular Path", "Auto"], ["BMAD-METHOD", "ECC", "Agent OS"]],
  ["grill-with-context", "Grill With Context", "Clarification & Research", ["Regular Path", "Auto"], sources.superpowers],
  ["write-spec", "Write Spec", "Specification & Product", ["Regular Path", "Auto"], sources.bmad],
  ["prototype-ui", "Prototype UI", "Specification & Product", ["Regular Path", "Auto"], sources.superpowers],
  ["architecture-plan", "Architecture Plan", "Architecture & Planning", ["Regular Path", "Auto"], sources.bmad],
  ["create-work-packets", "Create Work Packets", "Work Packet & Delegation", ["Short Path", "Regular Path", "Auto"], sources.gsd],
  ["implement-work-packet", "Implement Work Packet", "Implementation", ["Short Path", "Regular Path"], sources.gsd],
  ["tdd", "TDD", "Testing & Verification", ["Short Path", "Regular Path"], sources.superpowers],
  ["diagnose", "Diagnose", "Clarification & Research", ["Short Path", "Regular Path", "Auto"], sources.superpowers],
  ["write-tests", "Write Tests", "Testing & Verification", ["Short Path", "Regular Path"], sources.superpowers],
  ["verify-work", "Verify Work", "Testing & Verification", ["Short Path", "Regular Path"], sources.superpowers],
  ["review-oss-output", "Review OSS Output", "Review & Security", ["Short Path", "Regular Path"], sources.gstack],
  ["security-review", "Security Review", "Review & Security", ["Short Path", "Regular Path"], sources.gstack],
  ["qa-browser", "QA Browser", "QA & Release", ["Regular Path"], sources.gstack],
  ["ship-release", "Ship Release", "QA & Release", ["Regular Path"], sources.gstack],
  ["retro-learn", "Retro Learn", "Documentation & Handoff", ["Regular Path"], sources.gstack],
  ["write-a-skill", "Write A Skill", "Governance & Maintenance", ["Regular Path"], sources.superpowers],
  ["skill-lint", "Skill Lint", "Governance & Maintenance", ["Short Path", "Regular Path"], sources.openspec],
  ["package-check", "Package Check", "Governance & Maintenance", ["Short Path", "Regular Path"], sources.openspec],
  ["handoff", "Handoff", "Documentation & Handoff", ["Short Path", "Regular Path"], sources.superpowers],
  ["path-switch", "Path Switch", "Work Packet & Delegation", ["Short Path", "Regular Path", "Auto"], sources.gsd],
  ["transition-guard", "Transition Guard", "Work Packet & Delegation", ["Short Path", "Regular Path", "Auto"], sources.gsd],
  ["ralph-loop", "Ralph Loop", "Automation Accelerators", ["Ralph"], sources.ralph]
];

function commandBody([id, command, category, relatedSkill, stateRequired, sourceInspiration]) {
  if (id === "ecc-help") {
    return `# /ecc-help

Use this command when the user does not know what to do next, asks which path to choose, asks whether a shared skill can run, or requests help recovering from missing artifacts.

## Behavior

1. Inspect current user intent.
2. Inspect repository state and \`.planning/state.yaml\` when present.
3. Classify risk, ambiguity, artifact completeness, and requested skill or path.
4. Apply source-of-truth precedence.
5. Recommend Short Path, Regular Path, Auto, Ralph, or a shared skill.
6. Emit a Transition Notice when prerequisites are missing.

## Output

\`\`\`text
Route: <Short Path | Regular Path | Auto | Ralph | Shared skill>
Reason: <one sentence>
Source priority: <winning sources in order>
Blocked: <yes | no>
Next artifact: <artifact or none>
Next command: <command or none>
\`\`\`

## Safety

\`/ecc-help\` is advisory by default. It must not create artifacts, run implementation, or invoke Ralph unless the user explicitly asks to proceed.
`;
  }

  return `# ${command}

Category: ${category}
Related skill: ${relatedSkill}
State required: ${stateRequired ? "yes" : "no"}
Source inspiration: ${sourceInspiration.join(", ")}

## Purpose

Route ${command} through the ECC-Fusion control plane while preserving ECC compatibility.

## Behavior

1. Read the current user request.
2. Apply source-of-truth precedence.
3. Check required state and prerequisites.
4. Invoke or recommend \`${relatedSkill}\`.
5. Emit a Transition Notice if required artifacts are missing.

## Output

Return the route note, artifacts inspected, next command, and blockers.
`;
}

function skillBody([id, name, category, pathAvailability, sourceInspiration]) {
  if (id === "ecc-help") {
    return `---
id: ecc-help
name: ECC Help
category: Discovery & Help
pathAvailability:
  - Short Path
  - Regular Path
  - Auto
sharedSkill: true
sourceInspiration:
  - BMAD-METHOD
  - ECC
  - Agent OS
---

# ECC Help

## Purpose

Recommend the next safe ECC-Fusion route when the user is unsure, when path choice is ambiguous, or when a requested skill may be blocked by missing prerequisites.

## Trigger

Use when the user says "I do not know what to do next", asks which path to choose, asks for \`/ecc-help\`, asks whether a shared skill can run, or appears blocked by missing artifacts.

## When To Use

- Choosing Short Path, Regular Path, Auto, Ralph, or a shared skill.
- Explaining why a path is selected.
- Detecting missing prerequisites before execution.
- Recovering from partial state or unclear artifacts.

## When Not To Use

- The user already gave a clear implementation command with valid prerequisites.
- A stateful \`/ecc-next\` decision is required inside an active path.
- The task is Ralph execution rather than Ralph eligibility advice.

## Inputs

- Current user request.
- \`AGENTS.md\` and project agent docs.
- \`.planning/state.yaml\` or \`.planning/STATE.md\` when present.
- Relevant specs, plans, work packets, reviews, QA notes, and manifests.

## Outputs

Return a compact route note:

\`\`\`text
Route: <Short Path | Regular Path | Auto | Ralph | Shared skill>
Reason: <one sentence>
Source priority: <winning sources in order>
Blocked: <yes | no>
Next artifact: <artifact or none>
Next command: <command or none>
\`\`\`

If blocked, emit the standard Transition Notice.

## Workflow Steps

1. Classify user intent.
2. Inspect repo state and artifact completeness.
3. Classify risk and ambiguity.
4. Check requested skill prerequisites.
5. Apply source-of-truth precedence.
6. Recommend the safest valid route.
7. List next command and artifact.
8. Stop before execution unless the user explicitly approves.

## Verification Requirements

- Route decision names a path or skill.
- Reason cites risk, ambiguity, artifacts, or explicit user intent.
- Missing prerequisites produce a Transition Notice.
- Ralph is recommended only for bounded low-risk packets with feedback loops.

## Escalation Rules

Escalate to Regular Path when the request is ambiguous, high-risk, multi-phase, production-sensitive, security-sensitive, or missing required artifacts.

## Examples

\`\`\`text
Route: Short Path
Reason: bounded low-risk UI copy change
Source priority: user request > ECC-Fusion routing rules
Blocked: no
Next artifact: work packet
Next command: /ecc-path-short
\`\`\`

## Maintenance Note

Keep this skill advisory, compact, and synchronized with \`commands/ecc-help.md\`, \`docs/ecc-help.md\`, and \`manifests/skills.json\`.
`;
  }

  return `---
id: ${id}
name: ${name}
category: ${category}
pathAvailability:
${pathAvailability.map((item) => `  - ${item}`).join("\n")}
sharedSkill: ${pathAvailability.length > 1}
sourceInspiration:
${sourceInspiration.map((item) => `  - ${item}`).join("\n")}
---

# ${name}

## Purpose

Provide the ${name} workflow in the ECC-Fusion routed system.

## Trigger

Use when the active command or route calls for \`${id}\`.

## When To Use

- The route prerequisites are present.
- The task matches the declared category.
- The requested path is one of: ${pathAvailability.join(", ")}.

## When Not To Use

- Required artifacts are missing.
- The request exceeds the allowed risk for this path.
- Another skill has a more specific trigger.

## Inputs

- Current user request.
- Relevant state, manifests, docs, and planning artifacts.

## Outputs

- Route-specific result.
- Files inspected or updated.
- Verification notes.
- Remaining blockers.

## Workflow Steps

1. Inspect prerequisites.
2. Apply source-of-truth precedence.
3. Execute only the bounded workflow.
4. Verify or identify the verification command.
5. Update handoff or state notes when applicable.

## Verification Requirements

Do not claim success without evidence. If verification cannot run, record the reason.

## Escalation Rules

Escalate to Regular Path or human review when risk, ambiguity, security impact, dependency changes, or file boundaries exceed this skill.

## Examples

\`${id}\` should produce a compact result with route, rationale, blockers, and next command.

## Maintenance Note

Keep this skill concise and synchronized with manifests and docs.
`;
}

async function write(relativePath, text) {
  const absolutePath = path.join(root, relativePath);
  await mkdir(path.dirname(absolutePath), { recursive: true });
  await writeFile(absolutePath, text, "utf8");
}

export async function scaffold() {
  for (const command of requiredCommands) {
    await write(`commands/${command[0]}.md`, commandBody(command));
  }

  for (const skill of requiredSkills) {
    await write(`skills/${skill[0]}/SKILL.md`, skillBody(skill));
  }

  await write(
    "manifests/commands.json",
    `${JSON.stringify(
      requiredCommands.map(([id, command, category, relatedSkill, stateRequired, sourceInspiration]) => ({
        id,
        command,
        file: `commands/${id}.md`,
        category,
        pathAvailability: category === "Automation Accelerators" ? ["Ralph"] : ["Short Path", "Regular Path", "Auto"],
        stateRequired,
        transitionNoticeBehavior: "emit when requested route is blocked by missing prerequisites",
        sourceInspiration,
        relatedSkill
      })),
      null,
      2
    )}\n`
  );

  await write(
    "manifests/skills.json",
    `${JSON.stringify(
      requiredSkills.map(([id, name, category, pathAvailability, sourceInspiration]) => ({
        id,
        name,
        file: `skills/${id}/SKILL.md`,
        category,
        pathAvailability,
        prerequisites: ["repository context readable", "route prerequisites satisfied"],
        sourceInspiration,
        sharedSkill: pathAvailability.length > 1,
        conflictsWith: [],
        owner: "ECC-Fusion maintainers",
        deprecated: false
      })),
      null,
      2
    )}\n`
  );
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  await scaffold();
}
