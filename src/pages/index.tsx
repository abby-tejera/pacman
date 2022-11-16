import Head from 'next/head'
import Image from 'next/image'

import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <section className={styles.hero}>
        <div className={styles.background}>
          <Image src="/space.jpg" alt="Space background." fill />
        </div>

        <main>
          <h1>
            Pac-Man
          </h1>
          <button>
            <span>Play</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="86" height="86">
              <path
                stroke="none"
                d="M34.339745962156 9.6987298107781a10 10 0 0 1 17.320508075689 0l32.679491924311 56.602540378444a10 10 0 0 1 -8.6602540378444 15l-65.358983848622 0a10 10 0 0 1 -8.6602540378444 -15"
              />
            </svg>
          </button>
        </main>
      </section>
    </div>
  )
}
