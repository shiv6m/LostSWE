# Roadmap — LostSWE

Part of a three-project build plan (Satellite Collision Predictor → LostSWE → Fitty), running Oct 1 – Dec 11, 2026. This repo is Phase 2 — smallest remaining scope and fully static, so it's a fast, low-risk launch between the two bigger builds.

**Goal:** lostswe.com launches publicly as a fully static site with validated content, a tested quiz, and real SEO. It needs no backend or database — resist adding one.

## Architectural traps (decided up front, not discovered later)

| Trap | Why it bites | Decision |
|---|---|---|
| One growing `data.ts` | Content gets bundled into client JS and every edit is a merge conflict | Per-field content files validated by a zod schema in CI |
| Quiz scoring tangled with UI | Adding a field silently breaks recommendations | Pure, unit-tested scoring function keyed by a typed field-ID union |
| Link rot | Curated free resources die quietly and erode trust | Scheduled link-checker in CI |

## Week D — Content architecture and quiz (Oct 26–Nov 1)

| Date | Work | Push |
|---|---|---|
| Mon Oct 26 | zod schemas for `Field`, `Trait`, `Phase`, `Resource`; field IDs as a `const` union type so typos fail typecheck | `feat(content): typed content schema` |
| Tue Oct 27 | Split `data.ts` into `content/fields/<id>.ts` plus a loader that validates everything at build time; CI fails on invalid content; behavior unchanged | `refactor(content): split data.ts into validated modules` |
| Wed Oct 28 | Field pages as Server Components with `generateStaticParams`; client components get only the slice they need; run the bundle analyzer before and after | `perf: static field pages, content kept off the client bundle` |
| Thu Oct 29 | Extract quiz scoring into a pure function with Vitest tests: every field reachable, deterministic tie-breaks, weights validated against the schema | `refactor(quiz): pure tested scoring engine` |
| Fri Oct 30 | Quiz UX: progress bar, back button, keyboard navigation, result encoded in the URL so it can be shared | `feat(quiz): shareable results and keyboard nav` |
| Sat Oct 31 | Resource library: filters and search stored in URL params, empty states, result counts | `feat(library): URL-driven filters and search` |
| Sun Nov 1 | Link checker (lychee GitHub Action) on PRs and a weekly cron; fix every dead link it finds | `ci: scheduled link checking` |

## Week E — Content, SEO and launch (Nov 2–8)

| Date | Work | Push |
|---|---|---|
| Mon Nov 2 | Constellation homepage: pause animation off-screen, honor `prefers-reduced-motion`, add an accessible list fallback for keyboard and screen-reader users, test on a mid-range phone | `perf(home): accessible, motion-safe constellation` |
| Tue Nov 3 | Content pass 1: every field has all three roadmap phases filled | `content: complete roadmaps for all fields` |
| Wed Nov 4 | Content pass 2: tag every resource as free, add a `lastReviewed` date, remove weak links | `content: resource review and lastReviewed dates` |
| Thu Nov 5 | SEO: per-page metadata, OG images with `next/og`, `sitemap.ts`, `robots.ts`, canonical URLs | `feat(seo): metadata, OG images, sitemap` |
| Fri Nov 6 | Privacy-friendly analytics (Vercel Analytics or Plausible), feedback link via a GitHub issue form, `CONTRIBUTING.md` explaining how to add a field | `feat: analytics, feedback and contributor guide` |
| Sat Nov 7 | Pre-launch QA: Lighthouse 95+ on all categories, axe scan, Safari/Firefox/mobile check, custom 404, DNS and HTTPS verified | `release: v1.0.0` |
| Sun Nov 8 | Launch: share with UMN CS groups and beginner CS communities; README with screenshots | `docs: launch README` |

## Definition of done

- [ ] All content validated by schema in CI; no `data.ts` monolith
- [ ] Quiz scoring unit-tested; results shareable by URL
- [ ] Link checker green; every resource has a `lastReviewed` date
- [ ] Lighthouse 95+ and an axe scan with no serious issues
- [ ] Sitemap, OG images and analytics live on lostswe.com
