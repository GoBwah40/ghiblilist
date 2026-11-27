import { describe, expect, it } from 'vitest';
import { filterFilms, normalizeImageUrl, toFilm } from '@/lib/ghibli';
import type { Film } from '@/model/film';

const film = (title: string, original_title_romanised = '', original_title = ''): Film =>
  toFilm({ id: title, title, original_title, original_title_romanised });

describe('filterFilms', () => {
  const films = [
    film('Spirited Away', 'Sen to Chihiro no kamikakushi', '千と千尋の神隠し'),
    film('My Neighbor Totoro', 'Tonari no Totoro'),
    film('Princess Mononoke', 'Mononoke hime'),
  ];

  it('renvoie tous les films si la recherche est vide', () => {
    expect(filterFilms(films, '  ')).toHaveLength(3);
  });

  it('ignore la casse et cherche aussi dans les titres originaux', () => {
    expect(filterFilms(films, 'TOTORO').map((f) => f.title)).toEqual(['My Neighbor Totoro']);
    expect(filterFilms(films, 'chihiro').map((f) => f.title)).toEqual(['Spirited Away']);
    expect(filterFilms(films, '千尋').map((f) => f.title)).toEqual(['Spirited Away']);
  });

  it('ignore les accents', () => {
    expect(filterFilms(films, 'mononoké').map((f) => f.title)).toEqual(['Princess Mononoke']);
  });
});

describe('normalisation des données API', () => {
  it('réécrit les images www.themoviedb.org vers le CDN image.tmdb.org', () => {
    expect(normalizeImageUrl('https://www.themoviedb.org/t/p/original/abc.jpg')).toBe(
      'https://image.tmdb.org/t/p/original/abc.jpg',
    );
  });

  it('ne garde que les champs utilisés', () => {
    const result = toFilm({ id: '1', title: 'Ponyo', people: ['x'], rt_score: 92 });
    expect(result).not.toHaveProperty('people');
    expect(result.rt_score).toBe('92');
    expect(result.director).toBe('');
  });
});
