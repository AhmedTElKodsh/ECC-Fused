# 💻 Amelia the Senior Developer

I read the actual files. All 10 questions answered from source, not from the context summary.

## 1. Real Contradictions in File Layout

**Contradiction A — Empty category with no executable skill.**
`validate-ecc-fusion.mjs:L11-25` declares `Memory & Context Management` as a valid category. `manifests/skills.json` has **no skill assigned to that category**. `harness.json:L37` maps the `Orient` phase to that category. Empty category = harness phase with no executable skill. That is a structural gap, not a documentation gap.

**Contradiction B — `sharedSkill` boolean is mechanically wrong.**
`scaffold-required-catalog.mjs:L334` auto-derives `sharedSkill` from `pathAvailability.length > 1`. But `Auto` is a route *mode*, not a peer path. Skills on `["Regular Path", "Auto"]` get `sharedSkill: true` because that's two entries — but they're not shared across paths; they're advisory-mode skills. The modeling bug: `Auto` was promoted to a peer path in the availability arrays, which breaks the `sharedSkill` semantic.

**Contradiction C — Three-way mirror sync with no freshness check.**
Controller skills (`ecc-help`, `path-switch`, `transition-guard`) exist in: canonical `skills/<id>/SKILL.md`, `ecosystem/skills/<category>/skills/<id>.md`, AND `ecosystem/orchestration/skills/<id>.md`. `generate-ecosystem-catalog.mjs:L299-301` writes all three. Only the generator enforces sync. If someone edits canonical SKILL.md and forgets to regenerate, `ecosystem-catalog.test.mjs` catches missing *files* but not stale *content*. Three-way sync with no content-hash validation is a maintenance hazard.

## 2. Manifest System Gaps

Confirmed working: skill ID uniqueness, command alias uniqueness, command→skill cross-reference, valid categories, controller skill existence. These are solid.

**Gaps confirmed from source:**
- ❌ `prerequisites` arrays in `skills.json` are prose strings (`"repository context readable"`, `"route prerequisites satisfied"`) — identical across all 24 skills. Validation only checks they're arrays. They are not machine-resolvable IDs; no skill can programmatically traverse the prerequisite graph.
- ❌ `conflictsWith` is `[]` for all 24 skills. No conflicts are encoded anywhere. Real conflicts exist — `path-switch` during active `ralph-loop` should be blocked; it isn't modeled.
- ❌ **The schemas in `schemas/` are never applied during `npm run validate`.** `validate-ecc-fusion.mjs` does manual structural checks. No AJV or JSON Schema validator is invoked against `harness.json`, `skills.json`, or `commands.json`. Schema files = decorative documentation, not enforcement.
- ❌ `commands.json` `pathAvailability` is auto-generated as the blanket `["Short Path", "Regular Path", "Auto"]` for all non-Ralph commands. `ecc-spec` is listed as available on Short Path. It shouldn't be. This is wrong and untested.

## 3. Skill Category Stability

The 13 categories are hardcoded in **three places**: `validate-ecc-fusion.mjs:L11-25`, `schemas/skill-manifest.schema.json:L27-41`, `harness.json` phase mappings. Adding a 14th category requires edits in all three plus regenerating ecosystem and updating tests. No single source of truth. The categories will fragment on first "let's add a DevOps category" request.

Current distribution: `Memory & Context Management` = 0 skills. `Automation Accelerators` = 1 (ralph-loop). `Discovery & Help` = 1 (ecc-help). Three categories with ≤1 skill each are fragmentation candidates.

## 4. What `skill-lint` Actually Needs to Validate

`skills/skill-lint/SKILL.md:L58-60` describes validating frontmatter, trigger specificity, manifest references, etc. But skill-lint is **a prose-only skill description**. It invokes an LLM to perform checks conversationally. That means:

- ❌ No deterministic frontmatter parser
- ❌ No diff between `skill.file` in manifest and actual filesystem content
- ❌ No detection of stale ecosystem mirrors
- ❌ No verification that `sourceInspiration` values are from the allowed set

The real lint is in `tests/catalog-files.test.mjs` and `validate-ecc-fusion.mjs`, but those aren't invoked by `/ecc-skill-lint`. The `/ecc-skill-lint` command and the actual validation infrastructure are two completely separate things that don't know about each other.

## 5. Controller Skills in a Single SKILL.md: Implementable?

**`ecc-help/SKILL.md`** — Yes, implementable. Advisory router with structured output format. The output template is defined. An LLM can execute this deterministically from context. Best-designed of the three.

**`path-switch/SKILL.md`** — Barely implementable. "Read current path and requested destination. Check prerequisites before changing state." The problem: *where is current path stored*? The skill references `.planning/state.yaml` — **but `.planning/state.yaml` does not exist in the repo**. `schemas/path-state.schema.json` defines the structure but no runtime file exists. `path-switch` cannot "read current path" from nothing.

