import {ReactNode, useEffect, useState, useCallback} from 'react'
import {createContext} from 'react'

import { Ghost } from '../types/ghost'
import { Food, powerUpsNumber, snackRadius, snacksNumber } from '../types/food'

type GameContextType = {
    containerWidth: number
    containerHeight: number
    radius: number

    pacmanX: number
    pacmanY: number
    isPoweredUp: boolean
    movePacman: (direction: string) => void

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
    const pacmanStep = 10 // step for pacman
    const radius = 25 // radius of pacman and ghosts.
    const safeDistance = 100 // safe zone around pacman (nothing is generated in this area)

    const pacmanInitialX = 625
    const pacmanInitialY = 325

    const [pacmanX, setPacmanX] = useState(pacmanInitialX)
    const [pacmanY, setPacmanY] = useState(pacmanInitialY)
    const [pacmanDirection, setPacmanDirection] = useState('')
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
        checkIfEaten()
    }, [checkIfEaten])

    useEffect(() => {
        checkIfPoweredUp()
    }, [checkIfPoweredUp])

    // Moves ghosts in the direction of their targets.
    useEffect(function moveGhosts() {
        const timeInterval = 0.1 // in seconds

        const interval = setInterval(() => {
            setGhosts(ghosts => ghosts.map(ghost => {
                // Choose new x value. Make sure that we don't go over the borders.
                if (ghost.x < ghost.targetX && ghost.x + ghostStep + radius <= containerWidth) {
                    ghost.x = ghost.x + ghostStep
                } else if (ghost.x > ghost.targetX && ghost.x - ghostStep - radius >= 0) {
                    ghost.x = ghost.x - ghostStep
                }
    
                // Choose new y value. Make sure that we don't go over the borders.
                if (ghost.y < ghost.targetY && ghost.y + ghostStep + radius <= containerHeight) {
                    ghost.y = ghost.y + ghostStep
                } else if (ghost.y > ghost.targetY && ghost.y - ghostStep - radius >= 0) {
                    ghost.y = ghost.y - ghostStep
                }
                 
                return ghost
            }))
        }, timeInterval * 1000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    // Updates ghosts' targets based on their personalities.
    useEffect(function updateGhostsTargets() {
        setGhosts(ghosts => ghosts.map(ghost => {
            switch (ghost.personality) {
                // Always follows pacman.
                case 'red':
                    ghost.targetX = pacmanX
                    ghost.targetY = pacmanY
                    break;
                
                // Predicts pacman's future position (in a straight line) and goes there.
                case 'pink':
                    const tilesAhead = 10
                    switch (pacmanDirection) {
                        case 'right':
                            ghost.targetX = pacmanX + (2 * radius + tilesAhead * pacmanStep)
                            ghost.targetY = pacmanY
                            break;

                        case 'left':
                            ghost.targetX = pacmanX - (2 * radius + tilesAhead * pacmanStep)
                            ghost.targetY = pacmanY
                            break;
                        
                        case 'up':
                            ghost.targetX = pacmanX
                            ghost.targetY = pacmanY - (2 * radius + tilesAhead * pacmanStep)
                            break;
                        
                        case 'down':
                            ghost.targetX = pacmanX
                            ghost.targetY = pacmanY + (2 * radius + tilesAhead * pacmanStep)
                            break;
                    
                        default:
                            break;
                    }
                    break;
                
                // Looks at the front of pacman, draws a vector from the red ghost to that position,
                // doubles that vector, and goes to that location.
                case 'cyan':
                    const redGhost = ghosts.find(ghost => ghost.personality == 'red')
                    if (!redGhost) {
                        break;
                    }

                    const frontAhead = 5
                    const pacmanFrontX = (pacmanDirection == 'right')
                        ? pacmanX + (2 * radius + frontAhead * pacmanStep)
                        : (pacmanDirection == 'left')
                            ? pacmanX - (2 * radius + frontAhead * pacmanStep)
                            : pacmanX
                    const pacmanFrontY = (pacmanDirection == 'down')
                        ? pacmanY + (2 * radius + frontAhead * pacmanStep)
                        : (pacmanDirection == 'up')
                            ? pacmanY - (2 * radius + frontAhead * pacmanStep)
                            : pacmanY
                    
                    const vectorX = pacmanFrontX - redGhost.x
                    const vectorY = pacmanFrontY - redGhost.y

                    ghost.targetX = redGhost.x + 2 * vectorX
                    ghost.targetY = redGhost.y + 2 * vectorY
                    break;
                
                // Follows pacman until they are at a minimum distance, then it runs away.
                case 'orange':
                    const minDistance = 20;
                    if (Math.abs(pacmanX - ghost.x) < (2 * radius + minDistance * pacmanStep) && Math.abs(pacmanY - ghost.y) < (2 * radius + minDistance * pacmanStep)) {
                        // Run.
                        ghost.targetX = 0
                        ghost.targetY = containerHeight
                    } else {
                        // Follow.
                        ghost.targetX = pacmanX
                        ghost.targetY = pacmanY
                    }
                    break;
            
                default:
                    break;
            }

            return ghost
        }))
    }, [pacmanDirection, pacmanX, pacmanY])

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
            targetX: pacmanInitialX,
            targetY: pacmanInitialY,
        }, {
            id: Math.random(),
            personality: 'pink',
            x: Math.floor(Math.random() * containerWidth),
            y: Math.floor(Math.random() * containerHeight),
            targetX: pacmanInitialX,
            targetY: pacmanInitialY,
        }, {
            id: Math.random(),
            personality: 'cyan',
            x: Math.floor(Math.random() * containerWidth),
            y: Math.floor(Math.random() * containerHeight),
            targetX: pacmanInitialX,
            targetY: pacmanInitialY,
        }, {
            id: Math.random(),
            personality: 'orange',
            x: Math.floor(Math.random() * containerWidth),
            y: Math.floor(Math.random() * containerHeight),
            targetX: pacmanInitialX,
            targetY: pacmanInitialY,
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

    // Moves pacman.
    function movePacman(direction: string) {
        setPacmanDirection(direction)

        switch (direction) {
            case 'down':
                setPacmanY(y => (y + pacmanStep + radius <= containerHeight) ? y + pacmanStep : y);
                break;
            
            case 'up':
                setPacmanY(y => (y - pacmanStep - radius >= 0) ? y - pacmanStep : y);
                break;

            case 'left':
                setPacmanX(x => (x - pacmanStep - radius >= 0) ? x - pacmanStep : x);
                break;

            case 'right':
                setPacmanX(x => (x + pacmanStep + radius <= containerWidth) ? x + pacmanStep : x);
                break;
            
            // If it is invalid, ignore.
            default:
                break;
        }
    }
    
    return (
        <GameContext.Provider
            value={{
                containerWidth,
                containerHeight,
                radius,
                pacmanX,
                pacmanY,
                isPoweredUp,
                movePacman,
                ghosts,
                snacks,
                powerUps,
            }}
        >
            {children}
        </GameContext.Provider>
    )
}