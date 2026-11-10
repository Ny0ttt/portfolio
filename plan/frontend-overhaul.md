# Frontend Overhaul — Writing-First Engineering Log

## Summary
Both current sites read as "AI slop" (template layout, generic hero, look-alike cards). Rebuild
the **frontend** of this Astro site from scratch with its own identity, and merge in the useful
content from `../portfolio-landing-page` (Next.js). Keep the engine: Astro 6, MDX content
collections, Expressive Code, Pagefind, sitemap, GitHub Pages deploy.

One site, one URL, under the name **Rasyid Hamidun**. Its job is credibility (clients, partners,
employers), not reach. Blog-first: posts are the main output, and projects back them up.

## Decisions (locked 2026-11-10)
| Decision | Choice | Why |
|---|---|---|
| Which codebase | This Astro repo | Already has blog, MDX, git, CI deploy; the Next.js one has none of these |
| Rewrite scope | Frontend only: layouts, components, styles | Engine works; rewriting it would change nothing a visitor sees |
| Design direction | **fasterthanli.me**: writing-first, dense, strong personal voice, posts as deep-dives | Ny0t's pick |
| Secondary reference | **oxide.computer**: industrial and engineered, for accents only | Ny0t's liked template (`library/theme/design-references.md`) |
| Next.js site | Archive, don't delete, once content is ported | Keep its copy (Problem / Solution / Impact text, contact) |
| Polish tooling | Selected `emilkowalski/skills` (see Phase 3) | Good for motion and interaction detail, not for identity |

## Explicitly not doing
- No gradient hero, glass cards, row of three icon cards, "Hi I'm X 👋", or stock illustrations.
- No new framework, no CMS, no backend.
- No invented metrics in project write-ups (carried over from the Next.js Phase 2 rule).

## Pages (keep it to these)
| Page | Purpose |
|---|---|
| `/` | Who I am in one line, latest posts, selected projects |
| `/blog`, `/blog/[post]` | Main output. Reading experience is the top priority |
| `/projects`, `/projects/[project]` | Problem / Solution / Impact + stack + links |
| `/about` | Short bio, how to reach me (replaces the Next.js contact section) |
| `/legal/*` | Keep as-is (Buckt policy is linked from the app) |
| `404` | Restyle only |

## Phases

### Phase 0 — Checkpoint ✅ (2026-11-10)
- [x] Ny0t chose to **discard** the June theme-toggle work: 11 tracked files restored to HEAD
      (styles, Navbar, Card, Layout, ec-theme, astro.config). No content files were touched. Kept:
      untracked `plan/` and `src/assets/pfp3.png`. `plan/light-dark-theme-toggle.md` is now
      superseded by this plan.
- Ny0t's rule for the build: **fully new UI, as long as all existing content carries over.**

### Phase 1 — Direction ✅ (locked 2026-11-10)
Mockups: https://claude.ai/artifact/DrqtrJa7d3s8dbA2PpHMMK (private canvas). Reference boards:
"B · light theme — home" and "B · light theme — blog post"; "B · Spec Sheet — home" for dark.

**Picked: B "Spec Sheet" layout**, with A's warm palette as the light theme and B's dark palette as
the dark theme. Ny0t's reason: the variety of elements (numbered sections, grid lines, spec rows)
makes it feel spacious.

**Fonts (only these two):** Inter Tight 400/500/600 (headings and body), JetBrains Mono
400/500/700 (labels, nav, meta, code).

**Colour tokens**
| Token | Light (default) | Dark |
|---|---|---|
| `--bg` | `#f6f3ec` | `#0f1211` |
| `--surface` (asides, active nav) | `#ece5d6` | `#151a18` |
| `--text` | `#1f1c17` | `#e4e7e3` |
| `--text-2` (dek, body secondary) | `#3a352d` | `#c3c9c5` |
| `--muted` | `#5c564b` | `#9aa39e` |
| `--rule` | `#d9d3c5` | `#2a312e` |
| `--accent` | `#a8420a` | `#e2a948` |
| `--code-bg` / `--code-fg` | `#1f1c17` / `#ebe5d8` | `#151a18` / `#e4e7e3` |

**Signature details**
- Numbered section labels in mono: `[00]`, `[01] LOGBOOK`, `[02] BUILDS`.
- 1px hairline grids instead of cards: no radius, no shadows.
- Posts are `LOG-001`… and projects are `B-01`…; project blocks use PROBLEM / BUILT / STACK / RESULT
  rows.
- Post header is a meta grid (FILED / READ / SUBJECT / ALSO); headings numbered `01`; code as
  `FIG. n`; "DEAD END" aside for wrong turns.
