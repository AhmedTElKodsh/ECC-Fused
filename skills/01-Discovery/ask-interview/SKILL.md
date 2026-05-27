---
id: ask-interview
name: Ask Interview
category: Clarification & Research
pathAvailability:
  - Short Path
  - Regular Path
  - Auto
sharedSkill: true
sourceInspiration:
  - Superpowers
  - Matt Pocock skills
  - ECC
---

# Ask Interview

## Why This Exists

This document exists to guide you smoothly without overwhelming bureaucracy. It is designed to be a living, conversational document.

## Purpose

Provide the Ask Interview workflow in the ECC-Fusion routed system.

## Trigger

Use when the active command or route calls for `ask-interview`.

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

1. Ask only the minimum questions needed to unblock routing or artifact creation.
2. Prefer assumptions for low-risk reversible details.
3. End with decisions, open questions, and next command.

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

`ask-interview` should produce a compact result with route, rationale, blockers, and next command.

## Maintenance Note

Keep this skill concise and synchronized with manifests and docs.
