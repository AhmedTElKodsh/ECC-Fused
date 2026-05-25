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
  "RALPH-PRD-template.json"
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
