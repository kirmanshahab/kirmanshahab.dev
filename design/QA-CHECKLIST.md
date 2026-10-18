# Design QA checklist (plan 6.5.10)

Run `pnpm build && pnpm start -p 3100`, then `pnpm shoot`. Open `design/qa/<date>/` and check every screenshot:

- [ ] Alignment to the 12-column grid, 1120px content width
- [ ] No orphans/widows in headings (`text-wrap: balance`)
- [ ] Spacing only on the scale (`pnpm lint` enforces utilities; eyeball the rest)
- [ ] No horizontal overflow at 360px (`pnpm shoot` reports it automatically)
- [ ] Focus states visible (Tab through header, cards, buttons, palette)
- [ ] Contrast passes (`pnpm contrast`)
- [ ] Nothing jumps when fonts load (CLS = 0 in Lighthouse)
- [ ] Images/SVG crisp on 2× screens
- [ ] Dark mode: no pure-white flashes on load or navigation
- [ ] Every hover / empty / loading / error state looks finished (palette "no results", copy-email error, 404)

## Log

### 2026-10-18 (session 1)
Found and fixed: hero map causing 510px-wide pages on mobile; covers all showing the same crop; "Sept" month label;
career link floating beside its heading; project name/status collision at 360px; timeline org orphaned at 360px;
proof caption widow at 360px; heatmap DOM (4,092 → 683 elements); header link accessible name not matching "KS".
Open: Lighthouse performance 93–94 (target ≥ 95, see PROGRESS session log); second-opinion review not run yet.
