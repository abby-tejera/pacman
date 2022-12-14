import { useEffect } from 'react'

import styles from '../styles/Pacman.module.css'
import { useGame } from '../hooks/useGame'
import { entityRadius } from '../constants/maze'

export function Pacman() {
    const {
        pacmanX: x,
        pacmanY: y,
        movePacman,
        pacmanDirection
    } = useGame()

    // Performing action on first page load.
    useEffect(() => {
        // Handle Pacman's movement. Checks if the next position goes over the border and prevents it.
        function handleKeyEvent(event: KeyboardEvent) {
            switch (event.key) {
            case 'ArrowDown':
                movePacman('down')
                break;
            
            case 'ArrowUp':
                movePacman('up')
                break;

            case 'ArrowLeft':
                movePacman('left')
                break;

            case 'ArrowRight':
                movePacman('right')
                break;
            
            // If user didn't press arrow keys, ignore.
            default:
                break;
            }
        }

        // Calling handleKeyEvent every time any key is pressed.
        document.addEventListener("keydown", handleKeyEvent);

        return () => {
            document.removeEventListener("keydown", handleKeyEvent);
        }
    }, [movePacman])

    return (
        <g className={styles[pacmanDirection]}>
            <circle className={styles.pacman} cx={x} cy={y} r={entityRadius} />
            <circle className={styles.mouth} cx={x} cy={y} r={entityRadius} />

            <circle className={styles.eye} cx={x + entityRadius / 6} cy={y - entityRadius / 2} r={entityRadius / 5} />
        </g>
    )
}