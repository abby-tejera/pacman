import { useState } from 'react'

import styles from '../styles/Game.module.css'
import {Pacman} from '../components/Pacman'
import {Ghost} from '../components/Ghost'
import { useGame } from '../hooks/useGame'

// Game page (url: '/game')
export default function Game() {
  const {containerWidth, containerHeight} = useGame()

  // Using only one ghost initially, but once there are more ghosts in the game, we'll need to have an array state.
  const [ghostX, setGhostX] = useState(100)
  const [ghostY, setGhostY] = useState(100)

  return (
    <div className={styles.page}>
      <svg className={styles.container} xmlns="http://www.w3.org/2000/svg" width={containerWidth} height={containerHeight}>
        <Pacman />

        <Ghost x={ghostX} y={ghostY} setX={setGhostX} setY={setGhostY} />
      </svg>
    </div>
  )
}
