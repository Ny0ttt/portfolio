# Add Projects: Buckt, Calcbench, Video Editing Pipeline

*Created 2026-11-11. Status: project selection only. No entry content drafted yet.*

## Summary
Add three new project entries to `src/content/projects/`. Each one appears on `/projects`.
The homepage stays as it is (Cleo + Smart Lab featured, plus the newest other project) unless decided otherwise.

## The three entries

| # | File (planned) | What the card shows | Public link | Notes |
|---|---|---|---|---|
| 1 | `buckt.mdx` | Buckt: React Native + Firebase envelope-budgeting app (cycle-based, iOS + Android) | `github.com/Ny0ttt/buckt` (in sync, last commit "first releaase", 2026-08-17) | Its privacy policy is already on the site (`legal/buckt.mdx`). Link the two. |
| 2 | `calcbench.mdx` | Calcbench: TypeScript MCP benchmark comparing stdio-MCP, HTTP-MCP and direct-HTTP for an AI agent driving app logic | **None.** `~/programmin/calcbench` is not a git repo | Present it as a benchmark/research build, not a product. The "non-guessable tool" design (`ny0tadd`) is the hook. |
| 3 | `davinci-resolve-linux-automation.mdx` | **The public repo only** (`[resolve-oss]`, MIT): DaVinci Resolve FREE automation on Linux. Whisper captions turned into FCPXML timelines | `github.com/Ny0ttt/davinci-resolve-linux-automation` (**local is 3 commits ahead, unpushed**) | Do **not** describe the private lab (`video-editing-pipeline/`). It holds private data (streamer profiles, `fixzplays`). Cross-link the existing post `decoding-resolve-project-db`. |

## Blockers and risks before publishing
- **Calcbench has no public link.** Either init and push a repo, or publish the card without one.
- **resolve-oss is 3 commits ahead of origin** (includes `973877f`). Push before the card goes live. Otherwise a visitor's clone is missing `samples/jfk.mp4` and the demo command fails.
- **resolve-oss leak gate** publishes its own denylist in plaintext. The card will send traffic there, so the same fix applies.
- Date format: existing entries mix `MM-DD-YYYY` and `YYYY-MM-DD`. New entries use `YYYY-MM-DD`.

## Next step
Draft the three `.mdx` entries (frontmatter: title, description, date, info, problem, built, result, then body) after Ny0t approves this list.

---

## Implemented 2026-11-11 (Ny0t approved: "go")

**Files**
- Added `src/content/projects/buckt.mdx` (date 2026-04-01). Links to `/portfolio/legal/buckt`.
- Added `src/content/projects/calcbench.mdx` (date 2026-11-01). Includes the results table from `calcbench/bench/results/TABLE.md` and links to Buckt.
- Added `src/content/projects/davinci-resolve-linux-automation.mdx` (date 2026-10-01). Describes the public repo only.
- `src/pages/index.astro`:
  - `featuredIds` changed from `smart-lab, cleo` to `davinci-resolve-linux-automation, calcbench, buckt`. Homepage order is Calcbench, Resolve, Buckt (newest first).
  - "Primary stack" changed to `TypeScript · Python · Laravel · React Native`.
- Not changed: hero, "Currently", "How I work". Cleo and Smart Lab are still on `/projects`.

**Deviations from the list above**
- **No cross-link to `decoding-resolve-project-db`.** That post is `draft: true`, so a link would 404. Add it when the post is published.
- **No repo links (`link:` frontmatter) on any of the three entries.** Ny0t's call: add them later, after resolve-oss is pushed and Calcbench has a public repo.

**Verified**: `astro build` passes (18 pages). The homepage shows the 3 new builds, all 3 project pages render, and the internal links resolve.

**Revert**: delete the 3 `.mdx` files and restore the two `index.astro` lines.

**Open (reminder owed to Ny0t)**
- ~~resolve-oss link~~ — DONE 2026-11-11 (Ny0t pushed `973877f`; link added on the GitHub info row + a Links section).
- ~~Calcbench link~~: DONE 2026-11-11. Repo prepped (private-data check clean, README, MIT, gitignore), Ny0t pushed `Ny0ttt/calcbench`, link added.
- Buckt link (GitHub / Play Store): not added yet.
- Confirm Buckt's Play Store listing name (the in-app name is "Salaryman").
