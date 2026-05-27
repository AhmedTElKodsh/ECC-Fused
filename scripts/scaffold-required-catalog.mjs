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

const commandGuidance = {
  "ecc-start": ["Detect whether the repo is new, partially initialized, or already inside an ECC-Fusion path.", "Recommend `/ecc-help` for route discovery unless the user explicitly requested a feature start.", "Do not create planning artifacts until the chosen path is explicit."],
  "ecc-start-feature": ["Capture the feature request in one sentence.", "Use `/ecc-help` to choose Short Path, Regular Path, Auto, or Ralph eligibility.", "Name the first artifact to create after the route is selected."],
  "ecc-path-short": ["Require a bounded low-risk objective and known file boundaries.", "Create or update a work packet before implementation.", "Block when ambiguity, security risk, dependency changes, or release impact require Regular Path."],
  "ecc-path-regular": ["Require or create specification and architecture artifacts before work packets.", "Sequence spec, architecture, plan, packetize, implement, verify, review, and ship.", "Block direct implementation when product or architecture intent is unresolved."],
  "ecc-switch-path": ["Read current path state and the requested destination path.", "Emit a Transition Notice that lists missing destination prerequisites.", "Only update state after the user explicitly proceeds."],
  "ecc-next": ["Read active state before recommending action.", "Prefer the next legal command in the current path over broad advice.", "Fall back to `/ecc-help` only when state is absent or invalid."],
  "ecc-status": ["Summarize current path, active artifact, blockers, and last verification evidence.", "Do not mutate artifacts.", "Report missing or unreadable state as a blocker with `/ecc-help` as the next command."],
  "ecc-grill": ["Interrogate assumptions, users, constraints, risks, and success criteria.", "Stop after producing clarified decisions and open questions.", "Do not create implementation artifacts unless the user proceeds."],
  "ecc-spec": ["Turn the selected intent into a product/spec artifact.", "Include acceptance criteria, non-goals, risks, and verification expectations.", "Block if stakeholder, scope, or success criteria are too ambiguous."],
  "ecc-prototype": ["Build only prototype-grade artifacts behind explicit scope boundaries.", "Capture what the prototype proves or disproves.", "Escalate to Regular Path before productionizing."],
  "ecc-architecture": ["Translate the spec into architecture decisions, boundaries, interfaces, and tradeoffs.", "Record source precedence and unresolved risks.", "Block if the spec is missing or contradictory."],
  "ecc-plan": ["Convert approved spec and architecture into implementation sequencing.", "Name files, tests, acceptance criteria, and verification gates.", "Keep plan slices independently reviewable."],
  "ecc-packetize": ["Create bounded work packets from the approved plan.", "Define allowed files, forbidden files, tests, AC IDs, and escalation triggers.", "Reject packets that mix planning, implementation, and release work."],
  "ecc-route": ["Classify intent, path, risk, and prerequisites.", "Explain the winning source of truth.", "Return the target command without executing it unless explicitly requested."],
  "ecc-execute-packet": ["Load the selected work packet completely.", "Use test-first implementation where applicable.", "Stop on packet boundary breach, repeated failure, or missing verification."],
  "ecc-verify": ["Run or identify the packet's verification commands.", "Separate executed evidence from recommended checks.", "Block completion claims without passing evidence or an explicit reason."],
  "ecc-review": ["Review changed files and relevant artifacts for correctness, maintainability, and regression risk.", "Lead with findings and file references.", "Require follow-up tasks for blocking findings."],
  "ecc-security-review": ["Threat-model the touched surface and data flows.", "Check secrets, auth, authorization, input handling, and dependency risk.", "Escalate high-risk findings before implementation continues."],
  "ecc-qa": ["Run browser or end-to-end checks only after implementation verification is green.", "Record scenario, environment, result, and evidence.", "Block release when user-path proof is missing."],
  "ecc-ship": ["Check verification, review, QA, docs, and rollback readiness.", "Produce a release note or ship decision.", "Do not ship with unresolved blockers."],
  "ecc-retro": ["Summarize completed scope, evidence, misses, and lessons.", "Capture follow-up work as explicit items.", "Do not reopen implementation unless a blocker is found."],
  "ecc-package-check": ["Validate installable package surfaces, manifests, schemas, commands, skills, docs, and rules.", "Report managed versus user-owned files clearly.", "Do not repair unless asked."],
  "ecc-skill-lint": ["Check skill metadata, trigger clarity, prerequisites, escalation, and verification sections.", "Compare skills with manifests and command references.", "Report drift as actionable file-specific findings."],
  "ecc-ralph-prepare": ["Verify a bounded low-risk work packet exists.", "Set Ralph limits for files, iterations, commands, and stop conditions.", "Block when Ralph would need to plan or expand scope."],
  "ecc-ralph-run": ["Run only the prepared bounded loop.", "Check feedback after every iteration.", "Stop on freeze, overload, repeated failure, no progress, or boundary breach."],
  "ecc-ralph-status": ["Report current Ralph packet, iteration, last command, last evidence, and stop condition.", "Do not continue execution from status.", "Recommend `/ecc-ralph-run` or `/ecc-ralph-stop` based on state."],
  "ecc-ralph-stop": ["Stop the active Ralph loop cleanly.", "Record last known evidence and remaining work.", "Preserve user changes and do not roll back without explicit instruction."]
};

