import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Banner } from "@/pages/components/banner";

function FilmPage() {
  const [film, setFilm] = useState<Film | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    async function fetchData() {
      if (id) {
        try {
          const response = await axios.get(
            `https://ghibliapi.vercel.app/films/${id}`
          ); // Remplacez avec votre API route
          const data: Film = response.data;
          setFilm(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    }

    fetchData();
  }, [id]);

  console.log(film);

  return (
    <div className="min-h-screen">
      {film != undefined ? <div className=" flex p-10">
        <aside className="w-1/4 pr-5">
          <img src={film?.image} alt={film?.title} className="rounded-xl" />
        </aside>
        <aside className="w-3/4 grid grid-rows-1">
          <Banner info={{
            image: film.movie_banner,
            title: film.original_title_romanised,
            titre_romanji: film.original_title
          }}></Banner>
        </aside>
      </div> : <span className="loading loading-ball loading-lg"></span>}
      
    </div>
  );
}

export default FilmPage;
