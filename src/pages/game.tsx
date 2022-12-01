import { useState } from 'react'

import styles from '../styles/Game.module.css'
import {Pacman} from '../components/Pacman'
import {Ghost} from '../components/Ghost'

// Game page (url: '/game')
export default function Game() {
  // Using State Hooks so that pacman's position is updated on the view.
  const [pacmanX, setPacmanX] = useState(625)
  const [pacmanY, setPacmanY] = useState(325)

  // Using only one ghost initially, but once there are more ghosts in the game, we'll need to have an array state.
  const [ghostX, setGhostX] = useState(100)
  const [ghostY, setGhostY] = useState(100)

  const width = 1200;
  const height = 600;

  return (
    <div className={styles.page}>
      <svg className={styles.container} xmlns="http://www.w3.org/2000/svg" width={width} height={height}>
        <Pacman x={pacmanX} y={pacmanY} setX={setPacmanX} setY={setPacmanY}  containerWidth={width} containerHeight={height} />

        <Ghost x={ghostX} y={ghostY} setX={setGhostX} setY={setGhostY}  containerWidth={width} containerHeight={height} />
      </svg>
    </div>
  )
}
