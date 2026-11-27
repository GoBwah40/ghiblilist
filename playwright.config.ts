import { defineConfig, devices } from '@playwright/test';

const PORT = 3200;
const FIXTURE_PORT = 4010;
const baseURL = `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: [
    {
      command: 'node e2e/fixture-server.mjs',
      url: `http://127.0.0.1:${FIXTURE_PORT}/health`,
      env: { FIXTURE_PORT: String(FIXTURE_PORT) },
      reuseExistingServer: !process.env.CI,
    },
    {
      // Build de production dans .next-e2e, alimenté par le faux serveur d'API.
      command: `next build && next start -p ${PORT}`,
      url: baseURL,
      env: {
        TMDB_API_URL: `http://127.0.0.1:${FIXTURE_PORT}`,
        NEXT_DIST_DIR: '.next-e2e',
      },
      timeout: 180_000,
      reuseExistingServer: !process.env.CI,
    },
  ],
});
