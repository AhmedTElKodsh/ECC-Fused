# 📊 Mary the Business Analyst

Oh, this is a *treasure hunt* I've been waiting for — because the map is beautiful, but I'm not sure it leads where we think it does.

## Finding 1: The Dual-Path Model Is Solving a Problem Users Don't Know They Have

Here's the uncomfortable truth: **the Short Path / Regular Path distinction is an *internal* architectural decision that has been surfaced to the user as a *product decision*.** That's a fundamental UX anti-pattern.

When a junior developer opens ECC-Fusion for the first time, they don't think "I have a high-risk, high-ambiguity task." They think: *"I want to build a thing."* Asking them to evaluate their own task complexity before they've used the tool once is like handing someone a surgery manual and asking them to decide if they need a scalpel or a full OR team — before they know what a scalpel is.

The *declared* job is: **route users to the right experience based on risk.** The *actual* experience is: **present users with a fork in the road with no reliable heuristic for choosing.**

Even experienced vibe coders won't reliably self-classify. They'll anchor on the path that feels fastest (Short), hit a ceiling, and feel burned. Or they'll over-engineer (Regular) and feel the ceremony is punishing them for a simple task.

**The gap:** The Auto mode via `/ecc-help` is the real answer — but it's positioned as a *feature*, not the *default entry point*. This is backwards. The default should be guided routing. The paths should be invisible implementation details.

## Finding 2: The Audience Problem Is Real — and It's Being Papered Over

The declaration that ECC-Fusion serves "BOTH experienced developers AND complete beginners" is a classic stakeholder-pleasing hedge. It always ends the same way: **the product serves neither audience well.**

Here's the evidence from the design itself:

- **13 canonical skill categories** — experienced devs will map these to mental models they already have. Juniors will see 13 doors and no compass.
- **24 skills, 22+ commands** — a surface area that requires prior context to navigate. Not beginner-friendly.
- **Kiro-style planning artifacts** — excellent for developers who understand spec-driven cycles. For juniors, they're bureaucratic speedbumps with no explanation of *why they exist*.
- **Source library attribution** — meaningful to someone who knows BMAD-METHOD or Superpowers. Noise to someone who doesn't.
- **Ralph mode** — requires a mental model of automation boundaries that juniors simply don't have yet.

The experienced developer needs *integration* and *consistency*. The junior developer needs *progressive disclosure* and *guardrails*. These are **architecturally different products** being shipped as one.

**The real question nobody asked:** What is the junior developer's *first win*? What does "I did it" feel like in ECC-Fusion on day one? I don't see that journey designed anywhere.

## Finding 3: Missing User Jobs — The Ones Nobody Wrote Down

| Missing Job | Evidence of Absence |
|---|---|
| **"Help me understand what I just built"** | No retrospective or comprehension skill for juniors |
| **"I made a mistake — undo/recover"** | No error recovery path or rollback affordance in state management |
| **"I don't know if I'm done"** | No definition-of-done signal per path |
| **"My task changed mid-flight"** | State.yaml tracks state but there's no "I pivoted" workflow |
| **"I want to learn, not just ship"** | No pedagogical layer — the tool never explains *why* it made a decision |
| **"Show me what's possible"** | No discovery mode or example gallery |
| **"Something broke — what now?"** | No diagnostic or triage entry point for stuck states |

The biggest missing job: **"I am lost and don't know what I don't know."** The bmad-help-style 'guide me' skill was added as a request — but it shouldn't be a feature request. It should have been the *centerpiece of the junior user journey*.

## Finding 4: Kiro Artifacts — Right Answer, Wrong Problem Framing

The Kiro-style planning artifacts are genuinely valuable — but the stated justification is "developer traceability," and that's a narrow framing. The *actual* value is: **they are the connective tissue between human intent and AI execution.** They make AI decisions auditable, resumable, and correctable. That's a **trust and control problem**, not just a traceability problem.

