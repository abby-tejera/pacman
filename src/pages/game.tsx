import styles from '../styles/Game.module.css'
import {Pacman} from '../components/Pacman'
import {Ghost} from '../components/Ghost'
import { useGame } from '../hooks/useGame'

// Game page (url: '/game')
export default function Game() {
  const {
    containerWidth,
    containerHeight,
    ghosts
  } = useGame()

  return (
    <div className={styles.page}>
      <svg
        className={styles.container}
        xmlns="http://www.w3.org/2000/svg"
        width={containerWidth}
        height={containerHeight}
      >
        <Pacman />

        {ghosts.map(ghost => (
          <Ghost key={ghost.id} ghost={ghost} />
        ))}
      </svg>
    </div>
  )
}
