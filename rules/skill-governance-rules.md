# Skill Governance Rules

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

## Skill Folder and MAP Enforcement

- All new skills **must** be placed in the appropriate `skills/<Phase>/` folder (e.g., `01-Discovery`, `02-Planning`, `03-Implementation`, `04-Testing-and-QA`, `05-Review-and-Release`) or the `orchestration/` folder.
- You **must** update the `MAP.md` file within that folder when adding or removing a skill. The `MAP.md` must contain the skill name, a brief description, and the source library.
- Orchestration commands, transitions, and rules strictly belong in `orchestration/` to separate them from the standard software lifecycle skills.
- The `skill-lint` tool enforces this exact structure and will fail if a `SKILL.md` exists without a matching entry in a `MAP.md` file.
