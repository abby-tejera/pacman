import { useEffect } from 'react'

import styles from '../styles/Snack.module.css'
import { useGame } from '../hooks/useGame'
import { Snack as SnackType } from '../types/snack'

type Props = {
    snack: SnackType
}

export function Snack({snack}: Props) {
    const radius = 5

    return (
        <circle className={styles.snack} cx={snack.x} cy={snack.y} r={radius} />
    )
}
