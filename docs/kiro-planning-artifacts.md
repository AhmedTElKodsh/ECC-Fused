# Kiro Planning Artifacts

ECC-Fusion uses Kiro-style visible planning artifacts so developers can see how the agent understood requirements, how it designed the solution, what tasks it will execute, and where testing/QA work stands.

## Artifact Flow

```mermaid
flowchart LR
  A["Discovery & Help"] --> B["requirements.md"]
  B --> C["design/"]
  C --> D["tasks.md"]
  D --> E["qa-tasks.md"]
  E --> F["release or handoff"]
```

## Files

| File | Created from | Purpose |
| --- | --- | --- |
| `requirements.md` | Discovery, clarification, specification skills | user stories, requirements, acceptance criteria, optional developer decisions |
| `design/` | Architecture, planning, work-packet skills | architecture decisions, implementation direction, work packet strategy |
| `tasks.md` | planning and work-packet skills | one-by-one implementation checklist with status markers |
| `qa-tasks.md` | testing, debugging, review, security, QA skills | rigorous testing and QA checklist with evidence |

## Status Markers

- `[ ]` not started
- `[x]` complete and verified
- `[?]` optional or developer decision needed
- `[!]` blocked

## Validation

Run:

```powershell
npm.cmd test
npm.cmd run validate
```
