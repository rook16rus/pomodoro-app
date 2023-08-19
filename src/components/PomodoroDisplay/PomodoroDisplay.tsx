import { useSelector } from "react-redux";

import { convertDigit } from "../../functions/functions";
import { TInitialState } from "../../types/types";

import styles from "./PomodoroDispaly.module.scss"

const PomodoroDisplay = () => {
    const minutes = useSelector((state: TInitialState) => state.minutes)
    const seconds = useSelector((state: TInitialState) => state.seconds)

    return (
        <div className={styles.display}>
            <span className={styles.display__minutes}>{convertDigit(minutes)}</span>
            <span className={styles.display__dotes}>:</span>
            <span className={styles.display__minutes}>{convertDigit(seconds)}</span>
        </div>
    )
}

export default PomodoroDisplay