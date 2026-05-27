# Transition Guard

> Generated mirror. Canonical source: `skills/06-Governance/transition-guard/SKILL.md`.

| Field | Value |
| --- | --- |
| Skill id | `transition-guard` |
| Category | Work Packet & Delegation |
| Path availability | Short Path, Regular Path, Auto |
| Shared skill | yes |
| Source inspiration | GSD Redux, ECC |

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

## Verification Requirements

Do not claim success without evidence. If verification cannot run, record the reason.

## Escalation Rules

Escalate to Regular Path or human review when risk, ambiguity, security impact, dependency changes, or file boundaries exceed this skill.

## Examples

`transition-guard` should produce a compact result with route, rationale, blockers, and next command.

## Maintenance Note

Keep this skill concise and synchronized with manifests and docs.

