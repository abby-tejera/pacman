import Image from 'next/image'
import Link from 'next/link'

import backgrounImg from '../../public/space.jpg'

import styles from '../styles/Home.module.css'

// Home page of website (url: '/')
export default function Home() {
  return (
    <div>
      <section className={styles.hero}>
        <div className={styles.background}>
          <Image src={backgrounImg} alt="Space background." fill priority />
        </div>

        <main>
          <h1>
            Pac-Man
          </h1>
          <Link href="/game">
            <span>Play</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="86" height="86">
              <path
                stroke="none"
                d="M34.339745962156 9.6987298107781a10 10 0 0 1 17.320508075689 0l32.679491924311 56.602540378444a10 10 0 0 1 -8.6602540378444 15l-65.358983848622 0a10 10 0 0 1 -8.6602540378444 -15"
              />
            </svg>
          </Link>
        </main>
      </section>
    </div>
  )
}
