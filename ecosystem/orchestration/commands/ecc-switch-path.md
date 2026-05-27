# /ecc-switch-path

> Generated mirror. Canonical source: `commands/ecc-switch-path.md`.

| Field | Value |
| --- | --- |
| Command id | `ecc-switch-path` |
| Category | Work Packet & Delegation |
| Related skill | `path-switch` |
| Path availability | Short Path, Regular Path, Auto |
| State required | yes |
| Source inspiration | GSD Redux, ECC |

# /ecc-switch-path

Category: Work Packet & Delegation
Related skill: path-switch
State required: yes
Source inspiration: GSD Redux, ECC

## Purpose

Route /ecc-switch-path through the ECC-Fusion control plane while preserving ECC compatibility.

## Behavior

1. Read the current user request.
2. Apply source-of-truth precedence.
3. Check required state and prerequisites.
4. Invoke or recommend `path-switch`.
5. Emit a Transition Notice if required artifacts are missing.

## Workflow

1. Read current path state and the requested destination path.
2. Emit a Transition Notice that lists missing destination prerequisites.
3. Only update state after the user explicitly proceeds.

## Guardrails

- Preserve ECC compatibility and existing user-owned files.
- Keep source attribution visible when adapting external framework concepts.
- Stop at a Transition Notice when prerequisites are missing or risk exceeds the current path.

## Output

Return the route note, artifacts inspected, next command, and blockers.

