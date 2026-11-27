import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'];

/**
 * axe-core dans un vrai navigateur : contrairement aux tests unitaires (jsdom), les couleurs
 * sont calculées, donc les contrastes sont vérifiés ici.
 */
async function expectNoA11yViolations(page: Page) {
  const { violations } = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
  const summary = violations.map(
    (v) => `${v.id} [${v.impact}] ${v.help} → ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`,
  );
  expect(summary, 'violations axe-core').toEqual([]);
}

const THEMES = ['aquarelle', 'nuit', 'showa', 'foret'] as const;

for (const theme of THEMES) {
  test.describe(`accessibilité : thème ${theme} (axe-core, contrastes compris)`, () => {
    test.beforeEach(async ({ page }) => {
      await page.addInitScript((t) => localStorage.setItem('theme', t), theme);
    });

    test("page d'accueil", async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      await expectNoA11yViolations(page);
    });

    test('fiche film', async ({ page }) => {
      await page.goto('/films/129');
      await expectNoA11yViolations(page);
    });
  });
}

test.describe('accessibilité : audit axe-core (WCAG 2.2 AA)', () => {
  test("page d'accueil", async ({ page }) => {
    await page.goto('/');
    await expectNoA11yViolations(page);
  });

  test('accueil avec une recherche sans résultat', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('searchbox', { name: 'Search a film' }).fill('zzz');
    await expect(page.getByRole('status')).toHaveText('No film matches “zzz”.');
    await expectNoA11yViolations(page);
  });

  test('fiche film', async ({ page }) => {
    await page.goto('/films/8392');
    await expectNoA11yViolations(page);
  });

  test('page 404', async ({ page }) => {
    await page.goto('/films/does-not-exist');
    await expectNoA11yViolations(page);
  });
});

test.describe('accessibilité : clavier', () => {
  test.skip(({ isMobile }) => isMobile, 'navigation clavier testée sur desktop');

  test("le lien d'évitement est le premier arrêt et mène au contenu", async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Skip to main content' });
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();

    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#main$/);
    await page.keyboard.press('Tab');
    await expect(page.getByRole('searchbox', { name: 'Search a film' })).toBeFocused();
  });

  test('on rejoint une fiche film au clavier seul, focus visible', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('searchbox', { name: 'Search a film' }).focus();
    await page.keyboard.type('ponyo');
    await page.keyboard.press('Tab');

    const card = page.getByRole('link', { name: /^Ponyo/ });
    await expect(card).toBeFocused();
    // L'anneau de focus global (3 px blanc) est bien appliqué.
    await expect(card).toHaveCSS('outline-style', 'solid');
    await expect(card).toHaveCSS('outline-width', '3px');

    await page.keyboard.press('Enter');
    await expect(page.getByRole('heading', { level: 1, name: 'Ponyo' })).toBeVisible();
  });
});

test.describe('accessibilité : préférences et liens', () => {
  test('les animations sont coupées avec prefers-reduced-motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const duration = await page
      .getByRole('link', { name: /^Ponyo/ })
      .evaluate((el) => getComputedStyle(el).transitionDuration);
    expect(parseFloat(duration)).toBeLessThan(0.001);
  });

  test("les liens externes s'ouvrent dans un nouvel onglet et l'annoncent", async ({ page }) => {
    await page.goto('/');
    const external = page.locator('a[target="_blank"]:visible');
    const count = await external.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const link = external.nth(i);
      await expect(link).toHaveAttribute('rel', /noopener/);
      await expect(link).toHaveAccessibleName(/opens in a new tab/);
    }
  });

  test('toutes les cibles tactiles font au moins 24 × 24 px (WCAG 2.5.8)', async ({ page }) => {
    await page.goto('/films/129');
    const tooSmall = await page.evaluate(() =>
      [...document.querySelectorAll('a, button, input')]
        .filter((el) => el.getClientRects().length && !el.classList.contains('sr-only'))
        .map((el) => {
          const box = el.getBoundingClientRect();
          return { name: el.textContent?.trim() || el.id, w: box.width, h: box.height };
        })
        .filter(({ w, h }) => w < 24 || h < 24),
    );
    expect(tooSmall).toEqual([]);
  });
});
