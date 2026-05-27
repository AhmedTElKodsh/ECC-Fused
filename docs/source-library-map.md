# Source Library Map

ECC-Fusion uses ECC as the base platform and adapts patterns from related agentic workflow systems. Attribution means "inspired by" unless a file explicitly states copied code and license compatibility.

Source libraries are provenance, not navigation. Users should navigate by path, phase, skill, and artifact. Maintainers use this map to prevent contradictory imports.

| Source | Contribution | Local surface | Adaptation rule | Status |
| --- | --- | --- | --- | --- |
| ECC | Cross-harness install/runtime surface, skills, commands, hooks, manifests | repository structure, manifests, commands, validation | ECC remains the base and wins install/runtime conflicts | Adapted |
| BMAD-METHOD | Advisory help, adaptive lifecycle, agents, PRD-to-architecture-to-story discipline | `/ecc-help`, Regular Path docs, party-mode review influence | use as guided governance, not as a parallel agent roster requirement | Adapted |
| Superpowers | Mandatory workflow discipline, TDD, verification-before-completion, subagent development | shared skill governance, TDD/verify/review patterns | use process discipline where phase gates require it | Adapted |
| Matt Pocock skills | Small composable skills, anti-bloat, shared language, developer control | skill category and lint rules, handoff/TDD influence | keep skills small and optional unless risk requires them | Adapted |
| GSD Redux | State loop, fresh contexts, `.planning`, work packets | planning artifacts, state docs, packets, path switching | use packets as execution boundaries | Adapted |
| gstack | Review, QA, release, retro discipline | QA and release route requirements | place late-lifecycle gates in Verify/Release/Learn | Adapted |
| OpenSpec | Schemas and configurable workflows | JSON schemas and manifests | validate contracts before adding more prose | Adapted |
| GitHub Spec Kit | Constitution/spec/plan/tasks/implement progression | Regular Path routing and artifact progression | map into Specify/Design/Plan/Build phases | Adapted |
| Agent OS | Concise indexed standards and context thrift | skill structure and docs | keep docs/indexes short enough for agent use | Adapted |
| Ralph | Bounded low-risk execution loop | Ralph eligibility and stop rules | never allow Ralph to replace planning | Adapted |

## Precedence Rule

When source-library guidance conflicts, apply this order:

1. Current user instruction.
2. Repository `AGENTS.md` and project docs.
3. ECC-Fusion path, phase, artifact, and safety contracts.
4. Explicit local skill invocation.
5. External source-library guidance.
6. General model knowledge.

Manifest entries must include `sourceInspiration` for adapted workflows.

## Validation

Run:

```powershell
npm.cmd test
npm.cmd run validate
```
