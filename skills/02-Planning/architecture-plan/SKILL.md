---
id: architecture-plan
name: Architecture Plan
category: Architecture & Planning
pathAvailability:
  - Regular Path
  - Auto
sharedSkill: true
sourceInspiration:
  - BMAD-METHOD
  - ECC
---

# Architecture Plan

## Why This Exists

This document exists to guide you smoothly without overwhelming bureaucracy. It is designed to be a living, conversational document.

## Purpose

Provide the Architecture Plan workflow in the ECC-Fusion routed system.

## Trigger

Use when the active command or route calls for `architecture-plan`.

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

1. **Ask One Question at a Time:** Do NOT dump a 20-point checklist on the user. Start with a single, high-level question (e.g., "What is the primary data flow?").
2. **Listen and Expand:** Use the user's answers to draft the architecture boundaries, interfaces, and tradeoffs.
3. **Draft the Artifact:** Write to `.planning/DESIGN.md` incrementally.
4. **Sandbox Prompts:** When asking for input, end with conversational hints like:
   * "If you aren't sure, say 'skip' and I'll draft a best guess."
   * "Say 'looks good' to approve the draft."
5. **Flag Risks:** Flag unresolved architecture risks before packetizing.

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

`architecture-plan` should produce a compact result with route, rationale, blockers, and next command.

## Maintenance Note

Keep this skill concise and synchronized with manifests and docs.
