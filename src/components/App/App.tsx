import React from 'react';
import { useState } from "react";

import PomodoroDisplay from "../PomodoroDisplay/PomodoroDisplay";
import PomodoroControls from "../PomodoroControls/PomodoroControls";
import PomodoroCycles from "../PomodoroCycles/PomodoroCycles";

import styles from './App.module.scss';

function App() {
    const [minutes, setMinutes] = useState<number>(25);
    const [seconds, setSeconds] = useState<number>(0);
    const [isActive, setIsActive] = useState(false);

    const [statusText, setStatusText] = useState<string>("Focus Time");

    const [cycleCount, setCycleCount] = useState(0);

    const onTogglePlay = (): void => {

    }

    const onNext = (): void => {

    }


    return (
        <div className={styles.pomodoro}>
            <PomodoroDisplay minutes={minutes} seconds={seconds} />
            <PomodoroControls onTogglePlay={onTogglePlay} onNext={onNext} isActive={isActive} />
            <PomodoroCycles cycleCount={cycleCount} />
            <span className={styles.pomodoro__status}>
                {statusText}
            </span>
        </div>
    );
}

export default App;
