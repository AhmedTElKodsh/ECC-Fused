# 🧪 Murat the Test Architect

I read the actual code — all 7 test files, every schema, `validate-ecc-fusion.mjs`, `harness.json`, the rules, the path-transition schema. No hand-waving.

## 1. Are the golden behavioral regression fixtures sufficient?

**No. They are a taxonomy, not a test.**

Look at `golden-routing-fixtures.test.mjs`. What does it actually assert?

1. That a hardcoded JS object has the right `selectedRoute` and `transitionNotice` values — asserting the *fixture array against itself*. There is no external system under test. It can never fail unless someone edits the fixture.
2. That `nextCommand` and `sourcePriority` are non-empty strings. That's a null-guard, not a behavioral contract.

**Risk calculation:** P(regression caught by this test) ≈ 0 for any real routing logic change. The "golden" fixtures encode *intent*, not *behavior*. What's needed is a fixture runner that ingests a scenario description, invokes the routing logic, and compares actual output to the golden record. Right now the routing logic is never executed by the test suite. That's not a test gap — it's a **test vacuum**.

**P0 gap:** No test exercises any runtime behavior. Every test in the suite is a *structural integrity check*, not a *behavioral regression test*.

## 2. What's Missing for a System That CONTROLS HOW AI Agents Behave?

Current tests cover: file existence, JSON parse validity, manifest cross-references, regex matches on markdown content, slug uniqueness, schema field presence. That's ~85% of the test surface — all static analysis.

| Missing Layer | Risk Level | What Breaks |
|---|---|---|
| **Runtime routing contract tests** | P0 | Routing silently regresses; no test catches it |
| **Transition-guard enforcement tests** | P0 | Path switches happen without prerequisites |
| **Ralph stop-rule trigger tests** | P0 | Loops freeze or breach boundary without stopping |
| **Model-tier selection contract** | P1 | High-risk work routes to OSS-local; no test catches this |
| **Token budget enforcement** | P1 | Work packets exceed bounds; no budget constraint tested |
| **`conflictsWith` symmetry validation** | P1 | Declared but never checked for mutual symmetry |
| **Kiro artifact completeness** | P1 | Structure exists but content sufficiency untested |
| **Schema validation against actual manifests** | P2 | Schemas exist, `validate-ecc-fusion.mjs` never runs AJV |
| **Rule idempotency** | P2 | `path-switching-rules.md` and `ralph-safety-rules.md` are identical (lines 7–19 in both) — no lint catches this |

That last point is concrete: I read both files. They're word-for-word identical. That's an active maintenance hazard hiding in plain sight.

## 3. How Do You Test Non-Deterministic AI Behavior Reliably?

The answer is: **you don't test the model, you test the contract**.

**Layer 1 — Deterministic preconditions (fully testable now):**
- Given `riskLevel: "Low"`, `ambiguity: "Low"` → does `path-state.schema.json` accept `activePath: "Short Path"`?
- Given `currentPath: "Short Path"`, `requestedAction: "ecc-execute-packet"` with missing prerequisites → `blocked: true`?

These are pure schema validation assertions. Zero AI invocation required.

**Layer 2 — Behavioral sampling (probabilistic, measurable):**
Run each golden fixture scenario through the actual prompt N ≥ 30 times, record the distribution of `nextCommand` recommendations, assert that the mode exceeds ≥ 85% agreement. This gives you a **routing stability score** per scenario. If stability drops below threshold, that's a regression signal. **Routing correctness is a distribution, not a deterministic value.** Your CI should track the distribution over time and alert on drift.

**Current state:** Neither layer is implemented.

## 4. What Should the Verification System Actually Check?

**Implementable now (no AI required):**

