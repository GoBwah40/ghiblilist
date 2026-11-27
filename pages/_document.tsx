import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" data-theme="dark">
      <Head>
        <link rel="icon" href="/logos/favicon.ico" />
        <meta name="theme-color" content="#079dec" />
      </Head>
      <body className="flex min-h-screen flex-col">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
