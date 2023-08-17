import { Html, Head, Main, NextScript } from 'next/document'
import { Navbar } from './components/navbar'

export default function Document() {
  return (
    <Html lang="fr">
      <Head />
      <Navbar></Navbar>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
