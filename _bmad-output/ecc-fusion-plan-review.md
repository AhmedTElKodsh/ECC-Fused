# ECC-Fusion Plan Review

Date: 2026-05-25
Source plan: `plan.md`
Reviewed target prompt: `ECC-Fusion_Unified_Standalone_AI_Agent_Prompt.md`
Method: BMAD party-mode review with PM, architecture, implementation, and test perspectives, plus local repo inspection.

## Executive Verdict

The plan has strong raw material, but it is not yet implementation-ready. Its main risk is breadth: it tries to merge many agent frameworks into one stronger ECC-Fusion prompt before defining the control plane that makes those frameworks coexist safely.

The next revision should focus less on adding more framework coverage and more on making routing, precedence, source attribution, manifests, install behavior, and test evidence deterministic.

## Highest Priority Issues

### P0 - Missing Source-Of-Truth Hierarchy

The plan names ECC, Superpowers, Matt Pocock skills, BMAD, GSD Redux, gstack, OpenSpec, GitHub Spec Kit, Agent OS, and Ralph, but it does not define what wins when those sources conflict.

Add a precedence model such as:

1. Explicit user instruction in the current turn.
2. Repository `AGENTS.md` and project agent docs.
3. Project domain docs and ADRs.
4. ECC-Fusion state and manifests.
5. Explicitly invoked local skills.
6. Installed global skills and framework guidance.
7. General model knowledge.

Acceptance criterion: every router or help command can explain which source won and why.

### P0 - Routing Contract Is Still Ambiguous

`/ecc-help`, `/ecc-next`, Short Path, Regular Path, shared skills, explicit skill invocation, Auto routing, and Ralph can overlap. The plan needs one routing contract that defines:

- entry points
- precedence
- tie-breakers
- escalation rules
- refusal or redirect behavior
- compact user-visible route explanations

Without this, ECC-Fusion may sound governed while quietly selecting inconsistent workflows.

### P0 - Product Spine Is Too Fuzzy

The plan describes what to add, but not the primary user jobs it must make easier. Add a "Primary User Jobs" section:

- New user asks, "I do not know what to do next."
- Existing repo user wants the right workflow without reading all docs.
- Agent needs to choose Short Path vs Regular Path.
- Agent needs to invoke a shared skill without missing prerequisites.
- Maintainer needs to add or update a skill without creating conflicts.
- User needs install, upgrade, repair, or rollback guidance.

Acceptance criterion: a new user can identify the right path in under 60 seconds.

### P0 - No Golden Behavioral Regression Suite

The current test plan lists categories, but the key risk is semantic routing drift. Add golden prompt fixtures for:

- bounded bug fix
- ambiguous product request
- PRD request
- architecture request
- code review
- test generation
- explicit skill invocation
- conflicting source-library guidance
- missing prerequisites
- unsupported install or tool
- Ralph requested for unsafe work

Each fixture should assert the selected path, selected skill, reason, source priority, required artifacts, and fallback behavior.

### P0 - Installer Compatibility Risk

The plan says to preserve ECC install ergonomics, but it should require explicit install safety behavior:

- dry run
- idempotency
- backup before overwrite
- rollback
- conflict detection
- upgrade path
- partial install recovery
- Windows PowerShell path-with-spaces smoke tests

No install or repair command should silently rewrite `AGENTS.md`, manifests, commands, skills, or hook configs.

## P1 Issues

### File-Level Deliverables Are Incomplete

The plan should name exact files to create or update, including prompt sections, commands, schemas, docs, tests, and generated artifacts. "Strengthen prompt" is too broad for implementation.

Add traceable acceptance criteria IDs:

- `AC-HELP-001`: `/ecc-help` classifies common user intents and returns a path recommendation.
- `AC-PATH-001`: Short Path and Regular Path produce compatible routing decisions for shared intents.
- `AC-SOURCE-001`: every adapted framework concept includes source attribution metadata.
- `AC-MANIFEST-001`: manifests validate with a documented command.
- `AC-COMPAT-001`: existing ECC-compatible commands pass regression fixtures.
- `AC-INSTALL-001`: install, repair, doctor, status, uninstall, and rollback are covered by smoke tests.

### Plan Duplicates Some Existing Prompt Content

The target prompt already contains substantial sections for Short Path, Regular Path, transition notices, state management, work packets, Ralph, compatibility, required commands, required skills, governance, tests, and final acceptance criteria.

Before editing, add an inventory pass:

- What already exists and should be preserved?
- What needs replacement?
- What is genuinely missing?
- What should be moved into docs or schemas instead of duplicated in prompt prose?

This prevents prompt bloat and contradictory repeated rules.

### Best-Skill Backfill Needs Governance

"Best-skill backfill" is useful, but dangerous if automatic. Define:

