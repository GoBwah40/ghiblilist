import { expect, test } from '@playwright/test';

test.describe('thèmes', () => {
  test('par défaut, le thème suit le réglage clair/sombre de l’appareil', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'aquarelle');

    await page.emulateMedia({ colorScheme: 'dark' });
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'nuit');
  });

  test('le choix est appliqué tout de suite et mémorisé', async ({ page }) => {
    await page.goto('/');
    const select = page.getByRole('combobox', { name: 'Theme' });
    await expect(select).toHaveValue('system');

    await select.selectOption({ label: 'Shōwa poster' });
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'showa');

    // Conservé après rechargement et lors de la navigation.
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'showa');
    await expect(page.getByRole('combobox', { name: 'Theme' })).toHaveValue('showa');
    await page.getByRole('link', { name: /^Ponyo/ }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'showa');

    // Retour au mode automatique.
    await page.getByRole('combobox', { name: 'Theme' }).selectOption('system');
    expect(await page.evaluate(() => localStorage.getItem('theme'))).toBeNull();
  });

  test('le logotype garde le même nom accessible dans chaque thème', async ({ page }) => {
    for (const theme of ['aquarelle', 'nuit', 'showa', 'foret']) {
      await page.evaluate((t) => localStorage.setItem('theme', t), theme).catch(() => {});
      await page.goto('/');
      await page.evaluate((t) => localStorage.setItem('theme', t), theme);
      await page.reload();
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      await expect(page.getByRole('link', { name: 'The GhibliList', exact: true })).toBeVisible();
    }
  });
});
