import { useEffect, Dispatch, SetStateAction } from 'react'

import styles from '../styles/Pacman.module.css'
import { useGame } from '../hooks/useGame'

export function Pacman() {
    const {
        pacmanX: x,
        pacmanY: y,
        movePacman,
        radius,
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
        <circle className={styles.pacman} cx={x} cy={y} r={radius} />
    )
}