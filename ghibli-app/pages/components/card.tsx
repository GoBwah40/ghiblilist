

export const Card:React.FC<Film> = (film: Film) => {
    return <div className="card bg-blue-950 shadow-xl">
    <figure className="pt-10">
      <img src={ film.image } alt={film.title} className="rounded-xl h-80" />
    </figure>
    <div className="card-body items-center text-center">
      <h2 className="card-title">{ film.title }</h2>
      <p>{ film.original_title_romanised }</p>
      <div className="card-actions">
        <button className="btn btn-primary">Voir</button>
      </div>
    </div>
  </div>
}