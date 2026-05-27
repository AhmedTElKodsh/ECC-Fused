# /ecc-path-regular

> Generated mirror. Canonical source: `commands/ecc-path-regular.md`.

| Field | Value |
| --- | --- |
| Command id | `ecc-path-regular` |
| Category | Architecture & Planning |
| Related skill | `path-switch` |
| Path availability | Short Path, Regular Path, Auto |
| State required | yes |
| Source inspiration | BMAD-METHOD, ECC |

# /ecc-path-regular

Category: Architecture & Planning
Related skill: path-switch
State required: yes
Source inspiration: BMAD-METHOD, ECC

## Purpose

Route /ecc-path-regular through the ECC-Fusion control plane while preserving ECC compatibility.

## Behavior

1. Read the current user request.
2. Apply source-of-truth precedence.
3. Check required state and prerequisites.
4. Invoke or recommend `path-switch`.
5. Emit a Transition Notice if required artifacts are missing.

## Workflow

1. Require or create specification and architecture artifacts before work packets.
2. Sequence spec, architecture, plan, packetize, implement, verify, review, and ship.
3. Block direct implementation when product or architecture intent is unresolved.

## Guardrails

- Preserve ECC compatibility and existing user-owned files.
- Keep source attribution visible when adapting external framework concepts.
- Stop at a Transition Notice when prerequisites are missing or risk exceeds the current path.

## Output

Return the route note, artifacts inspected, next command, and blockers.