1. ✅ Apply AJV against every manifest using schemas in `/schemas/`. Schemas exist but are never used.
2. ✅ Validate `conflictsWith` symmetry — if A conflicts with B, B must conflict with A.
3. ✅ Validate `pathAvailability` coverage — every path in `harness.paths` must appear in at least one skill.
4. ✅ Dead skill detection — skills in `skills.json` not referenced by any command and not in `controllerSkills` are orphaned.
5. ✅ Phase→skill coverage — every harness phase should have at least one skill.
6. ✅ Rule deduplication — flag identical rule content. (There's an active duplicate right now.)

**Aspirational (requires AI-in-the-loop):**
- Routing stability sampling
- Token budget compliance measurement
- Kiro artifact semantic completeness — does `requirements.md` actually have acceptance criteria or just the heading?
- Ralph stop-rule trigger validation under adversarial input

Don't conflate them. The implementable ones can ship this sprint.

## 5. Is Skill-Lint Sufficient as a Governance Mechanism?

**No. It's a manifest linter, not a governance system.**

What `validate-ecc-fusion.mjs` checks: file existence, ID uniqueness, category membership, array field presence, cross-reference resolution.

What it doesn't check:
- **Schema validation** — `harness.json:version "0.1.0"` but `harness-manifest.schema.json` is never applied
- **Semantic version contracts** — no backward-compatibility validation on version bumps
- **Skill size limits** — "oversized skills" is a declared concern; no file size check exists
- **Cyclic prerequisites** — skill A requires B, B requires A → infinite loop; not detected
- **Missing mutual conflict declarations** — `conflictsWith` is structural but never cross-checked for symmetry

**A schema registry with versioning is not aspirational.** The moment `.claude`, `.cline`, `.trae`, `.bob` all consume `harness.json` (they all exist as directories), you need:
1. A version field on every manifest (harness.json has `0.1.0` — good start)
2. A compatibility matrix
3. A migration test: can `v0.1.0` manifests be read by `v0.2.0` validator?

Without that, a `harness.json` breaking change silently breaks all IDE agent integrations simultaneously.

## 6. What Does 'Model-Routing Correctness' Mean for a Test?

The `model-routing.schema.json` defines the contract: `{ riskLevel, assignedModelTier, escalationRequired }`. Correctness means the policy function `f(riskLevel) → assignedModelTier` must satisfy:

- `f("High") = "High-end"` always
- `f("Low") = "OSS-local"` always
- `f("Medium")` is context-dependent, with `escalationRequired` as tiebreaker

This is a **decision table test**. Fully deterministic.

Current schema defect: no `additionalProperties: false`, no enum pairing constraint — it allows `{ riskLevel: "Low", assignedModelTier: "Human" }` which is semantically absurd. That's a schema defect that allows invalid routing to pass validation silently.

## 7. Missing Test Categories

**P0 — Path-switching edge cases:**
- Short Path → Regular Path: does transition produce a Transition Notice?
- Regular Path → Ralph: is preflight approval enforced?
- Ralph → Short Path on stop trigger: is the return path well-formed?
- Downgrade: Regular Path → Short Path (should be blocked in most cases)

None of these are tested. `path-switching-rules.md` declares the rules but no test validates enforcement.

**P0 — Ralph stop-rule triggers:**
`ecc-ralph-run.md` mentions "freeze, overload, repeated failure, no progress, or boundary breach." Does the stop actually trigger? There's no test that simulates a freeze condition and asserts the stop fires.

**P1 — Token budget enforcement:** Work packets have no budget constraint tested.

**P1 — AC ID traceability:** `ecosystem-catalog.test.mjs` checks section headings in templates. It doesn't validate that a generated artifact has AC IDs tracing back to user stories, or that `qa-tasks.md` has 1:1 correspondence with tasks in `tasks.md`.

**harness.json regression scenarios:**

| Mutation | Caught? |
|---|---|
| Remove `"Short Path"` from paths | ✅ Caught at L125 |
| Remove a `controllerSkill` | ✅ Caught |
| Break version field | ❌ Not caught — no semver validation |
| Introduce cyclic skill dependency | ❌ Not caught |
| Set `escalatesTo` to invalid path | ❌ Not caught — `escalatesTo` is a free string |

The `escalatesTo` field is particularly concerning. It's in every path but never validated against known path IDs. A typo (`"Regullar Path"`) would silently corrupt routing logic.

## 8. Risk Profile of a Failed Skill-Lint Run

**If lint runs as a CI gate:** failure blocks publication. Risk: Low. Cost: developer friction.

**If lint is a post-install advisory check (current behavior):** a failure means the governance layer is broken but the agent can still operate. This is the dangerous case.

Concrete downstream failures from a silent lint bypass:

1. **Duplicate command alias** — two skills respond to the same `/ecc-review`. Wrong skill executes. Security gap in review coverage.
2. **Stale manifest entry pointing to deleted skill** — agent tries to invoke skill, file not found, execution halts mid-workflow with no recovery path.
3. **Missing source attribution** — AI proceeds without knowing the authority source. ADR violations go undetected.
4. **Orphaned controller skill in harness** — `path-switch` or `transition-guard` removed from `skills.json` but remains in `harness.orchestration.controllerSkills`. Path switching silently fails. **This is the most catastrophic single failure mode in the ecosystem.**

**Impact × Likelihood:** Orphaned controller skill = P0 severity. Probability if lint runs in CI = Low. Probability if lint is advisory-only = Medium-High.

## 9. Testing Kiro Planning Artifact Generation

**Layer 1 — Template structural completeness (partially done):**
- ✅ `requirements.md` template has User Stories, Traceability headings
- ✅ `qa-tasks.md` template has Required Gates
- ❌ Cross-template consistency — are AC IDs in `requirements.md` referenced in `qa-tasks.md`? Not tested.

**Layer 2 — Generated artifact validation:** Not implemented, not scaffolded. Requires a JSON Schema or structured parser for each template type plus a post-generation validation step.

**Layer 3 — Traceability completeness:** Every user story should have ≥1 AC, ≥1 task in `tasks.md`, ≥1 QA gate in `qa-tasks.md`. Harness encodes this as required, but `ecosystem-catalog.test.mjs:L107` only checks that the *word* "Traceability" appears — not that actual traces exist.

**Minimum viable Kiro test:** Parse generated `requirements.md`, extract AC IDs via regex (`AC-[A-Z]+-\d+`), assert each AC ID appears in `qa-tasks.md`. Five lines of code. Currently unimplemented.

## 10. Minimum Viable Test Suite for Real Ecosystem Confidence

**Tier 1 — Fix immediately:**
1. Apply AJV against `harness.json`, `skills.json`, `commands.json` using schemas in `/schemas/`.
2. Validate `escalatesTo` fields — each value must be a known path ID or "Human review."
3. Detect rule file duplication — content-hash deduplication check for rule files.
4. Validate `conflictsWith` symmetry.

**Tier 2 — Next sprint (behavioral confidence):**
5. Path-transition table tests — `{currentPath, requestedAction}` → `transition-guard` behavior.
6. Ralph stop-rule scenario tests — simulate freeze/overload/boundary-breach, assert `ecc-ralph-stop` fires.
7. Model-routing decision table — assert all 9 `{riskLevel × assignedModelTier}` combinations are valid or rejected. Fix the `Low → Human` schema defect.
8. AC ID traceability test — extract from `requirements.md` template, assert in `qa-tasks.md`.

**Tier 3 — Long-term confidence:**
9. Routing stability sampling — N=30 per golden fixture, assert stability ≥ 85%.
10. Harness version compatibility matrix on version bumps.

## Summary Risk Profile

| Priority | Gap | Status |
|---|---|---|
| P0 | No runtime behavior tested | Not implemented |
| P0 | Schemas never applied to manifests | Schemas exist, unused |
| P0 | `escalatesTo` not validated | Not implemented |
| P0 | Orphaned controller skill not caught | Not implemented |
| P1 | Ralph stop-rules not exercised | Not implemented |
| P1 | `conflictsWith` symmetry absent | Not implemented |
| P1 | Rule file duplication not detected | **Duplicate exists today** |
| P1 | Model-tier policy table absent | Not implemented |
| P2 | AC ID traceability not checked | Not implemented |
| P2 | Harness version compatibility absent | Not implemented |

**Bottom line:** The current test suite is an excellent *structural integrity suite* and a poor *behavioral regression suite*. For a system that controls how AI agents behave, that's the equivalent of writing a safety spec for a nuclear plant and then only testing that the manual is properly formatted. The manual might be perfect. You still don't know if the reactor does what it says.
