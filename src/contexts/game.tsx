import {ReactNode, useEffect, useState, Dispatch, SetStateAction, useCallback} from 'react'
import {createContext} from 'react'

import { Ghost } from '../types/ghost'
import { Food, powerUpsNumber, snackRadius, snacksNumber } from '../types/food'

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
    isPoweredUp: boolean

    ghosts: Ghost[]
    snacks: Food[]
    powerUps: Food[]
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
    const safeDistance = 100 // safe zone around pacman (nothing is generated in this area)

    const pacmanInitialX = 625
    const pacmanInitialY = 325

    const [pacmanX, setPacmanX] = useState(pacmanInitialX)
    const [pacmanY, setPacmanY] = useState(pacmanInitialY)
    const [isPoweredUp, setIsPoweredUp] = useState(false)

    const [ghosts, setGhosts] = useState<Ghost[]>([])

    const [snacks, setSnacks] = useState<Food[]>([])
    const [powerUps, setPowerUps] = useState<Food[]>([])

    const [gameHasStarted, setGameHasStarted] = useState(false)

    // Resets the game.
    const reset = useCallback(() => {
        setPacmanX(pacmanInitialX)
        setPacmanY(pacmanInitialY)

        generateGhosts()
        generateSnacks()
        generatePowerUps()

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

            // If ghosts are weakened, they are eaten.
            if (isPoweredUp) {
                setGhosts(ghosts => ghosts.filter(({id}) => id != ghost.id))
                continue;
            }

            // If ghost is touching pacman, the game is lost.
            gameOver()
        }
    }, [gameOver, ghosts, pacmanX, pacmanY, isPoweredUp])

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

    // Check if pacman is eating a snack.
    const checkIfPoweredUp = useCallback(() => {
        // Square that represents Pacman's position.
        const left = pacmanX - radius;
        const right = pacmanX + radius;
        const top = pacmanY - radius;
        const bottom = pacmanY + radius;

        // Remove eaten snacks.
        setPowerUps(powerUps => powerUps.filter(powerUp => {
            const snackLeft = powerUp.x - snackRadius;
            const snackRight = powerUp.x + snackRadius;
            const snackTop = powerUp.y - snackRadius;
            const snackBottom = powerUp.y + snackRadius;

            // True if not eaten, and false if eaten.
            const notPoweredUp = (snackRight < left || snackLeft > right) || (snackBottom < top || snackTop > bottom)

            if (!notPoweredUp) {
                setIsPoweredUp(true)
                setTimeout(
                    () => setIsPoweredUp(false),
                    5 * 1000 // 5 seconds
                )
            }

           return notPoweredUp
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
        checkIfPoweredUp()
    }, [checkIfPoweredUp])

    useEffect(() => {
        if (gameHasStarted && snacks.length == 0) {
            victory()
        }
    }, [gameHasStarted, snacks, victory])

    // Adds ghosts to the game. 1 ghost for each of the 4 personalities.
    function generateGhosts() {
        const ghosts: Ghost[] = [{
            id: Math.random(),
            personality: 'red',
            x: Math.floor(Math.random() * containerWidth),
            y: Math.floor(Math.random() * containerHeight),
        }, {
            id: Math.random(),
            personality: 'pink',
            x: Math.floor(Math.random() * containerWidth),
            y: Math.floor(Math.random() * containerHeight),
        }, {
            id: Math.random(),
            personality: 'cyan',
            x: Math.floor(Math.random() * containerWidth),
            y: Math.floor(Math.random() * containerHeight),
        }, {
            id: Math.random(),
            personality: 'orange',
            x: Math.floor(Math.random() * containerWidth),
            y: Math.floor(Math.random() * containerHeight),
        }]
        
        // Create safe zone around pacman and avoid going out of bounds.
        for (let i = 0; i < ghosts.length; i++) {
            while ((ghosts[i].x > pacmanInitialX - safeDistance && ghosts[i].x < pacmanInitialX + safeDistance) || ghosts[i].x - radius < 0 || ghosts[i].x + radius > containerWidth) {
                ghosts[i].x = Math.floor(Math.random() * containerWidth)
            }
            while ((ghosts[i].y > pacmanInitialY - safeDistance && ghosts[i].y < pacmanInitialY + safeDistance) || ghosts[i].y - radius < 0 || ghosts[i].y + radius > containerHeight) {
                ghosts[i].y = Math.floor(Math.random() * containerWidth)
            }
        }

        setGhosts(ghosts)
    }

    // Adds snacks to the game.
    function generateSnacks() {
        const randomSnacks: Food[] = []
        for (let i = 0; i < snacksNumber; i++) {
            const snack = {
                id: Math.random(),
                // Random coordinates.
                x: Math.floor(Math.random() * containerWidth),
                y: Math.floor(Math.random() * containerHeight),
            }

            // Create safe zone around pacman and avoid going out of bounds.
            while ((snack.x > pacmanInitialX - safeDistance && snack.x < pacmanInitialX + safeDistance) || snack.x - radius < 0 || snack.x + radius > containerWidth) {
                snack.x = Math.floor(Math.random() * containerWidth)
            }
            while ((snack.y > pacmanInitialY - safeDistance && snack.y < pacmanInitialY + safeDistance) || snack.y - radius < 0 || snack.y + radius > containerHeight) {
                snack.y = Math.floor(Math.random() * containerWidth)
            }

            randomSnacks.push(snack)
        }

        setSnacks(randomSnacks)
    }

    // Adds power-ups to the game.
    function generatePowerUps() {
        const randomPowerUps: Food[] = []
        for (let i = 0; i < powerUpsNumber; i++) {
            const powerUps = {
                id: Math.random(),
                // Random coordinates.
                x: Math.floor(Math.random() * containerWidth),
                y: Math.floor(Math.random() * containerHeight),
            }

            // Create safe zone around pacman and avoid going out of bounds.
            while ((powerUps.x > pacmanInitialX - safeDistance && powerUps.x < pacmanInitialX + safeDistance) || powerUps.x - radius < 0 || powerUps.x + radius > containerWidth) {
                powerUps.x = Math.floor(Math.random() * containerWidth)
            }
            while ((powerUps.y > pacmanInitialY - safeDistance && powerUps.y < pacmanInitialY + safeDistance) || powerUps.y - radius < 0 || powerUps.y + radius > containerHeight) {
                powerUps.y = Math.floor(Math.random() * containerWidth)
            }

            randomPowerUps.push(powerUps)
        }

        setPowerUps(randomPowerUps)
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
                isPoweredUp,
                ghosts,
                snacks,
                powerUps,
            }}
        >
            {children}
        </GameContext.Provider>
    )
}