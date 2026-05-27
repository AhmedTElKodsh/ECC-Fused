# Install And Compatibility

## Purpose

Define the ECC-Fusion install, repair, doctor, status, uninstall, rollback, lifecycle, selective install, hook runtime, and cross-harness compatibility surface.

## Compatibility Contract

- Preserve ECC as the base platform for commands, skills, manifests, hooks, agent instructions, MCP configuration, and cross-harness layout.
- Treat `AGENTS.md`, user-authored commands, user-authored skills, hooks, manifests, and MCP configuration as user-owned unless they are explicitly marked as ECC-Fusion managed.
- Support Windows PowerShell paths with spaces for every install, repair, doctor, status, uninstall, and rollback smoke path.
- Keep managed-file boundaries visible in package checks and lifecycle reports.

## Install

- Support dry run before writing files.
- Detect conflicts before overwrite.
- Create backups before replacing managed files.
- Preserve user-owned files unless the user explicitly approves a managed replacement.
- Support selective install of commands, skills, manifests, docs, schemas, rules, and planning templates.

## Repair

- Repair must be idempotent.
- Repair may restore missing managed files.
- Repair must not silently rewrite `AGENTS.md`, manifests, commands, skills, hooks, or MCP configs.
- Repair must report conflicts and skipped user-owned files.

## Doctor

- Doctor must inspect required commands, skills, manifests, schemas, rules, planning templates, docs, README, and source attribution.
- Doctor must distinguish missing files, invalid files, stale manifest entries, duplicate command aliases, duplicate skill ids, and unsafe overwrite risk.
- Doctor must report verification commands and whether they were executed.

## Status

- Status must report installed version, active path state when present, managed files, pending conflicts, last validation result, and rollback availability.
- Status must not mutate files.

## Uninstall

- Uninstall must remove only managed ECC-Fusion surfaces.
- Uninstall must preserve user-owned project files, `AGENTS.md`, non-managed hooks, and non-managed MCP configuration.
- Uninstall must support dry run and conflict reporting.

## Rollback

- Rollback must use recorded backups and implementation logs to restore the previous known-good managed state.
- Rollback must report files restored, files skipped, conflicts, and verification commands.
- Rollback must stop when backup metadata is missing or ambiguous.

## Smoke Matrix

| Operation | Required smoke coverage | Safety gate |
| --- | --- | --- |
| install | dry run, conflict detection, backup before overwrite, Windows path with spaces | no silent overwrite |
| repair | idempotency, missing managed file restore, user-owned file preservation | no silent rewrite |
| doctor | required surface scan, stale manifest detection, duplicate detection | report only |
| status | installed state, validation result, rollback availability | report only |
| uninstall | dry run, managed-only removal, user file preservation | no user-owned removal |
| rollback | backup restore, ambiguous backup halt, verification note | previous known-good only |

## Validation

Run:

```powershell
npm.cmd test
npm.cmd run validate
```
