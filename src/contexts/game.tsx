import {ReactNode, useEffect, useState, Dispatch, SetStateAction, useCallback} from 'react'
import {createContext} from 'react'

import { Ghost } from '../types/ghost'
import { Snack, snackRadius } from '../types/snack'

type GameContextType = {
    containerWidth: number
    containerHeight: number

    ghostStep: number
    pacmanStep: number
    radius: number

    pacmanX: number
    pacmanY: number
    setPacmanX: Dispatch<SetStateAction<number>>
    setPacmanY: Dispatch<SetStateAction<number>>

    ghosts: Ghost[]
    snacks: Snack[]
}

export const GameContext = createContext({} as GameContextType)

type GameContextProviderProps = {
    children: ReactNode
}

export function GameProvider({children}: GameContextProviderProps) {
    const containerWidth = 1200
    const containerHeight = 600

    const ghostStep = 2 // step for ghosts
    const pacmanStep = 7 // step for pacman
    const radius = 25 // radius of pacman and ghosts.

    const pacmanInitialX = 625
    const pacmanInitialY = 325

    const [pacmanX, setPacmanX] = useState(pacmanInitialX)
    const [pacmanY, setPacmanY] = useState(pacmanInitialY)

    const [ghosts, setGhosts] = useState<Ghost[]>([])

    const [snacks, setSnacks] = useState<Snack[]>([])

    const [gameHasStarted, setGameHasStarted] = useState(false)

    // Resets the game.
    const reset = useCallback(() => {
        console.log('reset')
        setPacmanX(pacmanInitialX)
        setPacmanY(pacmanInitialY)

        generateGhosts()
        generateSnacks()

        setGameHasStarted(true)
    }, [])

    // Handle when the player loses.
    const gameOver = useCallback(() => {
        setGameHasStarted(false)

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
            if (ghost.x < pacmanX && ghost.x + ghostStep + radius <= containerWidth) {
                ghost.x = ghost.x + ghostStep
            } else if (ghost.x > pacmanX && ghost.x - ghostStep - radius >= 0) {
                ghost.x = ghost.x - ghostStep
            }

            // Choose new y value. Make sure that we don't go over the borders.
            if (ghost.y < pacmanY && ghost.y + ghostStep + radius <= containerHeight) {
                ghost.y = ghost.y + ghostStep
            } else if (ghost.y > pacmanY && ghost.y - ghostStep - radius >= 0) {
                ghost.y = ghost.y - ghostStep
            }
            
            return ghost
        }))
    }, [pacmanX, pacmanY])

    // Check if pacman is eating a snack.
    const checkIfEaten = useCallback(() => {
        // Square that represents Pacman's position.
        const left = pacmanX - radius;
        const right = pacmanX + radius;
        const top = pacmanY - radius;
        const bottom = pacmanY + radius;

        // Remove eaten snacks.
        setSnacks(snacks => snacks.filter(snack => {
            const snackLeft = snack.x - snackRadius;
            const snackRight = snack.x + snackRadius;
            const snackTop = snack.y - snackRadius;
            const snackBottom = snack.y + snackRadius;

            // True if not eaten, and false if eaten.
            return (snackRight < left || snackLeft > right) || (snackBottom < top || snackTop > bottom)
        }))


    }, [pacmanX, pacmanY])

    // Handle when the player wins.
    const victory = useCallback(() => {
        setGameHasStarted(false)

        alert("You won!!!!!")
        reset()
    }, [reset])

    useEffect(() => {
        reset()
    }, [reset])

    useEffect(() => {
        checkIfLost()
    }, [checkIfLost])

    useEffect(() => {
        moveGhosts()
    }, [moveGhosts])

    useEffect(() => {
        checkIfEaten()
    }, [checkIfEaten])

    useEffect(() => {
        if (gameHasStarted && snacks.length == 0) {
            victory()
        }
    }, [gameHasStarted, snacks, victory])

    // Adds ghosts to the game. (For now, only one ghost at a time.)
    function generateGhosts() {
        setGhosts([{
            id: Math.random(),
            // Random coordinates.
            x: Math.floor(Math.random() * containerWidth),
            y: Math.floor(Math.random() * containerHeight),
        }])
    }

    // Adds snacks to the game. (For now, only one snack at a time.)
    function generateSnacks() {
        setSnacks([{
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
                ghostStep,
                pacmanStep,
                radius,
                pacmanX,
                setPacmanX,
                pacmanY,
                setPacmanY,
                ghosts,
                snacks,
            }}
        >
            {children}
        </GameContext.Provider>
    )
}