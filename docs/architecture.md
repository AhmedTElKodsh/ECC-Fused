# Architecture

ECC-Fusion architecture is a routed lifecycle, not a bundle of independent methodologies. ECC remains the base platform and every borrowed source-library practice must map into the same path, phase, artifact, and validation contracts.

## Core Contracts

| Contract | Purpose |
| --- | --- |
| Path contract | Defines Short Path, Regular Path, Auto mode, and Ralph eligibility |
| Phase contract | Defines the canonical lifecycle and phase ownership |
| Artifact contract | Defines durable outputs and required fields |
| Escalation contract | Defines when Short Path must promote to Regular Path |
| Skill invocation contract | Prevents duplicate or conflicting skills |
| Model routing contract | Bounds model capability variance |
| Documentation contract | Treats docs as the user interface |

## System Shape

```mermaid
flowchart TD
  U["User instruction"] --> R["/ecc-help router"]
  AG["AGENTS.md and project docs"] --> R
  ST["ECC-Fusion state, manifests, schemas"] --> R
  R --> P{"Path"}
  P -->|Short Path| S["Bounded work packet"]
  P -->|Regular Path| G["Spec-driven governance"]
  P -->|Ralph| A["Bounded automation loop"]
  S --> L["Canonical lifecycle phases"]
  G --> L
  A --> L
  L --> E["Verification evidence"]
```

## Critical Design Decision

ECC-Fusion should fuse by normalization, not accumulation: normalize source-library ideas into phases, execution into work packets, safety movement into Transition Notices, and skill placement into stable categories.

## Validation

Run:

```powershell
npm.cmd test
npm.cmd run validate
```
