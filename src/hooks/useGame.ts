import {useContext} from 'react'

import {GameContext} from '../contexts/game'

export function useGame() {
	const game = useContext(GameContext)

	return game
}
