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

## Output

Return the route note, artifacts inspected, next command, and blockers.
