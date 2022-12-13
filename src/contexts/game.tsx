import {ReactNode, useEffect, useState, useCallback} from 'react'
import {createContext} from 'react'

import { Ghost, initialGhosts, ghostStep } from '../constants/ghost'
import { Food, snackRadius, powerUpProbability } from '../constants/food'
import { containerHeight, containerWidth, gridSize, entityRadius, mazeDistribution } from '../constants/maze'
import { pacmanInitialX, pacmanInitialY, pacmanStep } from '../constants/pacman'
import { isAllowedEntityPosition } from '../utils/isAllowedEntityPosition'

type GameContextType = {
    containerWidth: number
    containerHeight: number

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
    const [pacmanX, setPacmanX] = useState(pacmanInitialX)
    const [pacmanY, setPacmanY] = useState(pacmanInitialY)
    const [pacmanDirection, setPacmanDirection] = useState('')
    const [isPoweredUp, setIsPoweredUp] = useState(false)

    const [ghosts, setGhosts] = useState<Ghost[]>(initialGhosts)

    const [snacks, setSnacks] = useState<Food[]>([])
    const [powerUps, setPowerUps] = useState<Food[]>([])

    const [gameHasStarted, setGameHasStarted] = useState(false)

    // Adds snacks and power-ups to the game.
    const generateFood = useCallback(() => {
        const snacks: Food[] = []
        const powerUps: Food[] = []

        for (let i = 0; i < containerWidth / gridSize; i++) {
            for (let j = 0; j < containerHeight / gridSize; j++) {
                if (mazeDistribution[j][i] != 2) {
                    continue
                }

                const food = {
                    id: Math.random(),
                    x: i * gridSize + gridSize / 2,
                    y: j * gridSize + gridSize / 2,
                }

                if (Math.random() < powerUpProbability) {
                    powerUps.push(food)
                } else {
                    snacks.push(food)
                }
            }
        }

        setSnacks(snacks)
        setPowerUps(powerUps)
    }, [])

    // Resets the game.
    const reset = useCallback(() => {
        setPacmanX(pacmanInitialX)
        setPacmanY(pacmanInitialY)

        setGhosts(initialGhosts)
        generateFood()

        setGameHasStarted(true)
    }, [generateFood])

    // Handle when the player loses.
    const gameOver = useCallback(() => {
        setGameHasStarted(false)

        alert("You lost!")
        reset()
    }, [reset])

    // Start game.
    useEffect(function start() {
        reset()
    }, [reset])

    // Check if ghosts are eating pacman (if the user lost).
    useEffect(function checkIfLost() {
        // Square that represents Pacman's position.
        const left = pacmanX - entityRadius;
        const right = pacmanX + entityRadius;
        const top = pacmanY - entityRadius;
        const bottom = pacmanY + entityRadius;

        for (let ghost of ghosts) {
            const ghostLeft = ghost.x - entityRadius;
            const ghostRight = ghost.x + entityRadius;
            const ghostTop = ghost.y - entityRadius;
            const ghostBottom = ghost.y + entityRadius;

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
    }, [pacmanX, pacmanY, ghosts, isPoweredUp, gameOver])

    // Check if pacman is eating food.
    useEffect(function checkIfEaten() {
        // Square that represents Pacman's position.
        const left = pacmanX - entityRadius;
        const right = pacmanX + entityRadius;
        const top = pacmanY - entityRadius;
        const bottom = pacmanY + entityRadius;

        // Remove eaten snacks.
        setSnacks(snacks => snacks.filter(snack => {
            const snackLeft = snack.x - snackRadius;
            const snackRight = snack.x + snackRadius;
            const snackTop = snack.y - snackRadius;
            const snackBottom = snack.y + snackRadius;

            // True if not eaten, and false if eaten.
            return (snackRight < left || snackLeft > right) || (snackBottom < top || snackTop > bottom)
        }))

        // Remove eaten power-ups.
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

    // Moves ghosts in the direction of their targets.
    useEffect(function moveGhosts() {
        const timeInterval = 0.1 // in seconds

        const interval = setInterval(() => {
            setGhosts(ghosts => ghosts.map(ghost => {
                // Choose new x value. Make sure that we don't go over the walls.
                if (ghost.x < ghost.targetX && isAllowedEntityPosition(ghost.x + ghostStep, ghost.y)) {
                    ghost.x = ghost.x + ghostStep
                } else if (ghost.x > ghost.targetX && isAllowedEntityPosition(ghost.x - ghostStep, ghost.y)) {
                    ghost.x = ghost.x - ghostStep
                }
    
                // Choose new y value. Make sure that we don't go over the walls.
                if (ghost.y < ghost.targetY && isAllowedEntityPosition(ghost.x, ghost.y + ghostStep)) {
                    ghost.y = ghost.y + ghostStep
                } else if (ghost.y > ghost.targetY && isAllowedEntityPosition(ghost.x, ghost.y - ghostStep)) {
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
                            ghost.targetX = pacmanX + (2 * entityRadius + tilesAhead * pacmanStep)
                            ghost.targetY = pacmanY
                            break;

                        case 'left':
                            ghost.targetX = pacmanX - (2 * entityRadius + tilesAhead * pacmanStep)
                            ghost.targetY = pacmanY
                            break;
                        
                        case 'up':
                            ghost.targetX = pacmanX
                            ghost.targetY = pacmanY - (2 * entityRadius + tilesAhead * pacmanStep)
                            break;
                        
                        case 'down':
                            ghost.targetX = pacmanX
                            ghost.targetY = pacmanY + (2 * entityRadius + tilesAhead * pacmanStep)
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
                        ? pacmanX + (2 * entityRadius + frontAhead * pacmanStep)
                        : (pacmanDirection == 'left')
                            ? pacmanX - (2 * entityRadius + frontAhead * pacmanStep)
                            : pacmanX
                    const pacmanFrontY = (pacmanDirection == 'down')
                        ? pacmanY + (2 * entityRadius + frontAhead * pacmanStep)
                        : (pacmanDirection == 'up')
                            ? pacmanY - (2 * entityRadius + frontAhead * pacmanStep)
                            : pacmanY
                    
                    const vectorX = pacmanFrontX - redGhost.x
                    const vectorY = pacmanFrontY - redGhost.y

                    ghost.targetX = redGhost.x + 2 * vectorX
                    ghost.targetY = redGhost.y + 2 * vectorY
                    break;
                
                // Follows pacman until they are at a minimum distance, then it runs away.
                case 'orange':
                    const minDistance = 20;
                    if (Math.abs(pacmanX - ghost.x) < (2 * entityRadius + minDistance * pacmanStep) && Math.abs(pacmanY - ghost.y) < (2 * entityRadius + minDistance * pacmanStep)) {
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

    // Handle when the player wins.
    useEffect(function victory() {
        if (gameHasStarted && snacks.length == 0) {
            setGameHasStarted(false)

            alert("You won!!!!!")
            reset()
        }
    }, [gameHasStarted, reset, snacks])

    // Moves pacman.
    function movePacman(direction: string) {
        setPacmanDirection(direction)

        switch (direction) {
            case 'down':
                setPacmanY(y => isAllowedEntityPosition(pacmanX, y + pacmanStep) ? y + pacmanStep : y);
                break;
            
            case 'up':
                setPacmanY(y => isAllowedEntityPosition(pacmanX, y - pacmanStep) ? y - pacmanStep : y);
                break;

            case 'left':
                setPacmanX(x => isAllowedEntityPosition(x - pacmanStep, pacmanY) ? x - pacmanStep : x);
                break;

            case 'right':
                setPacmanX(x => isAllowedEntityPosition(x + pacmanStep, pacmanY) ? x + pacmanStep : x);
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