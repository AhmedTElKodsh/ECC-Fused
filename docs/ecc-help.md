# ECC Help

`/ecc-help` is the advisory router for users and agents who do not know the next safe action.

It does not replace `/ecc-next`. `/ecc-help` answers "what route should I take?" while `/ecc-next` answers "what is the next legal step in the current state?"

## Route Note

Every recommendation should be compact:

```text
Route: <Short Path | Regular Path | Auto | Ralph | Shared skill>
Reason: <one sentence>
Source priority: <winning sources in order>
Blocked: <yes | no>
Next artifact: <artifact or none>
Next command: <command or none>
```

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
