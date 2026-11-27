# The GhibliList

Catalogue of Studio Ghibli feature films: posters, banner, synopsis, director, producer, release date, score and duration for each film, plus a search across English, original and romanised titles.

Data comes from the community [Studio Ghibli API](https://ghibliapi.vercel.app/). Pages are generated at build time and revalidated once a day (ISR), so the site stays up even if the API is briefly unavailable.

## Accessibility

The site targets **WCAG 2.2 level AA**.

**Lighthouse (mobile, throttled): Accessibility 100 · Best Practices 100 · SEO 100 · Performance 94–99.** The accessibility score is enforced in CI: the build fails if it drops below 100.

- **Keyboard**: a "Skip to main content" link is the first focusable element. Every link and field has a visible focus ring (white ring + black halo, readable on both the dark background and the blue header).
- **Contrast**: every text is at least 5.6:1 (AA asks for 4.5:1), and black on the Ghibli blue is 7:1. Text over the film banners stays above 5.7:1 even on the brightest image.
- **Screen readers**: semantic landmarks (header, nav, main, footer), one `h1` per page, a page title per film, decorative images hidden (`alt=""`), Japanese titles tagged with `lang="ja"`. External links say they open a new tab.
- **Search**: the field has a visible label and help text, and the number of results is announced as you type (`role="status"`).
- **Responsive**: no horizontal scroll down to 320 px wide (reflow); every touch target is at least 24 × 24 px.
- **Preferences**: animations are disabled when `prefers-reduced-motion` is set; the focus ring follows the system colour in Windows high-contrast mode.

Checked automatically on every CI run:

- `eslint-plugin-jsx-a11y` in **strict** mode (`npm run lint`)
- [axe-core](https://github.com/dequelabs/axe-core) on the components, WCAG 2.0 → 2.2 A/AA rules (`npm test`)
- axe-core again in a real Chromium, desktop and mobile, on the home page, a search with no result, a film page and the 404 — this run includes colour contrast (`npm run test:e2e`)
- Playwright keyboard scenarios: skip link, reaching a film with the keyboard only, visible focus ring, `prefers-reduced-motion`, 24 × 24 px targets
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) on the home and film pages, accessibility score asserted at 100 (`npm run lighthouse`)

Automated tools catch only part of the issues, so the site was also tested by hand with VoiceOver + Safari (15-step protocol, all passed on 27 Nov 2026): see [docs/test-voiceover.md](docs/test-voiceover.md).

Contrast, reflow and target sizes were also measured in the browser at 1280 px and 320 px.

## Stack

- [Next.js 16](https://nextjs.org/) (Pages Router, static generation + ISR), React 19, TypeScript
- [Tailwind CSS 4](https://tailwindcss.com/) and [daisyUI 5](https://daisyui.com/)
- ESLint 9 (`eslint-config-next`, `jsx-a11y` strict), Prettier, Vitest + Testing Library + axe-core, Playwright

## Getting started

Requires Node.js 20.9 or later.

```bash
npm install
npm run dev
```

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

Playwright runs the production build against a local fake of the Studio Ghibli API (`e2e/fixture-server.mjs`, data frozen in `e2e/fixtures/films.json`), so the tests don't depend on the network. Each scenario runs on desktop Chrome and on a mobile viewport (Pixel 7).

```bash
npx playwright install chromium   # first time only
npm run test:e2e                  # or npm run test:e2e:ui to watch them run
```

The build goes to `.next-e2e/`, so it never overwrites a running `npm run dev`.

## Project layout

```
components/   Navbar, footer, film card, banner, detail block
lib/ghibli.ts Studio Ghibli API client, data normalisation and search
model/        Film type
pages/        Home page (/) and film page (/films/[id])
__tests__/    Unit tests
e2e/          Playwright scenarios and API fixture server
```
