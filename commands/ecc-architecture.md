# /ecc-architecture

Category: Architecture & Planning
Related skill: architecture-plan
State required: yes
Source inspiration: BMAD-METHOD, ECC

## Purpose

Route /ecc-architecture through the ECC-Fusion control plane while preserving ECC compatibility.

## Behavior

1. Read the current user request.
2. Apply source-of-truth precedence.
3. Check required state and prerequisites.
4. Invoke or recommend `architecture-plan`.
5. Emit a Transition Notice if required artifacts are missing.

## Output

Return the route note, artifacts inspected, next command, and blockers.