const skillGuidance = {
  "ask-interview": ["Ask only the minimum questions needed to unblock routing or artifact creation.", "Prefer assumptions for low-risk reversible details.", "End with decisions, open questions, and next command."],
  "grill-with-context": ["Challenge the plan against users, constraints, edge cases, and failure modes.", "Use existing repo context before asking broad questions.", "Output tightened requirements and remaining risks."],
  "write-spec": ["Produce a spec with goals, non-goals, users, scope, AC IDs, risks, and verification expectations.", "Keep implementation details out unless they constrain acceptance.", "Block when product intent is still contradictory."],
  "prototype-ui": ["Create a disposable prototype for learning, not production code.", "State what question the prototype answers.", "Capture follow-up decisions before handoff."],
  "architecture-plan": ["Define boundaries, data flow, interfaces, source precedence, and tradeoffs.", "Tie decisions to spec AC IDs.", "Flag unresolved architecture risks before packetizing."],
  "create-work-packets": ["Split approved plans into bounded packets.", "Each packet must name objective, allowed files, forbidden files, tests, AC IDs, and escalation triggers.", "Keep packets small enough for independent review."],
  "implement-work-packet": ["Read the packet completely before editing.", "Use red-green-refactor where testable.", "Do not cross allowed file boundaries without stopping."],
  "tdd": ["Write or identify a failing test first.", "Make the smallest change to pass.", "Refactor only after green verification."],
  "diagnose": ["Reproduce or precisely describe the failure surface.", "Form hypotheses and test them one at a time.", "Keep evidence separate from guesses."],
  "write-tests": ["Map tests to AC IDs or observed regressions.", "Prefer focused tests near the changed behavior.", "Record gaps that cannot be automated now."],
  "verify-work": ["Run declared verification commands.", "Capture command, environment, and result.", "Refuse completion claims without evidence."],
  "review-oss-output": ["Inspect generated or delegated output against packet boundaries.", "Lead with bugs and risks.", "Require fixes for blocking findings before acceptance."],
  "security-review": ["Threat-model changed surfaces.", "Check secrets, auth, input, persistence, dependency, and deployment risks.", "Escalate critical or high findings immediately."],
  "qa-browser": ["Exercise real user paths in a browser or equivalent harness.", "Capture scenario and evidence.", "Separate smoke checks from release proof."],
  "ship-release": ["Confirm verification, review, QA, docs, and rollback posture.", "Produce a ship/no-ship decision.", "List residual risk plainly."],
  "retro-learn": ["Summarize outcome, evidence, surprises, and process improvements.", "Create follow-up items for unfinished work.", "Keep blame out of the record."],
  "write-a-skill": ["Create skills only for repeatable workflows or failure modes.", "Define trigger, inputs, outputs, workflow, verification, and escalation.", "Synchronize manifests and docs."],
  "skill-lint": ["Validate frontmatter, trigger specificity, path availability, and governance sections.", "Check manifest references and command links.", "Report drift with file paths."],
  "package-check": ["Validate package completeness and install safety.", "Check commands, skills, manifests, schemas, rules, templates, docs, and README.", "Report managed-file boundaries."],
  "handoff": ["Compress current state into durable context.", "Include decisions, changed files, verification, blockers, and next commands.", "Do not invent future completion."],
  "path-switch": ["Read current path and requested destination.", "Check prerequisites before changing state.", "Emit a Transition Notice for blocked switches."],
  "transition-guard": ["Detect missing prerequisites before artifact creation or execution.", "Name files that would change and the proceed instruction.", "Stop until the user explicitly proceeds."],
  "ralph-loop": ["Operate only on prepared bounded packets.", "Respect iteration, command, file, and stop-condition limits.", "Return status and evidence after every loop."]
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

## Workflow

1. Classify the user's intent and requested skill or path.
2. Inspect active state, route prerequisites, and artifact completeness.
3. Recommend the safest valid route and stop before execution unless the user explicitly proceeds.

## Guardrails

- Preserve advisory behavior by default.
- Do not create artifacts or invoke Ralph from help alone.
- Emit a Transition Notice when prerequisites are missing.

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

  const guidance = commandGuidance[id] ?? ["Read the current user request.", "Apply source-of-truth precedence.", `Invoke or recommend \`${relatedSkill}\`.`];

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

## Workflow

${guidance.map((item, index) => `${index + 1}. ${item}`).join("\n")}

## Guardrails

- Preserve ECC compatibility and existing user-owned files.
- Keep source attribution visible when adapting external framework concepts.
- Stop at a Transition Notice when prerequisites are missing or risk exceeds the current path.

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

## Detailed Workflow

1. Detect whether the user needs route advice, prerequisite recovery, or shared-skill eligibility.
2. Read repository instructions, planning state, and relevant manifests before recommending a path.
3. Return route, reason, source priority, blocker status, next artifact, and next command.

## Required Evidence

- User intent classification.
- State or artifact files inspected.
- Winning source-priority chain.
- Missing prerequisites and next command when blocked.

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

  const guidance = skillGuidance[id] ?? ["Inspect prerequisites.", "Apply source-of-truth precedence.", "Execute the bounded workflow.", "Verify or record blockers."];

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

## Detailed Workflow

${guidance.map((item, index) => `${index + 1}. ${item}`).join("\n")}

## Required Evidence

- Files or artifacts inspected.
- Files changed, when the skill is allowed to edit.
- Verification commands run, or a clear reason verification could not run.
- Remaining blockers and the safest next command.

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
