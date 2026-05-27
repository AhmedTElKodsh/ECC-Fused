# Orchestration & Transition Flow Map

This directory governs path switching, rules enforcement, and lifecycle validation. These are core capabilities ensuring the Harness ecosystem operates safely.

| Command/Skill Name | Description | Type |
|---|---|---|
| `path-switch` | Safely transitions between Short Path and Regular Path. | Workflow Command |
| `transition-guard` | Blocks unsafe transitions and emits a Transition Notice. | Safety Guardrail |
| `skill-lint` | Validates that skills adhere to the ECC-Fusion governance rules. | Linter |
| `package-check` | Safely inspects new dependencies before permitting installation. | Security Rule |
| `write-a-skill` | Scaffolds a new skill following the exact structure rules. | Meta-Skill |

## See Also
- [Workflow Diagrams](workflow-diagrams.md) for the visual representation of path switching.
