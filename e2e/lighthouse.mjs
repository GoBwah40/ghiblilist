// Lance Lighthouse CI avec le Chromium de Playwright si aucun Chrome n'est fourni (poste local).
import { spawnSync } from 'node:child_process';
import { chromium } from '@playwright/test';

const env = { ...process.env, CHROME_PATH: process.env.CHROME_PATH ?? chromium.executablePath() };
const { status } = spawnSync('npx', ['lhci', 'autorun'], { stdio: 'inherit', env });
process.exit(status ?? 1);
