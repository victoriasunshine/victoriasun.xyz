@AGENTS.md
# CLAUDE.md — victoriasun.xyz

This is Victoria Sun's personal portfolio site. It's a Next.js 16 app with a Sanity CMS backend.

**Sitewide aesthetic: cream/journal — naturalist's field journal meets architect's sketchbook.** This applies to every page including the landing page and projects. The old dark/charcoal aesthetic is being replaced entirely. Do not reintroduce dark backgrounds, stark black, or the old mauve (#c49aae) anywhere unless explicitly asked.

---

## Stack

- **Next.js 16**, App Router, TypeScript
- **Tailwind CSS v4** — no tailwind.config.ts. All tokens defined in `app/globals.css` using `@theme {}`. Never create a tailwind.config.ts.
- **Framer Motion v12** — already installed. Use this for all animations. Prefer `motion` components and `AnimatePresence` for transitions.
- **Sanity v5** with `next-sanity` — CMS for blog posts, books, playlists, creative projects
- **styled-components v6** — installed but use sparingly; prefer Tailwind utility classes
- **react-icons** and **lucide-react** — both available for icons

---

## Project Structure

```
app/
  page.tsx                  ← Landing page (being redesigned — pond/lily pad/frog concept, cream aesthetic)
  layout.tsx                ← Root layout, fonts loaded here
  globals.css               ← ALL global styles and Tailwind v4 tokens go here
  projects/
    page.tsx                ← Projects index
    [project-name]/page.tsx ← Individual project pages (personal-portfolio, legacy-robotics, muon-project, foundation-fix)
  fun/
    page.tsx                ← Fun hub with 9-panel grid (cream aesthetic)
    blog/[slug]/page.tsx
    books/page.tsx
    books/[year]/page.tsx
    books/[year]/[slug]/page.tsx
    creative/page.tsx       ← Art gallery / collage layout
    playlist/page.tsx
    playlist/archive/page.tsx
    playlist/archive/[slug]/page.tsx
  api/
    spotify/callback/route.ts

components/
  navigation/
    BottomDock.tsx          ← Fixed bottom nav on landing page only
  layout/
    SplitContentLayout.tsx
  fun/
    FunGrid.tsx             ← 9-panel grid on /fun
    FunCard.tsx
    PlaylistButton.tsx
    BlogPreview.tsx
  sanity/
    PortableTextRenderer.tsx

sanity/
  schemaTypes/              ← Do not modify schemas without being explicitly asked
    blogPost.ts
    bookEntry.ts
    creativeProject.ts
    playlist.ts
    index.ts
  lib/
    client.ts               ← DO NOT TOUCH — Sanity client config
    queries.ts              ← GROQ queries live here, add new ones here
    image.ts                ← Sanity image URL builder
    live.ts
    spotify.ts
  structure.ts
  env.ts                    ← DO NOT TOUCH — env var references
```

---

## Design Tokens (Tailwind v4 — define in globals.css @theme)

```css
--color-cream: #f5f0e8;
--color-cream-dark: #ede8df;
--color-ink: #5c4f3d;             /* warm brown-gray — primary text, lines, borders */
--color-ink-light: #8c7d6b;       /* secondary text */
--color-ink-faint: #c4b8a8;       /* dividers, subtle borders */
--color-dust-blue: #8dafc4;       /* accent — hovers, inkblot effects, details */
--color-dust-blue-light: #b8d0e0; /* lighter blue for backgrounds/washes */
--color-muted-red: #c17a72;       /* use very sparingly — pops only */
```

### Typography
```css
--font-serif: 'Playfair Display', Georgia, serif;  /* body, labels, fallback for typed text */
--font-sans: var(--font-geist-sans);               /* utility, UI */
--font-mono: var(--font-geist-mono);               /* code only */
```

Add Playfair Display to layout.tsx via next/font/google.
Hand-lettered section titles come in as PNG/SVG assets from /public/illustrations/ — never substitute with a font.

---

## Landing Page Concept (app/page.tsx)

The landing page is being fully redesigned with a pond/nature scene:

- **Background:** cream `#f5f0e8` with subtle paper grain texture
- **Name:** "Victoria Sun" in her hand-lettered cursive — import as SVG/PNG asset, never substitute with a font
- **Subtitle:** "Computer Science / UC Irvine Donald Bren School" in Playfair Display italic, warm brown-gray
- **Navigation:** 4 lily pad SVGs arranged in a pond scene at the bottom. The frog sits on the active pad and arc-jumps (up then down, two-phase) to a new pad when a nav item is selected
- **Info panels:** fade in above the active pad when selected (same content as current panels: home, projects, fun, contact)
- **Hover:** dusty blue inkblot bleeds over the pad, label appears in darker dusty blue
- **Illustration assets needed:** frog (resting, mid-jump, landed poses), lily pads (4 slightly varied), water surface curvature lines, fly (optional)
- All illustration assets will arrive as Procreate SVG exports in `/public/illustrations/` — leave comment placeholders until they arrive

---

## Sanity Schemas (read-only reference)

**blogPost** — title, slug, publishedAt, excerpt, body (portable text), coverImage, pdfs[]

**bookEntry** — title, slug, author, finishDate, rating, country, era, genre, body

**creativeProject** — title, slug, images[], description, links[]{label, url}

**playlist** — month, year, slug, spotifyUrl, spotifyPlaylistId, coverImage, isCurrent

---

## GROQ Queries (sanity/lib/queries.ts)

All queries live in `sanity/lib/queries.ts`. When you need data from Sanity, check here first before writing a new query. Add new queries to this file, never inline in page components.

Key queries already defined:
- `blogPostsQuery` — all blog posts ordered by date
- `creativeProjectsQuery` — all creative projects with coverImageUrl
- `booksByYearQuery` — books filtered by year range
- `currentPlaylistQuery` — playlist where isCurrent == true
- `playlistArchiveQuery` — all playlists
- `playlistBySlugQuery` — single playlist by slug

To use Sanity data in a server component:
```tsx
import { client } from "@/sanity/lib/client";
import { someQuery } from "@/sanity/lib/queries";
const data = await client.fetch(someQuery, { params });
```

---

## Coding Conventions

- **Named exports** for components (`export function MyComponent`)
- **Default exports** for page files (`export default function Page()`)
- **"use client"** at top of any file using useState, useEffect, Framer Motion hooks, or event handlers
- Server components fetch Sanity data directly — no useEffect for data fetching
- Tailwind utility classes preferred over inline styles
- No arbitrary magic numbers — use token variables
- Component files: PascalCase. Utility files: camelCase.
- Keep page files thin — extract into components/ when logic or JSX gets complex

---

## Animation Conventions (Framer Motion)

- Use `AnimatePresence` with `mode="wait"` for page/panel transitions
- Prefer `opacity` + subtle `y` translate for entrances (y: 12 to y: 0 is usually enough)
- Animations should feel slow and organic — durations 0.5–0.8s, ease: [0.25, 0.1, 0.25, 1]
- Inkblot hover effects: use SVG clip-path or opacity transition on an absolutely positioned SVG element
- Always include `@media (prefers-reduced-motion)` — wrap complex animations in a check
- Do NOT use GSAP unless explicitly asked — Framer Motion is the standard here

---

## DO NOT TOUCH

- `sanity/lib/client.ts` — Sanity client config
- `sanity/env.ts` — environment variable references  
- `.env.local` — never read or modify
- `app/api/spotify/` — Spotify OAuth flow, don't touch unless specifically asked

---

## Current State (update as project evolves)

**Done:**
- Projects index + individual project pages (content sparse, pages exist)
- /fun hub with 9-panel FunGrid
- Books pages with Sanity integration
- Blog with Sanity integration
- Playlist pages (Spotify integration partially built)
- Sanity studio at /studio

**In Progress:**
- Landing page redesign (pond/frog concept — awaiting illustration assets)
- Aesthetic system rollout (cream sitewide — replacing old dark theme)
- globals.css @theme tokens (not yet defined, need to be added)

**Up Next:**
- Add @theme tokens to globals.css
- Apply cream aesthetic to all pages including landing and projects
- /fun page restructure: 9-tile grid → internal pages only (Creative, Playlists, Cooking, Reading List); social links (Beli, Fable, Letterboxd, Spotify) move to icon row below description
- /fun/creative page — art gallery / collage scroll layout
- Landing page pond scene (placeholder geometry until illustration assets arrive)
- Playfair Display font added to layout.tsx
- Illustration/sticker elements (PNG assets will be in /public/illustrations/)
- Spotify playlist custom layout
- Ambient audio player in layout

---

## Illustration Assets

Hand-drawn assets by Victoria (Procreate exports) will live in `/public/illustrations/`.
These are PNG with transparent backgrounds or SVGs.
Use them as decorative elements — absolutely positioned, pointer-events-none, never block content.
Do not substitute with CSS shapes or emoji if an asset is referenced but missing — leave a comment placeholder instead.

---

## Notes for Agent

- When making aesthetic changes, apply them globally across all pages unless told to scope it
- The 9-panel grid on /fun/page.tsx is a keeper — do not redesign it without being asked
- When adding new Sanity queries, always add to `sanity/lib/queries.ts`
- Commit frequently in small logical chunks — don't make 10 changes in one pass
- Victoria is the design director — implement what's described, don't improvise aesthetics
- Never reintroduce dark backgrounds or the old mauve color (#c49aae) — the whole site is going cream