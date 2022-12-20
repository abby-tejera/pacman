import { gridSize } from "./maze"
import { pacmanInitialX, pacmanInitialY } from "./pacman"
import "../../public/ghost_one/g1D1.png"

export const ghostStep = 2 

export type Ghost = {
    id: number
    x: number
    y: number
    personality: string // red, pink, cyan, orange, or purple
    targetX: number
    targetY: number
    image: string
}

export const scatterGhostPositions = [
    {x: 26 * gridSize + gridSize / 2, y: 1 * gridSize + gridSize / 2}, // red (upper right corner)
    {x: 1 * gridSize + gridSize / 2, y: 1 * gridSize + gridSize / 2}, // pink (upper left corner)
    {x: 26 * gridSize + gridSize / 2, y: 29 * gridSize + gridSize / 2}, // cyan (lower right corner)
    {x: 1 * gridSize + gridSize / 2, y: 29 * gridSize + gridSize / 2}, // orange (lower left corner)
    {x: 13 * gridSize + gridSize / 2, y: 29 * gridSize + gridSize / 2}, //purple1
    {x: 1 * gridSize + gridSize / 2, y: 14 * gridSize + gridSize / 2}, //purple2
]

export const initialGhosts: Ghost[] = [{
    id: Math.random(),
    personality: 'red',
    x: scatterGhostPositions[0].x,
    y: scatterGhostPositions[0].y,
    targetX: pacmanInitialX,
    targetY: pacmanInitialY,
    image: "/../../public/ghost_one/g1D1.png",
}, {
    id: Math.random(),
    personality: 'pink',
    x: scatterGhostPositions[1].x,
    y: scatterGhostPositions[1].y,
    targetX: pacmanInitialX,
    targetY: pacmanInitialY,
    image: "/../../public/ghost_one/g1D1.png",
}, {
    id: Math.random(),
    personality: 'cyan',
    x: scatterGhostPositions[2].x,
    y: scatterGhostPositions[2].y,
    targetX: pacmanInitialX,
    targetY: pacmanInitialY,
    image: "/../../public/ghost_one/g1D1.png",
}, {
    id: Math.random(),
    personality: 'orange',
    x: scatterGhostPositions[3].x,
    y: scatterGhostPositions[3].y,
    targetX: pacmanInitialX,
    targetY: pacmanInitialY,
    image: "/../../public/ghost_one/g1D1.png",
}, {
    id: Math.random(),
    personality: 'purpleOne',
    x: scatterGhostPositions[4].x,
    y: scatterGhostPositions[4].y,
    targetX: pacmanInitialX,
    targetY: pacmanInitialY,
    image: "/../../public/g1D1.PNG",
}, {
    id: Math.random(),
    personality: 'purpleTwo',
    x: scatterGhostPositions[5].x,
    y: scatterGhostPositions[5].y,
    targetX: pacmanInitialX,
    targetY: pacmanInitialY,
    image: "/../../public/g1D1.PNG",
}]

