import React, { useState, useEffect } from 'react';
import { Card } from './components/card';
;


function HomePage() {


  var [films, setFilms] = useState<Film[]>();
  if (films == null || films == undefined){
    films = [];
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const uri = 'films'; // Modifier avec l'URI souhaité
        const response = await fetch(`http://localhost:3000/api/ghibliApi`);
        const data: Film[] = await response.json();
        setFilms(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
      <ul className='grid grid-cols-5 gap-4 pt-10'>
          {films.map((film, index) => (
            <li className='p-1' key={film.id}>
              <Card film={{
                desciption: film.description,
                title: film.title,
                image: film.image,
                id: film.id,
                movie_banner: film.movie_banner,
                original_title_romanised: film.original_title_romanised 
              }}></Card>
            </li>
          ))}
      </ul>
  );
}

function removeMoviesContainingInput(input: string, list: Film[]): Film[] {
  // Utilisez la méthode filter pour créer une nouvelle liste sans les films contenant "input"
  const filteredList = list.filter((movie) => !movie.title.includes(input));
  list = filteredList;
  return list;
}


export default HomePage;


