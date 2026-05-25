# /ecc-help

Use this command when the user does not know what to do next, asks which path to choose, asks whether a shared skill can run, or requests help recovering from missing artifacts.

## Behavior

1. Inspect current user intent.
2. Inspect repository state and `.planning/state.yaml` when present.
3. Classify risk, ambiguity, artifact completeness, and requested skill or path.
4. Apply source-of-truth precedence.
5. Recommend Short Path, Regular Path, Auto, Ralph, or a shared skill.
6. Emit a Transition Notice when prerequisites are missing.

## Output

```text
Route: <Short Path | Regular Path | Auto | Ralph | Shared skill>
Reason: <one sentence>
Source priority: <winning sources in order>
Blocked: <yes | no>
Next artifact: <artifact or none>
Next command: <command or none>
```

## Safety

`/ecc-help` is advisory by default. It must not create artifacts, run implementation, or invoke Ralph unless the user explicitly asks to proceed.
