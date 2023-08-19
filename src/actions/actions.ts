import { TimerActionTypes } from "../types/types";

export const setSeconds = (number: number): TimerActionTypes => {
    return {
        type: "SET_SECONDS",
        payload: number
    }
}

export const setMinutes = (number: number): TimerActionTypes => {
    return {
        type: "SET_MINUTES",
        payload: number
    }
}

export const setCurrentTime = (number: number): TimerActionTypes => {
    return {
        type: "SET_CURRENT_TIME",
        payload: number
    }
}

export const toggleActiveTimer = (isActive: boolean): TimerActionTypes => {
    return {
        type: "TOGGLE_ACTIVE",
        payload: isActive
    }
}

export const toggleRunningTimer = (isRunning: boolean): TimerActionTypes => {
    return {
        type: "TOGGLE_RUNNING",
        payload: isRunning
    }
}

export const setStatus = (status: string): TimerActionTypes => {
    return {
        type: "SET_STATUS",
        payload: status
    }
}

export const setCycleCount = (count: number): TimerActionTypes => {
    return {
        type: "SET_CYCLE_COUNT",
        payload: count
    }
}