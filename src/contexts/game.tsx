import {ReactNode, useEffect, useState, Dispatch, SetStateAction} from 'react'
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
    moveGhost: (ghostRef: Ghost) => void
}

export const GameContext = createContext({} as GameContextType)

type GameContextProviderProps = {
    children: ReactNode
}

export function GameProvider({children}: GameContextProviderProps) {
    const containerWidth = 1200
    const containerHeight = 600
    const step = 5 // step for ghosts
    const radius = 25

    const [pacmanX, setPacmanX] = useState(625)
    const [pacmanY, setPacmanY] = useState(325)

    const [ghosts, setGhosts] = useState<Ghost[]>([])

    useEffect(() => {
        // For now, let's keep just one ghost in the game.
        setGhosts([{
            id: Math.random(),
            // Random coordinates.
            x: Math.floor(Math.random() * containerWidth),
            y: Math.floor(Math.random() * containerHeight),
        }])
    }, [])

    // Handle Ghost's movement. Tries to follow Pacman using a very simple logic.
    function moveGhost(ghostRef: Ghost) {
        setGhosts(ghosts => ghosts.map(ghost => {
            // Ignore other ghosts
            if (ghost.id != ghostRef.id) return ghost

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
                moveGhost
            }}
        >
            {children}
        </GameContext.Provider>
    )
}