import type { AppProps } from 'next/app'
import Head from 'next/head'

import '../styles/global.css'
import { GameProvider } from '../contexts/game'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
      <title>Pac-Man</title>
      </Head>

      <GameProvider>
        <Component {...pageProps} />
      </GameProvider>
    </>
  )
}
