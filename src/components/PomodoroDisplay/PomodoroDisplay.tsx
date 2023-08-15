import { convertDigit } from "../../functions/functions";

import styles from "./PomodoroDispaly.module.scss"

type PomodoroDisplayProps = {
    minutes: number,
    seconds: number
}

const PomodoroDisplay = ({minutes, seconds}: PomodoroDisplayProps) => {
    return (
        <div className={styles.display}>
            <span className={styles.display__minutes}>{convertDigit(minutes)}</span>
            <span className={styles.display__dotes}>:</span>
            <span className={styles.display__minutes}>{convertDigit(seconds)}</span>
        </div>
    )
}

export default PomodoroDisplay