- Nav: mono `/writing /projects /about`, cells split by rules, theme toggle, `contact ↗` in accent.

**Type scale:** h1 `clamp(38px, 5.4vw, 68px)` / 500 / -0.025em; post body 19px / 1.7 with
max-width 700px; mono labels 11–12px with 0.08–0.12em tracking.

### Phase 2 — Build ✅ (2026-11-10, uncommitted)
- [x] Tokens in `globals.css` (reset merged in, `reset.css` deleted). Theme follows the OS until the
      toggle is clicked, then `localStorage` wins; an inline script sets it before first paint.
- [x] `Layout.astro`, `SiteHeader.astro` (mono nav cells, theme toggle, contact), `SiteFooter.astro`.
      Fonts: Google Fonts link (Inter Tight + JetBrains Mono).
- [x] `prose.css`: auto-numbered h2, `FIG. n` code blocks, hairline tables, blockquote callouts.
      Expressive Code reskinned via CSS vars (`ec-theme.ts` + `astro.config.ts` styleOverrides).
- [x] Pages: home (`[00]` spec grid, `[01] LOGBOOK`, `[02] BUILDS`, `[03] HOW I WORK`), writing index
      (tag filter), post, projects index, project detail (meta grid from `info`), **new `/about`**
      (about.mdx, quick info, portrait `pfp3.png`, work history from `work.json`, which nothing
      displayed before, plus contact), legal index and policy, 404.
- [x] Components: `MetaGrid`, `Note` (MDX aside), `BuildBlock`, `LogEntry`. Ids from
      `utils/content.ts` (`LOG-001` / `B-01`, numbered oldest-first so they stay stable).
- [x] Deleted the template parts: Background, Card, ImageGlow, LayoutGrid, Navbar, toc/page-background
      scripts, old CSS, Geist fonts, giscus styles.
- [x] Content: removed `getting-started.mdx` and `spectre.png`, set real tags, site name
      **Rasyid Hamidun**, new OG image + favicon, optional `problem/built/result` frontmatter (filled
      for smart-lab and cleo). Draft outline post `decoding-resolve-project-db.mdx` shows only in `pnpm dev`.
- [x] Next.js content audit: **Sentiment Analysis not ported**, because its spec says "not a
      portfolio project" (client internal tool). Senduk and HealthVenture were stubs with no content.
      Everything else already existed here, and in more detail.
- [x] `pnpm build` clean (15 pages, Pagefind ok), `pnpm lint` clean.
- Removed: the Ctrl+K search box. Pagefind still indexes posts and projects; re-add search if the
  post count grows.

### Phase 3 — Polish ✅ (2026-11-10, uncommitted)
Skills read from GitHub (`mobile-native`, `break-ui`, `find-animation-opportunities`,
`remove-animations`, `emil-design-eng`) and applied by hand. Nothing installed.
Checked with headless Firefox screenshots (`~/snap/firefox/common/anyit0-shot/shot.sh`) at 1280px
and 390px, light and dark.
- [x] Mobile: no tap flash, `touch-action: manipulation`, every `:hover` gated behind
      `(hover: hover) and (pointer: fine)` with `:active` press states for touch, no long-press text
      selection on buttons, notch-safe padding (`env(safe-area-inset-*)`), and a `theme-color` that
      follows the theme toggle. The phone nav now fits on one row.
- [x] Stress test with temporary worst-case content (90-char title, 9 tags, unbreakable
      path/SQL/URL, 10-item stack, long GitHub URL). Fixed: page overflow from unbreakable strings
      (`overflow-wrap: anywhere` in prose); the project eyebrow repeating the whole stack (now id ·
      year); a long subject squeezing into one cell (`MetaGrid` is now a wrapping flex with `wide`
      cells). Test content removed afterwards.
- [x] Layout bugs found in screenshots: meta grid touching the standfirst, contents column
      pushing the article right, "Dead end" box touching the paragraph above, extra gap above an
      article's first heading.
- [x] Motion: a single `--ease-out` curve at 120ms for hover colour only. Nothing animates on load
      or on keyboard actions. No motion was added; the restraint is deliberate.
- [ ] Lighthouse not run: no Chrome on this machine. Run it from Chrome DevTools on the live site.
- Open decision: wide tables on phones scroll sideways inside their box, with no visual hint.

### Phase 4 — Launch
- [ ] Ny0t pushes; check the live deploy at `ny0ttt.github.io/portfolio`. Live status is not yet
      verified.
- [ ] Archive `../portfolio-landing-page`.
- [ ] First real post: the `Project.db` decode.

## Open questions
- Custom domain (would also remove the `/portfolio` base path).
- Whether the theme toggle stays default-light or follows the system setting.
