# Kiro-Style Planning Artifact Set

## Why This Exists

This document exists to guide you smoothly without overwhelming bureaucracy. It is designed to be a living, conversational document.

## Purpose

This folder defines the visible planning surfaces ECC-Fusion uses to keep developers in sync with agent work.

## Artifact Flow

```mermaid
flowchart LR
  A["Discovery and help"] --> B["requirements.md"]
  B --> C["design/"]
  C --> D["tasks.md"]
  D --> E["qa-tasks.md"]
  E --> F["handoff or release"]
```

## Files

- `requirements-template.md`: visible understanding of user stories, requirements, acceptance criteria, optional decisions, and open questions.
- `design/`: architecture, path decisions, work packet strategy, interfaces, testing strategy, and risks.
- `tasks-template.md`: implementation checklist with status markers.
- `qa-tasks-template.md`: testing, debugging, review, security, and QA checklist with status markers.

## Verification

- Every task uses `[ ]`, `[x]`, or `[?]`.
- Optional tasks are marked `Optional`.
- User decision points are marked `Decision needed`.

## Blockers

- Missing requirements, design, tasks, or QA task files block Regular Path readiness.
