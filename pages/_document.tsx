import { Html, Head, Main, NextScript } from 'next/document';
import Navbar from './components/navbar';
import Footer from './components/footer';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="/logos/favicon.ico" />
        Ghibli List
      </Head>
      <body>
        <Navbar></Navbar>
        <Main />
        <NextScript />
        <Footer></Footer>
      </body>
    </Html>
  );
}
