import { setCycleCount, setMinutes, setSeconds, setStatus } from "../actions/actions";

export const convertDigit = (digit: number): string | number => {
    return digit > 9 ? digit : '0' + digit
}

export const switchStatus = (status: string, cycleCount: number, totalSeconds: number, dispatch: any) => {
    console.log(1)
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

    return totalSeconds
}