import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";

import { setCurrentTime, setMinutes, setSeconds, toggleActiveTimer, toggleRunningTimer } from "../../actions/actions";
import { TInitialState } from "../../types/types";
import { switchStatus } from "../../functions/functions";

import styles from './PomodoroControls.module.scss'

import {ReactComponent as PauseIcon} from "./pause-icon.svg";
import {ReactComponent as PlayIcon} from "./play-icon.svg";

const PomodoroControls = () => {
    const minutes = useSelector((state: TInitialState) => state.minutes)
    const seconds = useSelector((state: TInitialState) => state.seconds)
    const currentTime = useSelector((state: TInitialState) => state.currentTime)
    const isRunning = useSelector((state: TInitialState) => state.isRunning);
    const isActive = useSelector((state: TInitialState) => state.isActive);
    const status = useSelector((state: TInitialState) => state.status);
    const cycleCount = useSelector((state: TInitialState) => state.cycleCount)

    const dispatch = useDispatch();

    let intervalRef = useRef<null | NodeJS.Timeout>(null);
    let totalSeconds = !isRunning ? minutes * 60 + seconds : currentTime;

    useEffect(() => {
        clearInterval(intervalRef.current as NodeJS.Timeout);

        if (isActive) {
            intervalRef.current = setInterval(() => {
                totalSeconds--;

                const seconds = totalSeconds % 60;
                const minutes = Math.floor(totalSeconds / 60);

                if (totalSeconds < 0) {
                    totalSeconds = switchStatus(status, cycleCount, totalSeconds, dispatch)
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
        totalSeconds = switchStatus(status, cycleCount, totalSeconds, dispatch)
        dispatch(setCurrentTime(totalSeconds))
    }

    const playButtonSvg = isActive ? <PauseIcon /> : <PlayIcon />

    const clazz = classNames(
        styles.controls,
        {[styles.break]: status === "break"},
        {[styles["long-break"]]: status === "longBreak"},
    )

    return (
        <div className={clazz}>
            <button className={styles.controls__play} onClick={onTogglePlay}>
                {playButtonSvg}
            </button>
            <button className={styles.controls__next} onClick={onNext}>
                <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_313_4)">
                        <path d="M27 5.89475V29.0526C27 29.3318 26.8946 29.5996 26.7071 29.797C26.5195 29.9944 26.2652 30.1053 26 30.1053C25.7348 30.1053 25.4804 29.9944 25.2929 29.797C25.1053 29.5996 25 29.3318 25 29.0526V19.3553L10.0375 28.9737C9.72391 29.1713 9.36541 29.2758 8.99997 29.2763C8.65855 29.2812 8.32205 29.1904 8.02497 29.0132C7.71275 28.8313 7.45281 28.5642 7.27246 28.2401C7.0921 27.916 6.99798 27.5467 6.99997 27.1711V7.77633C6.9995 7.40265 7.09352 7.03558 7.27239 6.7128C7.45125 6.39002 7.70851 6.12317 8.01774 5.93965C8.32698 5.75613 8.67704 5.66256 9.03199 5.66855C9.38694 5.67453 9.73398 5.77985 10.0375 5.9737L25 15.5921V5.89475C25 5.61557 25.1053 5.34783 25.2929 5.15043C25.4804 4.95302 25.7348 4.84212 26 4.84212C26.2652 4.84212 26.5195 4.95302 26.7071 5.15043C26.8946 5.34783 27 5.61557 27 5.89475Z" fill="white"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_313_4">
                            <rect width="34" height="34" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
            </button>
        </div>
    )
}

export default PomodoroControls