# Build change log

Revision-ready table for draft hub edits after v1.3 clean rebuild.

| Date | Author | Change | Notes |
|---|---|---|---|
| 2026-09-30 | BUILD executor | Playtest Major F-04 (choice **B**) — keep optional Hook free-text on M1–M6; add visible Save note + status confirmation before Continue. | `assets/js/app.js` injects Save note (`data-hook-save`) + `.hook-save-status`; blur/Continue force-persist; empty Save shows optional message. CSS spacing for hook save. M7 untouched. HARD-GATE / canFinishModel untouched. F-02 still deferred. NOT READY. |
| 2026-09-30 | BUILD executor | Playtest Major F-01 — strip learner-facing draft/dev chrome (Contact [placeholder]; Offline draft; Founder copy pass; playtest-reject path; Design Package v1.3 footers). | Hub + M1–M7 footers/calm accessibility note; hub topbar meta cleaned. F-02 resume deferred (founder narrow). HARD-GATE untouched. |
| 2026-09-25 | BUILD executor | FOUNDER-PULL QA absorb — C1 Continue confirmed; Majors 2–4 + Minors 5–6 closed. | C1 `data-to-practice` enable + mark-before-gate verified (no revert); M1 exemplar coach-plain; M3 deep-set → three taught patterns; EO chrome → Objective N hub+M1–M7; Exemplar labels → coach titles; optional empty-Practice warn once. HARD-GATE/pedagogy/keys unchanged. |
| 2026-09-25 | BUILD executor | Playtest #2 — M1 s3 Continue dead-end fixed (enable Continue on model when teach done; mark modelDone on leave); clarity pass on dense exemplar copy. | `assets/js/app.js` HARD-GATE Continue patch retained; M1–M6 model/exemplar coach-plain; pedagogy/IDs/UI unchanged. |
| 2026-09-25 | BUILD executor | Founder playtest copy pass — conversational coach voice, first-mention definitions, Hormozi example-first pattern; pedagogy/HARD-GATE unchanged. | Learner-facing copy on hub + M1–M7; locked-gate banners coach-plain; `assets/js/app.js` HARD-GATE logic untouched. |

**Baseline:** Clean rebuild under `build/` from DESIGN-PACKAGE-v1.3 (LOCKED 2026-09-25). Playtest reject archived at `../build-playtest-reject-v12/`.
