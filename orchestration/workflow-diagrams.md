# Orchestration Workflow Diagrams

This document visually represents the transition flows and routing rules for the ECC-Fusion library.

## Short Path vs Regular Path

```mermaid
flowchart TD
    A[User loads ECC-Fusion] --> B{Choose path}
    B -->|Short Path| C[Short Path facade]
    B -->|Regular Path| D[Regular Path facade]
    B -->|Auto| E[Inspect risk, ambiguity, artifacts, and repo state]
    E -->|Low-risk or narrowly scoped| C
    E -->|Ambiguous, high-risk, or multi-phase| D

    C --> C1[Clarify-lite]
    C1 --> C2[Create or update a bounded work packet]
    C2 --> C3[Implement]
    C3 --> C4[Verify]
    C4 --> C5{Need deeper rigor or user asks for it?}
    C5 -->|No| C6[Done or handoff]
    C5 -->|Yes| T1[Transition Notice]

    D --> D1[Grill with context]
    D1 --> D2[Spec]
    D2 --> D3[Prototype if useful]
    D3 --> D4[Architecture]
    D4 --> D5[Plan]
    D5 --> D6[Stories and work packets]
    D6 --> D7[Execute]
    D7 --> D8[Verify]
    D8 --> D9[Review]
    D9 --> D10[QA]
    D10 --> D11[Ship]
    D11 --> D12[Retro]

    C --> S1[Shared skills anytime]
    D --> S1
    S1[Verify / Review / Security Review / QA / Docs / Handoff / Status]

    T1 --> T2{Missing prerequisites?}
    T2 -->|Yes| T3[List missing files, commands, and created artifacts]
    T3 --> T4[Ask user to reply Proceed or Continue]
    T4 --> D
    T2 -->|No| D

    D6 --> R0{User calls Ralph skill?}
    R0 -->|No| D7
    R0 -->|Yes| R1[Run Ralph preflight gate]
    R1 -->|Low-risk bounded packet + feedback loops present| R2[Ralph loop]
    R1 -->|Too risky, too broad, or unstable| R3[Redirect to packetize, plan, review, or regular execution]

    R2 --> R4{Freeze, overload, repeated failure, or no progress?}
    R4 -->|Yes| R5[Stop Ralph, preserve diagnostics, return to Regular Path]
    R4 -->|No| D8
```

## Kiro Pipeline (Planning & Intervention)

```mermaid
flowchart LR
    A[Discovery/Clarify] --> B[REQUIREMENTS.md]
    B --> C[Architecture/Plan]
    C --> D[DESIGN/ Folder]
    D --> E[TASKS.md]
    E --> F{Developer Reviews Tasks}
    F -->|Approves| G[Execution]
    F -->|Modifies/Intervenes| E
```
