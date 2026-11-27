import { act, render, screen } from '@testing-library/react';
import axe from 'axe-core';
import { describe, expect, it } from 'vitest';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { toFilm } from '@/lib/ghibli';
import FilmPage from '@/pages/films/[id]';
import HomePage from '@/pages/index';

const totoro = toFilm({
  id: '58611129-2dbc-4a81-a72f-77ddfc1b1b49',
  title: 'My Neighbor Totoro',
  original_title: 'となりのトトロ',
  original_title_romanised: 'Tonari no Totoro',
  image: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/totoro.jpg',
  movie_banner: 'https://image.tmdb.org/t/p/original/totoro-banner.jpg',
  description: 'Two sisters move to the country with their father.',
  director: 'Hayao Miyazaki',
  producer: 'Hayao Miyazaki',
  release_date: '1988',
  running_time: '86',
  rt_score: '93',
});
const ponyo = toFilm({ ...totoro, id: 'ponyo', title: 'Ponyo', release_date: '2008' });

/** Lance axe-core (WCAG 2.0 à 2.2, niveaux A et AA + bonnes pratiques) sur le rendu. */
async function expectNoViolations(container: HTMLElement) {
  const results = await axe.run(container, {
    runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'],
    // jsdom ne calcule pas les couleurs : le contraste est vérifié dans le navigateur.
    rules: { 'color-contrast': { enabled: false } },
  });
  const summary = results.violations.map(
    (v) => `${v.id}: ${v.help} (${v.nodes.map((n) => n.target.join(' ')).join(', ')})`,
  );
  expect(summary).toEqual([]);
}

describe('accessibilité (axe-core)', () => {
  it("page d'accueil", async () => {
    const { container } = render(
      <>
        <Navbar />
        <main>
          <HomePage films={[totoro, ponyo]} />
        </main>
        <Footer />
      </>,
    );
    await expectNoViolations(container);
  });

  it('fiche film', async () => {
    const { container } = render(
      <main>
        <FilmPage film={totoro} />
      </main>,
    );
    await expectNoViolations(container);
  });
});

describe('recherche', () => {
  it('a un libellé visible et annonce le nombre de résultats', async () => {
    render(<HomePage films={[totoro, ponyo]} />);
    const input = screen.getByRole('searchbox', { name: 'Search a film' });
    const status = screen.getByRole('status');
    expect(status).toBeEmptyDOMElement();

    await act(async () => {
      input.focus();
      // Simule une saisie : React écoute l'événement input natif.
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!;
      setter.call(input, 'ponyo');
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });
    expect(status).toHaveTextContent('1 film shown.');

    await act(async () => {
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!;
      setter.call(input, 'zzz');
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });
    expect(status).toHaveTextContent('No film matches “zzz”.');
    expect(screen.queryByRole('list', { name: 'Films' })).not.toBeInTheDocument();
  });
});

describe('liens', () => {
  it('les liens sortants annoncent le nouvel onglet et les icônes ont un nom', () => {
    render(<Navbar />);
    const links = screen.getAllByRole('link', { name: /opens in a new tab/ });
    expect(links.map((l) => l.textContent)).toEqual([
      'Studio Ghibli API (opens in a new tab)',
      'GitHub (opens in a new tab)',
      'LinkedIn (opens in a new tab)',
    ]);
  });

  it("la carte film n'a qu'un nom de lien, sans texte alternatif redondant", () => {
    render(<HomePage films={[totoro]} />);
    expect(screen.getByRole('link', { name: /My Neighbor Totoro/ })).toHaveAccessibleName(
      /^My Neighbor Totoro Tonari no Totoro\s*,\s*1988$/,
    );
  });
});
