import classNames from "classnames";

import styles from './PomodoroCycles.module.scss'

type PomodoroCyclesProps = {
    cycleCount: number
}

const PomodoroCycles = ({cycleCount}: PomodoroCyclesProps) => {
    const dotsArray = Array(4).fill(0).map((item, index: number): React.ReactNode => {
        const clazz = classNames(styles.cycles__dote, {[styles.active]: cycleCount > index})

        return <div className={clazz}></div>
    })

    return (
        <div className={styles.cycles}>
            {dotsArray}
        </div>
    )
}

export default PomodoroCycles