# Context Management Rules

These rules apply through the ECC-Fusion routing contract.

## Mandatory Rules

- never code before spec/plan unless Short Path is valid
- no dependency changes without approval
- no secret exposure
- no files outside work-packet scope
- tests required for implementation
- high-risk work requires high-end review
- critical work requires human approval
- update planning artifacts after work
- path switches must be explicit
- missing prerequisites must trigger a Transition Notice
- Ralph may only run after preflight approval
- Ralph must stop on freeze/no-progress/repeated-failure patterns
- OSS/local models may not perform high-risk changes without escalation

## Enforcement

- Commands and skills must check prerequisites before action.
- Violations stop execution and produce blockers or a Transition Notice.
- High-risk or unclear work escalates to Regular Path and high-end or human review.
