# /ecc-spec

Category: Specification & Product
Related skill: write-spec
State required: yes
Source inspiration: BMAD-METHOD, ECC

## Purpose

Route /ecc-spec through the ECC-Fusion control plane while preserving ECC compatibility.

## Behavior

1. Read the current user request.
2. Apply source-of-truth precedence.
3. Check required state and prerequisites.
4. Invoke or recommend `write-spec`.
5. Emit a Transition Notice if required artifacts are missing.

## Workflow

1. Turn the selected intent into a product/spec artifact.
2. Include acceptance criteria, non-goals, risks, and verification expectations.
3. Block if stakeholder, scope, or success criteria are too ambiguous.

## Guardrails

- Preserve ECC compatibility and existing user-owned files.
- Keep source attribution visible when adapting external framework concepts.
- Stop at a Transition Notice when prerequisites are missing or risk exceeds the current path.

## Output

Return the route note, artifacts inspected, next command, and blockers.
