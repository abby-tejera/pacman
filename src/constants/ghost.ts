import { gridSize } from "./maze"
import { pacmanInitialX, pacmanInitialY } from "./pacman"

export const ghostStep = 2 

export type Ghost = {
    id: number
    x: number
    y: number
    personality: string // red, pink, cyan, or orange
    targetX: number
    targetY: number
}

export const scatterGhostPositions = [
    {x: 26 * gridSize + gridSize / 2, y: 1 * gridSize + gridSize / 2}, // red (upper right corner)
    {x: 1 * gridSize + gridSize / 2, y: 1 * gridSize + gridSize / 2}, // pink (upper left corner)
    {x: 26 * gridSize + gridSize / 2, y: 29 * gridSize + gridSize / 2}, // cyan (lower right corner)
    {x: 1 * gridSize + gridSize / 2, y: 29 * gridSize + gridSize / 2}, // orange (lower left corner)
]

export const initialGhosts: Ghost[] = [{
    id: Math.random(),
    personality: 'red',
    x: scatterGhostPositions[0].x,
    y: scatterGhostPositions[0].y,
    targetX: pacmanInitialX,
    targetY: pacmanInitialY,
}, {
    id: Math.random(),
    personality: 'pink',
    x: scatterGhostPositions[1].x,
    y: scatterGhostPositions[1].y,
    targetX: pacmanInitialX,
    targetY: pacmanInitialY,
}, {
    id: Math.random(),
    personality: 'cyan',
    x: scatterGhostPositions[2].x,
    y: scatterGhostPositions[2].y,
    targetX: pacmanInitialX,
    targetY: pacmanInitialY,
}, {
    id: Math.random(),
    personality: 'orange',
    x: scatterGhostPositions[3].x,
    y: scatterGhostPositions[3].y,
    targetX: pacmanInitialX,
    targetY: pacmanInitialY,
}]
