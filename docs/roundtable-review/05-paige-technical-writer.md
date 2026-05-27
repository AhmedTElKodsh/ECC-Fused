# 📚 Paige the Technical Writer

Thank you, everyone. Winston gave us the skeleton, Mary gave us the soul (or the lack of one), Amelia showed us the wiring that doesn't connect, and Murat proved the tests don't test the thing they claim to test. My job is the skin — the surface a human actually touches first. And right now, that surface is doing something deeply confused: it's trying to be both a technical reference *and* an onboarding journey at the same time, succeeding at neither.

Let me be direct. The documentation is currently a **filing system masquerading as a guide**. That's not a documentation problem — it's an architecture-of-communication problem. Let's fix every layer.

## 1. What the Documentation Architecture Is Actually Doing Right Now

The current architecture is **source-first, not reader-first**. It answers the question "where did this come from?" instead of "what can I do with this?"

This is the **parts manifest anti-pattern**. Imagine buying a flat-pack wardrobe and the first page of the manual is: "This product incorporates: Swedish particle board (FSC certified), German cam bolts (DIN standard), Chinese dowels (ISO 1234)..." You'd throw it across the room. You want: *"In 45 minutes you'll have somewhere to hang your clothes. Here's step one."*

Current structure, honestly mapped:

```
README.md          ← Bill of materials + installation
MAP.md files       ← Internal routing tables (for the AI, not for you)
Category folders   ← Filing system named after architectural decisions
skill files        ← Each skill is self-contained but context-free
planning artifacts ← Output dropped in a folder, not a conversation
```

Every layer answers the question the *system* has ("what skills exist? where are they filed?") not the question the *user* has ("I'm stuck. What do I do?").

What it needs to be:

```
README.md          ← Promise + First Win + Two Paths (no judgment)
QUICK_START.md     ← 5-minute win, junior-optimized
HOW_IT_WORKS.md    ← Mental model, not component list
docs/why/          ← The "why layer" — rationale behind every major pattern
docs/scenarios/    ← Goal-first navigation ("I want to build a feature")
skill files        ← Why + What + How (not just What + How)
planning artifacts ← Conversation log format, not bureaucratic form
```

## 2. How the README Should Be Restructured

The README is the **front door**. Right now it opens with "here's everything behind this door before you step inside." That's overwhelming and backward.

The hierarchy is different for different readers. Here's the map:

**Junior Developer needs (top-down):**
1. What does this do for me in one sentence?
2. What will I have after 10 minutes?
3. What's the ONE thing I type first?
4. Where do I go when that breaks?
5. What comes next, when I'm ready?

**Senior Developer needs (can scan, wants to jump):**
1. What's the mental model? (quick)
2. What are the extension points?
3. Where's the schema / spec / source?
4. How does it compose with my existing setup?
5. What are the known limitations?

These are not the same document. But they CAN live in the same README if you use progressive disclosure correctly.

**Proposed README structure:**

```markdown
# ECC-Fused

> One sentence: what you can do with this. Active voice. User as subject.

## What You'll Have in 10 Minutes
[A single concrete outcome. Not "you'll understand the system." 
A real artifact: a working story file, a passing plan, a generated spec.]

## Quick Start (5 steps, no decisions required)
1. Install
2. Run /ecc-help
3. Answer two questions
4. See what was generated
5. Link to "what just happened?" explanation

## Two Ways to Work
[NOT "Short Path vs Regular Path with judgment". Instead:]

| If you want to...            | Use...        |
|------------------------------|---------------|
| Ship fast, trust the system  | Guided Mode   |
| Control every step           | Manual Mode   |

[Both are fine. Neither is "the real way."]

## How It Works (Mental Model, not Components)
[ONE diagram. See section 7 below for what this looks like.]

## Skill Categories
[NOT a flat list of 13. A task-oriented navigation. See section 3.]

## Planning Artifacts
[What they are, why they exist, how they feel like conversation not paperwork]

## For Teams & Advanced Use
[Extension points, schema docs, CI hooks, version pinning]

## Reference
[MAP.md links, full skill index, ADRs, changelog]
```

