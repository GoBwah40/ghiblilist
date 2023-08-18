import Link from "next/link"

interface CardProps {
    film: {
        desciption: string;
        title: string;
        image: string;
        id: string;
        movie_banner: string;
        original_title_romanised: string;
    }
}

export const Card: React.FC<CardProps> = (film) => {
    return <div className="card bg-blue-950 shadow-xl">
        <figure className="pt-10">
            <img src={film.film.image} alt={film.film.title} className="rounded-xl h-80" />
        </figure>
        <div className="card-body items-center text-center">
            <h2 className="card-title">{film.film.title}</h2>
            <p>{film.film.original_title_romanised}</p>
            <div className="card-actions">
                <button className="btn btn-primary">
                    <Link href={`/films/${film.film.id}`}>Voir</Link>
                </button>
            </div>
        </div>
    </div>
}