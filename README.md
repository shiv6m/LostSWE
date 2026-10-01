# LostSWE

A free, mission-driven platform that helps beginner CS students figure out which field fits them — a trait-scoring quiz, per-field three-phase roadmaps, and a curated free resource library. No backend, no database: fully static by design.

## Status

🚧 **Actively in development** — built in public, Oct 1 – Dec 11, 2026. See [ROADMAP.md](./ROADMAP.md) for the full build plan and what's shipping when.

**Current phase:** Week 0 — shared foundation (repo just scaffolded; Phase 2 feature work starts Oct 26)
**Target launch:** Nov 8, 2026

### What works today

- Homepage with field grid, linking to each field's detail page
- Trait-scoring quiz (5 questions) with a shareable, URL-encoded result page
- Field detail pages with a 3-phase roadmap and linked free/paid resources, statically generated per field
- Resource library with URL-driven search and a free-only filter

### Known gaps

- Content is a single `lib/data.ts` file (6 fields, 14 resources) — the Oct 26–27 roadmap tasks split this into validated per-field modules
- No constellation homepage animation yet (Nov 2 task)
- No SEO metadata, sitemap, or analytics yet (Nov 5–6 tasks)
- No automated tests yet (Week 0's Oct 3 task adds the CI/Vitest harness)
- No link checker yet (Nov 1 task)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # eslint
```

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS — no backend or database.