The junior developer reads top to bottom and stops where they have what they need. The senior developer skips to "How It Works" or "Reference." Neither is punished for their choice.

## 3. Making 13 Categories Navigable Without Knowing the Categories

The 13 categories are the answer to "how is this organized?" — but users ask "what do I need RIGHT NOW?"

This is the card-catalog problem. A library organized by Dewey Decimal is great if you already know what section philosophy is in. Useless if you think "I want to understand consciousness." You need the topic-first index that maps to the categories, not the categories themselves.

**Solution: Scenario-First Navigation Layer**

Create a `docs/scenarios/` folder and a navigation table in the README that maps *goals* to *categories*:

```markdown
## What Do You Want to Do?

| I want to...                              | Start here                    |
|-------------------------------------------|-------------------------------|
| Plan a new feature from scratch           | Planning & Workflow            |
| Write code from a spec                    | Code Execution & Review        |
| Review and validate something built       | Quality Assurance              |
| Understand what went wrong                | Problem Solving & Debug        |
| Document what exists                      | Documentation & Communication  |
| Onboard to a new codebase                 | Research & Context             |
| Set up automated testing                  | Quality Assurance              |
| Make a decision between approaches        | Architecture & Design          |
| Refactor safely                           | Code Execution & Review        |
| Generate a spec from a user story         | Planning & Workflow            |
```

The 13 categories become **implementation detail**, not navigation UX. Users never need to know the category names. They just need the table.

For the skill files themselves, add a `related_scenarios:` field to the YAML frontmatter:

```yaml
related_scenarios:
  - "I want to plan a new feature"
  - "I'm starting a sprint"
  - "I need to break a story into tasks"
```

Now any UI or index generator can build scenario-first navigation automatically.

## 4. Visual Design for Paths / Phases / Categories Without Overwhelm

The rule I live by: **one concept, one diagram. Never two concepts in one diagram.**

The current failure mode is trying to show Paths + Phases + Categories + Source Attribution all at once. The reader's eyes glaze over and they absorb nothing.

**The right set of diagrams:**

**Diagram 1 — The Promise (goes in README, above the fold)**
```
You → /ecc-help → [system figures out what you need] → Artifact in your hands
```
That's it. One line. Don't show the internals yet.

**Diagram 2 — Two Modes (goes in README, "Two Ways to Work" section)**
```
┌─────────────────────────────────────────────────────┐
│  Guided Mode              │  Manual Mode             │
│  ─────────────────────    │  ─────────────────────   │
│  You: "I want to build X" │  You: "Run orient-phase" │
│  System: asks 2 questions │  System: runs what you   │
│  System: picks the path   │    told it               │
│  System: runs it          │                          │
│                           │                          │
│  Good for: new users,     │  Good for: experts,      │
│  standard workflows       │  custom workflows        │
└─────────────────────────────────────────────────────┘
```
No judgment. Both are complete. You choose by context, not competence.

**Diagram 3 — The Phases (goes in HOW_IT_WORKS.md)**
```
Orient → Plan → Execute → Review
  │        │        │        │
  └────────┴────────┴────────┘
       (skills run in each phase)
```
Just four boxes. Add: "Think of phases like the gears in a car. You don't skip from first to fourth — you move through them."

**Diagram 4 — What a Skill Is (goes in skill documentation intro)**
```
Skill = a named capability the system can invoke
          │
          ├── Has prerequisites (what must be true first)
          ├── Has a trigger (what invokes it)
          ├── Produces an artifact (what you get)
          └── Has a next step (where you go after)
```

**What NOT to do:** Don't put a 13-node category graph in the README. Don't show the MAP.md routing table to users. Don't label diagrams with internal names like "orchestration layer" or "harness ecosystem" before the reader knows what those words mean.

**Progressive disclosure rule:** Every concept gets introduced at the level of "what it does for you" before "how it works." No exceptions.

