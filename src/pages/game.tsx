import { useEffect, useState } from 'react'
import styles from '../styles/Game.module.css'

// Game page (url: '/game')
export default function Game() {
  // Using State Hooks so that pacman's position is updated on the view.
  const [pacmanX, setPacmanX] = useState(625)
  const [pacmanY, setPacmanY] = useState(325)

  // Performing action on first page load.
  useEffect(() => {
    // Calling movePacman every time any key is pressed.
    document.addEventListener("keydown", (e) => {
      movePacman(e.key)
    });

    return () => {
      document.removeEventListener("keydown", () => {});
    }
  }, [])

  // Handle Pacman's movement.
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
    
      // If user didn't press arrow keys, ignore.
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
