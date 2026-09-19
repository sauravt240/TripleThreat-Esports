# ⚔️ TripleThreatEsports

> Tournament registration platform for esports — one hub, six arenas. Discover events, pick your game, register a squad (or yourself), and walk away with a confirmation code in under two minutes.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss&logoColor=white)
![Drizzle](https://img.shields.io/badge/Drizzle_ORM-0.45-c5f74f?logo=drizzle&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169e1?logo=postgresql&logoColor=white)

![TripleThreatEsports home hero](docs/screenshots/01-home-hero.jpg)

---

## Games covered

| Game | Mode | Featured tournament | Prize pool |
|---|---|---|---|
| **BGMI** | Squad · 4 players | Battlegrounds Championship · Season 3 | $6,000 |
| **Tekken 8** | 1v1 | King of Iron Fist Open '26 | $6,000 |
| **Tekken 7** | 1v1 | King of Iron Fist Classic | $3,000 |
| **Mortal Kombat** | 1v1 | Klassic Kombat Cup | $3,500 |
| **Call of Duty** | Squad · 4v4 | Operation Triple Threat — 4v4 Clash | $4,000 |
| **Free Fire** | Squad · 4 players | Booyah Blitz Cup | $2,500 |

## Features

- **Six fully themed registration pages** from a single dynamic route — each game defines a small theme object (accent, ink, glow, gradients) and a declarative field list; everything else is shared.
- **One reusable registration form** — field config drives rendering *and* validation (client-side + zod on the server), with squad vs. 1v1 field sets per game.
- **Live slot availability** — every "X / Y slots left" badge, bar and stat is computed from PostgreSQL at request time.
- **Real persistence** — registrations are stored in Postgres with capacity enforcement, duplicate game-ID protection (unique index → friendly `409`), and unique `TTE-XXXXXX` confirmation codes.
- **Confirmation page** — reads the registration straight from the database and renders a ticket-style code with a full summary.
- **Motion everywhere** — framer-motion scroll reveals, animated count-up stats, marquee, floating hero collage, hover micro-interactions, page transitions, `prefers-reduced-motion` support.
- **Accessible & responsive** — labelled inputs with `aria-invalid`/`role="alert"`, focus rings, contrast-checked theme inks, keyboard-navigable, mobile nav and reflowing layouts.

## Screenshots

### Landing

| | |
|---|---|
| ![Game selection grid](docs/screenshots/02-home-games.jpg) | ![Upcoming tournaments with live slots](docs/screenshots/03-home-tournaments.jpg) |

### Themed registration pages

Each game gets its own palette and mood — same layout system underneath.

| BGMI — warm gold & olive | Tekken 8 — neon red & cyan |
|---|---|
| ![BGMI registration hero](docs/screenshots/04-register-bgmi.jpg) | ![Tekken 8 registration hero](docs/screenshots/06-register-tekken-8.jpg) |

| BGMI — glance + form | Free Fire — vibrant orange |
|---|---|
| ![BGMI registration form](docs/screenshots/05-register-bgmi-form.jpg) | ![Free Fire registration hero](docs/screenshots/07-register-free-fire.jpg) |

### Tournament detail & confirmation

| | |
|---|---|
| ![Tournament details hero](docs/screenshots/08-tournament-detail.jpg) | ![Registration confirmation](docs/screenshots/09-confirmation.jpg) |

### Mobile

| | |
|---|---|
| ![Home on mobile](docs/screenshots/10-mobile-home.jpg) | ![Registration on mobile](docs/screenshots/11-mobile-register.jpg) |

## Tech stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + TypeScript
- **Tailwind CSS 4** with a CSS-variable theming system (`--accent`, `--glow`, `--accent-ink`)
- **Drizzle ORM** + **PostgreSQL** (node-postgres pool)
- **framer-motion** (reveals, transitions, count-ups) · **lucide-react** icons · **zod** (server-side validation)

## Project structure

```
src/
├── app/
│   ├── page.tsx                     Home / landing
│   ├── layout.tsx                   Root shell — fonts, header, footer
│   ├── template.tsx                 Page transition wrapper (framer-motion)
│   ├── globals.css                  Design tokens + themed utilities + form controls
│   ├── not-found.tsx                404
│   ├── games/[slug]/page.tsx        Themed registration page (all 6 games)
│   ├── tournaments/[id]/page.tsx    Tournament details — rules, schedule, prizes
│   ├── confirmation/[id]/page.tsx   Confirmation code + summary (reads from DB)
│   └── api/
│       ├── health/route.ts          DB healthcheck
│       └── registrations/route.ts   POST registration (validated, capacity-checked)
├── components/
│   ├── registration-form.tsx        The single reusable themed form
│   ├── game-card.tsx                Game tile (home grid)
│   ├── tournament-card.tsx          Tournament card with live slot bar
│   ├── site-header.tsx              Sticky nav + mobile menu
│   ├── site-footer.tsx              Footer with game/tournament links
│   ├── reveal.tsx                   Scroll-reveal primitive
│   └── count-up.tsx                 Animated stat counter
├── db/
│   ├── index.ts                     pg Pool + drizzle client
│   └── schema.ts                    registrations table (unique code, unique uid+tournament)
└── lib/
    ├── games.ts                     Game configs — themes, mode, form fields
    ├── tournaments.ts               Tournament data — dates, rules, prizes, schedules
    └── slots.ts                     Live slot-usage queries
public/games/                        Key art (JPEG, generated for this project)
docs/screenshots/                    README imagery
scripts/screenshots.mjs              Playwright capture script (regenerate the shots)
```

## Getting started

```bash
# 1. Install
npm install

# 2. Point at a Postgres instance
#    .env → DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/app_db

# 3. Push the schema
npx drizzle-kit push

# 4. Develop  ·  or  production
npm run dev
npm run build && npm start
```

## API

### `POST /api/registrations`

Body: `gameSlug`, `tournamentId` plus the fields declared in that game's config
(e.g. squad games: `ign`, `realName`, `email`, `phone`, `uid`, `teamName`, `role`, `experience`;
1v1 games: `ign`, `realName`, `email`, `uid`, `main`, `rank`, `experience`, `platform`).

| Status | Meaning |
|---|---|
| `201` | `{ "ok": true, "id": "…", "code": "TTE-XXXXXX" }` |
| `409` | Game ID already registered, or tournament full |
| `422` | Validation failed — `{ "error": "…", "field": "…" }` |
| `400` | Unknown game / tournament |

## How theming works

One layout, six identities. Each game in `src/lib/games.ts` ships a `theme` object whose
values become CSS custom properties on the page wrapper:

```css
--accent       /* primary color */        --glow   /* tinted glow / soft bg */
--accent-ink   /* readable text on accent-on buttons */  -2  /* secondary tint */
```

Buttons (`.btn-accent`), focus rings, chips, glows and gradients all consume those
variables — so a game page re-skins completely without touching component code or
breaking the site's shared design language.

## Regenerating the screenshots

```bash
npx playwright install chromium   # one-time
npm run build && npm start        # app must be running on :3000
node scripts/screenshots.mjs      # writes JPEGs to docs/screenshots/
```

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npx drizzle-kit push` | Push schema to Postgres |

---

*Portfolio demo. All game titles are trademarks of their respective owners — no affiliation.*
