// Sert le build de production alimenté par le faux serveur d'API (Lighthouse CI).
// Démarre l'API factice, compile dans .next-e2e puis lance `next start` sur le port 3200.
import { spawn, execSync } from 'node:child_process';

const env = {
  ...process.env,
  GHIBLI_API_URL: 'http://127.0.0.1:4010',
  NEXT_DIST_DIR: '.next-e2e',
};

const children = [spawn('node', ['e2e/fixture-server.mjs'], { stdio: 'inherit', env })];
const stop = () => children.forEach((child) => child.kill());
process.on('SIGINT', stop);
process.on('SIGTERM', stop);

await new Promise((resolve) => setTimeout(resolve, 500));
execSync('npx next build', { stdio: 'inherit', env });
children.push(spawn('npx', ['next', 'start', '-p', '3200'], { stdio: 'inherit', env }));
