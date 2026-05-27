# ECC Help

`/ecc-help` is the advisory router for users and agents who do not know the next safe action. It answers "which path, phase, skill, artifact, and command should I use next?"

It does not replace `/ecc-next`. `/ecc-help` recommends a route. `/ecc-next` reports the next legal step in the current state.

## Authority Boundary

`/ecc-help` is advisory by default. It can recommend Short Path, Regular Path, Auto mode, Ralph, or a shared skill, but it must not create artifacts, run implementation, invoke Ralph, or overwrite state unless the user explicitly asks to proceed.

If the user explicitly chooses a valid path, `/ecc-help` should explain risks and prerequisites rather than override the user.

## Inputs Considered

- current user instruction,
- `AGENTS.md` and project agent docs,
- domain docs, ADRs, planning artifacts, and current state,
- ECC-Fusion manifests, schemas, and routing contracts,
- explicit local skills,
- installed global skills and source-library guidance,
- model/tool availability and verification commands.

## Route Note

Every recommendation should be compact:

```text
Route: <Short Path | Regular Path | Auto | Ralph | Shared skill>
Phase: <Orient | Scope | Specify | Design | Plan | Build | Verify | Release | Learn | Govern | Accelerate>
Reason: <one sentence>
Source priority: <winning sources in order>
Blocked: <yes | no>
Next artifact: <artifact or none>
Next command: <command or none>
Escalation trigger: <condition or none>
```

## Decision Matrix

| Intent | Risk | Ambiguity | Required artifacts | Selected route | Fallback |
| --- | --- | --- | --- | --- | --- |
| Bounded bug fix | Low | Low | Work packet, tests | Short Path | Regular Path if scope grows |
| Ambiguous product request | Medium/High | High | Spec, architecture, plan | Regular Path | `/ecc-help` explains missing inputs |
| PRD/spec request | Medium | Medium/High | Requirements and spec | Regular Path | Ask interview/grill first |
| Architecture request | High | Medium | Domain docs, ADRs, constraints | Regular Path | Ask interview/grill first |
| Code review | Medium/High | Medium | Diff, scope, tests | Shared review skill | Transition Notice if artifacts missing |
| Test generation | Low/Medium | Low/Medium | Target behavior and test command | Shared test skill | Clarify-lite if behavior unclear |
| Explicit skill invocation | Varies | Varies | Skill prerequisites | Invoked skill | Transition Notice or refusal |
| Conflicting source-library guidance | Medium | High | Source map and repo instructions | Regular Path | Transition Notice before adopting external guidance |
| Missing prerequisites | Medium | High | State and required artifacts | Auto | `/ecc-help` lists blockers |
| Unsupported install/tool | High | Medium | Install contract and managed-file boundary | Regular Path | `/ecc-package-check` before changes |
| Ralph request | Low only | Low | Bounded packet and feedback loop | Ralph | Redirect to packetize or Regular Path |
| Install/repair/upgrade | Medium/High | Medium | Backup, dry run, conflict report | Regular Path | Stop on unsafe overwrite |
| Duplicate skill name | Medium | Low | Skill manifest | Shared lint skill | Transition Notice until manifest is clean |
| Duplicate command alias | Medium | Low | Command manifest | Shared lint skill | Transition Notice until manifest is clean |
| Stale manifest entry | Medium | Low | Manifest and filesystem | Shared package check | Transition Notice until package check passes |
| Missing source attribution | Medium | Low | Source-library map and manifests | Shared lint skill | Transition Notice until attribution is restored |

## Source Precedence

1. Current user instruction.
2. Repository `AGENTS.md` and project agent docs.
3. Project domain docs, ADRs, and planning artifacts.
4. ECC-Fusion state, manifests, schemas, and routing contracts.
5. Explicitly invoked local skills.
6. Installed global skills and external framework guidance.
7. General model knowledge.

## Blocked Routes

When prerequisites are missing, `/ecc-help` emits a Transition Notice and stops before execution.

## Examples

| User says | Likely route | Why |
| --- | --- | --- |
| "Fix this typo and run tests" | Short Path | bounded, reversible, low ambiguity |
| "Build a new onboarding flow" | Regular Path | product, UX, implementation, and release questions exist |
| "I do not know what I need" | Auto | `/ecc-help` should classify task and recommend next command |
| "Run Ralph on this packet" | Ralph if eligible | only valid when a bounded packet and feedback loop exist |
| "Continue Short Path as full spec workflow" | Regular Path promotion | Transition Notice lists missing artifacts and preserves evidence |

## Validation

Run:

```powershell
npm.cmd test
npm.cmd run validate
```
