# /ecc-ship

Category: QA & Release
Related skill: ship-release
State required: yes
Source inspiration: gstack, ECC

## Purpose

Route /ecc-ship through the ECC-Fusion control plane while preserving ECC compatibility.

## Behavior

1. Read the current user request.
2. Apply source-of-truth precedence.
3. Check required state and prerequisites.
4. Invoke or recommend `ship-release`.
5. Emit a Transition Notice if required artifacts are missing.

## Workflow

1. Check verification, review, QA, docs, and rollback readiness.
2. Produce a release note or ship decision.
3. Do not ship with unresolved blockers.

## Guardrails

- Preserve ECC compatibility and existing user-owned files.
- Keep source attribution visible when adapting external framework concepts.
- Stop at a Transition Notice when prerequisites are missing or risk exceeds the current path.

## Output

Return the route note, artifacts inspected, next command, and blockers.
