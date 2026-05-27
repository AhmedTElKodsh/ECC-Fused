# /ecc-plan

Category: Architecture & Planning
Related skill: architecture-plan
State required: yes
Source inspiration: BMAD-METHOD, ECC

## Purpose

Route /ecc-plan through the ECC-Fusion control plane while preserving ECC compatibility.

## Behavior

1. Read the current user request.
2. Apply source-of-truth precedence.
3. Check required state and prerequisites.
4. Invoke or recommend `architecture-plan`.
5. Emit a Transition Notice if required artifacts are missing.

## Workflow

1. Convert approved spec and architecture into implementation sequencing.
2. Name files, tests, acceptance criteria, and verification gates.
3. Keep plan slices independently reviewable.

## Guardrails

- Preserve ECC compatibility and existing user-owned files.
- Keep source attribution visible when adapting external framework concepts.
- Stop at a Transition Notice when prerequisites are missing or risk exceeds the current path.

## Output

Return the route note, artifacts inspected, next command, and blockers.
