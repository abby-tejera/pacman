import {ReactNode, useEffect, useState, Dispatch, SetStateAction, useCallback} from 'react'
import {createContext} from 'react'

import { Ghost } from '../types/ghost'

type GameContextType = {
    containerWidth: number
    containerHeight: number
    step: number
    radius: number

    pacmanX: number
    pacmanY: number
    setPacmanX: Dispatch<SetStateAction<number>>
    setPacmanY: Dispatch<SetStateAction<number>>

    ghosts: Ghost[]
}

export const GameContext = createContext({} as GameContextType)

type GameContextProviderProps = {
    children: ReactNode
}

export function GameProvider({children}: GameContextProviderProps) {
    const containerWidth = 1200
    const containerHeight = 600
    const step = 5 // step for ghosts
    const radius = 25 // radius of pacman and ghosts.

    const pacmanInitialX = 625
    const pacmanInitialY = 325

    const [pacmanX, setPacmanX] = useState(pacmanInitialX)
    const [pacmanY, setPacmanY] = useState(pacmanInitialY)

    const [ghosts, setGhosts] = useState<Ghost[]>([])

    // Resets the game.
    const reset = useCallback(() => {
        setPacmanX(pacmanInitialX)
        setPacmanY(pacmanInitialY)

        generateGhosts()
    }, [])

    // Handle when the player loses.
    const gameOver = useCallback(() => {
        alert("You lost!")
        reset()
    }, [reset])

    // Check if ghosts are eating pacman (if the user lost).
    const checkIfLost = useCallback(() => {
        // Square that represents Pacman's position.
        const left = pacmanX - radius;
        const right = pacmanX + radius;
        const top = pacmanY - radius;
        const bottom = pacmanY + radius;

        for (let ghost of ghosts) {
            const ghostLeft = ghost.x - radius;
            const ghostRight = ghost.x + radius;
            const ghostTop = ghost.y - radius;
            const ghostBottom = ghost.y + radius;

            // If ghost is not touching pacman, continue to the next one.
            if ((ghostRight < left || ghostLeft > right) ||
                (ghostBottom < top || ghostTop > bottom)
            ) {
                continue;
            }

            // If ghost is touching pacman, the game is lost.
            gameOver()
        }
    }, [gameOver, ghosts, pacmanX, pacmanY])

    // Handle Ghosts' movement. Tries to follow Pacman using a very simple logic.
    const moveGhosts = useCallback(() => {
        setGhosts(ghosts => ghosts.map(ghost => {
            // Choose new x value. Make sure that we don't go over the borders.
            if (ghost.x < pacmanX && ghost.x + step + radius <= containerWidth) {
                ghost.x = ghost.x + step
            } else if (ghost.x > pacmanX && ghost.x - step - radius >= 0) {
                ghost.x = ghost.x - step
            }

            // Choose new y value. Make sure that we don't go over the borders.
            if (ghost.y < pacmanY && ghost.y + step + radius <= containerHeight) {
                ghost.y = ghost.y + step
            } else if (ghost.y > pacmanY && ghost.y - step - radius >= 0) {
                ghost.y = ghost.y - step
            }
            
            return ghost
        }))

        // checkIfLost()
    }, [pacmanX, pacmanY])

    useEffect(() => {
        generateGhosts()
    }, [])

    useEffect(() => {
        checkIfLost()
    }, [checkIfLost])

    useEffect(() => {
        moveGhosts()
    }, [moveGhosts])

    // Adds ghosts to the game. (For now, only one ghost at a time.)
    function generateGhosts() {
        setGhosts([{
            id: Math.random(),
            // Random coordinates.
            x: Math.floor(Math.random() * containerWidth),
            y: Math.floor(Math.random() * containerHeight),
        }])
    }
    
    return (
        <GameContext.Provider
            value={{
                containerWidth,
                containerHeight,
                step,
                radius,
                pacmanX,
                setPacmanX,
                pacmanY,
                setPacmanY,
                ghosts,
            }}
        >
            {children}
        </GameContext.Provider>
    )
}