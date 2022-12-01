import { useEffect, Dispatch, SetStateAction } from 'react'

import styles from '../styles/Pacman.module.css'

type Props = {
    x: number
    y: number
    setX: Dispatch<SetStateAction<number>>
    setY: Dispatch<SetStateAction<number>>
}

export function Pacman({x, y, setX, setY}: Props) {
    // Performing action on first page load.
    useEffect(() => {
        // Handle Pacman's movement.
        function movePacman(key: string) {
            switch (key) {
            case "ArrowDown":
                setY(y => y + 10);
                break;
            
            case "ArrowUp":
                setY(y => y - 10);
                break;

            case "ArrowLeft":
                setX(x => x - 10);
                break;

            case "ArrowRight":
                setX(x => x + 10);
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
    }, [setX, setY])

    return (
        <circle className={styles.pacman} cx={x} cy={y} r="25" />
    )
}