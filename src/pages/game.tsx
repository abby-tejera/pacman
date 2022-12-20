import styles from '../styles/Game.module.css'
import { Pacman } from '../components/Pacman'
import { Ghost } from '../components/Ghost'
import { useGame } from '../hooks/useGame'
import { Snack } from '../components/Snack'
import { PowerUp } from '../components/PowerUp'
import { Walls } from '../components/Walls'

// Game page (url: '/game')
export default function Game() {
  const {
    containerWidth,
    containerHeight,
    ghosts,
    snacks,
    powerUps,
  } = useGame()

  return (
    <div className={styles.page}>
      <svg
        className={styles.container}
        xmlns="http://www.w3.org/2000/svg"
        width={containerWidth}
        height={containerHeight}
      >
        <Walls />

        {snacks.map(snack => (
          <Snack key={snack.id} snack={snack} />
        ))}

        {powerUps.map(powerUp => (
          <PowerUp key={powerUp.id} powerUp={powerUp} />
        ))}

        <Pacman />

        {ghosts.map(ghost => (
          <Ghost key={ghost.id} ghost={ghost} />
        ))}
      </svg>
      <audio  preload='auto' autoPlay loop>
        <source src="/pacman_beginning.wav" type="audio/mpeg"/>
        Your browser does not support audio tag
      </audio>
    </div>
  )
}
