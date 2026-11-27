import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>The GhibliList</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Browse every Studio Ghibli feature film: posters, synopsis, director, release date and score."
        />
      </Head>
      <Navbar />
      <main className="flex-1">
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}
