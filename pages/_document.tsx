import { Html, Head, Main, NextScript } from 'next/document';
import { themeBootstrapScript } from '@/lib/theme';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="theme-color" content="#0a1026" />
        {/* Applique le thème avant le premier affichage : pas de flash de l'ancien thème. */}
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
        <link rel="icon" href="/logos/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/logos/logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logos/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
