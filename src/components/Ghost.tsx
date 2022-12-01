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
        pacmanX,
        pacmanY
    } = useGame()

    useEffect(() => {
        // Handle Ghost's movement. Tries to follow Pacman using a very simple logic (should be changed in the future).
        function moveGhost() {
            if (x < pacmanX) {
                setX(x => (x + step + radius <= containerWidth) ? x + step : x);
            } else if (x > pacmanX) {
                setX(x => (x - step - radius >= 0) ? x - step : x);
            }

            if (y < pacmanY) {
                setY(y => (y + step + radius <= containerHeight) ? y + step : y);
            } else if (y > pacmanX) {
                setY(y => (y - step - radius >= 0) ? y - step : y);
            }
        }

        // Calling moveGhost every 0.1 second.
        const timer = setTimeout(() => {
            moveGhost()
        }, 0.1 * 1000 /* 0.1 second */)

        return () => {
            clearTimeout(timer)
        }
    }, [x, y, setX, setY, containerWidth, containerHeight, pacmanX, pacmanY])

    return (
        <circle className={styles.ghost} cx={x} cy={y} r={radius} />
    )
}