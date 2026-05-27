import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();

export const requiredRules = [
  "global-engineering-rules",
  "security-rules",
  "git-workflow-rules",
  "testing-rules",
  "frontend-rules",
  "backend-rules",
  "database-rules",
  "oss-worker-rules",
  "high-end-reviewer-rules",
  "dependency-rules",
  "context-management-rules",
  "skill-governance-rules",
  "path-switching-rules",
  "ralph-safety-rules"
];

export const requiredSchemas = [
  "path-state.schema.json",
  "path-transition.schema.json",
  "work-packet.schema.json",
  "model-routing.schema.json",
  "ralph-prd.schema.json",
  "harness-manifest.schema.json",
  "skill-manifest.schema.json",
  "command-manifest.schema.json"
];

export const requiredPlanningTemplates = [
  "STATE.md",
  "TRANSITION-NOTICE.md",
  "WORK-PACKET-template.md",
  "SPEC-template.md",
  "ARCHITECTURE-template.md",
  "PLAN-template.md",
  "STORY-template.md",
  "VERIFY-template.md",
  "REVIEW-template.md",
  "QA-template.md",
  "SHIP-template.md",
  "RETRO-template.md",
  "RALPH-PRD-template.json",
  "kiro-spec/README.md",
  "kiro-spec/requirements-template.md",
  "kiro-spec/design/README.md",
  "kiro-spec/design/architecture-template.md",
  "kiro-spec/design/work-packets-template.md",
  "kiro-spec/tasks-template.md",
  "kiro-spec/qa-tasks-template.md"
];

const ruleMusts = [
  "never code before spec/plan unless Short Path is valid",
  "no dependency changes without approval",
  "no secret exposure",
  "no files outside work-packet scope",
  "tests required for implementation",
  "high-risk work requires high-end review",
  "critical work requires human approval",
  "update planning artifacts after work",
  "path switches must be explicit",
  "missing prerequisites must trigger a Transition Notice",
  "Ralph may only run after preflight approval",
  "Ralph must stop on freeze/no-progress/repeated-failure patterns",
  "OSS/local models may not perform high-risk changes without escalation"
];

function titleFromSlug(slug) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function ruleBody(slug) {
  return `# ${titleFromSlug(slug)}

These rules apply through the ECC-Fusion routing contract.

## Mandatory Rules

${ruleMusts.map((rule) => `- ${rule}`).join("\n")}

## Enforcement

- Commands and skills must check prerequisites before action.
- Violations stop execution and produce blockers or a Transition Notice.
- High-risk or unclear work escalates to Regular Path and high-end or human review.
`;
}

const schemaBodies = {
  "path-state.schema.json": {
    title: "ECC-Fusion Path State",
    type: "object",
    required: ["activePath", "currentPhase", "riskLevel", "artifactCompleteness", "nextRecommendedCommands"],
    properties: {
      activePath: { enum: ["Short Path", "Regular Path", "Auto", "Ralph"] },
      currentPhase: { type: "string" },
      riskLevel: { enum: ["Low", "Medium", "High"] },
      artifactCompleteness: { type: "object" },
      nextRecommendedCommands: { type: "array", items: { type: "string" } }
    }
  },
  "path-transition.schema.json": {
    title: "ECC-Fusion Path Transition",
    type: "object",
    required: ["currentPath", "requestedAction", "blocked", "missingPrerequisites"],
    properties: {
      currentPath: { enum: ["Short Path", "Regular Path", "Auto", "Ralph"] },
      requestedAction: { type: "string" },
      blocked: { type: "boolean" },
      missingPrerequisites: { type: "array", items: { type: "string" } }
    }
  },
  "work-packet.schema.json": {
    title: "ECC-Fusion Work Packet",
    type: "object",
    required: ["id", "riskLevel", "objective", "scope", "filesAllowed", "acceptanceCriteria", "verificationCommands"],
    properties: {
      id: { type: "string" },
      riskLevel: { enum: ["Low", "Medium", "High"] },
      objective: { type: "string" },
      scope: { type: "string" },
      filesAllowed: { type: "array", items: { type: "string" } },
      acceptanceCriteria: { type: "array", items: { type: "string" } },
      verificationCommands: { type: "array", items: { type: "string" } }
    }
  },
  "model-routing.schema.json": {
    title: "ECC-Fusion Model Routing",
    type: "object",
    required: ["riskLevel", "assignedModelTier", "escalationRequired"],
    properties: {
      riskLevel: { enum: ["Low", "Medium", "High"] },
      assignedModelTier: { enum: ["High-end", "OSS-local", "Human"] },
      escalationRequired: { type: "boolean" }
    }
  },
  "ralph-prd.schema.json": {
    title: "ECC-Fusion Ralph PRD",
    type: "object",
    required: ["objective", "bounds", "feedbackLoop", "stopConditions"],
    properties: {
      objective: { type: "string" },
      bounds: { type: "array", items: { type: "string" } },
      feedbackLoop: { type: "string" },
      stopConditions: { type: "array", items: { type: "string" } }
    }
  },
  "harness-manifest.schema.json": {
    title: "ECC-Fusion Harness Manifest",
    type: "object",
    required: ["version", "paths", "phases", "orchestration", "kiroPlanningArtifacts"],
    properties: {
      version: { type: "string" },
      paths: { type: "array", items: { type: "object" } },
      phases: { type: "array", items: { type: "object" } },
      orchestration: { type: "object" },
      kiroPlanningArtifacts: { type: "object" }
    }
  }
};

