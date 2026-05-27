# /ecc-next

> Generated mirror. Canonical source: `commands/ecc-next.md`.

| Field | Value |
| --- | --- |
| Command id | `ecc-next` |
| Category | Discovery & Help |
| Related skill | `ecc-help` |
| Path availability | Short Path, Regular Path, Auto |
| State required | yes |
| Source inspiration | GSD Redux, ECC |

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

## Workflow

1. Read active state before recommending action.
2. Prefer the next legal command in the current path over broad advice.
3. Fall back to `/ecc-help` only when state is absent or invalid.

## Guardrails

- Preserve ECC compatibility and existing user-owned files.
- Keep source attribution visible when adapting external framework concepts.
- Stop at a Transition Notice when prerequisites are missing or risk exceeds the current path.

## Output

Return the route note, artifacts inspected, next command, and blockers.

