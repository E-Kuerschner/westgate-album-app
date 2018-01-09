import { getDayContent, getCountdownTimes } from "./api";

export const WINDOW_RESIZED = "WINDOW_RESIZED";

export const FETCH_COUNTDOWN_TIMES_REQUESTED = "FETCH_COUNTDOWN_TIMES_REQUESTED";
export const FETCH_COUNTDOWN_TIMES_SUCCEEDED = "FETCH_COUNTDOWN_TIMES_SUCCEEDED";

export const FETCH_DAILY_CONTENT_REQUESTED = "FETCH_DAILY_CONTENT_REQUESTED";
export const FETCH_DAILY_CONTENT_SUCCEEDED = "FETCH_DAILY_CONTENT_SUCCEEDED";
export const API_ERROR = "API_ERROR";

export function fetchDailyContentRequest(dayNumber) {
    return dispatch => {
        dispatch({
             type: FETCH_DAILY_CONTENT_REQUESTED,
             payload: { dayNumber }
        });
        getDayContent(dayNumber)
            .then(link => {
                dispatch({
                    type: FETCH_DAILY_CONTENT_SUCCEEDED,
                    payload: { link, dayNumber }
                });
            })
            .catch(err => {
                dispatch({
                    type: API_ERROR,
                    payload: { message: err.message, dayNumber }
                });
            });
    };
}

export function fetchCountdownTimesRequest() {
    return dispatch => {
        dispatch({ type: FETCH_COUNTDOWN_TIMES_REQUESTED });
        getCountdownTimes()
            .then(res => {
                dispatch({
                    type: FETCH_COUNTDOWN_TIMES_SUCCEEDED,
                    payload: { countdownTimes: res }
                });
            })
            .catch(err => {
                dispatch({
                    type: API_ERROR,
                    payload: { message: err.message }
                });
            });
    }
}

export function windowResized(width, height) {
    return {
        type: "RESIZE",
        payload: { width, height }
    };
}