function schemaBody(name) {
  return `${JSON.stringify(
    {
      $schema: "https://json-schema.org/draft/2020-12/schema",
      $id: `https://ecc-fusion.local/schemas/${name}`,
      ...schemaBodies[name]
    },
    null,
    2
  )}\n`;
}

function templateBody(name) {
  if (name.endsWith(".json")) {
    return `${JSON.stringify(
      {
        objective: "",
        bounds: [],
        feedbackLoop: "",
        stopConditions: [
          "freeze",
          "overload",
          "repeated failure",
          "no progress"
        ]
      },
      null,
      2
    )}\n`;
  }

  if (name === "kiro-spec/README.md") {
    return `# Kiro-Style Planning Artifact Set

## Purpose

This folder defines the visible planning surfaces ECC-Fusion uses to keep developers in sync with agent work.

## Artifact Flow

\`\`\`mermaid
flowchart LR
  A["Discovery and help"] --> B["requirements.md"]
  B --> C["design/"]
  C --> D["tasks.md"]
  D --> E["qa-tasks.md"]
  E --> F["handoff or release"]
\`\`\`

## Files

- \`requirements-template.md\`: visible understanding of user stories, requirements, acceptance criteria, optional decisions, and open questions.
- \`design/\`: architecture, path decisions, work packet strategy, interfaces, testing strategy, and risks.
- \`tasks-template.md\`: implementation checklist with status markers.
- \`qa-tasks-template.md\`: testing, debugging, review, security, and QA checklist with status markers.

## Verification

- Every task uses \`[ ]\`, \`[x]\`, or \`[?]\`.
- Optional tasks are marked \`Optional\`.
- User decision points are marked \`Decision needed\`.

## Blockers

- Missing requirements, design, tasks, or QA task files block Regular Path readiness.
`;
  }

  if (name === "kiro-spec/requirements-template.md") {
    return `# Requirements

## Purpose

Represent what the agent understood after Discovery & Help, Clarification & Research, and Specification & Product skills.

## User Stories

| ID | User story | Acceptance criteria | Source skill | Status |
| --- | --- | --- | --- | --- |
| US-001 | As a developer, I want the agent plan to be visible so I can intervene early. | Given an active feature, when requirements are drafted, then each user story has acceptance criteria and a source skill. | \`ecc-help\`, \`ask-interview\`, \`write-spec\` | [ ] |

## Requirements

| ID | Requirement | Rationale | Source | Priority | Status |
| --- | --- | --- | --- | --- | --- |
| REQ-001 | <requirement> | <why it matters> | <skill/doc/user> | Must | [ ] |

## Optional Developer Decisions

| ID | Decision needed | Options | Default recommendation | Status |
| --- | --- | --- | --- | --- |
| DEC-001 | <question> | <option A; option B> | <recommended option> | [?] |

## Open Questions

- [ ] <question>

## Traceability

| Requirement | Design section | Task IDs | QA IDs |
| --- | --- | --- | --- |
| REQ-001 | design/architecture.md#section | T-001 | QA-001 |

## Verification

- [ ] Every user story has acceptance criteria.
- [ ] Every requirement has source and priority.
- [ ] Optional developer decisions are marked \`[?]\`.
- [ ] Traceability links requirements to design, tasks, and QA.

## Blockers

- Missing acceptance criteria.
- Missing user decision for a required branch.
- Requirements that cannot be verified.
`;
  }

  if (name === "kiro-spec/design/README.md") {
    return `# Design

## Purpose

The design folder shows how Architecture & Planning, Work Packet & Delegation, and related skills converted requirements into an implementation strategy.

## Contents

- \`architecture.md\`: architecture, interfaces, risks, and decisions.
- \`work-packets.md\`: implementation slices, allowed files, dependencies, and verification commands.

## Diagram

\`\`\`mermaid
flowchart TD
  R["requirements.md"] --> A["architecture.md"]
  A --> W["work-packets.md"]
  W --> T["../tasks.md"]
  W --> Q["../qa-tasks.md"]
\`\`\`

## Verification

- [ ] Architecture decisions link back to requirements.
- [ ] Work packets link forward to tasks and QA tasks.

## Blockers

- Missing architecture direction for risky work.
- Work packets that cannot be traced to requirements.
`;
  }

  if (name === "kiro-spec/design/architecture-template.md") {
    return `# Architecture

## Purpose

Show how the agent will proceed after Architecture & Planning skills run.

## Decisions

| ID | Decision | Rationale | Alternatives | Source skill | Status |
| --- | --- | --- | --- | --- | --- |
| ADR-001 | <decision> | <why> | <alternatives> | \`architecture-plan\` | [ ] |

## Implementation Direction

| Area | Planned direction | Risks | Verification |
| --- | --- | --- | --- |
| <area> | <direction> | <risk> | <check> |

## Developer Intervention Points

- [?] Decision needed: <decision>

## Verification

- [ ] Every major decision has rationale and alternatives.
- [ ] Risks have verification checks.
- [ ] Developer intervention points are explicit.

## Blockers

- Missing architecture decision for a risky requirement.
- Unresolved developer decision.
- Verification path is unknown.
`;
  }

  if (name === "kiro-spec/design/work-packets-template.md") {
    return `# Work Packets

## Purpose

Convert the design into bounded implementation slices that can be tracked and safely interrupted.

| Packet | Objective | Allowed files | Depends on | Verification | Status |
| --- | --- | --- | --- | --- | --- |
| WP-001 | <objective> | <paths> | none | <command> | [ ] |

## Escalation Rules

- [ ] Escalate if files outside the packet are required.
- [ ] Escalate if acceptance criteria are incomplete.
- [ ] Escalate if verification cannot run.

## Verification

- [ ] Every packet has allowed files.
- [ ] Every packet has a verification command or evidence path.
- [ ] Every packet maps to at least one task.

## Blockers

- Packet scope is too broad.
- Allowed files are missing.
- Verification is unavailable.
`;
  }

  if (name === "kiro-spec/tasks-template.md") {
    return `# Tasks

## Purpose

Trace exactly what the agent will implement, one step at a time.

| ID | Task | Description | Packet | Expected output | Verification | Status |
| --- | --- | --- | --- | --- | --- | --- |
| T-001 | <task> | <specific action> | WP-001 | <file/change> | <command> | [ ] |

## Status Legend

- [ ] not started
- [x] complete and verified
- [?] optional or needs developer decision
- [!] blocked

## Verification

- [ ] Every task has expected output.
- [ ] Every task has a verification command or evidence path.
- [ ] Completed tasks are marked \`[x]\` only after verification.

## Blockers

- Task lacks expected output.
- Task cannot be verified.
- Task needs a developer decision.
`;
  }

  if (name === "kiro-spec/qa-tasks-template.md") {
    return `# QA Tasks

## Purpose

Trace testing, debugging, fixing, review, security, and QA tasks with the same visibility as implementation.

| ID | QA task | Target | Method | Expected evidence | Source skill | Status |
| --- | --- | --- | --- | --- | --- | --- |
| QA-001 | <test/review/debug task> | <feature/file> | <command/manual check> | <evidence> | \`verify-work\` | [ ] |

## Required Gates

- [ ] Tests executed or documented as unavailable.
- [ ] Debug/fix loop documented for failures.
- [ ] Review findings resolved or accepted.
- [ ] Security review completed when relevant.
- [ ] QA/release evidence attached when relevant.

## Verification

- [ ] QA evidence links to tasks and requirements.
- [ ] Failed checks produce follow-up tasks.
- [ ] Security and review gates are complete when relevant.

## Blockers

- Test command is unknown.
- Review findings are unresolved.
- Release evidence is missing for release-sensitive work.
`;
  }

  const title = name.replace(".md", "").replace("-template", "").replaceAll("-", " ");
  return `# ${title}

## Purpose

Describe the artifact this template creates.

## Inputs

- User request
- Repository state
- Relevant planning artifacts

## Decisions

- Decision:
- Rationale:

## Verification

- Command:
- Result:

## Blockers

- None
`;
}

async function write(relativePath, text) {
  const absolutePath = path.join(root, relativePath);
  await mkdir(path.dirname(absolutePath), { recursive: true });
  await writeFile(absolutePath, text, "utf8");
}

export async function scaffoldArtifacts() {
  for (const rule of requiredRules) {
    await write(`rules/${rule}.md`, ruleBody(rule));
  }

  for (const schema of Object.keys(schemaBodies)) {
    await write(`schemas/${schema}`, schemaBody(schema));
  }

  for (const template of requiredPlanningTemplates) {
    await write(`planning-templates/${template}`, templateBody(template));
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  await scaffoldArtifacts();
}
