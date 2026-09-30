# Gate smoke — HARD-GATE (manual + JS inspection)

**When:** Before declaring the elearning hub READY when Practice is hard-gated behind Teach + Model.  
**Pass rule:** For every module M1–M6: Teach done → Model screen Continue-to-practice **ENABLED** → click sets `modelDone` → Practice unlocks. Any fail = **not READY**.

## Manual path (Safari / Chrome)

For each module `M1` … `M6`:

1. Open the permanent hub URL (GitHub Pages). Do **not** use trycloudflare as the recorded result URL.
2. Enter the module. Complete **Teach** (advance through teach screens until teach completion is recorded).
3. Open the **Model** (worked example) screen.
4. Confirm the **Continue-to-practice** control (`[data-to-practice]` when present) is **enabled** (not `disabled`, not aria-disabled blocking click).
5. Click Continue-to-practice.
6. Confirm Practice is unlocked and reachable.
7. Record pass/fail per module in a CHANGE-LOG row or this file's Results table below.

**Critical anti-pattern (C1 class):** Continue disabled until `modelDone`, but `modelDone` only set on *leave* → deadlock. The click that completes Model must set `modelDone` itself.

## Results log (full 04b UX pass)

| Module | Teach done | Continue enabled on Model | modelDone on click | Practice unlocks | Result |
|--------|------------|---------------------------|--------------------|------------------|--------|
| M1 | Y | Y | Y | Y | PASS |
| M2 | Y | Y | Y | Y | PASS |
| M3 | Y | Y | Y | Y | PASS |
| M4 | Y | Y | Y | Y | PASS |
| M5 | Y | Y | Y | Y | PASS |
| M6 | Y | Y | Y | Y | PASS |

**Overall HARD-GATE:** PASS  
**URL tested:** https://bsteele1992.github.io/remote-learning-hub-playtest/  
**Timestamp (America/Denver):** 2026-09-30 16:02 MT  
**Tester:** Hub Playtest (`4fe10523-f5e3-4af1-8a2c-48229512b9cc`) — interactive browser; cleared-storage recheck on M1 early Practice (blocked).  
**UX companion:** `build/scripts/PLAYTEST-FINDINGS.md` (0 Critical / 2 Major / 1 Minor; overall PASS)

## Related

- Project READY DoD: `READY-DOD.md`
- Skill: Gate smoke HARD-GATE (`gate-smoke-hard-gate`)
- Stage: `stages/04b_gate_smoke/CONTEXT.md`
- Handoff in: `handoffs/2026-09-30-ops-to-gate-smoke-04b-full-ux.md`
