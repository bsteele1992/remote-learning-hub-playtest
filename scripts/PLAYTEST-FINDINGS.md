# PLAYTEST-FINDINGS — full learner UX/UI/learning + HARD-GATE

**Project:** remote-learning-activity-design-facilitation  
**Stage:** 04b_gate_smoke (expanded)  
**URL tested:** https://bsteele1992.github.io/remote-learning-hub-playtest/  
**Tester:** Hub Playtest (`4fe10523-f5e3-4af1-8a2c-48229512b9cc`)  
**Timestamp (America/Denver):** 2026-09-30 16:02 MT  
**Overall:** **PASS** (0 Critical). Majors logged below for Ops absorb / fix routing.  
**Counts:** Critical **0** · Major **2** · Minor **1**

HARD-GATE companion table: `build/scripts/gate-smoke.md` (M1–M6 **PASS**).

## Method
- Novice learner pass on permanent Pages URL (hub + M1–M6); M7 presence noted only.
- Edge probes: empty Practice continue, double-click Continue, early Practice step-nav, refresh mid-Teach, hub re-enter.
- Suspected Critical (early Practice unlock) **re-tested on cleared storage** — **not reproduced**.
- Hub virgin labels **re-tested on cleared storage** — all modules **Start**, series **0 / 7 complete**.

## Findings

| ID | Severity | Where | Issue | Repro | Suggested fix |
|----|----------|-------|-------|-------|---------------|
| F-01 | Major | Hub footer + all module footers | Learner-facing **dev / draft artifacts**: `Contact [placeholder]`; hub also shows `Offline draft`, `Founder copy pass`, `Playtest reject archived at ../build-playtest-reject-v12/`, and `Design Package v1.3` in learner chrome. | Open hub or any module; read footer / help strip. | Replace contact with real channel or remove; strip internal draft/playtest/package footer copy from learner-facing chrome. |
| F-02 | Major | M1–M6 shell resume | **No last-screen resume.** Re-entering a module from the hub always opens **Hook** (Step 1/5). Gate flags (`teachDone` / `modelDone`) persist in `localStorage`, but screen index does not — easy to feel “lost” after leaving mid-module. | Enter Teach → Module hub → re-open same module → lands on Hook. | Persist last screen index (or offer Resume vs Restart); keep HARD-GATE flags as-is. |
| F-03 | Minor | M6 Teach / Practice | Voice bar: academic **“Exemplar”** and **“M4 formative method (pointer only)”** without plain-English restatement for a first-time learner. | Read M6 Teach list + Practice criteria. | Prefer “strong example”; briefly restate the M4 method in plain language. |

## Investigated — not filed as defects

| Claim | Outcome |
|-------|---------|
| Critical: step-nav **4 Practice** unlocks Practice before Teach+Model | **Not reproduced** on fresh M1 (cleared storage). Practice step is disabled; click does not navigate. Earlier “bypass” observations attributed to **residual `localStorage`** from prior HARD-GATE smoke in the same browser. |
| Major: virgin hub shows M1–M6 **In progress** while **0/7 complete** | **Not reproduced** on cleared storage (all **Start**). **In progress** + **0/7 complete** is **correct** after any screen visit without `completed`. |

## Edge-case notes
- Empty M1 Practice → soft warning; can advance toward Exit; complete stays disabled until required fields filled.
- Double-click Continue: single transition observed.
- Early Practice step-nav (fresh): blocked (disabled control).
- Refresh mid-Teach: Practice remained locked; teach progress flags persist.
- Hub ↔ module links work. M7 linked from hub and opens at Brief (not in HARD-GATE table; not deep-completed).

## Voice-bar spot (M1)
- Teach: generally clear; key terms defined inline.
- Practice: concrete criteria; specialized terms mostly taught earlier.
- Footer/dev copy (F-01) hurts learner-facing polish more than body copy.

## Handback
Ops owns STATUS / READY-DOD absorb. This agent does **not** stamp READY.
