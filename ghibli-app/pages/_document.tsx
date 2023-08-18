import { Html, Head, Main, NextScript } from 'next/document'
import { Header } from './components/navbar'

export default function Document() {
  return (
    <Html lang="fr">
      <Head />
      <body>
      <Header></Header>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
