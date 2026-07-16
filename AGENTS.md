<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

# AGENTS.md — victoriasun.xyz

Behavioral rules for Claude Code when working on this project.
Read this before taking any action.

---

## Most Important Rule: Confirm Before Executing

**Never make any file edits without explicit execution approval.**

When given a task, follow this exact flow:

1. **Read** the relevant files and understand the current state
2. **Restate** what you understood the task to be, in plain language
3. **Describe your plan** — which files you'll touch, what you'll change in each, any decisions you made that weren't specified
4. **Wait** for Victoria to respond and refine
5. **Only begin editing files** when she says something like "yes go ahead", "execute", "that sounds good", or a clear equivalent

If she pushes back or clarifies, update your plan and describe it again. Repeat until she approves. Do not interpret silence or partial agreement as approval.

If a task is genuinely simple and unambiguous (e.g. "fix this typo"), you may use judgment — but when in doubt, confirm.

---

## Planning Standards

When describing your plan, always include:
- Which files you will create or modify (exact paths)
- What you will add, change, or remove in each
- Any npm packages you plan to install
- Any design or layout decisions you made that weren't explicitly specified
- Anything you're uncertain about — flag it, don't guess

If a task would touch more than 3 files, list all of them before proceeding.

---

## Never Do Without Being Asked

- Install npm packages — describe what you want to install and why, wait for approval
- Restructure the folder layout or rename files
- Modify Sanity schemas (`sanity/schemaTypes/`)
- Make aesthetic decisions not explicitly described in the task (color, spacing, layout, motion)
- Substitute illustration assets with emoji, CSS shapes, stock images, or placeholder libraries — use an HTML comment instead: `{/* TODO: illustration asset — /public/illustrations/filename.svg */}`
- Run `git push` or deploy anything

---

## File Discipline

**Never touch these files under any circumstances:**
- `sanity/lib/client.ts`
- `sanity/env.ts`
- `.env.local`
- `app/api/spotify/` (any file in this directory)

**Never create:**
- `tailwind.config.ts` — this project uses Tailwind v4, config lives in `globals.css`
- Inline GROQ queries in page files — all queries go in `sanity/lib/queries.ts`

---

## After Executing

- Run `npm run build` and confirm it passes before saying you're done
- If the build fails, fix it before reporting back — don't hand back broken code
- Summarize what you changed in plain language after completing a task
- Suggest what the logical next step would be, but don't start it

---

## Aesthetic Discipline

Victoria is the design director. Do not improvise aesthetics.

If a task prompt doesn't specify a color, spacing value, animation duration, or layout detail that you need to make a decision about — stop and ask. Do not fill in the gap with your own judgment. The design system is in CLAUDE.md; use those tokens, and if something isn't covered there, ask.

Never reintroduce dark backgrounds, stark black, or the old mauve color (#c49aae). The entire site is moving to the cream aesthetic defined in CLAUDE.md.
<!-- END:nextjs-agent-rules -->
