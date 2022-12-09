import { useEffect } from 'react'

import styles from '../styles/Ghost.module.css'
import { useGame } from '../hooks/useGame'
import { Ghost as GhostType } from '../types/ghost'

type Props = {
    ghost: GhostType
}

export function Ghost({ghost}: Props) {
    const {radius, isPoweredUp} = useGame()

    return (
        <circle
            className={`
                ${styles.ghost}
                ${isPoweredUp ? styles.weakened : ''}
            `}
            cx={ghost.x}
            cy={ghost.y}
            r={radius}
        />
    )
}