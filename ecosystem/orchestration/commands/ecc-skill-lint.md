# /ecc-skill-lint

> Generated mirror. Canonical source: `commands/ecc-skill-lint.md`.

| Field | Value |
| --- | --- |
| Command id | `ecc-skill-lint` |
| Category | Governance & Maintenance |
| Related skill | `skill-lint` |
| Path availability | Short Path, Regular Path, Auto |
| State required | no |
| Source inspiration | OpenSpec, ECC |

# /ecc-skill-lint

Category: Governance & Maintenance
Related skill: skill-lint
State required: no
Source inspiration: OpenSpec, ECC

## Purpose

Route /ecc-skill-lint through the ECC-Fusion control plane while preserving ECC compatibility.

## Behavior

1. Read the current user request.
2. Apply source-of-truth precedence.
3. Check required state and prerequisites.
4. Invoke or recommend `skill-lint`.
5. Emit a Transition Notice if required artifacts are missing.

## Workflow

1. Check skill metadata, trigger clarity, prerequisites, escalation, and verification sections.
2. Compare skills with manifests and command references.
3. Report drift as actionable file-specific findings.

## Guardrails

- Preserve ECC compatibility and existing user-owned files.
- Keep source attribution visible when adapting external framework concepts.
- Stop at a Transition Notice when prerequisites are missing or risk exceeds the current path.

## Output

Return the route note, artifacts inspected, next command, and blockers.