## 5. Making Planning Artifacts Feel Like Conversation, Not Bureaucracy

This is the one that breaks my heart the most, because it's fixable with formatting alone.

Here's what `requirements.md` looks like right now (based on Amelia and Murat's description):

```markdown
## Requirement REQ-001
Status: Draft
Priority: High
Description: The system shall provide path switching capability.
Acceptance Criteria:
  - AC-001: Path can be switched mid-flight
  - AC-002: State is preserved on switch
```

It reads like a government form. Here's what it should feel like:

```markdown
## Why This Exists

We discovered during early testing that developers don't always know which path 
they need at the start. They start on Short Path, realize the feature is more 
complex, and need to continue on Regular Path without losing their work.

## What We're Building

**Path Switching**: The ability to move between Guided Mode and Manual Mode 
mid-workflow without restarting.

**You'll know this is working when:**
- [ ] A developer on step 3 of Guided Mode can type `/switch-mode` and continue
- [ ] The artifact they built on step 3 is present and valid in Manual Mode
- [ ] The system logs the switch with a timestamp (for debugging)

## Open Questions (Parking Lot)
- Do we preserve partial artifacts or only complete ones?
- Who decides if a switch is safe? The user or the system?

## Decision Log
- 2026-05-01: Decided to preserve all artifacts on switch (rationale: data loss is worse than an inconsistent state)
```

The difference is: **the document is having a conversation with the reader.** It explains why before what. It uses second-person. It has explicit "open questions" sections so the reader knows what's settled and what isn't. The acceptance criteria are framed as observable behaviors, not assertions.

This isn't more words — the second version is more scannable because it has headings that answer questions the reader actually has.

**The three artifacts Murat identified (requirements.md, design/, qa-tasks.md) should share a consistent thread:**

```
requirements.md   ← "Here's what we decided to build and why"
design/           ← "Here's how we decided to build it (and what we considered)"
qa-tasks.md       ← "Here's how we'll know we built it correctly"
```

Each references the others. A junior dev reading qa-tasks.md should be able to click through to the requirement that explains *why* the test exists.

## 6. What the "Why Layer" Actually Looks Like in Practice

The "why layer" is not a philosophical section. It's a structural convention: every artifact has a `## Why This Exists` or `## Rationale` block that is never optional.

**For a skill file:**

```yaml
# Current (no why)
name: orient-phase
description: Runs the orientation phase of the workflow
triggers: ["/orient", "start orient"]

# With why layer
name: orient-phase
rationale: >
  Before planning or building, the system needs to understand the current 
  state of the codebase, the user's goal, and any constraints. Without this 
  phase, subsequent phases make assumptions that are often wrong. This skill 
  exists because "just start coding" is the #1 cause of rework in the workflows 
  we studied.
description: Runs the orientation phase of the workflow
triggers: ["/orient", "start orient"]
```

**For a planning artifact (requirements.md header):**

```markdown
# Requirements: [Feature Name]

**Why we're building this:** [One paragraph. Connects to user need or business goal.]
**What we're NOT building:** [Explicit scope boundary. Prevents scope creep and confusion.]
**How we'll know it's done:** [Link to qa-tasks.md]
```

**For a command (in any docs page):**

```markdown
### `/ecc-help`

**What it does:** Starts the guided workflow. Asks you two questions and picks the right path.

**Why it exists:** Most failures in AI-assisted coding happen because the developer and 
the system have different mental models of the task. /ecc-help syncs those models before 
any code is generated.

**When to use it:** Start here. Always. Even if you think you know which path you need.

**When NOT to use it:** If you're mid-workflow and need a specific skill, call the skill directly.
```

The why layer is three sentences maximum. It never philosophizes. It answers: "why does this exist, and when would I reach for it?"

## 7. Documenting the Harness Ecosystem Without Requiring Pre-Knowledge

Winston called this "state machine, skill graph, orchestration flow." That's correct and also completely opaque to someone who hasn't built it. The challenge is: how do you explain something that only makes sense once you understand it — to someone who doesn't understand it yet?

