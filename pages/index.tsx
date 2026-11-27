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

  return (
    <div className="mx-auto max-w-7xl px-3 py-6 sm:px-6 sm:py-10">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold sm:text-4xl">Studio Ghibli films</h1>
          <p className="text-white/70">{films.length} feature films, from 1986 to today.</p>
        </div>
        <label className="input w-full border-ghibli sm:w-72">
          <span className="sr-only">Search a film</span>
          <input
            type="search"
            placeholder="Search a film…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>

      {visibleFilms.length > 0 ? (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
          {visibleFilms.map((film, index) => (
            <li key={film.id}>
              <Card film={film} priority={index < 5} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-10 text-center text-white/70" role="status">
          No film matches “{query}”.
        </p>
      )}
    </div>
  );
}
