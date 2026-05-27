# /ecc-ralph-stop

> Generated mirror. Canonical source: `commands/ecc-ralph-stop.md`.

| Field | Value |
| --- | --- |
| Command id | `ecc-ralph-stop` |
| Category | Automation Accelerators |
| Related skill | `ralph-loop` |
| Path availability | Ralph |
| State required | yes |
| Source inspiration | Ralph, ECC |

# /ecc-ralph-stop

Category: Automation Accelerators
Related skill: ralph-loop
State required: yes
Source inspiration: Ralph, ECC

## Purpose

Route /ecc-ralph-stop through the ECC-Fusion control plane while preserving ECC compatibility.

## Behavior

1. Read the current user request.
2. Apply source-of-truth precedence.
3. Check required state and prerequisites.
4. Invoke or recommend `ralph-loop`.
5. Emit a Transition Notice if required artifacts are missing.

## Workflow

1. Stop the active Ralph loop cleanly.
2. Record last known evidence and remaining work.
3. Preserve user changes and do not roll back without explicit instruction.

## Guardrails

- Preserve ECC compatibility and existing user-owned files.
- Keep source attribution visible when adapting external framework concepts.
- Stop at a Transition Notice when prerequisites are missing or risk exceeds the current path.

## Output

Return the route note, artifacts inspected, next command, and blockers.