Answer: **you use a bootstrapping sequence.** You don't explain the Harness Ecosystem. You first explain what it *replaces*.

**The bootstrapping sequence for HOW_IT_WORKS.md:**

```
Step 1: Establish the problem space
"Without ECC-Fused, you'd need to remember which AI command runs which tool, 
in what order, and what to do when something fails. For a 10-step workflow, 
that's 10 things to track manually."

Step 2: Introduce the concept at the highest abstraction
"ECC-Fused manages that sequence for you. You tell it your goal; it runs the steps."

Step 3: Name the pieces only after the reader understands what they do
"The thing that manages the sequence is called the Harness.
 The individual steps are called Skills.
 The rules about what order to run them are the Skill Graph.
 The memory of where you are in the sequence is the State."

Step 4: Show the simplest possible diagram
[Harness] → reads → [Skill Graph]
          → runs  → [Skill A] → [Skill B] → [Skill C]  
          → tracks → [State: "completed Skill A"]

Step 5: Immediately show a real example
"When you run /orient, the Harness:
  1. Checks State (have we oriented before? No.)
  2. Reads the Skill Graph (what comes after orient? plan.)
  3. Runs orient-phase skill
  4. Updates State (orient: complete)
  5. Prompts you for the next step"

Step 6: Link to deep reference for those who want it
"If you want to understand the full state machine specification, see docs/harness/state-machine.md"
```

The deep documentation (state machine spec, skill graph schema, orchestration flow) lives in `docs/harness/` and is **never surfaced in the README**. It exists for contributors and advanced users. It is linked, not embedded.

## 8. What's Missing from MAP.md Files and Category Folders

MAP.md files are currently routing tables for the AI. They read like:

```markdown
## Skills in This Category
- skill-a.yaml: Short Path, orient phase
- skill-b.yaml: Regular Path, plan phase
```

That's machine-readable, human-ignoring. Here's what they need:

**MAP.md needs two audiences, clearly separated:**

```markdown
# Planning & Workflow Skills

## For Developers

**What this category does for you:**
When you're starting a new feature, refining a spec, or breaking down a complex 
problem — these are your skills. Start here when you have a goal but not yet a plan.

**Common scenarios:**
- "I have a user story and need to break it into tasks" → use `story-decompose`
- "I have a vague idea and need to make it concrete" → use `ideate-spec`  
- "I need to estimate scope" → use `effort-estimate`

**Skill index:**
| Skill | When to use | What you get |
|-------|-------------|--------------|
| story-decompose | You have a story, need tasks | tasks.md |
| ideate-spec | You have an idea, need a spec | requirements.md |
| effort-estimate | You need size/scope | estimate.md |

---

## For the AI / Contributors

[Technical routing information here: phase assignments, path compatibility, prerequisites]
```

The human-facing section comes first. The machine-facing section is clearly labeled as such.

**Category folders need:**
1. A `README.md` in every category folder (not just MAP.md) — the README is for humans, MAP.md is for routing
2. The scenario-first navigation table (as described in section 3)
3. An explicit "what this category does NOT cover" line (prevents wrong-folder confusion)

## 9. The Documentation Pattern That Fits ECC-Fusion's Complexity

The pattern ECC-Fusion needs is **Diátaxis**, extended with scenario-based entry points.

Diátaxis divides documentation into four quadrants:

```
                    LEARNING          DOING
                  ┌─────────────────┬──────────────────┐
    Study-        │   Tutorials     │   How-To Guides  │
    oriented      │   (learning)    │   (task-focused) │
                  ├─────────────────┼──────────────────┤
    Work-         │  Explanation    │   Reference      │
    oriented      │  (understanding)│   (information)  │
                  └─────────────────┴──────────────────┘
```

**ECC-Fusion currently only has Reference** (MAP.md files, skill YAML specs) **and partial How-To** (the paths). It is **entirely missing:**

