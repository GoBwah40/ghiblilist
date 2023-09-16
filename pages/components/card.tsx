import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
  film: {
    desciption: string;
    title: string;
    image: string;
    id: string;
    movie_banner: string;
    original_title_romanised: string;
  };
}

export const Card: React.FC<CardProps> = (film) => {
  return (
    <div
      className="card w-auto shadow-xl border-solid border-4"
      style={{
        borderColor: 'rgb(7, 157, 236)',
      }}
    >
      <div className="card w-auto bg-base-100 shadow-xl">
        <figure className="">
          <Image src={film.film.image} alt={film.film.title} className="rounded-xl" />
        </figure>
      </div>
      <div className="p-2 justify-end">
        <div className="card-actions grid grid-flow-col justify-between items-center">
          <aside className="">
            <h1 className="text-2xl text-white text-left font-bold">{film.film.title}</h1>
            <p className="text-xl text-white w-full">{film.film.original_title_romanised}</p>
          </aside>
          <aside className="w-1/4">
            <button
              className="btn btn-primary"
              style={{
                backgroundColor: 'rgb(7, 157, 236)',
                borderColor: 'rgb(7, 157, 236)',
              }}
            >
              <Link href={`/films/${film.film.id}`}>See</Link>
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
};
