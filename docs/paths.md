# ECC-Fusion Paths

ECC-Fusion has two primary paths and one advisory auto-selection mode.

## Short Path

Use Short Path for bounded, low-risk, low-ambiguity work. It still requires a work packet and verification.

## Regular Path

Use Regular Path for ambiguous, high-risk, multi-phase, production-sensitive, architecture-sensitive, or release-sensitive work.

## Auto

Auto inspects user intent, repository state, risk, ambiguity, artifacts, and prerequisites, then emits a route note.

## Decision Matrix

| Intent | Risk | Ambiguity | Required artifacts | Selected route | Fallback |
| --- | --- | --- | --- | --- | --- |
| Bounded bug fix | Low | Low | Work packet, tests | Short Path | Regular Path if scope grows |
| Ambiguous product request | Medium/High | High | Spec, architecture, plan | Regular Path | `/ecc-help` explains missing inputs |
| PRD/spec request | Medium | Medium/High | Requirements and spec | Regular Path | Ask interview/grill first |
| Code review | Medium/High | Medium | Diff, scope, tests | Shared review skill | Transition Notice if artifacts missing |
| Test generation | Low/Medium | Low/Medium | Target behavior and test command | Shared test skill | Clarify-lite if behavior unclear |
| Explicit skill invocation | Varies | Varies | Skill prerequisites | Invoked skill | Transition Notice or refusal |
| Ralph request | Low only | Low | Bounded packet and feedback loop | Ralph | Redirect to packetize or Regular Path |
| Install/repair/upgrade | Medium/High | Medium | Backup, dry run, conflict report | Regular Path | Stop on unsafe overwrite |
