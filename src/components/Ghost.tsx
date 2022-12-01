import { useEffect, Dispatch, SetStateAction } from 'react'

import styles from '../styles/Ghost.module.css'
import { useGame } from '../hooks/useGame'

type Props = {
    x: number
    y: number
    setX: Dispatch<SetStateAction<number>>
    setY: Dispatch<SetStateAction<number>>
}

const step = 10
const radius = 25

export function Ghost({x, y, setX, setY}: Props) {
    const {
        containerWidth,
        containerHeight,
    } = useGame()

    return (
        <>
            <circle className={styles.ghost} cx={x} cy={y} r={radius} />
        </>
    )
}