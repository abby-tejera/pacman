import styles from '../styles/Food.module.css'
import { Food, snackRadius } from '../types/food'

type Props = {
    snack: Food
}

export function Snack({snack}: Props) {
    return (
        <circle className={styles.food} cx={snack.x} cy={snack.y} r={snackRadius} />
    )
}
