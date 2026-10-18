# kirmanshahab.dev

Portfolio of Kirman Shahab, senior full-stack engineer. Case studies, public projects, and a heatmap of three years of private commits.

**Recruiters:** send people to [kirmanshahab.dev/?r=1](https://kirmanshahab.dev/?r=1) for a one-screen TL;DR.

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

## The commit heatmap and its privacy guarantees

`data/work-stats.json` comes from `scripts/work-stats.mjs`, which runs **only on my machine** against local clones of private repos. Neither the clones nor the script's inputs ever reach this repo or CI.

- It reads only `git log` author name, email and date, keeps commits whose author contains "kirman", and **drops names and emails immediately**.
- The output has dates and counts only: no repo names, commit messages, file names, branches or emails.
- Before writing, it refuses to save if any key or value contains `/`, `@` or a repo name. A unit test (`scripts/work-stats.test.mjs`) enforces the same rule on the committed file.

## Content

Case studies are MDX in `content/work/`. The architecture diagram data in `content/architecture.ts` uses generic labels only. It drives the hero map and every case-study cover, so there are no stock images anywhere.

## License

MIT for the code. Geist fonts are under the SIL Open Font License (`src/fonts/OFL.txt`).
