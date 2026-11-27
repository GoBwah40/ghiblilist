import type { Film } from '@/model/film';

// L'ancienne API (ghibliapi.herokuapp.com) est hors ligne depuis la fin des offres gratuites
// de Heroku ; le projet communautaire est désormais servi par Vercel.
// GHIBLI_API_URL permet de pointer vers un faux serveur (tests end-to-end).
export const GHIBLI_API_URL = process.env.GHIBLI_API_URL ?? 'https://ghibliapi.vercel.app';

const FILM_FIELDS = [
  'id',
  'title',
  'original_title',
  'original_title_romanised',
  'image',
  'movie_banner',
  'description',
  'director',
  'producer',
  'release_date',
  'running_time',
  'rt_score',
] as const;

/**
 * Certaines images pointent vers www.themoviedb.org, qui redirige vers le CDN image.tmdb.org.
 * On réécrit l'URL pour que next/image n'ait qu'un seul hôte distant à autoriser.
 */
export function normalizeImageUrl(url: string): string {
  return url.replace(/^https:\/\/www\.themoviedb\.org\/t\/p\//, 'https://image.tmdb.org/t/p/');
}

/** Ne garde que les champs utilisés : les pages statiques restent légères. */
export function toFilm(raw: Record<string, unknown>): Film {
  const film = Object.fromEntries(
    FILM_FIELDS.map((field) => [field, String(raw[field] ?? '')]),
  ) as unknown as Film;
  film.image = normalizeImageUrl(film.image);
  film.movie_banner = normalizeImageUrl(film.movie_banner);
  return film;
}

async function getJson(path: string): Promise<unknown> {
  const response = await fetch(`${GHIBLI_API_URL}${path}`);
  if (!response.ok) {
    throw new Error(`Studio Ghibli API: ${response.status} sur ${path}`);
  }
  return response.json();
}

/** Liste des films, triée par date de sortie. */
export async function fetchFilms(): Promise<Film[]> {
  const data = (await getJson('/films')) as Record<string, unknown>[];
  return data.map(toFilm).sort((a, b) => Number(a.release_date) - Number(b.release_date));
}

/** Un film par son identifiant, ou null s'il n'existe pas. */
export async function fetchFilm(id: string): Promise<Film | null> {
  const response = await fetch(`${GHIBLI_API_URL}/films/${encodeURIComponent(id)}`);
  if (response.status === 404 || response.status === 400) return null;
  if (!response.ok) {
    throw new Error(`Studio Ghibli API: ${response.status} sur /films/${id}`);
  }
  return toFilm((await response.json()) as Record<string, unknown>);
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
