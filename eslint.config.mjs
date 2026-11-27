import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Le plugin est déjà chargé par eslint-config-next ; on passe ses règles en mode strict.
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: jsxA11y.flatConfigs.strict.rules,
  },
  globalIgnores(['.next/**', '.next-e2e/**', 'test-results/**', 'playwright-report/**', '.lighthouseci/**', 'out/**', 'build/**', 'coverage/**', 'next-env.d.ts']),
]);
