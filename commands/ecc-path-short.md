# /ecc-path-short

Category: Work Packet & Delegation
Related skill: path-switch
State required: yes
Source inspiration: GSD Redux, ECC

## Purpose

Route /ecc-path-short through the ECC-Fusion control plane while preserving ECC compatibility.

## Behavior

1. Read the current user request.
2. Apply source-of-truth precedence.
3. Check required state and prerequisites.
4. Invoke or recommend `path-switch`.
5. Emit a Transition Notice if required artifacts are missing.

## Workflow

1. Require a bounded low-risk objective and known file boundaries.
2. Create or update a work packet before implementation.
3. Block when ambiguity, security risk, dependency changes, or release impact require Regular Path.

## Guardrails

- Preserve ECC compatibility and existing user-owned files.
- Keep source attribution visible when adapting external framework concepts.
- Stop at a Transition Notice when prerequisites are missing or risk exceeds the current path.

## Output

Return the route note, artifacts inspected, next command, and blockers.
