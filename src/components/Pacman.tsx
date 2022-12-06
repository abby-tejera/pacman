import { useEffect, Dispatch, SetStateAction } from 'react'

import styles from '../styles/Pacman.module.css'
import { useGame } from '../hooks/useGame'

export function Pacman() {
    const {
        containerWidth,
        containerHeight,
        pacmanX: x,
        pacmanY: y,
        setPacmanX: setX,
        setPacmanY: setY,
        pacmanStep,
        radius
    } = useGame()

    // Performing action on first page load.
    useEffect(() => {
        // Handle Pacman's movement. Checks if the next position goes over the border and prevents it.
        function movePacman(key: string) {
            switch (key) {
            case "ArrowDown":
                setY(y => (y + pacmanStep + radius <= containerHeight) ? y + pacmanStep : y);
                break;
            
            case "ArrowUp":
                setY(y => (y - pacmanStep - radius >= 0) ? y - pacmanStep : y);
                break;

            case "ArrowLeft":
                setX(x => (x - pacmanStep - radius >= 0) ? x - pacmanStep : x);
                break;

            case "ArrowRight":
                setX(x => (x + pacmanStep + radius <= containerWidth) ? x + pacmanStep : x);
                break;
            
            // If user didn't press arrow keys, ignore.
            default:
                break;
            }
        }

        // Calling movePacman every time any key is pressed.
        document.addEventListener("keydown", (e) => {
            movePacman(e.key)
        });

        return () => {
            document.removeEventListener("keydown", () => {});
        }
    }, [setX, setY, containerWidth, containerHeight, pacmanStep, radius])

    return (
        <circle className={styles.pacman} cx={x} cy={y} r={radius} />
    )
}