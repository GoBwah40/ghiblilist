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
      className="card h-full overflow-hidden border-4 border-ghibli bg-base-100 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <figure className="relative aspect-[2/3] w-full">
        <Image
          src={film.image}
          alt={`${film.title} poster`}
          fill
          sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover"
          priority={priority}
        />
      </figure>
      <div className="card-body gap-1 p-3">
        <h2 className="card-title text-base leading-tight text-white sm:text-lg">{film.title}</h2>
        <p className="text-sm text-white/70">
          {film.original_title_romanised} · {film.release_date}
        </p>
      </div>
    </Link>
  );
};

export default Card;
