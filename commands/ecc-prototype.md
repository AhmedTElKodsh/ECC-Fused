# /ecc-prototype

Category: Specification & Product
Related skill: prototype-ui
State required: yes
Source inspiration: Superpowers, Matt Pocock skills, ECC

## Purpose

Route /ecc-prototype through the ECC-Fusion control plane while preserving ECC compatibility.

## Behavior

1. Read the current user request.
2. Apply source-of-truth precedence.
3. Check required state and prerequisites.
4. Invoke or recommend `prototype-ui`.
5. Emit a Transition Notice if required artifacts are missing.

## Workflow

1. Build only prototype-grade artifacts behind explicit scope boundaries.
2. Capture what the prototype proves or disproves.
3. Escalate to Regular Path before productionizing.

## Guardrails

- Preserve ECC compatibility and existing user-owned files.
- Keep source attribution visible when adapting external framework concepts.
- Stop at a Transition Notice when prerequisites are missing or risk exceeds the current path.

## Output

Return the route note, artifacts inspected, next command, and blockers.
