export type TInitialState = {
    minutes: number,
    seconds: number,
    currentTime: number,
    isRunning: boolean,
    isActive: boolean,
    cycleCount: number,
    status: string
}

export type TAction = {
    type: string,
    payload: any
}

type setSecondsAction = {
    type: "SET_SECONDS",
    payload: number
}

type setMinutesAction = {
    type: "SET_MINUTES",
    payload: number
}

type toggleActiveTimerAction = {
    type: "TOGGLE_ACTIVE",
    payload: boolean
}

type toggleRunningTimerAction = {
    type: "TOGGLE_RUNNING",
    payload: boolean
}

export type TimerActionTypes = setSecondsAction | setMinutesAction | toggleActiveTimerAction | toggleRunningTimerAction