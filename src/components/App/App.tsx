import React from 'react';
import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { TInitialState } from "../../types/types";
import {
    setCurrentTime,
    setCycleCount,
    setMinutes,
    setSeconds,
    setStatus, toggleActiveTimer,
    toggleRunningTimer
} from "../../actions/actions";

import PomodoroDisplay from "../PomodoroDisplay/PomodoroDisplay";
import PomodoroControls from "../PomodoroControls/PomodoroControls";
import PomodoroCycles from "../PomodoroCycles/PomodoroCycles";

import styles from './App.module.scss';

function App() {
    const minutes = useSelector((state: TInitialState) => state.minutes)
    const seconds = useSelector((state: TInitialState) => state.seconds)
    const currentTime = useSelector((state: TInitialState) => state.currentTime)
    const cycleCount = useSelector((state: TInitialState) => state.cycleCount)

    const isRunning = useSelector((state: TInitialState) => state.isRunning)
    const isActive = useSelector((state: TInitialState) => state.isActive)

    const status = useSelector((state: TInitialState) => state.status)

    let intervalRef = useRef<null | NodeJS.Timeout>(null);
    let totalSeconds = !isRunning ? minutes * 60 + seconds : currentTime;

    const dispatch = useDispatch();

    useEffect(() => {
        clearInterval(intervalRef.current as NodeJS.Timeout);

        if (isActive) {
            intervalRef.current = setInterval(() => {
                totalSeconds--;

                const seconds = totalSeconds % 60;
                const minutes = Math.floor(totalSeconds / 60);

                if (totalSeconds < 0) {
                    switch (status) {
                        case "action":
                            if (cycleCount === 3) {
                                dispatch(setMinutes(10));
                                dispatch(setSeconds(0));
                                totalSeconds = 10 * 60;
                                dispatch(setStatus("longBreak"))
                            } else {
                                dispatch(setMinutes(5));
                                dispatch(setSeconds(0));
                                totalSeconds = 5 * 60;
                                dispatch(setStatus("break"))
                            }
                            dispatch(setCycleCount(cycleCount + 1))
                            break;
                        case "break":
                            dispatch(setStatus("action"))
                            dispatch(setMinutes(25));
                            dispatch(setSeconds(0));
                            totalSeconds = 25 * 60;
                            break;
                        case "longBreak":
                            dispatch(setStatus("action"))
                            dispatch(setMinutes(25));
                            dispatch(setSeconds(0));
                            totalSeconds = 25 * 60;
                            dispatch(setCycleCount(0))
                            break
                    }
                } else {
                    dispatch(setMinutes(minutes));
                    dispatch(setSeconds(seconds));
                }

                dispatch(setCurrentTime(totalSeconds))
            }, 1000);
            dispatch(toggleRunningTimer(true));
        }
    }, [isActive, status])

    const onTogglePlay = (): void => {
        dispatch(toggleActiveTimer(!isActive))
    }

    const onNext = (): void => {
        switch (status) {
            case "action":
                if (cycleCount === 3) {
                    dispatch(setMinutes(10));
                    dispatch(setSeconds(0));
                    totalSeconds = 10 * 60;
                    dispatch(setStatus("longBreak"))
                } else {
                    dispatch(setMinutes(5));
                    dispatch(setSeconds(0));
                    totalSeconds = 5 * 60;
                    dispatch(setStatus("break"))
                }
                dispatch(setCycleCount(cycleCount + 1))
                break;
            case "break":
                dispatch(setStatus("action"))
                dispatch(setMinutes(25));
                dispatch(setSeconds(0));
                totalSeconds = 25 * 60;
                break;
            case "longBreak":
                dispatch(setStatus("action"))
                dispatch(setMinutes(25));
                dispatch(setSeconds(0));
                totalSeconds = 25 * 60;
                dispatch(setCycleCount(0))
                break
        }
        dispatch(setCurrentTime(totalSeconds))
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
