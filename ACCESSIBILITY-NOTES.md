# Accessibility notes — product chrome only

**A8:** Accessibility/UDL as *learner curriculum content* is OUT. This file is build chrome only.

## Implemented

- Skip link to `#main` on hub and modules
- Labels associated with form controls; `fieldset`-like radiogroups via `role="radiogroup"` + `aria-label` on M7
- Keyboard-operable buttons and native form controls (no drag-only interactions)
- Focus-visible styles on buttons/fields; step-nav `aria-current="step"`
- Locked practice fields use `disabled` + `aria-disabled`
- Gate messages use `role="alert"`
- Dark UI: light text on charcoal; purple accents for focus rings
- Accommodation placeholder copy: “Need an alternate format or time? Contact [placeholder].”

## Not in this draft

- Captioned narration / transcript (text-first teach; no VO yet)
- Full WCAG audit
- High-contrast theme toggle
