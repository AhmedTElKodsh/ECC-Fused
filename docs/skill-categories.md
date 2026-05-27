# Skill Categories

Every ECC-Fusion skill has one primary category. Secondary tags are allowed, but routing and linting use the primary category. Categories describe functional ownership, not source-library branding.

## Canonical Categories

| Category | Lifecycle phase | Purpose |
| --- | --- | --- |
| Discovery & Help | Orient | route, status, next legal step |
| Clarification & Research | Orient/Scope | reduce ambiguity, inspect context, diagnose failures |
| Specification & Product | Specify | define behavior, acceptance criteria, examples, prototypes |
| Architecture & Planning | Design/Plan | architecture, ADRs, sequencing, technical plan |
| Work Packet & Delegation | Plan | bounded executable slices and path movement |
| Implementation | Build | execute a packet inside allowed boundaries |
| Testing & Verification | Verify | tests, regression checks, proof of completion |
| Review & Security | Verify | code review, threat review, external output review |
| QA & Release | Release | browser QA, release notes, deployment readiness |
| Documentation & Handoff | Release/Learn | handoff, summary, retro, context preservation |
| Memory & Context Management | Orient/Learn | context thrift, reusable memory, source precedence |
| Governance & Maintenance | Govern | lint, package check, skill authoring, manifest health |
| Automation Accelerators | Accelerate | bounded automation with stop rules |

## Category Rules

- A skill belongs in the catalog only when it captures a repeatable workflow, failure mode, process, or domain capability.
- A one-off prompt should remain a prompt, not a permanent skill.
- Duplicate triggers must be merged or made explicitly non-overlapping.
- Deprecated categories must keep compatibility aliases until manifests and docs are migrated.
- Source-library branding never overrides functional category placement.
- The user-facing phase map in `docs/path-phase-map.md` must stay consistent with `manifests/skills.json`.

## What Belongs In A Skill

Use a skill for:

- a workflow users repeat,
- a failure mode agents often mishandle,
- a domain process that needs stable instructions,
- an operation with reusable inputs/outputs,
- governance that can be validated by tests.

Do not use a skill for:

- a one-time idea,
- a source-library tribute,
- a command alias with no workflow,
- content that belongs in a schema, template, or documentation page.

## Validation

Run:

```powershell
npm.cmd test
npm.cmd run validate
```
