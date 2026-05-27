# /ecc-review

Category: Review & Security
Related skill: review-oss-output
State required: yes
Source inspiration: gstack, ECC

## Purpose

Route /ecc-review through the ECC-Fusion control plane while preserving ECC compatibility.

## Behavior

1. Read the current user request.
2. Apply source-of-truth precedence.
3. Check required state and prerequisites.
4. Invoke or recommend `review-oss-output`.
5. Emit a Transition Notice if required artifacts are missing.

## Workflow

1. Review changed files and relevant artifacts for correctness, maintainability, and regression risk.
2. Lead with findings and file references.
3. Require follow-up tasks for blocking findings.

## Guardrails

- Preserve ECC compatibility and existing user-owned files.
- Keep source attribution visible when adapting external framework concepts.
- Stop at a Transition Notice when prerequisites are missing or risk exceeds the current path.

## Output

Return the route note, artifacts inspected, next command, and blockers.
