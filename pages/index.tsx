import { useMemo, useState } from 'react';
import type { GetStaticProps } from 'next';
import Card from '@/components/card';
import { fetchFilms, filterFilms } from '@/lib/ghibli';
import type { Film } from '@/model/film';

interface HomePageProps {
  films: Film[];
}

// Les films sont récupérés au build puis régénérés au plus une fois par jour (ISR) :
// le site reste en ligne même si l'API est momentanément indisponible.
export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const films = await fetchFilms();
  return { props: { films }, revalidate: 60 * 60 * 24 };
};

export default function HomePage({ films }: HomePageProps) {
  const [query, setQuery] = useState('');
  const visibleFilms = useMemo(() => filterFilms(films, query), [films, query]);

  const firstYear = films[0]?.release_date;
  const lastYear = films.at(-1)?.release_date;
  const resultMessage =
    visibleFilms.length === 0
      ? `No film matches “${query.trim()}”.`
      : `${visibleFilms.length} film${visibleFilms.length > 1 ? 's' : ''} shown.`;

  return (
    <div className="mx-auto max-w-7xl px-3 py-6 sm:px-6 sm:py-10">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold sm:text-4xl">Studio Ghibli films</h1>
          <p className="text-white/75">
            {films.length} feature films, from {firstYear} to {lastYear}.
          </p>
        </div>
        <form role="search" className="w-full sm:w-72" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="film-search" className="mb-1 block text-sm font-semibold">
            Search a film
          </label>
          <input
            id="film-search"
            type="search"
            className="input w-full border-ghibli"
            placeholder="e.g. Totoro, Chihiro…"
            autoComplete="off"
            aria-describedby="search-help"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <p id="search-help" className="mt-1 text-xs text-white/75">
            English, Japanese or romanised title.
          </p>
        </form>
      </div>

      {/* Région live (WCAG 4.1.3) : le nombre de résultats est annoncé pendant la saisie. */}
      <p
        role="status"
        className={visibleFilms.length === 0 ? 'py-10 text-center text-white/75' : 'sr-only'}
      >
        {query.trim() ? resultMessage : ''}
      </p>

      {visibleFilms.length > 0 && (
        <ul
          aria-label="Films"
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5"
        >
          {visibleFilms.map((film, index) => (
            <li key={film.id}>
              <Card film={film} priority={index < 2} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
