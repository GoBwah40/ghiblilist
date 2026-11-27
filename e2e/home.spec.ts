import { expect, test } from '@playwright/test';

test.describe("page d'accueil", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('affiche les 22 films avec leur titre', async ({ page }) => {
    await expect(page).toHaveTitle('The GhibliList');
    await expect(
      page.getByRole('heading', { level: 1, name: 'Studio Ghibli films' }),
    ).toBeVisible();
    await expect(page.getByText('22 feature films, from 1986 to 2021.')).toBeVisible();

    const films = page.getByRole('list', { name: 'Films' }).getByRole('listitem');
    await expect(films).toHaveCount(22);
    // Triés par date de sortie.
    await expect(films.first()).toContainText('Castle in the Sky');
    await expect(films.last()).toContainText('Earwig and the Witch');
    // Les leurres du faux serveur TMDB (court métrage, film hors Ghibli) sont écartés.
    await expect(page.getByText('Mei and the Kitten Bus')).toHaveCount(0);
    await expect(page.getByText('Not a Ghibli film')).toHaveCount(0);
  });

  test('la recherche filtre et annonce le nombre de résultats', async ({ page }) => {
    const search = page.getByRole('searchbox', { name: 'Search a film' });
    const status = page.getByRole('status');
    const films = page.getByRole('list', { name: 'Films' }).getByRole('listitem');

    await search.fill('totoro');
    await expect(films).toHaveCount(1);
    await expect(films.first()).toContainText('My Neighbor Totoro');
    await expect(status).toHaveText('1 film shown.');

    // Titre romanisé, insensible à la casse.
    await search.fill('KAMIKAKUSHI');
    await expect(films).toHaveCount(1);
    await expect(films.first()).toContainText('Spirited Away');

    // Titre japonais.
    await search.fill('ハウル');
    await expect(films.first()).toContainText("Howl's Moving Castle");

    await search.fill('castle');
    await expect(status).toHaveText('2 films shown.');

    await search.fill('zzz');
    await expect(page.getByRole('list', { name: 'Films' })).toHaveCount(0);
    await expect(status).toHaveText('No film matches “zzz”.');

    // Effacer la recherche rétablit la liste complète.
    await search.fill('');
    await expect(films).toHaveCount(22);
  });

  test('une carte mène à la fiche du film', async ({ page }) => {
    await page.getByRole('link', { name: /^Spirited Away/ }).click();
    await expect(page).toHaveURL(/\/films\/129$/);
    await expect(page.getByRole('heading', { level: 1, name: 'Spirited Away' })).toBeVisible();
  });

  test("aucun défilement horizontal, quelle que soit la largeur d'écran", async ({ page }) => {
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
