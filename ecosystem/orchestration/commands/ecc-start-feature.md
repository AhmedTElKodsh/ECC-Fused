# /ecc-start-feature

> Generated mirror. Canonical source: `commands/ecc-start-feature.md`.

| Field | Value |
| --- | --- |
| Command id | `ecc-start-feature` |
| Category | Discovery & Help |
| Related skill | `ecc-help` |
| Path availability | Short Path, Regular Path, Auto |
| State required | no |
| Source inspiration | ECC |

# /ecc-start-feature

Category: Discovery & Help
Related skill: ecc-help
State required: no
Source inspiration: ECC

## Purpose

Route /ecc-start-feature through the ECC-Fusion control plane while preserving ECC compatibility.

## Behavior

1. Read the current user request.
2. Apply source-of-truth precedence.
3. Check required state and prerequisites.
4. Invoke or recommend `ecc-help`.
5. Emit a Transition Notice if required artifacts are missing.

## Workflow

1. Capture the feature request in one sentence.
2. Use `/ecc-help` to choose Short Path, Regular Path, Auto, or Ralph eligibility.
3. Name the first artifact to create after the route is selected.

## Guardrails

- Preserve ECC compatibility and existing user-owned files.
- Keep source attribution visible when adapting external framework concepts.
- Stop at a Transition Notice when prerequisites are missing or risk exceeds the current path.

## Output

Return the route note, artifacts inspected, next command, and blockers.

