import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";

import { setCurrentTime, setCycleCount, setMinutes, setSeconds, setStatus, toggleActiveTimer, toggleRunningTimer } from "../../actions/actions";
import { TInitialState } from "../../types/types";

import styles from './PomodoroControls.module.scss'

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

    const playButtonSvg =
        isActive ?
        (
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_313_3)">
                    <path d="M24 2.9474V24C24 24.5584 23.7893 25.0939 23.4142 25.4887C23.0391 25.8835 22.5304 26.1053 22 26.1053H17.5C16.9696 26.1053 16.4609 25.8835 16.0858 25.4887C15.7107 25.0939 15.5 24.5584 15.5 24V2.9474C15.5 2.38905 15.7107 1.85356 16.0858 1.45875C16.4609 1.06394 16.9696 0.842133 17.5 0.842133H22C22.5304 0.842133 23.0391 1.06394 23.4142 1.45875C23.7893 1.85356 24 2.38905 24 2.9474ZM8.5 0.842133H4C3.46957 0.842133 2.96086 1.06394 2.58579 1.45875C2.21071 1.85356 2 2.38905 2 2.9474V24C2 24.5584 2.21071 25.0939 2.58579 25.4887C2.96086 25.8835 3.46957 26.1053 4 26.1053H8.5C9.03043 26.1053 9.53914 25.8835 9.91421 25.4887C10.2893 25.0939 10.5 24.5584 10.5 24V2.9474C10.5 2.38905 10.2893 1.85356 9.91421 1.45875C9.53914 1.06394 9.03043 0.842133 8.5 0.842133Z" fill="currentColor"/>
                </g>
                <defs>
                    <clipPath id="clip0_313_3">
                        <rect width="26" height="26" fill="white"/>
                    </clipPath>
                </defs>
            </svg>

        ):
        (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_313_2)">
                    <path d="M27.0375 12.671L9.03751 1.10524C8.73768 0.905239 8.39141 0.795783 8.03651 0.788821C7.68161 0.78186 7.33171 0.877662 7.02501 1.06577C6.71377 1.24551 6.45432 1.51024 6.27394 1.8321C6.09356 2.15395 5.99893 2.52103 6.00001 2.89472V26.0526C5.99893 26.4263 6.09356 26.7934 6.27394 27.1152C6.45432 27.4371 6.71377 27.7018 7.02501 27.8816C7.33171 28.0697 7.68161 28.1655 8.03651 28.1585C8.39141 28.1515 8.73768 28.0421 9.03751 27.8421L27.0375 16.2763C27.3325 16.0889 27.5766 15.8245 27.746 15.5087C27.9154 15.1929 28.0044 14.8364 28.0044 14.4737C28.0044 14.111 27.9154 13.7544 27.746 13.4386C27.5766 13.1228 27.3325 12.8584 27.0375 12.671Z" fill="currentColor"/>
                </g>
                <defs>
                    <clipPath id="clip0_313_2">
                        <rect width="28" height="28" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
        )

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