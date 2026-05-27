# /ecc-execute-packet

> Generated mirror. Canonical source: `commands/ecc-execute-packet.md`.

| Field | Value |
| --- | --- |
| Command id | `ecc-execute-packet` |
| Category | Implementation |
| Related skill | `implement-work-packet` |
| Path availability | Short Path, Regular Path, Auto |
| State required | yes |
| Source inspiration | GSD Redux, ECC |

# /ecc-execute-packet

Category: Implementation
Related skill: implement-work-packet
State required: yes
Source inspiration: GSD Redux, ECC

## Purpose

Route /ecc-execute-packet through the ECC-Fusion control plane while preserving ECC compatibility.

## Behavior

1. Read the current user request.
2. Apply source-of-truth precedence.
3. Check required state and prerequisites.
4. Invoke or recommend `implement-work-packet`.
5. Emit a Transition Notice if required artifacts are missing.

## Workflow

1. Load the selected work packet completely.
2. Use test-first implementation where applicable.
3. Stop on packet boundary breach, repeated failure, or missing verification.

## Guardrails

- Preserve ECC compatibility and existing user-owned files.
- Keep source attribution visible when adapting external framework concepts.
- Stop at a Transition Notice when prerequisites are missing or risk exceeds the current path.

## Output

Return the route note, artifacts inspected, next command, and blockers.

