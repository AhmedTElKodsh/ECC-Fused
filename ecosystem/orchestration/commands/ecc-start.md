# /ecc-start

> Generated mirror. Canonical source: `commands/ecc-start.md`.

| Field | Value |
| --- | --- |
| Command id | `ecc-start` |
| Category | Discovery & Help |
| Related skill | `ecc-help` |
| Path availability | Short Path, Regular Path, Auto |
| State required | no |
| Source inspiration | ECC |

# /ecc-start

Category: Discovery & Help
Related skill: ecc-help
State required: no
Source inspiration: ECC

## Purpose

Route /ecc-start through the ECC-Fusion control plane while preserving ECC compatibility.

## Behavior

1. Read the current user request.
2. Apply source-of-truth precedence.
3. Check required state and prerequisites.
4. Invoke or recommend `ecc-help`.
5. Emit a Transition Notice if required artifacts are missing.

## Workflow

1. Detect whether the repo is new, partially initialized, or already inside an ECC-Fusion path.
2. Recommend `/ecc-help` for route discovery unless the user explicitly requested a feature start.
3. Do not create planning artifacts until the chosen path is explicit.

## Guardrails

- Preserve ECC compatibility and existing user-owned files.
- Keep source attribution visible when adapting external framework concepts.
- Stop at a Transition Notice when prerequisites are missing or risk exceeds the current path.

## Output

Return the route note, artifacts inspected, next command, and blockers.

