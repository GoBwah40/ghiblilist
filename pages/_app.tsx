import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { DM_Serif_Display, Fraunces, Inter, Nunito } from 'next/font/google';
import localFont from 'next/font/local';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';

// Polices auto-hébergées par next/font. Sans préchargement : le navigateur ne télécharge
// que celles du thème affiché.
const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  preload: false,
});
const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito', preload: false });
// Polices japonaises : seul le sous-ensemble latin est embarqué (voir fonts/README.md).
const rounded = localFont({
  src: [
    { path: '../fonts/mplus-rounded-1c-400-latin.woff2', weight: '400' },
    { path: '../fonts/mplus-rounded-1c-700-latin.woff2', weight: '700' },
    { path: '../fonts/mplus-rounded-1c-800-latin.woff2', weight: '800' },
  ],
  variable: '--font-rounded',
  preload: false,
});
const dela = localFont({
  src: '../fonts/dela-gothic-one-400-latin.woff2',
  weight: '400',
  variable: '--font-dela',
  preload: false,
});
const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-dmserif',
  preload: false,
});
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', preload: false });

const fontVariables = [fraunces, nunito, rounded, dela, dmSerif, inter]
  .map((font) => font.variable)
  .join(' ');

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`app-root flex min-h-screen flex-col ${fontVariables}`}>
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
    </div>
  );
}
