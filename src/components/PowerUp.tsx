import styles from '../styles/Food.module.css'
import { Food, powerUpRadius } from '../constants/food'

type Props = {
    powerUp: Food
}

export function PowerUp({powerUp}: Props) {
    return (
        <circle className={styles.food} cx={powerUp.x} cy={powerUp.y} r={powerUpRadius} />
    )
}
