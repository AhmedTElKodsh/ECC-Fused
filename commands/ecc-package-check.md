# /ecc-package-check

Category: Governance & Maintenance
Related skill: package-check
State required: no
Source inspiration: OpenSpec, ECC

## Purpose

Route /ecc-package-check through the ECC-Fusion control plane while preserving ECC compatibility.

## Behavior

1. Read the current user request.
2. Apply source-of-truth precedence.
3. Check required state and prerequisites.
4. Invoke or recommend `package-check`.
5. Emit a Transition Notice if required artifacts are missing.

## Output

Return the route note, artifacts inspected, next command, and blockers.
