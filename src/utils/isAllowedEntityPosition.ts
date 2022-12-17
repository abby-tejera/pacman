import { containerHeight, containerWidth, entityRadius, gridSize, mazeDistribution } from "../constants/maze"

function isAllowedPoint(pointX: number, pointY: number) {
    // Out of the board.
    if (pointX < 0 || pointX > containerWidth || pointY < 0 || pointY > containerHeight) {
        return false
    }

    const i = Math.floor(pointY / gridSize)
    const j = Math.floor(pointX / gridSize)
    
    return mazeDistribution[i][j] != 1
}

// Checks if an entity (pacman or ghost) is allowed to go the given position.
export function isAllowedEntityPosition(centerX: number, centerY: number) {
    let result = true

    for (let pointX = centerX - entityRadius; pointX <= centerX + entityRadius; pointX++) {
        for (let pointY = centerY - entityRadius; pointY <= centerY + entityRadius; pointY++) {
            result = result && isAllowedPoint(pointX, pointY)
        }
    }

    return result
}

export function calc_i(centerX: number, centerY: number) {
    let result = 0

    for (let pointX = centerX - entityRadius; pointX <= centerX + entityRadius; pointX++) {
        for (let pointY = centerY - entityRadius; pointY <= centerY + entityRadius; pointY++) {
            result = Math.floor(pointY / gridSize)
        }
    }

    return result
}
export function calc_j(centerX: number, centerY: number) {
    let result = 0

    for (let pointX = centerX - entityRadius; pointX <= centerX + entityRadius; pointX++) {
        for (let pointY = centerY - entityRadius; pointY <= centerY + entityRadius; pointY++) {
            result = Math.floor(pointX / gridSize)
        }
    }

    return result
}