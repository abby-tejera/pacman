import { useEffect, Dispatch, SetStateAction } from 'react'

import styles from '../styles/Pacman.module.css'

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

export function Pacman({x, y, setX, setY, containerWidth, containerHeight}: Props) {
    // Performing action on first page load.
    useEffect(() => {
        // Handle Pacman's movement. Checks if the next position goes over the border and prevents it.
        function movePacman(key: string) {
            switch (key) {
            case "ArrowDown":
                setY(y => (y + step + radius <= containerHeight) ? y + step : y);
                break;
            
            case "ArrowUp":
                setY(y => (y - step - radius >= 0) ? y - step : y);
                break;

            case "ArrowLeft":
                setX(x => (x - step - radius >= 0) ? x - step : x);
                break;

            case "ArrowRight":
                setX(x => (x + step + radius <= containerWidth) ? x + step : x);
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
    }, [setX, setY, containerWidth, containerHeight])

    return (
        <circle className={styles.pacman} cx={x} cy={y} r={radius} />
    )
}