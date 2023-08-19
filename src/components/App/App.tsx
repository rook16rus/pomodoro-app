import React from 'react';
import { useSelector } from "react-redux";
import classNames from "classnames";

import { TInitialState } from "../../types/types";

import PomodoroDisplay from "../PomodoroDisplay/PomodoroDisplay";
import PomodoroControls from "../PomodoroControls/PomodoroControls";
import PomodoroCycles from "../PomodoroCycles/PomodoroCycles";

import styles from './App.module.scss';

function App() {
    const status = useSelector((state: TInitialState) => state.status)

    const statusText: string =  status === "action" ?
                        "Focus Time" :
                        status === "break" ?
                            "Short break":
                            "Long break"

    const clazz = classNames(
        styles.pomodoro,
        {[styles.break]: status === "break"},
        {[styles["long-break"]]: status === "longBreak"},
    )

    return (
        <div className={clazz}>
            <PomodoroDisplay />
            <PomodoroControls />
            <PomodoroCycles />
            <span className={styles.pomodoro__status}>
                {statusText}
            </span>
        </div>
    );
}

export default App;
