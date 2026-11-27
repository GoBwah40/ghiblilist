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
      {/* Lien d'évitement (WCAG 2.4.1) : premier élément atteint au clavier. */}
      <a
        href="#main"
        className="sr-only z-50 rounded-lg bg-white px-4 py-2 font-bold text-black focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}
