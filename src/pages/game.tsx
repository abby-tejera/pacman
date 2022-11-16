import { useEffect, useState } from 'react'
import styles from '../styles/Game.module.css'

export default function Home() {
  const [pacmanX, setPacmanX] = useState(625)
  const [pacmanY, setPacmanY] = useState(325)

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      movePacman(e.key)
    });

    return () => {
      document.removeEventListener("keydown", () => {});
    }
  }, [])

  function movePacman(key: string) {
    switch (key) {
      case "ArrowDown":
        setPacmanY(y => y + 10);
        break;
      
      case "ArrowUp":
        setPacmanY(y => y - 10);
        break;

      case "ArrowLeft":
        setPacmanX(x => x - 10);
        break;

      case "ArrowRight":
        setPacmanX(x => x + 10);
        break;
    
      default:
        break;
    }
  }

  return (
    <div className={styles.page}>
      <svg className={styles.container} xmlns="http://www.w3.org/2000/svg" width="1200" height="600">
        <circle className={styles.pacman} cx={pacmanX} cy={pacmanY} r="25" />
      </svg>
    </div>
  )
}
