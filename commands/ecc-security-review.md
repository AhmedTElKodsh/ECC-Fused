# /ecc-security-review

Category: Review & Security
Related skill: security-review
State required: yes
Source inspiration: gstack, ECC

## Purpose

Route /ecc-security-review through the ECC-Fusion control plane while preserving ECC compatibility.

## Behavior

1. Read the current user request.
2. Apply source-of-truth precedence.
3. Check required state and prerequisites.
4. Invoke or recommend `security-review`.
5. Emit a Transition Notice if required artifacts are missing.

## Workflow

1. Threat-model the touched surface and data flows.
2. Check secrets, auth, authorization, input handling, and dependency risk.
3. Escalate high-risk findings before implementation continues.

## Guardrails

- Preserve ECC compatibility and existing user-owned files.
- Keep source attribution visible when adapting external framework concepts.
- Stop at a Transition Notice when prerequisites are missing or risk exceeds the current path.

## Output

Return the route note, artifacts inspected, next command, and blockers.
