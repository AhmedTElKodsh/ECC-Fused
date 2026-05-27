# Model Routing

Model routing assigns work to high-end, OSS/local, or human review tiers based on risk, ambiguity, context size, and evidence requirements.

## Honest Claim

The ECC Harness can reduce model-to-model variance by standardizing prompt frame, source precedence, context loading, artifact schemas, work packet boundaries, verification gates, escalation behavior, and handoff format. It cannot make a small model reason like a premium model on ambiguous architecture, product judgment, security, or release-critical work.

## Output Contract

```text
Model tier: <OSS/local | default | premium | human review>
Reason: <one sentence>
Allowed work: <bounded scope>
Required evidence: <tests/checks/review>
Escalation trigger: <condition>
```

## Validation

Run:

```powershell
npm.cmd test
npm.cmd run validate
```
