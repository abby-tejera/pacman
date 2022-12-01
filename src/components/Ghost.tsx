import { useEffect, Dispatch, SetStateAction } from 'react'

import styles from '../styles/Ghost.module.css'

type Props = {
    x: number
    y: number
    setX: Dispatch<SetStateAction<number>>
    setY: Dispatch<SetStateAction<number>>
    containerWidth: number
    containerHeight: number
}

const step = 10
const radius = 25

export function Ghost({x, y, setX, setY, containerWidth, containerHeight}: Props) {
    return (
        <circle className={styles.ghost} cx={x} cy={y} r={radius} />
    )
}