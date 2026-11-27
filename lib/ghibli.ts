import type { Film } from '@/model/film';

/*
 * Source des films : TMDB (https://www.themoviedb.org), à jour et maintenue.
 * L'ancienne Studio Ghibli API communautaire est figée depuis 2022 (dernier film : 2021).
 *
 * - TMDB_API_KEY : clé d'API v3 ou jeton de lecture v4 (« eyJ… »), jamais commitée.
 * - TMDB_API_URL : permet de pointer vers le faux serveur des tests (e2e/fixture-server.mjs).
 */
export const TMDB_API_URL = process.env.TMDB_API_URL ?? 'https://api.themoviedb.org';
export const TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p';
/** Identifiant de la société « Studio Ghibli » sur TMDB. */
export const GHIBLI_COMPANY_ID = 10342;
/** En dessous, il s'agit d'un court métrage (Ghibli Museum, publicités…). */
const MIN_RUNTIME = 60;
const ANIMATION_GENRE_ID = 16;
/**
 * Films attribués à Ghibli sur TMDB mais hors de la filmographie retenue
 * (documentaires, compilations…). À compléter au vu des données réelles.
 */
export const EXCLUDED_IDS = new Set<number>([]);

interface TmdbCrew {
  job: string;
  name: string;
}
interface TmdbAltTitle {
  iso_3166_1: string;
  title: string;
  type: string;
}
export interface TmdbMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  release_date: string;
  runtime: number | null;
  vote_average: number;
  poster_path: string | null;
  backdrop_path: string | null;
  genres?: { id: number }[];
  production_companies?: { id: number }[];
  credits?: { crew: TmdbCrew[] };
  alternative_titles?: { titles: TmdbAltTitle[] };
}

function authHeaders(): HeadersInit {
  const key = process.env.TMDB_API_KEY;
  // Jeton v4 (JWT) : en-tête Authorization. Clé v3 : paramètre api_key (voir tmdbFetch).
  return key?.startsWith('eyJ') ? { Authorization: `Bearer ${key}` } : {};
}

async function tmdbFetch(path: string, params: Record<string, string> = {}): Promise<Response> {
  const key = process.env.TMDB_API_KEY;
  if (!key && !process.env.TMDB_API_URL) {
    throw new Error(
      'TMDB_API_KEY manquante : créez une clé sur themoviedb.org et ajoutez-la à .env.local (voir README).',
    );
  }
  const url = new URL(path, TMDB_API_URL);
  url.search = new URLSearchParams({
    language: 'en-US',
    ...params,
    ...(key && !key.startsWith('eyJ') ? { api_key: key } : {}),
  }).toString();
  return fetch(url, { headers: { accept: 'application/json', ...authHeaders() } });
}

async function tmdbJson<T>(path: string, params?: Record<string, string>): Promise<T> {
  const response = await tmdbFetch(path, params);
  if (!response.ok) throw new Error(`TMDB : ${response.status} sur ${path}`);
  return (await response.json()) as T;
}

const LATIN = /^[\p{Script=Latin}\p{N}\p{P}\p{Zs}]+$/u;

/** Titre japonais en rōmaji, choisi parmi les titres alternatifs japonais en alphabet latin. */
export function pickRomanisedTitle(movie: TmdbMovie): string {
  const jp = (movie.alternative_titles?.titles ?? []).filter((t) => t.iso_3166_1 === 'JP');
  const romaji =
    jp.find((t) => /romaji|romanization|romanized/i.test(t.type) && LATIN.test(t.title)) ??
    jp.find((t) => LATIN.test(t.title) && t.title !== movie.title);
  return romaji?.title ?? '';
}

const crew = (movie: TmdbMovie, job: string) =>
  [...new Set((movie.credits?.crew ?? []).filter((c) => c.job === job).map((c) => c.name))].join(
    ', ',
  );

