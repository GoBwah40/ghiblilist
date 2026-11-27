/** Film tel qu'affiché par l'app, construit à partir des données TMDB (lib/ghibli.ts). */
export interface Film {
  /** Identifiant TMDB. */
  id: string;
  title: string;
  original_title: string;
  /** Titre japonais en alphabet latin (rōmaji), vide si TMDB ne le fournit pas. */
  original_title_romanised: string;
  image: string;
  movie_banner: string;
  description: string;
  director: string;
  producer: string;
  /** Année de sortie. */
  release_date: string;
  /** Durée en minutes. */
  running_time: string;
  /** Note moyenne TMDB sur 10, une décimale. */
  rating: string;
}
