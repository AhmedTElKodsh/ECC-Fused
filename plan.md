# ECC-Fusion Prompt Strengthening Plan

## Summary

Revise [ECC-Fusion_Unified_Standalone_AI_Agent_Prompt.md](D:/AI%20Projects/Gentech/ECC-Fused/ECC-Fusion_Unified_Standalone_AI_Agent_Prompt.md) into a more decision-complete build prompt for a unified ECC-based library that combines the best patterns from ECC, Superpowers, Matt Pocock skills, BMAD, GSD Redux, gstack, OpenSpec, GitHub Spec Kit, Agent OS, and Ralph.

The current prompt already has strong foundations: ECC remains the base, Short Path and Regular Path are defined, state/work-packets/model-routing/Ralph safety are covered, and docs/tests are required. The main missing pieces are the `bmad-help`-style entry skill, a stable skill category taxonomy, explicit source-library attribution, and clearer rules for applying “best skills from the other path” without duplication or contradiction.

## Primary User Jobs

- New user asks, "I do not know what to do next."
- Existing repo user wants the right workflow without reading every doc.
- Agent needs to choose Short Path, Regular Path, Auto, Ralph, or a shared skill.
- Agent needs to invoke a shared skill without missing prerequisites.
- Maintainer needs to add or update a skill without creating duplicates or conflicts.
- User needs install, upgrade, repair, rollback, or compatibility guidance.

## Source-Of-Truth Precedence

When guidance conflicts, ECC-Fusion must resolve it in this order and show the winning source in route notes when useful:

1. Explicit user instruction in the current turn.
2. Repository `AGENTS.md` and project agent docs.
3. Project domain docs, ADRs, and planning artifacts.
4. ECC-Fusion state, manifests, schemas, and routing contracts.
5. Explicitly invoked local skills.
6. Installed global skills and external framework guidance.
7. General model knowledge.

## Routing Contract

- `/ecc-help` is advisory: classify intent, inspect state, recommend a route, prerequisites, and next command.
- `/ecc-next` is stateful: inspect active state and recommend the next legal action in the current path.
- Explicit skill invocation wins when prerequisites exist and safety gates pass.
- Short Path is selected for bounded, low-risk, low-ambiguity work.
- Regular Path is selected for ambiguous, high-risk, multi-phase, production-sensitive, or missing-requirement work.
- Ralph is never a planner; it only runs bounded implementation loops after preflight approval.
- Missing prerequisites produce a Transition Notice instead of invented artifacts.
- Tie-breaker: choose the lowest-risk route that preserves user intent and required artifacts.

## File-Level Deliverables

- Update `ECC-Fusion_Unified_Standalone_AI_Agent_Prompt.md`.
- Require `commands/ecc-help.md`.
- Require `skills/ecc-help/SKILL.md`.
- Extend `skills/skill-lint/SKILL.md` requirements.
- Extend `schemas/skill-manifest.schema.json` and `schemas/command-manifest.schema.json`.
- Require `docs/skill-categories.md`, `docs/source-library-map.md`, `docs/ecc-help.md`, root `CONTEXT.md`, and `.planning/CONTEXT.md`.
- Add golden routing and manifest/governance fixture requirements under tests.

## Acceptance Criteria IDs

- `AC-HELP-001`: `/ecc-help` classifies common user intents and returns a path recommendation with rationale.
- `AC-PATH-001`: Short Path and Regular Path produce compatible routing decisions for shared intents.
- `AC-SOURCE-001`: every adapted framework concept includes source attribution metadata.
- `AC-MANIFEST-001`: command and skill manifests validate categories, path availability, prerequisites, and source inspiration.
- `AC-COMPAT-001`: existing ECC-compatible commands pass regression fixtures.
- `AC-INSTALL-001`: install, repair, doctor, status, uninstall, rollback, and Windows path-with-spaces smoke tests are covered.

## Golden Behavioral Regression Fixtures

Add fixtures for bounded bug fix, ambiguous product request, PRD request, architecture request, code review, test generation, explicit skill invocation, conflicting source-library guidance, missing prerequisites, unsupported install/tool, Ralph requested for unsafe work, duplicate skill name, duplicate command alias, stale manifest entry, and missing source attribution.

Each fixture must assert selected path, selected skill or command, reason, source precedence, required artifacts, fallback behavior, and whether a Transition Notice is required.

## Best-Skill Backfill Governance

Best-skill backfill is advisory routing logic unless the user explicitly asks to execute it. Rank candidate skills by explicit user request, local project convention, exact task match, prerequisite completeness, lowest risk, and token efficiency. Backfill must record source inspiration, avoid duplicate workflow text, honor opt-out flags, and stop on conflicts.

## Installer Safety And Rollback

Install, repair, upgrade, and uninstall must support dry run, idempotency, backup before overwrite, rollback, conflict detection, partial-install recovery, and Windows PowerShell path-with-spaces smoke tests. No command may silently rewrite `AGENTS.md`, manifests, commands, skills, hooks, or MCP configs.

## Non-Goals

- Do not copy third-party libraries wholesale.
- Do not rewrite workspace agent instructions without confirmation.
- Do not make Ralph a planner.
- Do not add permanent skills for one-off prompts.
- Do not guarantee compatibility with every external framework.
- Do not silently route across paths when prerequisites are missing.

