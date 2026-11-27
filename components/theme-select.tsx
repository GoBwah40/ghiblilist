import { useEffect, useState } from 'react';
import { THEMES, applyTheme, readStoredChoice, storeChoice, type ThemeChoice } from '@/lib/theme';

/** Sélecteur de thème : un <select> natif, utilisable au clavier et au lecteur d'écran. */
const ThemeSelect = () => {
  const [choice, setChoice] = useState<ThemeChoice>('system');

  useEffect(() => {
    // Le thème est déjà appliqué par le script de <head> ; on aligne seulement l'affichage.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setChoice(readStoredChoice());
  }, []);

  useEffect(() => {
    if (choice !== 'system') return;
    // En mode « système », on suit le passage clair/sombre de l'appareil en direct.
    const media = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = () => applyTheme('system');
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [choice]);

  return (
    <label className="flex items-center gap-2 text-sm font-semibold">
      Theme
      <select
        className="h-9 rounded-field border-(length:--border-w) border-on-bar/40 bg-bar px-2 text-on-bar"
        value={choice}
        onChange={(event) => {
          const next = event.target.value as ThemeChoice;
          setChoice(next);
          storeChoice(next);
          applyTheme(next);
        }}
      >
        <option value="system">Auto (device)</option>
        {THEMES.map((theme) => (
          <option key={theme.id} value={theme.id}>
            {theme.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default ThemeSelect;
