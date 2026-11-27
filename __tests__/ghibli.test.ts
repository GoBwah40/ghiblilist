import { describe, expect, it } from 'vitest';
import {
  filterFilms,
  isGhibliFeature,
  pickRomanisedTitle,
  toFilm,
  type TmdbMovie,
} from '@/lib/ghibli';

const movie = (overrides: Partial<TmdbMovie> = {}): TmdbMovie => ({
  id: 129,
  title: 'Spirited Away',
  original_title: '千と千尋の神隠し',
  overview: 'A young girl wanders into a world of spirits.',
  release_date: '2001-07-20',
  runtime: 125,
  vote_average: 8.537,
  poster_path: '/poster.jpg',
  backdrop_path: '/backdrop.jpg',
  genres: [{ id: 16 }, { id: 10751 }],
  production_companies: [{ id: 10342 }],
  credits: {
    crew: [
      { job: 'Director', name: 'Hayao Miyazaki' },
      { job: 'Screenplay', name: 'Hayao Miyazaki' },
      { job: 'Producer', name: 'Toshio Suzuki' },
    ],
  },
  alternative_titles: {
    titles: [
      { iso_3166_1: 'JP', title: 'Sen to Chihiro no Kamikakushi', type: 'romaji' },
      { iso_3166_1: 'FR', title: 'Le Voyage de Chihiro', type: '' },
    ],
  },
  ...overrides,
});

describe('toFilm (TMDB → format de l’app)', () => {
  it('convertit un film TMDB', () => {
    expect(toFilm(movie())).toEqual({
      id: '129',
      title: 'Spirited Away',
      original_title: '千と千尋の神隠し',
      original_title_romanised: 'Sen to Chihiro no Kamikakushi',
      image: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/poster.jpg',
      movie_banner: 'https://image.tmdb.org/t/p/w1280/backdrop.jpg',
      description: 'A young girl wanders into a world of spirits.',
      director: 'Hayao Miyazaki',
      producer: 'Toshio Suzuki',
      release_date: '2001',
      running_time: '125',
      rating: '8.5',
    });
  });

  it('tolère les champs manquants', () => {
    const film = toFilm(
      movie({ backdrop_path: null, runtime: null, vote_average: 0, credits: undefined }),
    );
    expect(film.movie_banner).toBe('');
    expect(film.running_time).toBe('');
    expect(film.rating).toBe('');
    expect(film.director).toBe('');
  });
});

describe('pickRomanisedTitle', () => {
  it('préfère le titre japonais marqué rōmaji', () => {
    expect(pickRomanisedTitle(movie())).toBe('Sen to Chihiro no Kamikakushi');
  });

  it('se rabat sur un titre japonais en alphabet latin, sinon rien', () => {
    expect(
      pickRomanisedTitle(
        movie({
          alternative_titles: {
            titles: [
              { iso_3166_1: 'JP', title: 'となりのトトロ', type: '' },
              { iso_3166_1: 'JP', title: 'Tonari no Totoro', type: '' },
            ],
          },
        }),
      ),
    ).toBe('Tonari no Totoro');
    expect(pickRomanisedTitle(movie({ alternative_titles: { titles: [] } }))).toBe('');
  });

  it('préfère la graphie principale à une variante « alternative » (cas réel TMDB)', () => {
    expect(
      pickRomanisedTitle(
        movie({
          title: 'The Boy and the Heron',
          alternative_titles: {
            titles: [
              {
                iso_3166_1: 'JP',
                title: 'Kimi-tachi wa dō ikiru ka',
                type: 'alternative Hepburn romanization',
              },
              { iso_3166_1: 'JP', title: 'Kimitachi wa dō ikiru ka', type: 'Hepburn romanization' },
              {
                iso_3166_1: 'JP',
                title: 'From Kokuriko Hill',
                type: 'informal literal English title',
              },
            ],
          },
        }),
      ),
    ).toBe('Kimitachi wa dō ikiru ka');
  });
});

describe('isGhibliFeature', () => {
  const today = new Date('2026-11-27');

  it('garde un long métrage d’animation Ghibli sorti', () => {
    expect(isGhibliFeature(movie(), today)).toBe(true);
  });

  it('écarte courts métrages, autres studios, films non sortis ou sans affiche', () => {
    expect(isGhibliFeature(movie({ runtime: 13 }), today)).toBe(false);
    expect(isGhibliFeature(movie({ production_companies: [{ id: 508 }] }), today)).toBe(false);
    expect(isGhibliFeature(movie({ genres: [{ id: 99 }] }), today)).toBe(false);
    expect(isGhibliFeature(movie({ release_date: '2027-07-01' }), today)).toBe(false);
    expect(isGhibliFeature(movie({ release_date: '' }), today)).toBe(false);
    expect(isGhibliFeature(movie({ poster_path: null }), today)).toBe(false);
    // Exclusions explicites : documentaire (Yanagawa), film Production I.G (Innocence).
    expect(isGhibliFeature(movie({ id: 141897 }), today)).toBe(false);
    expect(isGhibliFeature(movie({ id: 12140 }), today)).toBe(false);
  });
});

describe('filterFilms', () => {
  const films = [
    toFilm(movie()),
    toFilm(
      movie({
        id: 8392,
        title: 'My Neighbor Totoro',
        original_title: 'となりのトトロ',
        alternative_titles: {
          titles: [{ iso_3166_1: 'JP', title: 'Tonari no Totoro', type: 'romaji' }],
        },
      }),
    ),
    toFilm(
      movie({
        id: 128,
        title: 'Princess Mononoke',
        original_title: 'もののけ姫',
        alternative_titles: {
          titles: [{ iso_3166_1: 'JP', title: 'Mononoke Hime', type: 'romaji' }],
        },
      }),
    ),
  ];

  it('renvoie tous les films si la recherche est vide', () => {
    expect(filterFilms(films, '  ')).toHaveLength(3);
  });

  it('cherche dans les titres anglais, romanisés et japonais, sans casse', () => {
    expect(filterFilms(films, 'TOTORO').map((f) => f.title)).toEqual(['My Neighbor Totoro']);
    expect(filterFilms(films, 'chihiro').map((f) => f.title)).toEqual(['Spirited Away']);
    expect(filterFilms(films, '千尋').map((f) => f.title)).toEqual(['Spirited Away']);
  });

  it('ignore les accents', () => {
    expect(filterFilms(films, 'mononoké').map((f) => f.title)).toEqual(['Princess Mononoke']);
  });
});