## Key Changes

- Add a first-class `skills/ecc-help/SKILL.md` and `/ecc-help` command modeled on BMAD Help:
  - Handles “I don’t know what to do next.”
  - Inspects user intent, repo state, risk, ambiguity, artifacts, and available skills.
  - Recommends Short Path, Regular Path, Auto, Ralph, or a specific shared skill.
  - Explains why, lists prerequisites, and emits a Transition Notice when needed.

- Add a canonical skill category system used across docs, manifests, linting, and routing:
  - `Discovery & Help`
  - `Clarification & Research`
  - `Specification & Product`
  - `Architecture & Planning`
  - `Work Packet & Delegation`
  - `Implementation`
  - `Testing & Verification`
  - `Review & Security`
  - `QA & Release`
  - `Documentation & Handoff`
  - `Memory & Context Management`
  - `Governance & Maintenance`
  - `Automation Accelerators`

- Add a source-library contribution map:
  - Each command/skill/rule/template should declare inspired-by sources, such as ECC, Superpowers, Matt Pocock skills, BMAD, GSD Redux, OpenSpec, Agent OS, GitHub Spec Kit, gstack, or Ralph.
  - README and docs should credit source libraries clearly without implying copied code unless actually copied under a compatible license.

- Strengthen Short Path / Regular Path interoperability:
  - Shared skills may be used from either path only when prerequisites exist.
  - Short Path can promote to Regular Path before, during, or after implementation.
  - Regular Path can delegate bounded packets to Short Path-style execution.
  - Promotion must run a missing-requirements check and create a Transition Notice rather than silently inventing artifacts.

- Add “best-skill backfill” rules:
  - If one path lacks a useful discipline from another path, apply it as a lightweight reusable shared skill, not as duplicated workflow text.
  - Example: Short Path borrows TDD/verify/review when useful; Regular Path borrows anti-bloat and context-thrift from Matt Pocock/Agent OS style skills.
  - Skill-lint must flag duplicates, conflicting triggers, oversized skills, and skills that belong as one-off prompts.

- Preserve CLI and install ergonomics:
  - Keep ECC-compatible install, repair, doctor, status, uninstall, selective install, hooks, MCP configs, and cross-harness behavior.
  - Add `/ecc-help` to the required command list.
  - Add manifest entries for command category, skill category, path availability, prerequisites, and source inspiration.

- Improve README/docs requirements:
  - README must include “Which path should I choose?”, “I don’t know what I need”, install/download steps, command quick reference, source-library credits, and examples for switching paths.
  - Add `docs/skill-categories.md`, `docs/source-library-map.md`, and `docs/ecc-help.md`.
  - Since `CONTEXT.md` is referenced by repo agent docs but absent, the build prompt should require creating `.planning/CONTEXT.md` and/or root `CONTEXT.md` as part of documentation setup.

## Public Interfaces / Types

Add or update these required files in the prompt:

- Commands:
  - `commands/ecc-help.md`
  - Existing `/ecc-next` remains state-based next-action routing.
  - `/ecc-help` becomes user-intent advisory routing.

- Skills:
  - `skills/ecc-help/SKILL.md`
  - `skills/skill-lint/SKILL.md` must validate category, trigger clarity, source attribution, prerequisites, and path availability.

- Schemas:
  - Extend `schemas/skill-manifest.schema.json` with `category`, `pathAvailability`, `prerequisites`, `sourceInspiration`, `sharedSkill`, and `conflictsWith`.
  - Extend `schemas/command-manifest.schema.json` with `category`, `pathAvailability`, `stateRequired`, and `transitionNoticeBehavior`.

- Docs:
  - `docs/skill-categories.md`
  - `docs/source-library-map.md`
  - `docs/ecc-help.md`
  - Update README, `docs/paths.md`, `docs/path-switching.md`, `docs/skill-governance.md`, and `docs/install-and-compatibility.md`.

## Test Plan

- Add tests that `/ecc-help` recommends:
  - Short Path for bounded low-risk work.
  - Regular Path for ambiguous/high-risk/multi-phase work.
  - Transition Notice when requested skills lack prerequisites.
  - Ralph redirect when preflight fails.
  - Shared skill use when prerequisites exist.

- Add skill governance tests:
  - Categories are present and valid.
  - Duplicate/conflicting skills are flagged.
  - Oversized skills are flagged.
  - Source attribution is present for merged/inspired workflows.
  - Path availability and prerequisites are consistent with routing rules.

- Add docs/manifest consistency tests:
  - Every command links to a skill or routing behavior.
  - Every skill appears in the manifest.
  - README command list matches command files.
  - Source-library map references only documented integrations.

## Assumptions

- ECC remains the base platform and compatibility target.
- “Short Path” replaces “Golden Path” everywhere.
- “Regular Path” is the full workflow name.
- Ralph remains an optional bounded execution accelerator, not a planner.
- `/ecc-help` should be advisory and routing-focused, while `/ecc-next` should remain state/progress-focused.
- No external source library should be copied wholesale; patterns should be adapted and credited.
