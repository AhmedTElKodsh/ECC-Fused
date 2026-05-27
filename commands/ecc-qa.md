# /ecc-qa

Category: QA & Release
Related skill: qa-browser
State required: yes
Source inspiration: gstack, ECC

## Purpose

Route /ecc-qa through the ECC-Fusion control plane while preserving ECC compatibility.

## Behavior

1. Read the current user request.
2. Apply source-of-truth precedence.
3. Check required state and prerequisites.
4. Invoke or recommend `qa-browser`.
5. Emit a Transition Notice if required artifacts are missing.

## Workflow

1. Run browser or end-to-end checks only after implementation verification is green.
2. Record scenario, environment, result, and evidence.
3. Block release when user-path proof is missing.

## Guardrails

- Preserve ECC compatibility and existing user-owned files.
- Keep source attribution visible when adapting external framework concepts.
- Stop at a Transition Notice when prerequisites are missing or risk exceeds the current path.

## Output

Return the route note, artifacts inspected, next command, and blockers.
