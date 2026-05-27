# ECC-Fusion Prioritized Roadmap & Restructuring Implementation

This plan synthesizes the findings of Winston, Mary, Amelia, Murat, Paige, John, and Sally into an actionable roadmap, moving the project from critique into execution.

## Proposed Changes

### 🔴 NOW: Stabilize the Core Engine (Immediate Execution)

We need to fix the engine so the product actually runs and protects the user's workspace.

#### [MODIFY] `harness.json` and Orchestration Logic
- **Resolve the Artifact Namespace Collision (`.kiro/` vs `.planning/`)**
  - Consolidate all planning artifacts to a single namespace. 
  - Update `harness.json` and any relevant validation scripts to point to the correct namespace.
- **Ignite the State Machine**
  - Create the missing `.planning/state.yaml` (or equivalent `.kiro/state.yaml`) file that adheres to `schemas/path-state.schema.json`.
  - Update the controller skills (`path-switch`, `transition-guard`) to actually read from and enforce state using this file.

### 🟡 NEXT: Guardrails & The "First Win" (Adoption & Trust)

#### [MODIFY] `package.json`, Validation Scripts, and Testing
- **Enforce Schemas on Manifest Validation**
  - Integrate `ajv` (JSON Schema validator) into `npm run validate` (`validate-ecc-fusion.mjs`).
  - Apply `schemas/harness-manifest.schema.json` to `harness.json`, `skills.json`, and `commands.json`.

#### [MODIFY] Documentation and UX
- **Design the Junior Developer "First Win" & Onboarding**
  - Rewrite `README.md` to start with a clear, active-voice promise and a concrete "First Win in 10 Minutes" section.
  - Implement `/ecc-help` as the default onboarding gate, using Sally's conversational triage flow (progressive disclosure).
  - Add a "Why This Exists" section to every skill file and planning artifact template.
  - Ensure generated artifacts include "Sandbox" features (e.g., fill-in-the-blank or conversational prompts).

### 🟢 LATER: Refinement & Scalable Quality (Polish)

#### [MODIFY] User Navigation
- **Abstract the 13 Skill Categories from the UX**
  - Create a scenario-based navigation table in `docs/scenarios/navigation-table.md` (e.g., "I want to plan a new feature").
  - Shift `MAP.md` files to a dual-audience format.

#### [NEW] Behavioral Correctness Testing
- Shift testing away from static golden fixtures to dynamic behavioral testing (e.g., path-transition table tests, Ralph stop-rule tests).

## User Review Required

> [!WARNING]
> We need a definitive decision on the **Artifact Namespace Collision**. Should we standardize on `.kiro/` for all planning artifacts (since it already exists for specs) and deprecate `.planning/`, or vice-versa? 

> [!IMPORTANT]
> Does this sequenced roadmap (Now/Next/Later) align with your immediate goals for the project? 

## Open Questions

1. For the state machine (`state.yaml`), should we initialize it completely empty upon repo creation, or should the `/ecc-help` command be responsible for scaffolding it on first run?
2. Which JSON schema validation library do you prefer for Node (e.g., `ajv`) to enforce our schemas?

## Verification Plan

### Automated Tests
- Run `npm run validate` and verify that schema validation actually processes `harness.json`, `skills.json`, and `commands.json`.
- Execute `npm test` to ensure structural integrity remains green.

### Manual Verification
- Walk through the newly defined `/ecc-help` onboarding flow from a fresh state to ensure it routes the user correctly without overwhelming them.
- Verify that `path-switch` properly blocks transitions when prerequisites in `state.yaml` aren't met.
