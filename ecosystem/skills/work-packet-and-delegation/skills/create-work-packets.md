# Create Work Packets

> Generated mirror. Canonical source: `skills/02-Planning/create-work-packets/SKILL.md`.

| Field | Value |
| --- | --- |
| Skill id | `create-work-packets` |
| Category | Work Packet & Delegation |
| Path availability | Short Path, Regular Path, Auto |
| Shared skill | yes |
| Source inspiration | GSD Redux, ECC |

---
id: create-work-packets
name: Create Work Packets
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

# Create Work Packets

## Why This Exists

This document exists to guide you smoothly without overwhelming bureaucracy. It is designed to be a living, conversational document.

## Purpose

Provide the Create Work Packets workflow in the ECC-Fusion routed system.

## Trigger

Use when the active command or route calls for `create-work-packets`.

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

1. Split approved plans into bounded packets.
2. Each packet must name objective, allowed files, forbidden files, tests, AC IDs, and escalation triggers.
3. Keep packets small enough for independent review.

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

`create-work-packets` should produce a compact result with route, rationale, blockers, and next command.

## Maintenance Note

Keep this skill concise and synchronized with manifests and docs.

