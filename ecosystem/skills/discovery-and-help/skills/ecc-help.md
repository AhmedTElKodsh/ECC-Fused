# ECC Help

> Generated mirror. Canonical source: `skills/01-Discovery/ecc-help/SKILL.md`.

| Field | Value |
| --- | --- |
| Skill id | `ecc-help` |
| Category | Discovery & Help |
| Path availability | Short Path, Regular Path, Auto |
| Shared skill | yes |
| Source inspiration | BMAD-METHOD, ECC, Agent OS |

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

## Why This Exists

This document exists to guide you smoothly without overwhelming bureaucracy. It is designed to be a living, conversational document.

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

Return a conversational response guiding the user through triage.
Do not output raw routing data unless the user explicitly requests it.

Example Initial Output:
"👋 Welcome to ECC-Fusion! I'm here to help you get your project moving. What are you bringing to the table today?
[A] I have an idea, but no requirements yet.
[B] I have a PRD or some rough requirements.
[C] I just want to fix a bug or add a small feature to existing code.
[D] I want to explore what this tool can do."

## Workflow Steps

1. Greet the user conversationally.
2. Present the triage menu (A/B/C/D) to capture their current state.
3. If they select [A], ask them to describe the main problem their app solves in one sentence, then propose drafting a PRD together.
4. If they select [B], review their PRD and ask if they are ready to break it into user stories.
5. If they select [C], verify prerequisites for the Short Path and proceed to create a work packet.
6. If they select [D], explain the basic lifecycle and offer a guided tour.
7. Always provide an "I don't know" escape hatch and offer recommendations if they are stuck.
8. Initialize `.planning/state.yaml` if it does not exist.

## Detailed Workflow

1. Use progressive disclosure. Do not overwhelm the user with jargon.
2. Instead of dumping a 5-page PRD on the user, draft a "Sandbox" template and ask them conversational questions (e.g., `[🤖 ECC-Fusion suggests: Add user login? -> Reply to me to add this!]`).
3. If the user freezes or types something confusing, gently clarify their intent or offer to make the decision for them.

## Required Evidence

- User intent classification.
- State or artifact files inspected.
- Winning source-priority chain.
- Missing prerequisites and next command when blocked.

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

