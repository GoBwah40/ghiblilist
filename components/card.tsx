import Image from 'next/image';
import Link from 'next/link';
import type { Film } from '@/model/film';

interface CardProps {
  film: Pick<Film, 'id' | 'title' | 'image' | 'original_title_romanised' | 'release_date'>;
  /** Les premières affiches sont visibles sans défiler : on les charge en priorité. */
  priority?: boolean;
}

const Card = ({ film, priority = false }: CardProps) => {
  return (
    <Link
      href={`/films/${film.id}`}
      className="card h-full overflow-hidden border-4 border-ghibli bg-base-100 shadow-xl hover:shadow-2xl motion-safe:transition motion-safe:hover:-translate-y-1"
    >
      <figure className="relative aspect-[2/3] w-full">
        {/* Décorative : le titre du film suit et donne déjà son nom au lien. */}
        <Image
          src={film.image}
          alt=""
          fill
          sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover"
          priority={priority}
        />
      </figure>
      <div className="card-body gap-1 p-3">
        <h2 className="card-title text-base leading-tight text-white sm:text-lg">{film.title}</h2>
        <p className="text-sm text-white/75">
          <span lang="ja-Latn">{film.original_title_romanised}</span>
          <span aria-hidden="true"> · </span>
          <span className="sr-only">, </span>
          {film.release_date}
        </p>
      </div>
    </Link>
  );
};

export default Card;
