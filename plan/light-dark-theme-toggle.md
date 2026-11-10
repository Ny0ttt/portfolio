# Light/Dark Theme Toggle

## Summary
Add a persistent light/dark theme toggle to the portfolio. Default is **light**. Accent: navy (`#2563eb`) on light, purple (`#8c5cf5`) on dark. Toggle button lives in Navbar (sun/moon icon). Preference saved to `localStorage`.

## What Changes

### Token system
Extract all hardcoded hex values into CSS custom properties on `[data-theme]` selectors. Keep existing `--primary` / `--primary-rgb` / `--primary-light` / `--primary-lightest` names — just make them theme-dependent. Add new tokens for bg/border/text.

### Files

| File | Change |
|---|---|
| `src/ec-theme.ts` | Add `spectreLight` extending `github-light` |
| `astro.config.ts` | Dual EC themes + `themeCssSelector` per `data-theme` |
| `src/styles/globals.css` | Define both palettes under `[data-theme]`; remove old `:root` accent vars |
| `src/styles/reset.css` | `html` bg + color-scheme → token/theme-aware |
| `src/styles/index.css` | All hardcoded hex → tokens |
| `src/styles/article.css` | All hardcoded hex → tokens |
| `src/styles/article-list.css` | All hardcoded hex → tokens |
| `src/components/Card.astro` | `#121212` / `#353535` → tokens |
| `src/components/Navbar.astro` | Add toggle button + script; replace hardcoded colors |
| `src/layouts/Layout.astro` | Inline blocking script in `<head>` (FOUC prevention); no `data-theme` in HTML (set by script) |
| `src/scripts/page-background.ts` | Theme-aware: stroke vs fill for base canvas; re-init on theme change |

## Token Palette

```
                    dark              light
--primary           #8c5cf5           #2563eb
--primary-rgb       140,92,245        37,99,235
--primary-light     #a277ff           #3b82f6
--primary-lightest  #c2a8fd           #93c5fd
--color-bg          #0b0b0b           #f9f9f9
--color-bg-card     #121212           #ffffff
--color-bg-hover    #1e1e1e           #f0f0f0
--color-bg-nav      #181818           #f5f5f5
--color-bg-search   #252525           #ffffff
--color-bg-tag      #252525           #e8e8e8
--color-bg-tag-hover #353535          #d8d8d8
--color-border      #353535           #e0e0e0
--color-text        #ffffff           #111111
--color-text-muted  #c7c7c7           #444444
--color-text-subtle #a0a0a0           #555555
--color-text-faint  #777777           #888888
```

## Background Canvas (light theme)
- Base canvas (static letters): `strokeText` with `rgba(0,0,0,0.06)` + `lineWidth: 0.5`
- Overlay canvas (glowing animated): same fade animation, navy accent (`--primary-rgb`)
- On theme toggle: dispatch `theme-change` custom event; PageBackground re-inits

## EC Dual Theme
- `spectreLight` extends `github-light`, editor bg `#f5f5f5`
- `useDarkModeMediaQuery: false`
- `themeCssSelector`: `[data-theme="dark"]` / `[data-theme="light"]`

## FOUC Prevention
Inline `<script>` as first child of `<head>` — reads `localStorage.getItem('theme') ?? 'light'` and sets `data-theme` on `<html>` before CSS renders.

## Risks / Edge Cases
- `color-scheme` property on `html` must also be theme-aware (scrollbar/input styling)
- Glow effects (`.glow-icon`, `.text-glow`) look fine on light with navy — no change needed
- `pfp.png` not transparent — accepted as-is for now
- Code blocks: light EC theme applied; dark blocks only appear on pages with no `data-theme="light"` coverage (shouldn't happen)
