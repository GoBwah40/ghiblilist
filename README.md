# The GhibliList

Catalogue of Studio Ghibli feature films: posters, banner, synopsis, director, producer, release date, score and duration for each film, plus a search across English, original and romanised titles.

Data comes from the community [Studio Ghibli API](https://ghibliapi.vercel.app/). Pages are generated at build time and revalidated once a day (ISR), so the site stays up even if the API is briefly unavailable.

## Stack

- [Next.js 16](https://nextjs.org/) (Pages Router, static generation + ISR), React 19, TypeScript
- [Tailwind CSS 4](https://tailwindcss.com/) and [daisyUI 5](https://daisyui.com/)
- ESLint 9 (`eslint-config-next`), Prettier, Vitest + Testing Library

## Getting started

Requires Node.js 20.9 or later.

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command             | Description                   |
| ------------------- | ----------------------------- |
| `npm run dev`       | Development server            |
| `npm run build`     | Production build              |
| `npm start`         | Serve the production build    |
| `npm run lint`      | ESLint                        |
| `npm run typecheck` | TypeScript check              |
| `npm test`          | Unit tests (Vitest)           |
| `npm run pretty`    | Format the code with Prettier |

## Project layout

```
components/   Navbar, footer, film card, banner, detail block
lib/ghibli.ts Studio Ghibli API client, data normalisation and search
model/        Film type
pages/        Home page (/) and film page (/films/[id])
__tests__/    Unit tests
```
