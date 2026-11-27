// Faux serveur TMDB pour les tests end-to-end et la CI : données figées, pas de réseau ni de clé.
// Reproduit les deux points d'accès utilisés par lib/ghibli.ts :
//   GET /3/discover/movie            → liste paginée (une seule page ici)
//   GET /3/movie/:id?append_to_response=credits,alternative_titles
// Contient deux leurres pour vérifier les filtres : un court métrage Ghibli et un film hors Ghibli.
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';

const movies = JSON.parse(
  readFileSync(new URL('./fixtures/tmdb-movies.json', import.meta.url), 'utf8'),
);
const port = Number(process.env.FIXTURE_PORT ?? 4010);

const send = (res, status, body) => {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(body));
};
// Retire le marqueur interne « _discover » (absent des vraies réponses TMDB).
const strip = (movie) => {
  const copy = { ...movie };
  delete copy._discover;
  return copy;
};

createServer((req, res) => {
  const { pathname } = new URL(req.url ?? '/', 'http://localhost');
  if (pathname === '/health') return send(res, 200, { ok: true });
  if (pathname === '/3/discover/movie') {
    const results = movies
      .filter((m) => m._discover !== false)
      .map(({ id, title, release_date }) => ({ id, title, release_date }));
    return send(res, 200, { page: 1, total_pages: 1, total_results: results.length, results });
  }
  const match = pathname.match(/^\/3\/movie\/(\d+)$/);
  if (match) {
    const movie = movies.find((m) => m.id === Number(match[1]));
    return movie
      ? send(res, 200, strip(movie))
      : send(res, 404, { success: false, status_code: 34 });
  }
  send(res, 404, { success: false });
}).listen(port, '127.0.0.1', () => {
  console.log(`Fake TMDB API on http://127.0.0.1:${port}`);
});
