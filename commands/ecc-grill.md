# /ecc-grill

Category: Clarification & Research
Related skill: grill-with-context
State required: no
Source inspiration: Superpowers, Matt Pocock skills, ECC

## Purpose

Route /ecc-grill through the ECC-Fusion control plane while preserving ECC compatibility.

## Behavior

1. Read the current user request.
2. Apply source-of-truth precedence.
3. Check required state and prerequisites.
4. Invoke or recommend `grill-with-context`.
5. Emit a Transition Notice if required artifacts are missing.

## Workflow

1. Interrogate assumptions, users, constraints, risks, and success criteria.
2. Stop after producing clarified decisions and open questions.
3. Do not create implementation artifacts unless the user proceeds.

## Guardrails

- Preserve ECC compatibility and existing user-owned files.
- Keep source attribution visible when adapting external framework concepts.
- Stop at a Transition Notice when prerequisites are missing or risk exceeds the current path.

## Output

Return the route note, artifacts inspected, next command, and blockers.
