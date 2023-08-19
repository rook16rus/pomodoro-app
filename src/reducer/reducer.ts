import { TInitialState, TAction } from "../types/types";

const initialState: TInitialState = {
    minutes: 5,
    seconds: 0,
    currentTime: 0,
    isRunning: false,
    isActive: false,
    status: "action",
    cycleCount: 0
}

const reducer = (state = initialState, action: TAction): TInitialState => {
    switch (action.type) {
        case "SET_SECONDS":
            return {
                ...state,
                seconds: action.payload
            }
        case "SET_MINUTES":
            return {
                ...state,
                minutes: action.payload
            }
        case "SET_CURRENT_TIME":
            return {
                ...state,
                currentTime: action.payload
            }
        case "TOGGLE_ACTIVE":
            return {
                ...state,
                isActive: action.payload
            }
        case "TOGGLE_RUNNING":
            return {
                ...state,
                isRunning: action.payload
            }
        case "SET_STATUS":
            return {
                ...state,
                status: action.payload
            }
        case "SET_CYCLE_COUNT":
            return {
                ...state,
                cycleCount: action.payload
            }
        default:
            return state
    }
}


export default reducer;