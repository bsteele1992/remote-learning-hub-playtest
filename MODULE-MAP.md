# Module map — v1.3 draft hub

| Module | Title | EO | Spine screens | Est. |
|---|---|---|---|---|
| M1 | Diagnose scale failure at ~1:124 | EO1 | S1 Hook → S2 Teach → S3 Model → S4 Practice → S5 Exit | 8–12 min |
| M2 | Align & chunk for application at scale | EO2 | same | 8–12 min |
| M3 | Design large-cohort activity patterns | EO3 | same | 12–15 min |
| M4 | Design scalable formative assessment | EO4 | same | 10–15 min |
| M5 | Design scalable summative / performance assessment | EO5 | same | 10–15 min |
| M6 | Online alternatives to multi-stakeholder process sims | EO6 | same | 12–15 min |
| M7 | Capstone: Activity + formative + summative package | EO7 | S1 Brief → S2 Workspace → S3 Submit → S4 Self-score → S5 Exit | 20–30 min |

## Unlock guidance (A6)

- M1–M2 stand-alone OK
- M3–M6 light sequence recommended
- M7 after M1–M6

## HARD-GATE (M1–M6)

Practice (S4) blocked until `teachDone` (left S2 via Next) and `modelDone` (left S3 via Next). Step-nav / goto into S4+ redirected with alert until both true.

## Complete rules

- **M1–M6:** All `[data-required-practice]` fields non-empty (and selects chosen). No checklist gate.
- **M7:** Required workspace IDs + honesty checkbox + five self-score radios + five evidence quotes. Optional run-of-show not required.