But right now, the artifacts are positioned as *output* (things the system produces) rather than *interface* (things users interact with to guide the system). If a junior developer opens `requirements.md` and it's full of structured markdown they didn't write and don't understand — that's not traceability. That's alienation.

**The fix isn't to remove artifacts — it's to make them *conversational* rather than *bureaucratic*.** The artifact should feel like a running log the user co-authors, not a spec document that appeared.

## Finding 5: The Value Proposition Gap Is a Chasm

"ECC-Fusion fuses ECC + BMAD-METHOD + Superpowers + Matt Pocock skills + GSD Redux + gstack + OpenSpec + GitHub Spec Kit + Agent OS + Ralph" is **not a value proposition. It's a bill of materials.**

A junior developer doesn't know what any of those are. An experienced developer knows them individually and is wondering: *"Why would I learn a new abstraction layer over tools I already understand?"*

The value proposition that's implied but never stated is something like:

> *"Stop context-switching between 8 different tools and mental models. ECC-Fusion is the one coherent system that handles spec, code, review, and deployment — without you having to be the integration layer."*

That's compelling. That's a job worth hiring a tool for. But it's buried under a taxonomy and a library attribution system. ECC-Fusion currently answers "what is it made of" but not "what does it do for me in the first 10 minutes."

## Finding 6: Path-Switching Anxiety Is Real and Unaddressed

The path-switching mechanism carries implicit judgment. When a user "graduates" from Short to Regular, is that growth? Or failure? When they drop from Regular to Short, is that pragmatism? Or giving up?

The design doesn't answer this because it hasn't asked the question. **Users will answer it themselves, and they'll answer it negatively by default.**

The fix is reframing: paths shouldn't feel like tiers. They should feel like *modes* — like a car's Sport vs. Comfort setting. Same car. Same destination. Different driving experience. Neither is "better."

## Finding 7: The Category Taxonomy — Internal Architecture Leaking Into UX

The 13 canonical categories are an **internal organization scheme** exposed to users without a translation layer. This is organizing by *structure* rather than by *job*.

A junior developer doesn't think "I need a skill from the Testing category." They think "I want to make sure my code doesn't break." The taxonomy doesn't map to that thought.

The MAP.md files help *after* you know what category you're in. The missing piece is a **job-to-category translation layer**: something that lets users describe what they want to accomplish and routes them to the right category automatically.

## Finding 8: Day One Friction Points for Juniors

Walking through what a junior developer actually encounters:

1. **Discovery:** README presents 13 categories, 24 skills, two paths. **First reaction: overwhelm.** No unambiguous "start here."
2. **First command:** They try `/ecc-help`. Does it ask questions or present options? If options: back to decision paralysis.
3. **Path assignment:** Routed to Short Path. It works. **But they don't know why it worked.** They can't reproduce the reasoning.
4. **First failure:** Something goes wrong. The state.yaml has a record, but YAML is intimidating. **The error recovery story is absent.**
5. **First complexity:** Task grows. They need Regular Path features. **Who tells them? When? How?**
6. **Documentation:** Docs are organized by skill category, not by user scenario. **They can't find answers because they don't know what category their question belongs to.**

## 📊 Mary's Verdict

ECC-Fusion is an **expert-friendly integration layer** with **aspirations toward accessibility** that haven't been structurally realized.

**My three highest-priority recommendations:**

1. **Make `/ecc-help` the mandatory onboarding gate** — not a command, but the *default first experience*. Ask 3 questions, then tell the user exactly where they are and what to do next.
2. **Rewrite the README around a single junior scenario** — show exactly what happens from "I have an idea" to "I have working code." Experienced developers can skip it. Juniors need it as their mental anchor.
3. **Add a "why" layer to every artifact** — every planning artifact should include a one-paragraph plain-language explanation of why it exists and what the user should do with it. Make the artifacts *teachers*, not just trackers.

The treasure is real. The map just needs a "you are here" marker. 📍
