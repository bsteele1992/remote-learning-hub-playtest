# PLAYTEST FIX LIST — from 04b full learner playtest
**Source:** `build/scripts/PLAYTEST-FINDINGS.md` (2026-09-30 16:02 MT)  
**Overall playtest:** PASS (0 Critical) · HARD-GATE M1–M6 PASS  
**Ops decision:** READY held until Majors closed or Brandon-waived (READY DoD).  
**Update:** 2026-09-30 ~17:05 MT — F-04 closed on disk (choice **B**: visible Save note + confirm). Republish Pages.

## Open — Critical
none

## Open — Major (must close or waive before Ops READY)
| ID | Where | Fix |
|----|-------|-----|
| F-02 | M1–M6 shell | **DEFERRED** (founder narrow 2026-09-30). Persist last screen index (or Resume vs Restart). Gate flags may stay; re-enter from hub currently always Hook. |

## Open — Minor (nice-to-have; not READY-blocking alone)
| ID | Where | Fix |
|----|-------|-----|
| F-03 | M6 Teach / Practice | Plain-English for “Exemplar”; restate M4 formative method without jargon pointer. |

## Verified closed / not defects
| ID | Notes |
|----|-------|
| F-01 | **Closed 2026-09-30** — stripped learner-facing Contact [placeholder]; hub Offline draft / Founder copy pass / playtest-reject path / Design Package v1.3 chrome; calm accessibility footers. No invented email. |
| F-04 | **Closed 2026-09-30 (B)** — visible Save note + confirmation on M1–M6 Hook; field kept; M7 untouched; Pages republished. |
| — | Suspected Practice step-nav bypass before Teach+Model — **not reproduced** (cleared storage). |
| — | Virgin hub In progress / 0/7 — **not a defect**. |

## Owner
Elearning bot — F-01 + F-04 (B) closed + republish; F-02 deferred pending founder.


## Founder Safari Major (2026-09-30 via CoS) — closed
| ID | Where | Resolution |
|----|-------|------------|
| F-04 | **M1–M6** Hook (`*-hook` optional “Your quick take”) | **Closed (B)** 2026-09-30 — kept field; JS injects Save note (`data-hook-save`) + live status (`Saved on this device.` / empty optional msg); Continue on Hook with text force-persists + shows confirm then advances. M7 untouched. **Republished** to permanent Pages. |

**F-02** remains deferred. Pre-ship HELD. NOT READY.
