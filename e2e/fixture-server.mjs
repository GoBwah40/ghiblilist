// Faux serveur de la Studio Ghibli API pour les tests end-to-end : données figées,
// pas de dépendance au réseau ni aux changements de l'API publique.
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';

const films = JSON.parse(readFileSync(new URL('./fixtures/films.json', import.meta.url), 'utf8'));
const port = Number(process.env.FIXTURE_PORT ?? 4010);

const send = (res, status, body) => {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(body));
};

createServer((req, res) => {
  const { pathname } = new URL(req.url ?? '/', 'http://localhost');
  if (pathname === '/films' || pathname === '/films/') return send(res, 200, films);
  const match = pathname.match(/^\/films\/([^/]+)$/);
  if (match) {
    const film = films.find((f) => f.id === decodeURIComponent(match[1]));
    return film ? send(res, 200, film) : send(res, 404, {});
  }
  // Point de santé utilisé par Playwright pour savoir que le serveur est prêt.
  if (pathname === '/health') return send(res, 200, { ok: true });
  send(res, 404, {});
}).listen(port, '127.0.0.1', () => {
  console.log(`Fixture Ghibli API on http://127.0.0.1:${port}`);
});
