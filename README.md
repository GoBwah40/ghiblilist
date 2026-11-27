# The GhibliList

Catalogue of Studio Ghibli feature films: posters, banner, synopsis, director, producer, release date, rating and duration for each film, plus a search across English, original and romanised titles. Four themes, WCAG 2.2 AA.

**Live site:** [ghiblilist.vercel.app](https://ghiblilist.vercel.app) once the Vercel deployment is done (see _Deploying on Vercel_).

Data comes from [TMDB](https://www.themoviedb.org/) (Studio Ghibli = company 10342): every animated feature film the studio has released, with posters, banners, synopsis, director, producer, runtime and TMDB rating. The community Studio Ghibli API used until 2026 has been frozen since 2022 and stopped at 2021. Pages are generated at build time and revalidated once a day (ISR), so new films appear on their own and the site stays up even if TMDB is briefly unavailable.

Short films (under 60 minutes), non-animated titles (documentaries, making-ofs, stage plays), unreleased films and films not produced by Ghibli are filtered out, plus two titles excluded by hand: a Takahata documentary and _Ghost in the Shell 2: Innocence_, a Production I.G film Ghibli only co-produced (`lib/ghibli.ts`). In November 2026 that leaves **24 films, from _Castle in the Sky_ (1986) to _The Boy and the Heron_ (2023)**, including the TV film _Ocean Waves_ that Ghibli lists in its own filmography.

_This product uses the TMDB API but is not endorsed or certified by TMDB._

## Accessibility

The site targets **WCAG 2.2 level AA**.

**Lighthouse (mobile, throttled): Accessibility 100 · Best Practices 100 · SEO 100 · Performance 89–92.** The accessibility score is enforced in CI: the build fails if it drops below 100.

- **Keyboard**: a "Skip to main content" link is the first focusable element. Every link and field has a visible focus ring (white ring + black halo, readable on both the dark background and the blue header).
- **Contrast**: every text is at least 5.6:1 (AA asks for 4.5:1), and black on the Ghibli blue is 7:1. Text over the film banners stays above 5.7:1 even on the brightest image.
- **Screen readers**: semantic landmarks (header, nav, main, footer), one `h1` per page, a page title per film, decorative images hidden (`alt=""`), Japanese titles tagged with `lang="ja"`. External links say they open a new tab.
- **Search**: the field has a visible label and help text, and the number of results is announced as you type (`role="status"`).
- **Responsive**: no horizontal scroll down to 320 px wide (reflow); every touch target is at least 24 × 24 px.
- **Preferences**: animations are disabled when `prefers-reduced-motion` is set; the focus ring follows the system colour in Windows high-contrast mode.

Checked automatically on every CI run:

- `eslint-plugin-jsx-a11y` in **strict** mode (`npm run lint`)
- [axe-core](https://github.com/dequelabs/axe-core) on the components, WCAG 2.0 → 2.2 A/AA rules (`npm test`)
- axe-core again in a real Chromium, desktop and mobile, on the home page and a film page **in each of the four themes**, plus a search with no result and the 404 — this run includes colour contrast (`npm run test:e2e`)
- Playwright keyboard scenarios: skip link, reaching a film with the keyboard only, visible focus ring, `prefers-reduced-motion`, 24 × 24 px targets
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) on the home and film pages, accessibility score asserted at 100 (`npm run lighthouse`)

Automated tools catch only part of the issues, so the site was also tested by hand with VoiceOver + Safari (15-step protocol, all passed on 27 Nov 2026): see [docs/test-voiceover.md](docs/test-voiceover.md).

Contrast, reflow and target sizes were also measured in the browser at 1280 px and 320 px.

## Stack

- [Next.js 16](https://nextjs.org/) (Pages Router, static generation + ISR), React 19, TypeScript
- [Tailwind CSS 4](https://tailwindcss.com/) and [daisyUI 5](https://daisyui.com/)
- ESLint 9 (`eslint-config-next`, `jsx-a11y` strict), Prettier, Vitest + Testing Library + axe-core, Playwright

## Getting started

Requires **Node.js 22.22+, 24.15+ or 26+** (the test tooling — Vitest, jsdom, Lighthouse CI — needs it; the app alone would run on Node 20.9+) and a free TMDB API key ([themoviedb.org → Settings → API](https://www.themoviedb.org/settings/api)). Either the v3 API key or the v4 read access token works.

```bash
cp .env.example .env.local   # then paste your key after TMDB_API_KEY=
npm install
npm run dev
```

### Deploying on Vercel

The Vercel project `ghiblilist` is connected to this repository: every push creates a Preview deployment, and the default branch (`dev`) deploys to production at [ghiblilist.vercel.app](https://ghiblilist.vercel.app).

1. Project Settings → Environment Variables: add `TMDB_API_KEY` for Production and Preview (without it the build stops with an explicit message).
2. Redeploy. The Node.js version comes from `engines` in `package.json` (Node 26), whatever the project setting says.

Then open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command              | Description                   |
| -------------------- | ----------------------------- |
| `npm run dev`        | Development server            |
| `npm run build`      | Production build              |
| `npm start`          | Serve the production build    |
| `npm run lint`       | ESLint                        |
| `npm run typecheck`  | TypeScript check              |
| `npm test`           | Unit tests (Vitest)           |
| `npm run test:e2e`   | End-to-end tests (Playwright) |
| `npm run lighthouse` | Lighthouse CI audit           |
| `npm run pretty`     | Format the code with Prettier |

## End-to-end tests

Playwright runs the production build against a local fake of the TMDB API (`e2e/fixture-server.mjs`, data frozen in `e2e/fixtures/tmdb-movies.json`, including a Ghibli short film and a non-Ghibli film that must be filtered out), so the tests need neither the network nor a key. Each scenario runs on desktop Chrome and on a mobile viewport (Pixel 7).

```bash
npx playwright install chromium   # first time only
npm run test:e2e                  # or npm run test:e2e:ui to watch them run
```

The build goes to `.next-e2e/`, so it never overwrites a running `npm run dev`.

## Themes

Four art directions, picked from the navbar (**Theme** select). By default the site follows the device setting: _Watercolour_ in light mode, _Night sky_ in dark mode. The choice is saved in `localStorage` and applied by a small inline script before the first paint, so there is no flash of the wrong theme.

| Theme        | Mood                                                | Fonts                    |
| ------------ | --------------------------------------------------- | ------------------------ |
| Watercolour  | Cream paper, washed sky, sketchbook (light)         | Fraunces, Nunito         |
| Night sky    | Starry navy blue, lantern yellow                    | M PLUS Rounded 1c        |
| Shōwa poster | 1960s Japanese film poster: cream, vermilion, black | Dela Gothic One, Inter   |
| Forest       | Deep moss green, leaf-shaped corners                | DM Serif Display, Nunito |

Every theme defines the same CSS tokens (`styles/globals.css`); components only use those tokens. The wordmark and the logo restyle themselves per theme while their accessible name stays "The GhibliList". Fonts are not preloaded: the browser only downloads the ones of the active theme.

## Logo

`public/logos/logo.svg` is the app logo and the source of every icon (favicon, Apple touch icon, PWA icons): a checklist under a sun, over two hills in the site's blue. The navbar uses an inline copy (`components/logo.tsx`) whose colours follow the theme. It is an original design and uses no Studio Ghibli artwork.

The eight-pointed star with the kanji 家 in the footer, next to "Made and built by…", is not the app logo: it is the author's personal signature (GoBwah40), `public/logos/gobwah.svg`, the same mark as on the author’s portfolio.

## Project layout

```
pages/          Home page (/), film page (/films/[id]), _app (layout, fonts), _document (theme script)
components/     Navbar, footer, film card, banner, details, wordmark, logo, theme select, icons
lib/ghibli.ts   TMDB client, Ghibli filmography filter, mapping and search
lib/theme.ts    The four themes, saved choice and no-flash bootstrap script
model/          Film type
styles/         globals.css: Tailwind, theme tokens, wordmark styles, focus ring
fonts/          Self-hosted Latin subsets of the two Japanese fonts (see fonts/README.md)
public/         Logos, icons, web manifest
docs/           Manual VoiceOver test protocol and its result
__tests__/      Unit tests (Vitest, Testing Library, axe-core)
e2e/            Playwright scenarios, fake TMDB server and its fixtures, Lighthouse server
```
