# /ecc-retro

Category: Documentation & Handoff
Related skill: retro-learn
State required: yes
Source inspiration: gstack, ECC

## Purpose

Route /ecc-retro through the ECC-Fusion control plane while preserving ECC compatibility.

## Behavior

1. Read the current user request.
2. Apply source-of-truth precedence.
3. Check required state and prerequisites.
4. Invoke or recommend `retro-learn`.
5. Emit a Transition Notice if required artifacts are missing.

## Workflow

1. Summarize completed scope, evidence, misses, and lessons.
2. Capture follow-up work as explicit items.
3. Do not reopen implementation unless a blocker is found.

## Guardrails

- Preserve ECC compatibility and existing user-owned files.
- Keep source attribution visible when adapting external framework concepts.
- Stop at a Transition Notice when prerequisites are missing or risk exceeds the current path.

## Output

Return the route note, artifacts inspected, next command, and blockers.
