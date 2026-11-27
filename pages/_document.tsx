import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" data-theme="dark">
      <Head>
        <link rel="icon" href="/logos/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/logos/logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logos/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#079dec" />
      </Head>
      <body className="flex min-h-screen flex-col">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
