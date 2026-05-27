# /ecc-status

> Generated mirror. Canonical source: `commands/ecc-status.md`.

| Field | Value |
| --- | --- |
| Command id | `ecc-status` |
| Category | Discovery & Help |
| Related skill | `ecc-help` |
| Path availability | Short Path, Regular Path, Auto |
| State required | yes |
| Source inspiration | ECC |

# /ecc-status

Category: Discovery & Help
Related skill: ecc-help
State required: yes
Source inspiration: ECC

## Purpose

Route /ecc-status through the ECC-Fusion control plane while preserving ECC compatibility.

## Behavior

1. Read the current user request.
2. Apply source-of-truth precedence.
3. Check required state and prerequisites.
4. Invoke or recommend `ecc-help`.
5. Emit a Transition Notice if required artifacts are missing.

## Workflow

1. Summarize current path, active artifact, blockers, and last verification evidence.
2. Do not mutate artifacts.
3. Report missing or unreadable state as a blocker with `/ecc-help` as the next command.

## Guardrails

- Preserve ECC compatibility and existing user-owned files.
- Keep source attribution visible when adapting external framework concepts.
- Stop at a Transition Notice when prerequisites are missing or risk exceeds the current path.

## Output

Return the route note, artifacts inspected, next command, and blockers.

