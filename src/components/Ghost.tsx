import styles from '../styles/Ghost.module.css'
import { useGame } from '../hooks/useGame'
import { Ghost as GhostType } from '../constants/ghost'

type Props = {
    ghost: GhostType
}

export function Ghost({ghost}: Props) {
    const {radius, isPoweredUp} = useGame()

    return (
        <rect
            className={`
                ${styles.ghost}
                ${styles[ghost.personality]}
                ${isPoweredUp ? styles.weakened : ''}
            `}
            x={ghost.x}
            y={ghost.y}
            width={2 * radius}
            height={2 * radius}
        />
    )
}