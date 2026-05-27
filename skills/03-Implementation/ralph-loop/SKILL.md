---
id: ralph-loop
name: Ralph Loop
category: Automation Accelerators
pathAvailability:
  - Ralph
sharedSkill: false
sourceInspiration:
  - Ralph
  - ECC
---

# Ralph Loop

## Why This Exists

This document exists to guide you smoothly without overwhelming bureaucracy. It is designed to be a living, conversational document.

## Purpose

Provide the Ralph Loop workflow in the ECC-Fusion routed system.

## Trigger

Use when the active command or route calls for `ralph-loop`.

## When To Use

- The route prerequisites are present.
- The task matches the declared category.
- The requested path is one of: Ralph.

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

1. Operate only on prepared bounded packets.
2. Respect iteration, command, file, and stop-condition limits.
3. Return status and evidence after every loop.

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

`ralph-loop` should produce a compact result with route, rationale, blockers, and next command.

## Maintenance Note

Keep this skill concise and synchronized with manifests and docs.
