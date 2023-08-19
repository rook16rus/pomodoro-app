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

type setCurrentTime = {
    type: "SET_CURRENT_TIME",
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

type setStatusAction = {
    type: "SET_STATUS",
    payload: string
}

type setCycleCount = {
    type: "SET_CYCLE_COUNT",
    payload: number
}

export type TimerActionTypes = setSecondsAction | setMinutesAction | toggleActiveTimerAction | toggleRunningTimerAction | setStatusAction | setCycleCount | setCurrentTime