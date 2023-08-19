import classNames from "classnames";
import {useSelector} from "react-redux";

import {TInitialState} from "../../types/types";

import styles from './PomodoroCycles.module.scss'

const PomodoroCycles = () => {
    const cycleCount = useSelector((state: TInitialState) => state.cycleCount)

    const dotsArray = Array(4).fill(0).map((item, index: number): React.ReactNode => {
        const clazz = classNames(styles.cycles__dote, {[styles.active]: cycleCount > index})

        return <div key={index} className={clazz}></div>
    })

    return (
        <div className={styles.cycles}>
            {dotsArray}
        </div>
    )
}

export default PomodoroCycles