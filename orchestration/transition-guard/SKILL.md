---
id: transition-guard
name: Transition Guard
category: Work Packet & Delegation
pathAvailability:
  - Short Path
  - Regular Path
  - Auto
sharedSkill: true
sourceInspiration:
  - GSD Redux
  - ECC
---

# Transition Guard

## Why This Exists

This document exists to guide you smoothly without overwhelming bureaucracy. It is designed to be a living, conversational document.

## Purpose

Provide the Transition Guard workflow in the ECC-Fusion routed system.

## Trigger

Use when the active command or route calls for `transition-guard`.

## When To Use

- The route prerequisites are present.
- The task matches the declared category.
- The requested path is one of: Short Path, Regular Path, Auto.

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

1. Read `.planning/state.yaml` to check the `activePath` and `currentPhase`.
2. Read the `harness.json` phase definitions to determine the required artifacts and subphases for the current phase.
3. Detect missing prerequisites or missing artifacts before proceeding to the next step.
4. If prerequisites are missing, stop execution and instruct the user or system to generate the missing artifacts. Name files that would change and the proceed instruction.
5. Stop until the user explicitly proceeds or the artifacts are verified.

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

`transition-guard` should produce a compact result with route, rationale, blockers, and next command.

## Maintenance Note

Keep this skill concise and synchronized with manifests and docs.
