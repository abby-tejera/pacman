import styles from '../styles/Ghost.module.css'
import { useGame } from '../hooks/useGame'
import { Ghost as GhostType } from '../constants/ghost'
import { entityRadius } from '../constants/maze'
import '../../public/ghost_one/g1D1.png'

type Props = {
    ghost: GhostType
}

export function Ghost({ghost}: Props) {
    const {isPoweredUp} = useGame()

    return (
        <image
            className={`
                ${styles.ghost}
                ${styles[ghost.personality]}
                ${isPoweredUp ? styles.weakened : ''}
            `}
            x={ghost.x}
            y={ghost.y}
            width={2 * entityRadius}
            height={2 * entityRadius}
            href="../../public/ghost_one/g1D1.png"
        />
       
    )
}