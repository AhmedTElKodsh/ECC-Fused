import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();

export const requiredDocs = [
  "architecture.md",
  "ecc-help.md",
  "harness-ecosystem.md",
  "kiro-planning-artifacts.md",
  "path-phase-map.md",
  "quickstart.md",
  "paths.md",
  "short-path.md",
  "regular-path.md",
  "path-switching.md",
  "skill-categories.md",
  "skill-extension-guide.md",
  "source-library-map.md",
  "work-packets.md",
  "model-routing.md",
  "ralph-mode.md",
  "security.md",
  "qa-and-release.md",
  "install-and-compatibility.md",
  "skill-governance.md",
  "package-check.md",
  "implementation-log.md"
];

export const readmeTopics = [
  "Harness ecosystem",
  "Which path should I choose?",
  "ECC remains the base",
  "two main paths",
  "Short Path",
  "Regular Path",
  "Auto mode",
  "path selection",
  "path switching",
  "Transition Notice",
  "shared across both paths",
  "Kiro planning artifacts",
  "work packets",
  "model routing",
  "Ralph mode",
  "Ralph is gated",
  "ECC compatibility",
  "install",
  "repair",
  "upgrade",
  "uninstall",
  "roll back",
  "source-library credits",
  "switching paths",
  "phase map",
  "skill bloat",
  "future modifications",
  "run tests",
  "validate installation"
];