- ranking inputs
- trust order
- prerequisite checks
- conflict behavior
- audit trail
- opt-out mechanism
- whether backfill is advisory or executable routing logic

Suggested ranking order: explicit user request, local project convention, exact task match, lowest-risk prerequisite-complete skill, then token efficiency.

### Source Attribution Needs A Schema, Not Just Prose

Attribution should include:

- source name
- source type
- URL or local path when available
- version or retrieval date when available
- license or permission status when known
- adapted vs copied status
- local owner
- related command or skill

Keep attribution mostly in manifests and docs. Do not make normal agent replies noisy unless attribution materially affects trust, licensing, or debugging.

### Skill Taxonomy Needs Operating Rules

The category list is a good start, but the plan should define:

- one primary category per skill
- optional secondary tags
- conflict detection
- category owner
- category deprecation rules
- when a workflow belongs in a skill vs command vs doc vs one-off prompt

Functional categories should matter more than source-library branding.

### Scope Should Be Phased

Recommended phases:

1. Inventory and compatibility baseline.
2. Routing contract, source precedence, and `/ecc-help`.
3. Manifest schema, source attribution, and skill categories.
4. Short Path / Regular Path interoperability fixtures.
5. Best-skill backfill policy.
6. Installer and upgrade safety.
7. Full docs, lint, snapshots, and compatibility validation.

## P2 Enhancements

### Add Non-Goals

Examples:

- Do not copy third-party libraries wholesale.
- Do not rewrite existing workspace agent instructions without confirmation.
- Do not make Ralph a planner.
- Do not add permanent skills for one-off prompts.
- Do not guarantee compatibility with every external framework.
- Do not silently route across paths when prerequisites are missing.

### Add Failure-Mode Coverage

Include fixtures for:

- unknown skill
- duplicate skill name
- duplicate command alias
- stale manifest entry
- missing source attribution
- missing prerequisite artifact
- skill exists but required tool is unavailable
- broken or partial install
- conflicting `AGENTS.md` and framework guidance
- path switch requested after partial implementation

### Add A Routing Decision Matrix

Columns:

- user intent
- risk level
- ambiguity level
- required artifacts
- selected path
- allowed shared skills
- transition notice required
- fallback if blocked
- examples

### Add An Acceptance Matrix

Rows:

- `/ecc-help`
- `/ecc-next`
- skill categories
- source attribution
- manifests
- best-skill backfill
- Short Path
- Regular Path
- Ralph
- install and repair
- docs
- tests

Columns:

- expected behavior
- negative cases
- fixtures
- validation command
- regression owner

### Add Observability Hooks

When routing, ECC-Fusion should be able to emit a compact route note:

```text
Route: Regular Path
Reason: ambiguous multi-phase request with production-sensitive changes
Source priority: AGENTS.md > ECC-Fusion routing rules > invoked skill metadata
Blocked: no
Next artifact: work packet
```

### Add Windows-First Verification

This repo and user environment are Windows-heavy. Include PowerShell and `.cmd` command examples, paths with spaces, and fresh/update/repair smoke tests.

## Architecture Decisions Required Before Implementation

- ADR: Unified skill routing model.
- ADR: Source-of-truth precedence and conflict handling.
- ADR: Manifest schema and versioning.
- ADR: Source attribution and licensing.
- ADR: Installer idempotency, rollback, and conflict detection.
- ADR: Short Path / Regular Path interoperability.
- ADR: Ralph eligibility and stop conditions.

## Quality Gates

- Golden prompt regression suite covers routing, help, attribution, install, fallback, and ambiguity cases.
- Each capability has explicit acceptance criteria, negative tests, and fixture coverage.
- Short Path and Regular Path pass interoperability contract tests.
- `/ecc-help` output is snapshot-tested for stability and completeness.
- Source attribution is mandatory where framework guidance is used.
- Windows PowerShell command/path fixtures are included.
- Manifest and schema validation run in CI.
- Docs, command manifests, skill manifests, and README command tables stay synchronized.

## Suggested Revision To `plan.md`

Add these sections before implementation:

1. Primary User Jobs
2. Source-Of-Truth Precedence
3. Routing Decision Matrix
4. Architecture Decisions Required Before Implementation
5. File-Level Deliverables
6. Acceptance Criteria IDs
7. Golden Behavioral Regression Fixtures
8. Best-Skill Backfill Governance
9. Installer Safety And Rollback
10. Non-Goals
11. Failure-Mode Fixtures
12. Windows Verification Plan

## Recommended Next Step

Do not expand the prompt yet. First revise `plan.md` into a tighter implementation-ready plan by adding the routing contract, source precedence, acceptance matrix, golden fixtures, and installer safety requirements. Once those are explicit, update the target prompt in small phases with regression evidence after each phase.
