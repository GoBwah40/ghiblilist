import { Html, Head, Main, NextScript } from 'next/document'
import { Header } from './components/navbar'
import { Footer } from './components/footer'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="/logos/favicon.ico" />
        <title>Ghibli List</title>
      </Head>
      <body>
      <Header></Header>
        <Main />
        <NextScript />
        <Footer></Footer>
      </body>
    </Html>
  )
}
