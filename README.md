# kirmanshahab.dev

Portfolio of Kirman Shahab, senior full-stack engineer. Case studies of a multi-tenant CRM and a bakery’s shop, back office and staff app (LIHA). The source code of that work is private; the pages describe the design and the numbers.

**Recruiters:** send people to [kirmanshahab.dev/recruiter](https://kirmanshahab-dev.vercel.app/recruiter) for a one-screen TL;DR.

## Stack

Next.js 16 (App Router, fully static) · TypeScript (strict) · Tailwind CSS v4 · MDX via velite · Geist · cmdk · next-themes · Vercel. Version choices are explained in [`docs/adr/0002-stack-versions.md`](docs/adr/0002-stack-versions.md), and the visual direction in [`docs/adr/0001-visual-direction.md`](docs/adr/0001-visual-direction.md).

## Run it

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build && pnpm start
```

| Command | What it does |
|---|---|
| `pnpm lint` | ESLint + the spacing-scale guard (`scripts/check-spacing.ts`) |
| `pnpm typecheck` | velite (strict) + `tsc --noEmit` |
| `pnpm test` | Vitest unit tests |
| `pnpm contrast` | WCAG contrast check of every token pair → `design/contrast.md` |
| `pnpm shoot` | Screenshots every page at 7 breakpoints × light/dark → `design/qa/<date>/` (needs `pnpm start -p 3100`) |

## Content

Case studies are MDX in `content/work/`. Screenshots live in `public/work/`, because the Content Security Policy only allows images served from the site itself. The LIHA screenshots use seeded demo data, and no client names or real data appear anywhere.

## License

MIT for the code. Geist fonts are under the SIL Open Font License (`src/fonts/OFL.txt`).
