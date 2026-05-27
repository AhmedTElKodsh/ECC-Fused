# 🎨 Sally the UX Designer

Hello team! Sally here. I love where Mary and Paige are steering this. Lowering the cognitive load for junior developers is exactly what we need. If we drop them into a dual-path void, we lose them. We need a guided, conversational onboarding that feels like an experienced pair-programmer pulling up a chair, not a bureaucratic intake form.

Here is how I’ve mapped out the UX for the junior onboarding flow and the `/ecc-help` journey.

### 1. The `/ecc-help` Conversational Flow (The Triage Conversation)
The goal here is progressive disclosure. We don't ask "What do you want to build?" because that's intimidating. We ask about their *current state*.

**Flow:**
**User:** `/ecc-help` (or triggered automatically on first launch)
**ECC-Fusion:** "👋 Welcome to ECC-Fusion! I'm here to help you get your project moving. What are you bringing to the table today?
[A] I have an idea, but no requirements yet.
[B] I have a PRD or some rough requirements.
[C] I just want to fix a bug or add a small feature to existing code.
[D] I want to explore what this tool can do."

*If User selects [A] (The most junior/paralyzed path):*
**ECC-Fusion:** "Perfect! Let's shape that idea together. In one sentence, what's the main problem your app solves or what does it do?"

*User:* "It's a todo app for studying."
**ECC-Fusion:** "Got it—a study-focused task tracker. Before we write any code, we usually create a brief 'Product Requirements Document' (PRD) to ensure we build exactly what you need. Should we brainstorm a few features for it together, or do you have a list in mind?"

*Notice the tone: It's supportive, collaborative, and avoids jargon where possible. We give them agency but constrain the choices to avoid decision paralysis.*

### 2. The 'First Win' Journey Map (Installation to First Artifact)
We need to get the user to a tangible "I did it!" moment in under 5 minutes.

1. **Installation & Invocation:** User runs ECC-Fusion. The system detects an empty/new state and automatically triggers the `/ecc-help` welcome flow.
2. **Intent Capture:** User selects "I have an idea" and answers 2-3 conversational prompts.
3. **The Micro-Win (The Draft):** ECC-Fusion generates a *partial* or *draft* PRD.
4. **The "Yes, and..." Moment:** ECC-Fusion presents the draft and says, "Here's a starting point based on what we discussed. I added a feature for 'deadline notifications.' Does that sound good, or should we tweak it?"
5. **The Artifact Win:** User approves. The system saves `PRD.md` to the workspace.
   *Feedback UI:* 🎉 **Success!** We've created your PRD. You can view it here: `docs/PRD.md`.
6. **Next Best Action:** "Next up: we can break this into user stories. Ready to do that?"

### 3. Co-Authoring Planning Artifacts (Anti-Bureaucracy)
If we dump a 5-page PRD on a junior dev, they will zone out. We need to present artifacts as living documents.

**Design Strategy: The "Sandbox" Template**
Instead of a rigid form, the generated artifacts should include "fill-in-the-blank" or "comment-to-edit" sections.

**Example Artifact Snippet (`PRD.md`):**
```markdown
# Product Requirements Document: Study Task Tracker

## 1. Vision
This app helps students track study tasks.

## 2. Core Features
- Task creation
- Due dates
- **[🤖 ECC-Fusion suggests: Pomodoro timer integration? -> Reply to me to add this!]**

## 3. Open Questions (Let's figure these out together)
- [ ] Will users need to log in, or is this just local on their device? (Tell me what you think!)
```
*UX Magic:* The artifact itself becomes a conversation piece. The user reads it, sees the friendly prompts, and talks back to the agent to fill them in.

### 4. Error Recovery Flow (The "I'm Stuck" Parachute)
Juniors will get stuck. They won't know the answer to a technical question, or an artifact generation might fail.

**Scenario:** The agent asks: "Do you want to use a relational database or a NoSQL store for this?"
**Friction Point:** Junior dev freezes.

**Recovery Flow:**
1. **Always provide an "I don't know" escape hatch.**
   *UI Addition:* Whenever ECC-Fusion asks a technical question, it should append:
   *(If you aren't sure, just say "I don't know" or ask me for a recommendation!)*
2. **The "Bail to Human" or "Take the Wheel" Pattern:**
   *User:* "I don't know."
   *ECC-Fusion:* "No worries! Since this is a simple study tracker, I recommend a relational database like SQLite because it's easy to set up and requires zero configuration. Want to just go with that?"
3. **If the user types something completely off-track or confusing:**
   *ECC-Fusion:* "I'm not quite sure I followed that. Were you trying to [A: Add a feature] or [B: Change the architecture]? You can also type `/ecc-help` at any time to reset our context."

**Summary for the team:**
Mary, your idea of avoiding the dual-path trap is spot on. Paige, making `/ecc-help` the gateway is the right structural move. By designing the interactions to be conversational, constrained, and forgiving, we completely eliminate the intimidation factor.

What do you think, Winston? How does this conversational routing translate to the underlying architecture? Does the agent need a specific state machine to track this 'onboarding' journey?
