import Image from 'next/image';
import Link from 'next/link';
import type { Film } from '@/model/film';

interface CardProps {
  film: Pick<
    Film,
    'id' | 'title' | 'image' | 'original_title' | 'original_title_romanised' | 'release_date'
  >;
  /** Numéro affiché dans le thème « Affiche Shōwa ». */
  index?: number;
  /** Les premières affiches sont visibles sans défiler : on les charge en priorité. */
  priority?: boolean;
}

const Card = ({ film, index, priority = false }: CardProps) => {
  // Titre japonais romanisé ; à défaut (ex. The Red Turtle, film français), le titre original.
  const subtitle =
    film.original_title_romanised ||
    (film.original_title !== film.title ? film.original_title : '');
  return (
    <Link
      href={`/films/${film.id}`}
      className="frame relative flex h-full flex-col overflow-hidden bg-surface shadow-lg hover:shadow-2xl motion-safe:transition motion-safe:hover:-translate-y-1"
    >
      {index !== undefined && (
        <span className="film-number" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
      )}
      <figure className="relative aspect-[2/3] w-full">
        {/* Décorative : le titre du film suit et donne déjà son nom au lien. */}
        <Image
          src={film.image}
          alt=""
          fill
          sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover"
          preload={priority}
          fetchPriority={priority ? 'high' : undefined}
        />
      </figure>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h2 className="font-title text-base leading-tight text-ink sm:text-lg">{film.title}</h2>
        <p className="text-sm text-muted">
          {subtitle && (
            <>
              <span lang={film.original_title_romanised ? 'ja-Latn' : undefined}>{subtitle}</span>
              <span aria-hidden="true"> · </span>
              <span className="sr-only">, </span>
            </>
          )}
          {film.release_date}
        </p>
      </div>
    </Link>
  );
};

export default Card;
