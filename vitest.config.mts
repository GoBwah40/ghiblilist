import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./', import.meta.url)) },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    // Les scénarios Playwright vivent dans e2e/ et ont leur propre lanceur.
    exclude: ['**/node_modules/**', 'e2e/**', '.next/**', '.next-e2e/**'],
  },
});
