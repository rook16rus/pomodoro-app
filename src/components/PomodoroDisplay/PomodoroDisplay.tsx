import styles from "./PomodoroDispaly.module.scss"

const PomodoroDisplay = () => {
    return (
        <div className={styles.display}>
            <span className={styles.display__minutes}>25</span>
            <span className={styles.display__dotes}>:</span>
            <span className={styles.display__minutes}>00</span>
        </div>
    )
}

export default PomodoroDisplay