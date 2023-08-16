import React from 'react';
import { useState, useRef } from "react";
import classNames from "classnames";

import PomodoroDisplay from "../PomodoroDisplay/PomodoroDisplay";
import PomodoroControls from "../PomodoroControls/PomodoroControls";
import PomodoroCycles from "../PomodoroCycles/PomodoroCycles";

import styles from './App.module.scss';

function App() {
    const [minutes, setMinutes] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(5);
    const [currentTime, setCurrentTime] = useState<number>(0);

    const [isRunningTimer, setIsRunningTimer] = useState(false);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [status, setStatus] = useState<string>("action");

    const [cycleCount, setCycleCount] = useState<number>(0);

    let intervalRef = useRef<null | NodeJS.Timeout>(null);

    const onTogglePlay = (): void => {
        let totalSeconds = !isRunningTimer ? minutes * 60 + seconds : currentTime;

        if (isActive) {
            clearInterval(intervalRef.current as NodeJS.Timeout)
        } else {
            intervalRef.current = setInterval(run, 1000)
        }

        function run() {
            totalSeconds--;

            if (totalSeconds < 0) {
                if (status === 'action') setCycleCount(count => count + 1);

                setMinutes(0);
                setSeconds(5);
                setStatus("break");
                totalSeconds = 5;

                clearInterval(intervalRef.current as NodeJS.Timeout)
                intervalRef.current = setInterval(run, 1000)
            } else {
                const seconds = totalSeconds % 60;
                const minutes = Math.floor(totalSeconds / 60);

                setSeconds(seconds);
                setMinutes(minutes)
            }

            setCurrentTime(totalSeconds);
        }

        setIsRunningTimer(true);
        setIsActive(isActive => !isActive);
    }


    const onNext = (): void => {

    }

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
            <PomodoroDisplay minutes={minutes} seconds={seconds} />
            <PomodoroControls onTogglePlay={onTogglePlay} onNext={onNext} isActive={isActive} status={status} />
            <PomodoroCycles cycleCount={cycleCount} />
            <span className={styles.pomodoro__status}>
                {statusText}
            </span>
        </div>
    );
}

export default App;
