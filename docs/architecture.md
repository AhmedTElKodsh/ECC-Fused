# Architecture

## Purpose

Define the ECC-Fusion Architecture surface and keep it aligned with commands, skills, manifests, schemas, and planning artifacts.

## Required Behavior

- Preserve ECC compatibility.
- Apply source-of-truth precedence.
- Use Short Path only for bounded low-risk work.
- Use Regular Path for ambiguous, high-risk, multi-phase, or production-sensitive work.
- Emit a Transition Notice when prerequisites are missing.
- Verify claims with tests, checks, or documented evidence.

## Related Surfaces

- `commands/`
- `skills/`
- `schemas/`
- `planning-templates/`
- `rules/`

## Validation

Run:

```powershell
npm.cmd test
npm.cmd run validate
```
