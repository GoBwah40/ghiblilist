// Lighthouse CI : audite le build de production (API factice, cf. e2e/serve.mjs).
// L'accessibilité doit rester à 100 ; les autres catégories sont suivies sans bloquer.
module.exports = {
  ci: {
    collect: {
      startServerCommand: 'node e2e/serve.mjs',
      startServerReadyPattern: 'Ready in',
      startServerReadyTimeout: 180000,
      url: [
        'http://127.0.0.1:3200/',
        'http://127.0.0.1:3200/films/dc2e6bd1-8156-4886-adff-b39e6043af0c',
      ],
      numberOfRuns: 1,
      settings: {
        chromeFlags: '--headless=new --no-sandbox',
      },
    },
    assert: {
      assertions: {
        'categories:accessibility': ['error', { minScore: 1 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
        'categories:performance': ['warn', { minScore: 0.8 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: '.lighthouseci/reports',
    },
  },
};
