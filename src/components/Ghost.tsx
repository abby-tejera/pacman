import styles from '../styles/Ghost.module.css'
import { useGame } from '../hooks/useGame'
import { Ghost as GhostType } from '../constants/ghost'
import { entityRadius } from '../constants/maze'
import '../../public/ghost-1.svg'
import { url } from 'inspector'

type Props = {
    ghost: GhostType
}

export function Ghost({ghost}: Props) {
    const {isPoweredUp} = useGame()

    return (
        <rect
        className={`
            ${styles.ghost}
            ${styles[ghost.personality]}
            ${isPoweredUp ? styles.weakened : ''}
        `}
        x={ghost.x}
        y={ghost.y}
        width={2 * entityRadius}
        height={2 * entityRadius}
        />
    )
}