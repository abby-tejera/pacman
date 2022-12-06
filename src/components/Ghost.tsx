import { useEffect } from 'react'

import styles from '../styles/Ghost.module.css'
import { useGame } from '../hooks/useGame'
import { Ghost as GhostType } from '../types/ghost'

type Props = {
    ghost: GhostType
}

export function Ghost({ghost}: Props) {
    const {
        radius,
        // moveGhost
    } = useGame()

    // useEffect(() => {
    //     // Calling moveGhost every 0.1 second.
    //     const timer = setTimeout(() => {
    //         moveGhost(ghost)
    //     }, 0.1 * 1000 /* 0.1 second */)

    //     return () => {
    //         clearTimeout(timer)
    //     }
    // }, [ghost, moveGhost])

    return (
        <circle className={styles.ghost} cx={ghost.x} cy={ghost.y} r={radius} />
    )
}