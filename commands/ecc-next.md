# /ecc-next

Category: Discovery & Help
Related skill: ecc-help
State required: yes
Source inspiration: GSD Redux, ECC

## Purpose

Route /ecc-next through the ECC-Fusion control plane while preserving ECC compatibility.

## Behavior

1. Read the current user request.
2. Apply source-of-truth precedence.
3. Check required state and prerequisites.
4. Invoke or recommend `ecc-help`.
5. Emit a Transition Notice if required artifacts are missing.

## Output

Return the route note, artifacts inspected, next command, and blockers.