function titleFromDoc(name) {
  return name
    .replace(".md", "")
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function docBody(name) {
  if (name === "implementation-log.md") {
    return null;
  }

  if (name === "install-and-compatibility.md") {
    return `# Install And Compatibility

## Purpose

Define the ECC-Fusion install, repair, doctor, status, uninstall, rollback, lifecycle, selective install, hook runtime, and cross-harness compatibility surface.

## Compatibility Contract

- Preserve ECC as the base platform for commands, skills, manifests, hooks, agent instructions, MCP configuration, and cross-harness layout.
- Treat \`AGENTS.md\`, user-authored commands, user-authored skills, hooks, manifests, and MCP configuration as user-owned unless they are explicitly marked as ECC-Fusion managed.
- Support Windows PowerShell paths with spaces for every install, repair, doctor, status, uninstall, and rollback smoke path.
- Keep managed-file boundaries visible in package checks and lifecycle reports.

## Install

- Support dry run before writing files.
- Detect conflicts before overwrite.
- Create backups before replacing managed files.
- Preserve user-owned files unless the user explicitly approves a managed replacement.
- Support selective install of commands, skills, manifests, docs, schemas, rules, and planning templates.

## Repair

- Repair must be idempotent.
- Repair may restore missing managed files.
- Repair must not silently rewrite \`AGENTS.md\`, manifests, commands, skills, hooks, or MCP configs.
- Repair must report conflicts and skipped user-owned files.

## Doctor

- Doctor must inspect required commands, skills, manifests, schemas, rules, planning templates, docs, README, and source attribution.
- Doctor must distinguish missing files, invalid files, stale manifest entries, duplicate command aliases, duplicate skill ids, and unsafe overwrite risk.
- Doctor must report verification commands and whether they were executed.

## Status

- Status must report installed version, active path state when present, managed files, pending conflicts, last validation result, and rollback availability.
- Status must not mutate files.

## Uninstall

- Uninstall must remove only managed ECC-Fusion surfaces.
- Uninstall must preserve user-owned project files, \`AGENTS.md\`, non-managed hooks, and non-managed MCP configuration.
- Uninstall must support dry run and conflict reporting.

## Rollback

- Rollback must use recorded backups and implementation logs to restore the previous known-good managed state.
- Rollback must report files restored, files skipped, conflicts, and verification commands.
- Rollback must stop when backup metadata is missing or ambiguous.

## Smoke Matrix

| Operation | Required smoke coverage | Safety gate |
| --- | --- | --- |
| install | dry run, conflict detection, backup before overwrite, Windows path with spaces | no silent overwrite |
| repair | idempotency, missing managed file restore, user-owned file preservation | no silent rewrite |
| doctor | required surface scan, stale manifest detection, duplicate detection | report only |
| status | installed state, validation result, rollback availability | report only |
| uninstall | dry run, managed-only removal, user file preservation | no user-owned removal |
| rollback | backup restore, ambiguous backup halt, verification note | previous known-good only |

## Validation

Run:

\`\`\`powershell
npm.cmd test
npm.cmd run validate
\`\`\`
`;
  }

  if (name === "architecture.md") {
    return `# Architecture

ECC-Fusion architecture is a routed lifecycle, not a bundle of independent methodologies. ECC remains the base platform and every borrowed source-library practice must map into the same path, phase, artifact, and validation contracts.

## Core Contracts

| Contract | Purpose |
| --- | --- |
| Path contract | Defines Short Path, Regular Path, Auto mode, and Ralph eligibility |
| Phase contract | Defines the canonical lifecycle and phase ownership |
| Artifact contract | Defines durable outputs and required fields |
| Escalation contract | Defines when Short Path must promote to Regular Path |
| Skill invocation contract | Prevents duplicate or conflicting skills |
| Model routing contract | Bounds model capability variance |
| Documentation contract | Treats docs as the user interface |

## System Shape

\`\`\`mermaid
flowchart TD
  U["User instruction"] --> R["/ecc-help router"]
  AG["AGENTS.md and project docs"] --> R
  ST["ECC-Fusion state, manifests, schemas"] --> R
  R --> P{"Path"}
  P -->|Short Path| S["Bounded work packet"]
  P -->|Regular Path| G["Spec-driven governance"]
  P -->|Ralph| A["Bounded automation loop"]
  S --> L["Canonical lifecycle phases"]
  G --> L
  A --> L
  L --> E["Verification evidence"]
\`\`\`

## Critical Design Decision

ECC-Fusion should fuse by normalization, not accumulation: normalize source-library ideas into phases, execution into work packets, safety movement into Transition Notices, and skill placement into stable categories.

## Validation

Run:

\`\`\`powershell
npm.cmd test
npm.cmd run validate
\`\`\`
`;
  }

  if (name === "path-phase-map.md") {
    return `# Path Phase Map

ECC-Fusion uses one lifecycle across Short Path, Regular Path, Auto mode, and Ralph eligibility. The paths change artifact depth and evidence requirements; they do not create separate methodology stacks.

## Canonical Lifecycle

\`\`\`mermaid
flowchart LR
  O["0 Orient"] --> SC["1 Scope"]
  SC --> SP["2 Specify"]
  SP --> DE["3 Design"]
  DE --> PL["4 Plan"]
  PL --> BU["5 Build"]
  BU --> VE["6 Verify"]
  VE --> RE["7 Release"]
  RE --> LE["8 Learn"]
\`\`\`

## Phase And Subphase Matrix

| Phase | Subphase | Short Path | Regular Path | Skills and commands |
| --- | --- | --- | --- | --- |
| Orient | Help and route | required route/risk check | required route/risk check | \`/ecc-help\`, \`ecc-help\` |
| Scope | Intent and boundaries | objective, allowed files | constraints, non-goals, stakeholders | \`ask-interview\`, \`grill-with-context\` |
| Specify | Requirements | lightweight acceptance criteria | spec/PRD and examples | \`write-spec\`, \`prototype-ui\` |
| Design | Architecture | only when risk requires it | architecture, ADRs, interfaces | \`architecture-plan\` |
| Plan | Work breakdown | one bounded packet | plan plus packet set | \`create-work-packets\`, \`path-switch\` |
| Build | Implementation | focused packet execution | plan-driven packet execution | \`implement-work-packet\`, \`tdd\` |
| Verify | Tests and review | focused verification | review, security, QA evidence | \`verify-work\`, \`security-review\` |
| Release | Ship and handoff | summary or handoff | release note and deployment evidence | \`ship-release\`, \`handoff\` |
| Learn | Retro and governance | optional lesson capture | reusable improvements | \`retro-learn\`, \`skill-lint\` |

## Promotion Checklist

\`\`\`mermaid
flowchart TD
  A["Short Path work"] --> B{"Still bounded and low risk?"}
  B -->|Yes| C["Finish with verification summary"]
  B -->|No| D["Transition Notice"]
  D --> E["List missing spec/design/plan/QA/release artifacts"]
  E --> F["Recommend next Regular Path command"]
\`\`\`

## Validation

Run:

\`\`\`powershell
npm.cmd test
npm.cmd run validate
\`\`\`
`;
  }

  if (name === "harness-ecosystem.md") {
    return `# Harness Ecosystem

The Harness Ecosystem is the ECC-Fusion backbone that powers, controls, and regulates paths, phases, skill relations, commands, rules, planning artifacts, model routing, and validation.

## Backbone

\`\`\`mermaid
flowchart TD
  H["manifests/harness.json"] --> R["/ecc-help"]
  S["manifests/skills.json"] --> R
  C["manifests/commands.json"] --> R
  R --> P{"Path"}
  P --> SP["Short Path"]
  P --> RP["Regular Path"]
  P --> RA["Ralph"]
  SP --> E["Work packet and verification"]
  RP --> K["requirements/design/tasks/qa-tasks"]
  RA --> G["preflight and stop rules"]
\`\`\`

## Integrity Rules

- Keep executable skills in \`skills/\` and executable commands in \`commands/\`.
- Keep generated human catalogs in \`ecosystem/\`.
- Keep path, phase, orchestration, and Kiro artifact relations in \`manifests/harness.json\`.
- Validate all new skills against category, source, prerequisite, conflict, and path availability rules.
- Do not add source-library skills only because they are famous; add them only when they fill a phase gap.

## Validation

Run:

\`\`\`powershell
node scripts/generate-ecosystem-catalog.mjs
npm.cmd test
npm.cmd run validate
\`\`\`
`;
  }

  if (name === "kiro-planning-artifacts.md") {
    return `# Kiro Planning Artifacts

ECC-Fusion uses Kiro-style visible planning artifacts so developers can see how the agent understood requirements, how it designed the solution, what tasks it will execute, and where testing/QA work stands.

## Artifact Flow

\`\`\`mermaid
flowchart LR
  A["Discovery & Help"] --> B["requirements.md"]
  B --> C["design/"]
  C --> D["tasks.md"]
  D --> E["qa-tasks.md"]
  E --> F["release or handoff"]
\`\`\`

## Files

| File | Created from | Purpose |
| --- | --- | --- |
| \`requirements.md\` | Discovery, clarification, specification skills | user stories, requirements, acceptance criteria, optional developer decisions |
| \`design/\` | Architecture, planning, work-packet skills | architecture decisions, implementation direction, work packet strategy |
| \`tasks.md\` | planning and work-packet skills | one-by-one implementation checklist with status markers |
| \`qa-tasks.md\` | testing, debugging, review, security, QA skills | rigorous testing and QA checklist with evidence |

## Status Markers

- \`[ ]\` not started
- \`[x]\` complete and verified
- \`[?]\` optional or developer decision needed
- \`[!]\` blocked

## Validation

Run:

\`\`\`powershell
npm.cmd test
npm.cmd run validate
\`\`\`
`;
  }

  if (name === "skill-extension-guide.md") {
    return `# Skill Extension Guide

Use this guide before modifying an existing ECC-Fusion skill or inserting a new skill into the Harness Ecosystem.

## Modification Rules

1. Identify the lifecycle phase and primary category first.
2. Search existing skills for overlapping purpose, trigger, inputs, outputs, and source inspiration.
3. Prefer modifying an existing skill over adding a near-duplicate.
4. Define path availability, prerequisites, conflicts, required evidence, and escalation rules.
5. Update \`manifests/skills.json\`, source attribution, and generated ecosystem maps.
6. Add or update tests before claiming the harness is intact.

## New Skill Checklist

- [ ] The skill fills a real phase/category gap.
- [ ] The skill has a repeatable workflow, not a one-off prompt.
- [ ] The skill will reduce confusion or repeated failure.
- [ ] The skill does not bloat context by loading irrelevant docs.
- [ ] The skill has clear inputs, outputs, evidence, and escalation rules.
- [ ] The source or GitHub library inspiration is listed.
- [ ] The ecosystem catalog was regenerated.

## Guardrails

\`\`\`mermaid
flowchart TD
  A["Proposed skill change"] --> B{"Duplicate existing skill?"}
  B -->|Yes| C["Modify existing skill or document non-overlap"]
  B -->|No| D{"Fits one phase and category?"}
  D -->|No| E["Split or reject"]
  D -->|Yes| F{"Has evidence and escalation rules?"}
  F -->|No| E
  F -->|Yes| G["Update manifest, docs, tests, ecosystem catalog"]
\`\`\`

## Validation

Run:

\`\`\`powershell
node scripts/generate-ecosystem-catalog.mjs
npm.cmd test
npm.cmd run validate
\`\`\`
`;
  }

  if (name === "short-path.md") {
    return `# Short Path

Short Path is ECC-Fusion's fast verified track for bounded, low-risk, low-ambiguity work. It is not YOLO mode and it is not a smaller copy of Regular Path.

## Minimum Flow

\`\`\`mermaid
flowchart LR
  A["Route/risk check"] --> B["Work packet"]
  B --> C["Implement"]
  C --> D["Verify"]
  D --> E{"Escalate?"}
  E -->|No| F["Summary or handoff"]
  E -->|Yes| G["Transition Notice to Regular Path"]
\`\`\`

## Required Behavior

- Preserve ECC compatibility.
- Apply source-of-truth precedence.
- Create or identify a work packet before implementation.
- Verify claims with tests, checks, or documented evidence.
- Emit a Transition Notice when prerequisites are missing or risk grows.

## Escalation Triggers

Promote to Regular Path for unclear requirements, cross-module work, architecture, public API, data, security, dependency, release impact, missing verification, repeated failure, source-library conflict, or user confusion.

## Validation

Run:

\`\`\`powershell
npm.cmd test
npm.cmd run validate
\`\`\`
`;
  }

  if (name === "regular-path.md") {
    return `# Regular Path

Regular Path is ECC-Fusion's governed spec-driven track for ambiguous, larger, higher-risk, multi-phase, production-sensitive, architecture-sensitive, security-sensitive, dependency-sensitive, or release-sensitive work.

## Full Flow

\`\`\`mermaid
flowchart LR
  A["Orient"] --> B["Scope"]
  B --> C["Specify"]
  C --> D["Design"]
  D --> E["Plan"]
  E --> F["Work packets"]
  F --> G["Build"]
  G --> H["Verify"]
  H --> I["Release"]
  I --> J["Learn"]
\`\`\`

## Required Behavior

- Preserve ECC compatibility.
- Apply source-of-truth precedence.
- Produce enough artifacts to make implementation auditable.
- Keep each implementation step bound by work packets.
- Verify claims with tests, checks, review evidence, QA evidence, or documented limitations.
- Emit a Transition Notice when a requested action skips required prerequisites.

## Validation

Run:

\`\`\`powershell
npm.cmd test
npm.cmd run validate
\`\`\`
`;
  }

  if (name === "path-switching.md") {
    return `# Path Switching

Path switching lets ECC-Fusion start fast and still become fully governed when the work demands it.

## Promotion Flow

\`\`\`mermaid
flowchart TD
  A["Short Path route"] --> B["Work packet"]
  B --> C["Implementation or verification"]
  C --> D{"Escalation trigger?"}
  D -->|No| E["Finish Short Path"]
  D -->|Yes| F["Transition Notice"]
  F --> G["Missing artifacts checklist"]
  G --> H["Recommended Regular Path command"]
\`\`\`

## Required Behavior

- Preserve useful evidence when promoting from Short Path to Regular Path.
- Do not create missing Regular Path prerequisites silently unless the user asked for artifact generation.
- Apply ECC-Fusion contracts over conflicting source-library guidance unless the user explicitly overrides them.

## Validation

Run:

\`\`\`powershell
npm.cmd test
npm.cmd run validate
\`\`\`
`;
  }

  if (name === "model-routing.md") {
    return `# Model Routing

Model routing assigns work to high-end, OSS/local, or human review tiers based on risk, ambiguity, context size, and evidence requirements.

## Honest Claim

The ECC Harness can reduce model-to-model variance by standardizing prompt frame, source precedence, context loading, artifact schemas, work packet boundaries, verification gates, escalation behavior, and handoff format. It cannot make a small model reason like a premium model on ambiguous architecture, product judgment, security, or release-critical work.

## Output Contract

\`\`\`text
Model tier: <OSS/local | default | premium | human review>
Reason: <one sentence>
Allowed work: <bounded scope>
Required evidence: <tests/checks/review>
Escalation trigger: <condition>
\`\`\`

## Validation

Run:

\`\`\`powershell
npm.cmd test
npm.cmd run validate
\`\`\`
`;
  }

  if (name === "ecc-help.md" || name === "paths.md" || name === "skill-categories.md" || name === "source-library-map.md") {
    return null;
  }

  const title = titleFromDoc(name);
  return `# ${title}

## Purpose

Define the ECC-Fusion ${title} surface and keep it aligned with commands, skills, manifests, schemas, and planning artifacts.

## Required Behavior

- Preserve ECC compatibility.
- Apply source-of-truth precedence.
- Use Short Path only for bounded low-risk work.
- Use Regular Path for ambiguous, high-risk, multi-phase, or production-sensitive work.
- Emit a Transition Notice when prerequisites are missing.
- Verify claims with tests, checks, or documented evidence.

## Related Surfaces

- \`commands/\`
- \`skills/\`
- \`schemas/\`
- \`planning-templates/\`
- \`rules/\`

## Validation

Run:

\`\`\`powershell
npm.cmd test
npm.cmd run validate
\`\`\`
`;
}

function readmeBody() {
  return `# ECC-Fusion

## What ECC-Fusion Is

ECC-Fusion is an ECC-based agentic development library for spec-driven AI coding. It keeps ECC as the install/runtime/control base, then maps useful ideas from BMAD-METHOD, Superpowers, Matt Pocock skills, GitHub Spec Kit, OpenSpec, GSD Redux, Agent OS, gstack, and Ralph into one routed lifecycle.

## Harness Ecosystem

The Harness Ecosystem is the backbone that powers and regulates paths, phases, skill relations, orchestration commands, workflow rules, planning artifacts, and validation. Its machine-readable control file is \`manifests/harness.json\`; its human-readable generated catalog is \`ecosystem/\`.

Do not move canonical executable skills out of \`skills/\` or executable commands out of \`commands/\`. Category folders under \`ecosystem/skills/\` are generated mirrors for traceability, not the runtime source of truth.

## I Do Not Know What I Need

Use \`/ecc-help\` when the next step is unclear. It recommends a route, phase, next artifact, and next command, then stops with a Transition Notice when blocked.

## First-Run Decision Diagram

\`\`\`mermaid
flowchart TD
  A["User describes task"] --> B["/ecc-help or direct path choice"]
  B --> C{"Risk, scope, ambiguity, artifacts"}
  C -->|Bounded, reversible, low risk| S["Short Path"]
  C -->|Unclear, risky, architectural, release-sensitive| R["Regular Path"]
  C -->|Eligible bounded automation| P["Ralph mode"]
  S --> W["Work packet"]
  W --> I["Implement"]
  I --> V["Verify"]
  V --> T{"Need more rigor?"}
  T -->|Yes| N["Transition Notice"]
  N --> R
\`\`\`

## Which Path Should I Choose?

- Use Short Path for bounded, low-risk, low-ambiguity work.
- Use Regular Path for ambiguous, high-risk, multi-phase, production-sensitive, security-sensitive, or release-sensitive work.
- Use Auto mode when ECC-Fusion should inspect path selection criteria.

## Why ECC Remains The Base

ECC remains the base platform for agents, skills, commands, manifests, hooks, install behavior, repair behavior, and cross-harness compatibility.

## Two Main Paths

The two main paths are Short Path and Regular Path. Auto mode selects between them by inspecting risk, ambiguity, state, and artifact completeness.

## Phase Map

Both paths use one lifecycle: Orient, Scope, Specify, Design, Plan, Build, Verify, Release, and Learn. See \`docs/path-phase-map.md\` for the phase/subphase table and skill matrix.

## Path Selection

Path selection uses user intent, repository instructions, planning artifacts, ECC-Fusion state, explicit skills, global skills, and general model knowledge in that source-precedence order.

## Path Switching

Path switching must be explicit. Missing prerequisites produce a Transition Notice before any artifacts are created.

## Transition Notice

A Transition Notice explains the requested action, why it is blocked, missing prerequisites, recommended commands, files that will change, and the proceed instruction.

## Shared Across Both Paths

Shared skills can run from both paths only when prerequisites exist. Examples include verification, review, security review, package check, handoff, and \`/ecc-help\`.

## Kiro Planning Artifacts

Regular Path uses Kiro-style visible planning artifacts to keep the developer in sync with agent work: \`requirements.md\`, \`design/\`, \`tasks.md\`, and \`qa-tasks.md\`. Templates live in \`planning-templates/kiro-spec/\`.

## Work Packets

Work packets define objective, scope, allowed files, forbidden files, acceptance criteria, tests, verification commands, and escalation rules.

## Model Routing

Model routing assigns high-end, OSS/local, or human tiers based on risk. The ECC Harness standardizes prompts, artifacts, memory shape, verification gates, and fallback behavior; it does not make small models equal to premium models on high-ambiguity work.

## Ralph Mode

Ralph mode is a bounded execution accelerator for low-risk work with strong feedback loops.

## Why Ralph Is Gated

Ralph is gated because it is not a planner and must stop on freeze, overload, repeated failure, or no-progress patterns.

## ECC Compatibility

ECC-Fusion must preserve ECC-compatible install, repair, doctor, status, uninstall, lifecycle, selective install, hook runtime, and cross-harness behavior.

## Install

Install behavior must support dry run, conflict detection, backups before overwrite, and Windows paths with spaces.

## Repair

Repair must be idempotent and must not silently rewrite agent instructions, manifests, hooks, commands, or skills.

## Upgrade

Upgrade must detect conflicts, preserve user changes, and provide rollback.

## Uninstall

Uninstall must remove only managed ECC-Fusion surfaces and preserve user-owned project files.

## Roll Back

Roll back uses backups and implementation logs to restore the previous known-good state.

## Source-Library Credits

Source-library credits are documented in \`docs/source-library-map.md\`. Attribution means inspired by unless copied code and license compatibility are explicitly stated.

## Examples For Switching Paths

Short Path can promote to Regular Path when scope or risk grows. Regular Path can delegate bounded work packets to Short Path-style execution.

## Avoid Skill Bloat

Add a skill only for repeatable workflows, repeatable failure modes, project-specific processes, or reusable domain knowledge.

## Future Modifications

Before changing or adding a skill, identify its phase, category, source inspiration, path availability, prerequisites, conflicts, evidence requirements, and escalation rules. Regenerate \`ecosystem/\` and run the validation gates so the Harness Ecosystem stays coherent.

## Documentation Map

- \`docs/harness-ecosystem.md\`: harness backbone and integrity rules.
- \`docs/kiro-planning-artifacts.md\`: visible requirements/design/tasks/qa-tasks planning model.
- \`docs/path-phase-map.md\`: canonical lifecycle, phase/subphase matrix, skill table, and promotion visuals.
- \`docs/skill-extension-guide.md\`: rules for modifying or adding skills without disrupting the ecosystem.

## Regenerate Ecosystem Catalog

\`\`\`powershell
node scripts/generate-ecosystem-catalog.mjs
\`\`\`

## Run Tests

\`\`\`powershell
npm.cmd test
\`\`\`

## Validate Installation

\`\`\`powershell
npm.cmd run validate
\`\`\`
`;
}

async function write(relativePath, text) {
  if (text === null) return;
  const absolutePath = path.join(root, relativePath);
  await mkdir(path.dirname(absolutePath), { recursive: true });
  await writeFile(absolutePath, text, "utf8");
}

export async function scaffoldDocs() {
  await write("README.md", readmeBody());
  for (const doc of requiredDocs) {
    await write(`docs/${doc}`, docBody(doc));
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  await scaffoldDocs();
}