**`transition-guard/SKILL.md`** — Same problem. "Detect missing prerequisites." Prerequisites in `skills.json` are prose strings. `transition-guard` cannot evaluate these programmatically without: (a) a live `.planning/state.yaml` conforming to `schemas/path-state.schema.json`, (b) a concrete prerequisite graph (not the current prose strings).

**Verdict:** `ecc-help` = implementable as LLM advisory. `path-switch` + `transition-guard` = not implementable without `.planning/state.yaml` at runtime. The schemas exist. The runtime file does not. The two most critical controller skills are currently non-functional.

## 6. Can `npm test` + `npm run validate` Catch Ecosystem Regressions?

| Test file | Reality |
|---|---|
| `golden-routing-fixtures.test.mjs` | Asserts static fixture data against itself. No routing logic exercised. It can never fail unless someone edits the fixture. |
| `manifest-consistency.test.mjs` | Solid — skill count, valid categories, file existence. |
| `ecosystem-catalog.test.mjs` | Good but shallow — presence testing, not content sync. |
| `catalog-files.test.mjs` | Fragile — hardcoded string matching in 4 specific skills. |
| `ecc-help.test.mjs` | Minimal — 3 string pattern checks. |
| `required-artifacts.test.mjs` | Good — safety strings in rules, schema parse validity, template sections. |
| `required-docs.test.mjs` | Good — doc existence, README topic coverage. |

**Catching structural regressions:** Yes. **Catching content regressions:** No. **Catching routing logic regressions:** No.

Missing: idempotency test for `generate-ecosystem-catalog.mjs`, content-freshness check for mirrors, JSON schema validation against actual manifests, any path-state behavioral test.

## 7. Is `generate-ecosystem-catalog.mjs` Actually Built?

**Yes.** `scripts/generate-ecosystem-catalog.mjs` exists, 312 lines, fully implemented. Reads manifests, reads canonical SKILL.md content, writes all ecosystem mirrors.

**The gap:** No CI hook. Nothing in `package.json` calls it before `npm test`. Workflow is manual → forget to regenerate → mirrors silently stale. Tests catch missing files, not stale content.

**Secondary gap:** Generator imports `skillCategories` from `validate-ecc-fusion.mjs`. Coupling is implicit; no test verifies generator and validator use the same category list.

## 8. `.planning/` Folder: Right Place for Persistent State?

**Current state:** `.planning/` has exactly 1 file: `CONTEXT.md` (6 lines). No `state.yaml`. No `STATE.md`. No active planning state.

**Namespace collision confirmed:** `.kiro/` exists in repo root. `harness.json:L155-162` defines `kiroPlanningArtifacts.root` as `.kiro/specs/<feature-slug>/`. BMAD's own skills reference `.planning/` for state. When a real dev runs Kiro on this project, Kiro owns `.kiro/specs/<feature>/requirements.md`. ECC-Fusion's `write-spec` also wants to generate `requirements.md`. **Two tools, one artifact namespace.** This collision is documented as intent but never enforced with explicit ownership rules.

## 9. Missing Skill Prerequisites and Circular Dependencies

**Missing prerequisite chains (should be in manifest, are not):**
- `implement-work-packet` should list `create-work-packets`
- `verify-work` should list `implement-work-packet`
- `ship-release` should list `verify-work`, `review-oss-output`, `qa-browser`
- `skill-lint` should list `write-a-skill`
- `ralph-loop` should list `create-work-packets`

**`conflictsWith` is useless in current form** — all 24 skills have `conflictsWith: []`. Real conflicts exist: `path-switch` during active `ralph-loop` should be blocked. None encoded.

**Circular dependency:** `ecc-help` → `path-switch` → `transition-guard` → `ecc-help` (escalation path). This is bounded and deliberate, but undocumented in the manifest.

## 10. Production Readiness Checklist

**Must-have (blocking):**
- [ ] `.planning/state.yaml` runtime file created — `path-switch` and `transition-guard` are non-functional without it
- [ ] JSON Schema validation actually applied to manifests during `npm run validate`
- [ ] `generate-ecosystem-catalog.mjs` in CI pre-test, or content-freshness test for mirrors
- [ ] `Memory & Context Management` must have at least one skill — currently zero, the Orient phase has no executable skill
- [ ] `commands.json` `pathAvailability` must be per-command, not blanket — `ecc-spec` on Short Path is wrong

**Should-have (high priority):**
- [ ] `prerequisites` must reference machine-resolvable IDs, not prose strings
- [ ] `conflictsWith` populated for real conflicts (ralph-loop vs. path-switch at minimum)
- [ ] `skill-lint` needs a programmatic component — at minimum a script that parses SKILL.md YAML frontmatter against `skill-manifest.schema.json`
- [ ] Kiro / BMAD / ECC-Fusion artifact namespace collision resolved with explicit ownership rules

**Summary:** The scaffold is production-quality. The runtime execution model has two critical gaps: no live state file and no machine-enforced prerequisite graph. The system is production-ready for *reading and navigating* the ECC-Fusion catalog. It is **not** production-ready for *enforcing* state machine transitions at runtime.

`npm test` → green. `npm run validate` → green. Controller skills as state machines → unimplemented.
