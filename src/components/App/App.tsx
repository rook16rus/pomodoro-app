import React from 'react';
import { useState, useRef, useEffect } from "react";
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
    let totalSeconds = !isRunningTimer ? minutes * 60 + seconds : currentTime;

    useEffect(() => {
        clearInterval(intervalRef.current as NodeJS.Timeout);

        console.log(1)
        if (isActive) {
            intervalRef.current = setInterval(() => {
                totalSeconds--;

                const seconds = totalSeconds % 60;
                const minutes = Math.floor(totalSeconds / 60);

                if (totalSeconds < 0) {
                    switch (status) {
                        case "action":
                            if (cycleCount === 3) {
                                setMinutes(10);
                                setSeconds(0);
                                totalSeconds = 10 * 60;
                                setStatus("longBreak");
                            } else {
                                setMinutes(5);
                                setSeconds(0);
                                totalSeconds = 5 * 60;
                                setStatus("break");
                            }
                            setCycleCount(count => count + 1);
                            break;
                        case "break":
                            setStatus("action");
                            setMinutes(25);
                            setSeconds(0);
                            totalSeconds = 25 * 60;
                            break;
                        case "longBreak":
                            setStatus("action");
                            setMinutes(25);
                            setSeconds(0);
                            totalSeconds = 25 * 60;
                            setCycleCount(0);
                            break
                    }
                } else {
                    setSeconds(seconds);
                    setMinutes(minutes)
                }

                setCurrentTime(totalSeconds);
            }, 1000);
            setIsRunningTimer(true);
        }
    }, [isActive, status])

    const onTogglePlay = (): void => {
        setIsActive(isActive => !isActive);
    }

    const onNext = (): void => {
        switch (status) {
            case "action":
                if (cycleCount === 3) {
                    setMinutes(10);
                    setSeconds(0);
                    totalSeconds = 10 * 60;
                    setStatus("longBreak");
                } else {
                    setMinutes(5);
                    setSeconds(0);
                    totalSeconds = 5 * 60;
                    setStatus("break");
                }
                setCycleCount(count => count + 1);
                break;
            case "break":
                setStatus("action");
                setMinutes(25);
                setSeconds(0);
                totalSeconds = 25 * 60;
                break;
            case "longBreak":
                setStatus("action");
                setMinutes(25);
                setSeconds(0);
                totalSeconds = 25 * 60;
                setCycleCount(0);
                break
        }
        setCurrentTime(totalSeconds);
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
