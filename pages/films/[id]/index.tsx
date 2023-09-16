import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Banner } from "@/pages/components/banner";
import { Avatar } from "@/pages/components/avatar";
import Link from "next/link";

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
          );
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
    <div className="min-h-screen pt-2">
      {film != undefined ? (
        <div className=" flex pr-2 pl-2">
          <aside className="w-1/3 border-solid border-4 rounded-xl" style={{
            borderColor: "rgb(7, 157, 236)"
          }}>
            <img
              src={film.image}
              alt={film.title}
              className="rounded-xl"
              style={{
                borderColor: "rgb(7, 157, 236)",
              }}
            />
            <h1 className="text-3xl text-center font-bold py-2">{film.title}</h1>
          </aside>
          <aside className="w-full grid pl-2">
            <Banner
              info={{
                image: film.movie_banner,
                title: film.original_title_romanised,
                titre_romanji: film.original_title,
              }}
            ></Banner>
            <div
              className="flex"
              style={{
                borderColor: "rgb(7, 157, 236)",
              }}>
              <aside className="border-4 rounded-xl w-4/6" style={{
                borderColor: "rgb(7, 157, 236)"
              }}>
              <div className="flex justify-around">
                {film.director != undefined ? (
                  <div className="p-2">
                    <Avatar
                      info={{
                        function: "Director :",
                        name: film.director,
                      }}
                    ></Avatar>
                  </div>
                ) : null}
                {film.producer != undefined ? (
                  <div className="p-2">
                    <Avatar
                      info={{
                        function: "Producer :",
                        name: film.producer,
                      }}
                    ></Avatar>
                  </div>
                ) : null}
              </div>
              <div className="flex justify-around">
                {film.release_date != undefined ? (
                  <div className="p-2">
                    <Avatar
                      info={{
                        function: "Release date :",
                        name: film.release_date,
                      }}
                    ></Avatar>
                  </div>
                ) : null}
                {film.rt_score != undefined ? (
                  <div className="p-2">
                    <Avatar
                      info={{
                        function: "Score :",
                        name: film.rt_score + "/100",
                      }}
                    ></Avatar>
                  </div>
                ) : null}
                {film.running_time != undefined ? (
                  <div className="p-2">
                    <Avatar
                      info={{
                        function: "Duration :",
                        name: film.running_time + " min",
                      }}
                    ></Avatar>
                  </div>
                ) : null}
              </div>
              </aside>
              <aside className="w-2"></aside>
              <aside className="border-4 rounded-xl w-2/6" style={{
                borderColor: "rgb(7, 157, 236)"
              }}>
                <h1 className="text-white font-bold text-xl text-center py-1 underline">Synopsis :</h1>
                <p className="text-justify p-2">{film.description}</p>
              </aside>
                </div>
          </aside>
        </div>
      ) : (
        <span className="loading loading-ball loading-lg"></span>
      )}
      <div className="justify-center flex py-10">
      <button className="btn btn-primary text-5xl h-20 font-normal normal-case" style={{
            borderColor: "rgb(7, 157, 236)",
            backgroundColor: "rgb(7, 157, 236)"
          }}><Link href={"../"}>Back</Link></button>
      </div>
    </div>
  );
}

export default FilmPage;
