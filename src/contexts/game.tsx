import {ReactNode, useEffect, useState, Dispatch, SetStateAction} from 'react'
import {createContext} from 'react'

type GameContextType = {
    containerWidth: number
    containerHeight: number

    pacmanX: number
    pacmanY: number
    setPacmanX: Dispatch<SetStateAction<number>>
    setPacmanY: Dispatch<SetStateAction<number>>
}

export const GameContext = createContext({} as GameContextType)

type GameContextProviderProps = {
    children: ReactNode
}

export function GameProvider({children}: GameContextProviderProps) {
    const containerWidth = 1200
    const containerHeight = 600

    const [pacmanX, setPacmanX] = useState(625)
    const [pacmanY, setPacmanY] = useState(325)
    
    return (
        <GameContext.Provider
            value={{
                containerWidth,
                containerHeight,
                pacmanX,
                setPacmanX,
                pacmanY,
                setPacmanY,
            }}
        >
            {children}
        </GameContext.Provider>
    )
}