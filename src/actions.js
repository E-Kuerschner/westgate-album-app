import API from "./api";
import wait from "./wait"

export const WINDOW_RESIZED = "WINDOW_RESIZED";

export const DAY_SELECTED = "DAY_SELECTED";

export const FETCH_DAYS_REQUESTED = "FETCH_DAYS_REQUESTED";
export const FETCH_DAYS_SUCCEEDED = "FETCH_DAYS_SUCCEEDED";

export const FETCH_DAILY_CONTENT_REQUESTED = "FETCH_DAILY_CONTENT_REQUESTED";
export const FETCH_DAILY_CONTENT_SUCCEEDED = "FETCH_DAILY_CONTENT_SUCCEEDED";
export const API_ERROR = "API_ERROR";

export function fetchDailyContentRequest(dayNumber, options = {}) {
    const promises = [API.getDailyContent(dayNumber)]
    if (options.artificialWait) promises.push(wait(options.artificialWait))
    return dispatch => {
        dispatch({
             type: FETCH_DAILY_CONTENT_REQUESTED,
             payload: { dayNumber }
        });
        return Promise.all(promises)
            .then(
                ([content]) => {
                    return dispatch({
                        type: FETCH_DAILY_CONTENT_SUCCEEDED,
                        payload: content
                    });
                },
                err => {
                    dispatch({
                        type: API_ERROR,
                        payload: { message: err.message, dayNumber }
                    });
                }
            );
    };
}

export function fetchDaysRequest(options = {}) {
    const promises = [API.getDays()]
    if (options.artificialWait) promises.push(wait(options.artificialWait))
    return dispatch => {
        dispatch({ type: FETCH_DAYS_REQUESTED });
        return Promise.all(promises)
            .then(
                ([res]) => {
                    return dispatch({
                        type: FETCH_DAYS_SUCCEEDED,
                        payload: res
                    });
                },
                err => {
                    dispatch({
                        type: API_ERROR,
                        payload: { message: err.message }
                    });
                }
            );
    }
}

export function daySelected(dayNumber) {
    return {
        type: DAY_SELECTED,
        payload: { dayNumber }
    };
}

export function windowResized(width, height) {
    return {
        type: WINDOW_RESIZED,
        payload: { width, height }
    };
}