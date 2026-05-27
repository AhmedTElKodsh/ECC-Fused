# Prototype UI

> Generated mirror. Canonical source: `skills/02-Planning/prototype-ui/SKILL.md`.

| Field | Value |
| --- | --- |
| Skill id | `prototype-ui` |
| Category | Specification & Product |
| Path availability | Regular Path, Auto |
| Shared skill | yes |
| Source inspiration | Superpowers, Matt Pocock skills, ECC |

---
id: prototype-ui
name: Prototype UI
category: Specification & Product
pathAvailability:
  - Regular Path
  - Auto
sharedSkill: true
sourceInspiration:
  - Superpowers
  - Matt Pocock skills
  - ECC
---

# Prototype UI

## Why This Exists

This document exists to guide you smoothly without overwhelming bureaucracy. It is designed to be a living, conversational document.

## Purpose

Provide the Prototype UI workflow in the ECC-Fusion routed system.

## Trigger

Use when the active command or route calls for `prototype-ui`.

## When To Use

- The route prerequisites are present.
- The task matches the declared category.
- The requested path is one of: Regular Path, Auto.

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

1. Create a disposable prototype for learning, not production code.
2. State what question the prototype answers.
3. Capture follow-up decisions before handoff.

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

`prototype-ui` should produce a compact result with route, rationale, blockers, and next command.

## Maintenance Note

Keep this skill concise and synchronized with manifests and docs.

