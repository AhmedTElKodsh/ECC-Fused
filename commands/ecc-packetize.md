# /ecc-packetize

Category: Work Packet & Delegation
Related skill: create-work-packets
State required: yes
Source inspiration: GSD Redux, ECC

## Purpose

Route /ecc-packetize through the ECC-Fusion control plane while preserving ECC compatibility.

## Behavior

1. Read the current user request.
2. Apply source-of-truth precedence.
3. Check required state and prerequisites.
4. Invoke or recommend `create-work-packets`.
5. Emit a Transition Notice if required artifacts are missing.

## Workflow

1. Create bounded work packets from the approved plan.
2. Define allowed files, forbidden files, tests, AC IDs, and escalation triggers.
3. Reject packets that mix planning, implementation, and release work.

## Guardrails

- Preserve ECC compatibility and existing user-owned files.
- Keep source attribution visible when adapting external framework concepts.
- Stop at a Transition Notice when prerequisites are missing or risk exceeds the current path.

## Output

Return the route note, artifacts inspected, next command, and blockers.
