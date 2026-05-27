# Path Switching

Path switching lets ECC-Fusion start fast and still become fully governed when the work demands it.

## Promotion Flow

```mermaid
flowchart TD
  A["Short Path route"] --> B["Work packet"]
  B --> C["Implementation or verification"]
  C --> D{"Escalation trigger?"}
  D -->|No| E["Finish Short Path"]
  D -->|Yes| F["Transition Notice"]
  F --> G["Missing artifacts checklist"]
  G --> H["Recommended Regular Path command"]
```

## Required Behavior

- Preserve useful evidence when promoting from Short Path to Regular Path.
- Do not create missing Regular Path prerequisites silently unless the user asked for artifact generation.
- Apply ECC-Fusion contracts over conflicting source-library guidance unless the user explicitly overrides them.

## Validation

Run:

```powershell
npm.cmd test
npm.cmd run validate
```
