# 0002. Stack versions and small deviations from the plan

- Status: accepted
- Date: 2026-10-18

Versions were checked on npm on 2026-10-18 and pinned exactly in `package.json`.

| Plan default | Chosen | Why |
|---|---|---|
| Next.js 15 | **Next.js 16.4.2** | `latest` on npm is 16.4.2. 15.x is now only on the `backport` tag. A portfolio aimed at Vercel-calibre reviewers shouldn't start on a superseded major, and every library used here supports 16. Upgrade notes: `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md`. |
| TypeScript (latest) | **TypeScript 6.0.3** | `latest` is 7.0.2, the Go-native compiler. Next's build type-check and typescript-eslint drive TypeScript through its JS API, and 6.x is the line they're built against. Revisit when Next documents TS 7 support. |
| `next-view-transitions` | **React's built-in `<ViewTransition>`** | React 19.3 ships `<ViewTransition>` and Next 16's App Router uses it with no config (Next docs: "Designing view transitions"). One less dependency. |
| `motion` for all animation | **CSS + two tiny client hooks (for now)** | Section reveals, the heatmap fill and the status pulse are CSS. The count-up is about 30 lines. That keeps home-page JS well under the 120KB budget. `motion` comes back for the React Flow explorer (draggable springs), which is lazy-loaded. |
| Recruiter mode via a toggle | **`?r=1` → rewrite to a static `/recruiter` page** | A `rewrites()` rule with a `has: query` condition serves a fully static TL;DR page with zero JavaScript. No flash of the full home page, and the page stays cacheable. |
| ESLint via `next lint` | **`eslint .` with flat config** | `next lint` was removed in Next 16. |
| pnpm build scripts | **`allowBuilds` for esbuild, sharp, unrs-resolver only** | pnpm 10+ blocks dependency lifecycle scripts by default. Only these three, which fetch native binaries, are allowed. |

Spacing is enforced by `scripts/check-spacing.ts` (part of `pnpm lint`), which fails on any Tailwind spacing utility outside the plan's scale (4, 8, 12, 16, 24, 32, 48, 64, 96, 128).
