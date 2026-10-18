# 0001. Visual direction: B, the system-map hero

- Status: accepted (Kirman may still switch; only the hero changes)
- Date: 2026-10-18

## Context

The plan (6.5.2) asks for three static hero + proof-strip mockups before any site code:

- **A, editorial:** big typographic name, hairline rules, a mono key/value facts column.
- **B, system map:** a faint, generic architecture graph of the CRM behind the name, with the hot path (API → Redis → queues → email provider) drawn in the accent.
- **C, terminal:** a framed shell window with `whoami` and key/value output, all monospace.

Each was built in light and dark and shot at 1440px and 390px (`design/mockups/shots/`).

## Decision

Build **B**.

## Why

1. **It shows the idea instead of claiming it.** The site's one idea is "the inside of a well-run system". B is the only mockup where the decoration *is* the work: the graph is the real (anonymised) shape of the system the case studies describe. A could belong to any engineer, and C to any engineer who likes terminals.
2. **It passes the 3-second test.** At 1440px the eye lands on the name, then the accented path through the graph. That says "backend and distributed systems" before a single word is read.
3. **It scales into the signature features.** The same node data (`content/architecture.ts`) drives the hero map, the case-study covers and the interactive architecture explorer (6.3.1), so the hero becomes a preview of the explorer.
4. **C fails on substance.** The terminal idiom is a known portfolio cliché, the all-mono body text is slower to read, and its dim key labels failed AA contrast in dark mode.
5. **A was the runner-up.** It's clean but generic. Its facts column (focus, stack, last role) is useful and has been kept as the "At a glance" block on `/about`.

## Consequences

- The map is decorative (`aria-hidden`), masked so it fades out behind the text, and capped at `--line-strong` / `--muted` so it never competes with the headline. Text contrast is measured against the plain background.
- On phones the map crops into the top-right corner above the name rather than shrinking into an unreadable miniature.
- Node widths are computed from character counts × Geist Mono's fixed advance (0.6em), so the SVG is server-rendered with no layout work in the browser. (The first mockup measured text in the browser and got it wrong before fonts loaded.)
- The hero is its own full-bleed clipping box (`overflow-x: clip`), so the map can never cause horizontal scrolling. That was caught on the first 390px screenshot.
