# Build spec — v1.3 clean rebuild

**Authority:** `DESIGN-PACKAGE-v1.3.md` (LOCKED) · HARD-GATE = lock authority  
**Root:** `build/` (clean; reject at `../build-playtest-reject-v12/`)

## File layout

```
build/
  index.html
  assets/css/app.css
  assets/js/app.js
  modules/m1…m7/index.html
  refs/PRIMARY-dark-glassmorphism.jpg
  refs/SECONDARY-lesson-list-structure-only.jpg
  README.md, MODULE-MAP.md, BUILD-SPEC.md, ACCESSIBILITY-NOTES.md, OPEN-QUESTIONS.md, CHANGE-LOG.md
```

## Shared shell (`assets/js/app.js`)

- Persist: `localStorage` key `lcRemoteDesign_v13`
- Per module: `teachDone`, `modelDone`, `answers`, `checks`, `screens`, `completed`
- Screen nav: `[data-next]`, `[data-prev]`, `[data-goto]`, step-nav buttons
- **HARD-GATE (M1–M6):**
  - Leaving S2 via forward nav → `teachDone = true`
  - Leaving S3 via forward nav → `modelDone = true`
  - `[data-to-practice]` and any nav to S4+ blocked until both true
  - Locked Practice shows `#practice-lock`; `#hard-gate-alert` on illegal jump
  - No soft-mode flag anywhere
- **Complete M1–M6:** every `[data-required-practice]` filled (trim non-empty / select chosen)
- **M7:** workspace IDs `m7case|m7obj|m7pat|m7dir|m7form|m7sum` + `#m7gate` + radios `r_*` + evidence `e_*`; optional `m7ros` not required; Submit→Self-score gated on workspace + honesty

## Visual

PRIMARY glassmorphism CSS tokens: dark charcoal, frosted cards (`backdrop-filter`), purple/magenta/orange ambient glow, large radius, calm whitespace. Hub = numbered lesson list (SECONDARY sequencing), no promo banners.

## Out of scope (do not add)

- Presentation decks · QA · redesigned EOs · course graduation exercise · brand kit beyond north stars · JUON literal · a11y-as-curriculum · soft-gate