/** Convertit un film TMDB (détail avec credits et alternative_titles) au format de l'app. */
export function toFilm(movie: TmdbMovie): Film {
  return {
    id: String(movie.id),
    title: movie.title,
    original_title: movie.original_title,
    original_title_romanised: pickRomanisedTitle(movie),
    image: movie.poster_path ? `${TMDB_IMAGE_URL}/w600_and_h900_bestv2${movie.poster_path}` : '',
    movie_banner: movie.backdrop_path ? `${TMDB_IMAGE_URL}/w1280${movie.backdrop_path}` : '',
    description: movie.overview,
    director: crew(movie, 'Director'),
    producer: crew(movie, 'Producer'),
    release_date: movie.release_date?.slice(0, 4) ?? '',
    running_time: movie.runtime ? String(movie.runtime) : '',
    rating: movie.vote_average ? movie.vote_average.toFixed(1) : '',
  };
}

/** Long métrage d'animation Ghibli déjà sorti, avec une affiche. */
export function isGhibliFeature(movie: TmdbMovie, today = new Date()): boolean {
  const released = !!movie.release_date && new Date(movie.release_date) <= today;
  const isGhibli = movie.production_companies
    ? movie.production_companies.some((c) => c.id === GHIBLI_COMPANY_ID)
    : true;
  const isAnimation = movie.genres ? movie.genres.some((g) => g.id === ANIMATION_GENRE_ID) : true;
  return (
    isGhibli &&
    isAnimation &&
    released &&
    (movie.runtime ?? 0) >= MIN_RUNTIME &&
    !!movie.poster_path &&
    !EXCLUDED_IDS.has(movie.id)
  );
}

async function fetchMovie(id: number | string): Promise<TmdbMovie | null> {
  const response = await tmdbFetch(`/3/movie/${encodeURIComponent(String(id))}`, {
    append_to_response: 'credits,alternative_titles',
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`TMDB : ${response.status} sur /3/movie/${id}`);
  return (await response.json()) as TmdbMovie;
}

/** Tous les longs métrages Ghibli, triés par date de sortie. */
export async function fetchFilms(): Promise<Film[]> {
  const ids: number[] = [];
  for (let page = 1, totalPages = 1; page <= totalPages && page <= 10; page++) {
    const data = await tmdbJson<{ results: { id: number }[]; total_pages: number }>(
      '/3/discover/movie',
      {
        with_companies: String(GHIBLI_COMPANY_ID),
        with_genres: String(ANIMATION_GENRE_ID),
        'with_runtime.gte': String(MIN_RUNTIME),
        sort_by: 'primary_release_date.asc',
        include_adult: 'false',
        page: String(page),
      },
    );
    ids.push(...data.results.map((r) => r.id));
    totalPages = data.total_pages;
  }
  const movies = await Promise.all([...new Set(ids)].map((id) => fetchMovie(id)));
  return movies
    .filter((m): m is TmdbMovie => !!m && isGhibliFeature(m))
    .map(toFilm)
    .sort((a, b) => Number(a.release_date) - Number(b.release_date));
}

/**
 * Un film par son identifiant TMDB, ou null s'il n'existe pas ou n'est pas un long métrage
 * Ghibli (sinon /films/550 afficherait n'importe quel film de TMDB).
 */
export async function fetchFilm(id: string): Promise<Film | null> {
  if (!/^\d+$/.test(id)) return null;
  const movie = await fetchMovie(id);
  return movie && isGhibliFeature(movie) ? toFilm(movie) : null;
}

/** Filtre insensible à la casse et aux accents, sur le titre anglais, original et romanisé. */
export function filterFilms(films: Film[], query: string): Film[] {
  const normalize = (value: string) =>
    value
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase()
      .trim();
  const needle = normalize(query);
  if (!needle) return films;
  return films.filter((film) =>
    [film.title, film.original_title, film.original_title_romanised].some((title) =>
      normalize(title).includes(needle),
    ),
  );
}
