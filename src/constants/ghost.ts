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

export const initialGhosts: Ghost[] = [{
    id: Math.random(),
    personality: 'red',
    x: 13 * gridSize,
    y: 15 * gridSize,
    targetX: pacmanInitialX,
    targetY: pacmanInitialY,
}, {
    id: Math.random(),
    personality: 'pink',
    x: 14 * gridSize,
    y: 15 * gridSize,
    targetX: pacmanInitialX,
    targetY: pacmanInitialY,
}, {
    id: Math.random(),
    personality: 'cyan',
    x: 15 * gridSize,
    y: 15 * gridSize,
    targetX: pacmanInitialX,
    targetY: pacmanInitialY,
}, {
    id: Math.random(),
    personality: 'orange',
    x: 16 * gridSize,
    y: 15 * gridSize,
    targetX: pacmanInitialX,
    targetY: pacmanInitialY,
}]
