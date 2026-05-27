# /ecc-route

Category: Work Packet & Delegation
Related skill: path-switch
State required: yes
Source inspiration: ECC

## Purpose

Route /ecc-route through the ECC-Fusion control plane while preserving ECC compatibility.

## Behavior

1. Read the current user request.
2. Apply source-of-truth precedence.
3. Check required state and prerequisites.
4. Invoke or recommend `path-switch`.
5. Emit a Transition Notice if required artifacts are missing.

## Workflow

1. Classify intent, path, risk, and prerequisites.
2. Explain the winning source of truth.
3. Return the target command without executing it unless explicitly requested.

## Guardrails

- Preserve ECC compatibility and existing user-owned files.
- Keep source attribution visible when adapting external framework concepts.
- Stop at a Transition Notice when prerequisites are missing or risk exceeds the current path.

## Output

Return the route note, artifacts inspected, next command, and blockers.