- **Tutorials** (learning-oriented, step-by-step, for juniors): "Build your first feature with ECC-Fused in 20 minutes"
- **Explanation** (understanding-oriented, the "why layer" at scale): "Why ECC-Fused uses phases instead of a single command", "How the state machine prevents you from skipping steps", "Why Guided and Manual mode exist"

The **scenario-based entry point** extends Diátaxis with a fifth entry: the "I want to..." navigation layer that maps user goals to the right quadrant. This is the table from section 3 — it sits above all four quadrants and routes into them.

**Applied to ECC-Fusion:**

```
docs/
├── tutorials/
│   ├── first-feature.md          ← Junior's first win
│   ├── guided-mode-walkthrough.md
│   └── understanding-artifacts.md
├── how-to/
│   ├── switch-modes.md
│   ├── recover-from-error.md     ← Mary's missing error recovery story
│   ├── pivot-mid-flight.md       ← Mary's missing mid-flight pivot
│   └── customize-a-skill.md
├── explanation/
│   ├── why-phases.md
│   ├── why-two-modes.md
│   ├── harness-ecosystem.md
│   └── artifact-design-rationale.md
├── reference/
│   ├── skill-catalog.md
│   ├── MAP.md files (linked)
│   ├── schema-specs/
│   └── command-reference.md
└── scenarios/
    └── navigation-table.md       ← The "I want to..." index
```

The flat 13-category structure becomes the **reference layer only**. Users are no longer expected to navigate it as their primary entry point.

## 10. The Opening Three Paragraphs I Would Write

Here is what I would write if the README were mine. No hedging — this is what good looks like:

---

**ECC-Fused turns a scattered AI toolkit into a single workflow engine.**

You describe what you want to build. ECC-Fused figures out which AI skills to run, in what order, with what guardrails — and hands you back working planning artifacts, specs, and code. You stop managing the process. You start shipping.

**In your first ten minutes**, you'll run one command (`/ecc-help`), answer two questions, and watch the system generate your first planning artifact. It's not a demo — it's real output you'll use. After that, you can go deeper or keep the training wheels on. Both are supported. Neither is the wrong choice.

**If you've worked with BMAD-METHOD, Matt Pocock's TypeScript skills, or Agent OS before**, you'll recognize pieces. ECC-Fused is what happens when those ten systems are wired together with a shared state machine, a consistent skill interface, and a single entry point. You don't need to know what's under the hood to use it. But if you want to, the internals are fully documented and every design decision has a written rationale.

---

Notice what those three paragraphs do:
- Paragraph 1: Promise (active voice, user as subject, problem solved)
- Paragraph 2: First win (concrete, time-boxed, real output, no judgment)
- Paragraph 3: Meets the senior developer where they are, without excluding the junior

No bill of materials. No component list. No source attribution. The sources exist in `docs/explanation/` for people who care.

## Summary: The Six Changes I'd Make This Sprint

If I had to triage, in order of impact:

1. **Rewrite the README opening** — three paragraphs, as above. Today. It costs nothing and changes the entire first impression.

2. **Add `## Why This Exists` to every skill YAML** — the why layer. The format is simple and can be done incrementally.

3. **Create `docs/tutorials/first-feature.md`** — the junior's first win. This is the single highest-leverage missing document.

4. **Convert MAP.md files to dual-audience format** — human section first, machine section clearly labeled.

5. **Add scenario-based navigation table** — the "I want to..." index. This makes the 13 categories navigable without knowing the categories.

6. **Restructure planning artifacts with conversation format** — `## Why This Exists`, decision log, explicit open questions. This is the difference between bureaucracy and collaboration.

The documentation is not broken. It's just answering the wrong questions, in the wrong order, for the wrong reader. Fix the order, fix the reader model, and the system you've all described — which is genuinely interesting and ambitious — becomes something a junior developer can actually pick up and use on day one.

That's what docs are for. Not to record what exists. To reduce the distance between "I don't understand this" and "I can do this."
