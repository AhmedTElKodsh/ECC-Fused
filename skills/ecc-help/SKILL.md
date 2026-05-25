---
id: ecc-help
name: ECC Help
category: Discovery & Help
pathAvailability:
  - Short Path
  - Regular Path
  - Auto
sharedSkill: true
sourceInspiration:
  - BMAD-METHOD
  - ECC
  - Agent OS
---

# ECC Help

## Purpose

Recommend the next safe ECC-Fusion route when the user is unsure, when path choice is ambiguous, or when a requested skill may be blocked by missing prerequisites.

## Trigger

Use when the user says "I do not know what to do next", asks which path to choose, asks for `/ecc-help`, asks whether a shared skill can run, or appears blocked by missing artifacts.

## When To Use

- Choosing Short Path, Regular Path, Auto, Ralph, or a shared skill.
- Explaining why a path is selected.
- Detecting missing prerequisites before execution.
- Recovering from partial state or unclear artifacts.

## When Not To Use

- The user already gave a clear implementation command with valid prerequisites.
- A stateful `/ecc-next` decision is required inside an active path.
- The task is Ralph execution rather than Ralph eligibility advice.

## Inputs

- Current user request.
- `AGENTS.md` and project agent docs.
- `.planning/state.yaml` or `.planning/STATE.md` when present.
- Relevant specs, plans, work packets, reviews, QA notes, and manifests.

## Outputs

Return a compact route note:

```text
Route: <Short Path | Regular Path | Auto | Ralph | Shared skill>
Reason: <one sentence>
Source priority: <winning sources in order>
Blocked: <yes | no>
Next artifact: <artifact or none>
Next command: <command or none>
```

If blocked, emit the standard Transition Notice.

## Workflow Steps

1. Classify user intent.
2. Inspect repo state and artifact completeness.
3. Classify risk and ambiguity.
4. Check requested skill prerequisites.
5. Apply source-of-truth precedence.
6. Recommend the safest valid route.
7. List next command and artifact.
8. Stop before execution unless the user explicitly approves.

## Verification Requirements

- Route decision names a path or skill.
- Reason cites risk, ambiguity, artifacts, or explicit user intent.
- Missing prerequisites produce a Transition Notice.
- Ralph is recommended only for bounded low-risk packets with feedback loops.

## Escalation Rules

Escalate to Regular Path when the request is ambiguous, high-risk, multi-phase, production-sensitive, security-sensitive, or missing required artifacts.

## Examples

```text
Route: Short Path
Reason: bounded low-risk UI copy change
Source priority: user request > ECC-Fusion routing rules
Blocked: no
Next artifact: work packet
Next command: /ecc-path-short
```

## Maintenance Note

Keep this skill advisory, compact, and synchronized with `commands/ecc-help.md`, `docs/ecc-help.md`, and `manifests/skills.json`.
