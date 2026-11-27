import { expect, test } from '@playwright/test';

const SPIRITED_AWAY = '/films/129';

test.describe('fiche film', () => {
  test('affiche les informations du film', async ({ page }) => {
    await page.goto(SPIRITED_AWAY);
    await expect(page).toHaveTitle('Spirited Away · The GhibliList');
    await expect(page.getByRole('heading', { level: 1, name: 'Spirited Away' })).toBeVisible();
    await expect(page.getByText('千と千尋の神隠し')).toBeVisible();

    const details = page.getByRole('definition');
    // Régression de 2023 : la case « Director » affichait le synopsis.
    await expect(page.getByRole('term').filter({ hasText: 'Director' })).toBeVisible();
    await expect(details).toHaveText([
      'Hayao Miyazaki',
      'Toshio Suzuki',
      '2001',
      '9.7/10',
      '124 min',
    ]);

    await expect(page.getByRole('region', { name: 'Synopsis' })).toContainText('bathhouse');
  });

  test("le lien de retour ramène à l'accueil", async ({ page }) => {
    await page.goto(SPIRITED_AWAY);
    await page.getByRole('link', { name: 'Back to the list' }).click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole('list', { name: 'Films' }).getByRole('listitem')).toHaveCount(22);
  });

  test('un identifiant inconnu renvoie une vraie 404', async ({ page }) => {
    const response = await page.goto('/films/does-not-exist');
    expect(response?.status()).toBe(404);
    await expect(page.getByText('This page could not be found.')).toBeVisible();
  });

  test("un film TMDB qui n'est pas un Ghibli renvoie une 404", async ({ page }) => {
    const response = await page.goto('/films/550');
    expect(response?.status()).toBe(404);
  });

  test("un court métrage Ghibli n'a pas de fiche", async ({ page }) => {
    const response = await page.goto('/films/800001');
    expect(response?.status()).toBe(404);
  });

  test('le logo ramène à l’accueil depuis une fiche', async ({ page }) => {
    await page.goto(SPIRITED_AWAY);
    await page.getByRole('link', { name: 'The GhibliList' }).click();
    await expect(page).toHaveURL(/\/$/);
  });
});
