# Large-Cohort Remote Design — Elearning Draft Hub (v1.3)

Offline static HTML draft rebuilt from **DESIGN-PACKAGE-v1.3** (LOCKED 2026-09-25).

**Copy status (2026-09-25):** Founder playtest copy pass applied — conversational coach voice, first-mention definitions, Hormozi example-first pattern. Pedagogy spine and HARD-GATE unchanged.

## Open the hub

- File: [`index.html`](index.html) (open in a browser via `file://` or any static server)
- Path: `/workspace/projects/remote-learning-activity-design-facilitation/build/index.html`

## What this is

Seven mini-modules (M1–M7) teaching facilitated-remote large-cohort **activity + assessment design** at ~1:124 (often zero-TA). Workplace-generic scenarios. Teams OK as pattern; LMS agnostic. Accessibility-as-curriculum OUT.

## Pedagogy (locked)

**M1–M6 spine:** Hook → Teach (readable prose) → Worked example/model → Practice → Exit.

**HARD-GATE:** Practice unlocks only after Teach + Worked example are marked done (leaving those screens via Next, or advancing past them). No soft-gate. No quiz-as-spine. No end-of-module tick-all checklists.

**M7 spine:** Brief/rubric → Planning workspace → Submit (honesty) → Evidence-quoted self-score → Exit.

## Visual

PRIMARY dark charcoal glassmorphism (`refs/PRIMARY-dark-glassmorphism.jpg`). Hub uses SECONDARY-style ordered lesson list for sequencing only (no promo chrome).

## Playtest reject

Prior playtest hub archived at **`../build-playtest-reject-v12/`** (do not patch in place; this `build/` is the clean rebuild).

## Docs

| File | Purpose |
|---|---|
| `MODULE-MAP.md` | M1–M7 / EO map + screen spine |
| `BUILD-SPEC.md` | Implementation notes (HARD-GATE, complete rules) |
| `ACCESSIBILITY-NOTES.md` | Product a11y chrome (not learner curriculum) |
| `OPEN-QUESTIONS.md` | Residuals from package (not invented) |
| `CHANGE-LOG.md` | Revision table (includes 2026-09-25 founder copy pass) |

## Storage

Answers and progress persist in `localStorage` key `lcRemoteDesign_v13` (browser-local only).
