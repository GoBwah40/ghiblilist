import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Avatar from '@/components/avatar';
import Banner from '@/components/banner';
import { fetchFilm, fetchFilms } from '@/lib/ghibli';
import type { Film } from '@/model/film';

interface FilmPageProps {
  film: Film;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const films = await fetchFilms();
  return {
    paths: films.map((film) => ({ params: { id: film.id } })),
    // Un film ajouté à l'API après le build est généré à la première visite.
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<FilmPageProps, { id: string }> = async ({ params }) => {
  const film = params?.id ? await fetchFilm(params.id) : null;
  if (!film) return { notFound: true, revalidate: 60 * 60 };
  return { props: { film }, revalidate: 60 * 60 * 24 };
};

export default function FilmPage({ film }: FilmPageProps) {
  const details = [
    { label: 'Director', value: film.director },
    { label: 'Producer', value: film.producer },
    { label: 'Release date', value: film.release_date },
    { label: 'Score', value: film.rt_score && `${film.rt_score}/100` },
    { label: 'Duration', value: film.running_time && `${film.running_time} min` },
  ].filter((detail) => detail.value);

  return (
    <>
      <Head>
        <title>{`${film.title} · The GhibliList`}</title>
        <meta name="description" content={film.description.slice(0, 160)} />
      </Head>
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-3 py-6 sm:px-6 md:flex-row">
        <div className="mx-auto w-2/3 max-w-xs shrink-0 md:mx-0 md:w-1/3 md:max-w-sm">
          <div className="overflow-hidden rounded-xl border-4 border-ghibli">
            <Image
              src={film.image}
              alt={`${film.title} poster`}
              width={600}
              height={900}
              sizes="(min-width: 768px) 33vw, 66vw"
              className="h-auto w-full"
              priority
            />
          </div>
          <h1 className="py-2 text-center text-2xl font-bold sm:text-3xl">{film.title}</h1>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <Banner
            image={film.movie_banner}
            title={film.original_title}
            subtitle={film.original_title_romanised}
          />
          <div className="flex flex-col gap-4 lg:flex-row">
            <dl
              aria-label="Film details"
              className="grid grid-cols-2 rounded-xl border-4 border-ghibli sm:grid-cols-3 lg:w-3/5"
            >
              {details.map((detail) => (
                <Avatar key={detail.label} label={detail.label} value={detail.value} />
              ))}
            </dl>
            <section
              aria-labelledby="synopsis"
              className="rounded-xl border-4 border-ghibli lg:w-2/5"
            >
              <h2 id="synopsis" className="pt-2 text-center text-xl font-bold">
                Synopsis
              </h2>
              <p className="p-3 leading-relaxed">{film.description}</p>
            </section>
          </div>
        </div>
      </div>
      <div className="flex justify-center pb-10 pt-4">
        <Link
          href="/"
          className="btn btn-lg border-ghibli bg-ghibli text-black hover:brightness-110"
        >
          <span aria-hidden="true">←</span> Back to the list
        </Link>
      </div>
    </>
  );
}
