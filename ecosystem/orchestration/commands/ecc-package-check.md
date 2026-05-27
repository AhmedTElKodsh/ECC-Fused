# /ecc-package-check

> Generated mirror. Canonical source: `commands/ecc-package-check.md`.

| Field | Value |
| --- | --- |
| Command id | `ecc-package-check` |
| Category | Governance & Maintenance |
| Related skill | `package-check` |
| Path availability | Short Path, Regular Path, Auto |
| State required | no |
| Source inspiration | OpenSpec, ECC |

# /ecc-package-check

Category: Governance & Maintenance
Related skill: package-check
State required: no
Source inspiration: OpenSpec, ECC

## Purpose

Route /ecc-package-check through the ECC-Fusion control plane while preserving ECC compatibility.

## Behavior

1. Read the current user request.
2. Apply source-of-truth precedence.
3. Check required state and prerequisites.
4. Invoke or recommend `package-check`.
5. Emit a Transition Notice if required artifacts are missing.

## Workflow

1. Validate installable package surfaces, manifests, schemas, commands, skills, docs, and rules.
2. Report managed versus user-owned files clearly.
3. Do not repair unless asked.

## Guardrails

- Preserve ECC compatibility and existing user-owned files.
- Keep source attribution visible when adapting external framework concepts.
- Stop at a Transition Notice when prerequisites are missing or risk exceeds the current path.

## Output

Return the route note, artifacts inspected, next command, and blockers.

