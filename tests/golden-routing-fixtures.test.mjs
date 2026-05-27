import test from "node:test";
import assert from "node:assert/strict";

const fixtures = [
  {
    name: "bounded bug fix",
    risk: "Low",
    ambiguity: "Low",
    selectedRoute: "Short Path",
    transitionNotice: false,
    nextCommand: "/ecc-path-short",
    sourcePriority: ["user request", "routing contract"]
  },
  {
    name: "ambiguous product request",
    risk: "High",
    ambiguity: "High",
    selectedRoute: "Regular Path",
    transitionNotice: false,
    nextCommand: "/ecc-spec",
    sourcePriority: ["user request", "planning artifacts", "routing contract"]
  },
  {
    name: "PRD request",
    risk: "Medium",
    ambiguity: "High",
    selectedRoute: "Regular Path",
    transitionNotice: false,
    nextCommand: "/ecc-spec",
    sourcePriority: ["user request", "planning artifacts"]
  },
  {
    name: "architecture request",
    risk: "High",
    ambiguity: "Medium",
    selectedRoute: "Regular Path",
    transitionNotice: false,
    nextCommand: "/ecc-architecture",
    sourcePriority: ["user request", "domain docs", "ADRs"]
  },
  {
    name: "code review",
    risk: "Medium",
    ambiguity: "Medium",
    selectedRoute: "Shared skill",
    transitionNotice: false,
    nextCommand: "/ecc-review",
    sourcePriority: ["user request", "diff", "tests"]
  },
  {
    name: "test generation",
    risk: "Low",
    ambiguity: "Medium",
    selectedRoute: "Shared skill",
    transitionNotice: false,
    nextCommand: "/ecc-qa",
    sourcePriority: ["user request", "target behavior", "test command"]
  },
  {
    name: "explicit skill invocation",
    risk: "Varies",
    ambiguity: "Low",
    selectedRoute: "Shared skill",
    transitionNotice: false,
    nextCommand: "invoked skill",
    sourcePriority: ["user request", "skill prerequisites"]
  },
  {
    name: "conflicting source-library guidance",
    risk: "Medium",
    ambiguity: "High",
    selectedRoute: "Regular Path",
    transitionNotice: true,
    nextCommand: "/ecc-grill",
    sourcePriority: ["user request", "repository instructions", "source-library map"]
  },
  {
    name: "missing prerequisites",
    risk: "Medium",
    ambiguity: "High",
    selectedRoute: "Auto",
    transitionNotice: true,
    nextCommand: "/ecc-help",
    sourcePriority: ["user request", "state", "routing contract"]
  },
  {
    name: "unsupported install/tool",
    risk: "High",
    ambiguity: "Medium",
    selectedRoute: "Regular Path",
    transitionNotice: true,
    nextCommand: "/ecc-package-check",
    sourcePriority: ["user request", "install contract", "managed-file boundary"]
  },
  {
    name: "Ralph requested for unsafe work",
    risk: "High",
    ambiguity: "Medium",
    selectedRoute: "Regular Path",
    transitionNotice: true,
    nextCommand: "/ecc-packetize",
    sourcePriority: ["user request", "Ralph gates", "routing contract"]
  },
  {
    name: "duplicate skill name",
    risk: "Medium",
    ambiguity: "Low",
    selectedRoute: "Shared skill",
    transitionNotice: true,
    nextCommand: "/ecc-skill-lint",
    sourcePriority: ["manifests", "skill governance"]
  },
  {
    name: "duplicate command alias",
    risk: "Medium",
    ambiguity: "Low",
    selectedRoute: "Shared skill",
    transitionNotice: true,
    nextCommand: "/ecc-skill-lint",
    sourcePriority: ["manifests", "command catalog"]
  },
  {
    name: "stale manifest entry",
    risk: "Medium",
    ambiguity: "Low",
    selectedRoute: "Shared skill",
    transitionNotice: true,
    nextCommand: "/ecc-package-check",
    sourcePriority: ["manifests", "filesystem"]
  },
  {
    name: "missing source attribution",
    risk: "Medium",
    ambiguity: "Low",
    selectedRoute: "Shared skill",
    transitionNotice: true,
    nextCommand: "/ecc-skill-lint",
    sourcePriority: ["source-library map", "manifests"]
  }
];

test("golden routing fixtures preserve expected high-level route decisions", () => {
  assert.deepEqual(
    fixtures.map((fixture) => ({
      name: fixture.name,
      selectedRoute: fixture.selectedRoute,
      transitionNotice: fixture.transitionNotice
    })),
    [
      { name: "bounded bug fix", selectedRoute: "Short Path", transitionNotice: false },
      { name: "ambiguous product request", selectedRoute: "Regular Path", transitionNotice: false },
      { name: "PRD request", selectedRoute: "Regular Path", transitionNotice: false },
      { name: "architecture request", selectedRoute: "Regular Path", transitionNotice: false },
      { name: "code review", selectedRoute: "Shared skill", transitionNotice: false },
      { name: "test generation", selectedRoute: "Shared skill", transitionNotice: false },
      { name: "explicit skill invocation", selectedRoute: "Shared skill", transitionNotice: false },
      { name: "conflicting source-library guidance", selectedRoute: "Regular Path", transitionNotice: true },
      { name: "missing prerequisites", selectedRoute: "Auto", transitionNotice: true },
      { name: "unsupported install/tool", selectedRoute: "Regular Path", transitionNotice: true },
      { name: "Ralph requested for unsafe work", selectedRoute: "Regular Path", transitionNotice: true },
      { name: "duplicate skill name", selectedRoute: "Shared skill", transitionNotice: true },
      { name: "duplicate command alias", selectedRoute: "Shared skill", transitionNotice: true },
      { name: "stale manifest entry", selectedRoute: "Shared skill", transitionNotice: true },
      { name: "missing source attribution", selectedRoute: "Shared skill", transitionNotice: true }
    ]
  );
});

test("golden routing fixtures include deterministic next commands and source priorities", () => {
  for (const fixture of fixtures) {
    assert.ok(fixture.nextCommand, `${fixture.name} next command`);
    assert.ok(fixture.sourcePriority.length > 0, `${fixture.name} source priority`);
  }
});
