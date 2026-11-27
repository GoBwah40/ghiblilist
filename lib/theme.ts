export const THEMES = [
  { id: 'aquarelle', label: 'Watercolour', bar: '#f7f1e3' },
  { id: 'nuit', label: 'Night sky', bar: '#0a1026' },
  { id: 'showa', label: 'Shōwa poster', bar: '#141414' },
  { id: 'foret', label: 'Forest', bar: '#0f1c14' },
] as const;

export type ThemeId = (typeof THEMES)[number]['id'];
/** « system » suit le réglage clair/sombre de l'appareil. */
export type ThemeChoice = ThemeId | 'system';

export const THEME_STORAGE_KEY = 'theme';
export const LIGHT_DEFAULT: ThemeId = 'aquarelle';
export const DARK_DEFAULT: ThemeId = 'nuit';

/**
 * Script exécuté dans <head> avant le premier rendu : applique le thème mémorisé (ou celui
 * du système) sans flash. Doit rester autonome, il n'a accès à aucun module.
 */
export const themeBootstrapScript = `(function(){
  var ids=${JSON.stringify(THEMES.map((t) => t.id))};
  var bars=${JSON.stringify(Object.fromEntries(THEMES.map((t) => [t.id, t.bar])))};
  var t;
  try { t = localStorage.getItem('${THEME_STORAGE_KEY}'); } catch (e) {}
  if (ids.indexOf(t) < 0) {
    t = window.matchMedia('(prefers-color-scheme: light)').matches ? '${LIGHT_DEFAULT}' : '${DARK_DEFAULT}';
  }
  document.documentElement.setAttribute('data-theme', t);
  var m = document.querySelector('meta[name="theme-color"]');
  if (m) m.setAttribute('content', bars[t]);
})();`;

export function resolveTheme(choice: ThemeChoice): ThemeId {
  if (choice !== 'system') return choice;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? LIGHT_DEFAULT : DARK_DEFAULT;
}

export function applyTheme(choice: ThemeChoice) {
  const theme = resolveTheme(choice);
  document.documentElement.setAttribute('data-theme', theme);
  const bar = THEMES.find((t) => t.id === theme)?.bar;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', bar ?? '');
}

export function readStoredChoice(): ThemeChoice {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (THEMES.some((t) => t.id === stored)) return stored as ThemeId;
  } catch {
    // Stockage indisponible (navigation privée stricte) : on suit le système.
  }
  return 'system';
}

export function storeChoice(choice: ThemeChoice) {
  try {
    if (choice === 'system') localStorage.removeItem(THEME_STORAGE_KEY);
    else localStorage.setItem(THEME_STORAGE_KEY, choice);
  } catch {
    // Le thème s'applique quand même pour la session.
  }
}
