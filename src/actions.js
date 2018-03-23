import API from "./api";

export const WINDOW_RESIZED = "WINDOW_RESIZED";

export const FETCH_DAYS_REQUESTED = "FETCH_DAYS_REQUESTED";
export const FETCH_DAYS_SUCCEEDED = "FETCH_DAYS_SUCCEEDED";

export const FETCH_DAILY_CONTENT_REQUESTED = "FETCH_DAILY_CONTENT_REQUESTED";
export const FETCH_DAILY_CONTENT_SUCCEEDED = "FETCH_DAILY_CONTENT_SUCCEEDED";
export const API_ERROR = "API_ERROR";

export function fetchDailyContentRequest(dayNumber) {
    return dispatch => {
        dispatch({
             type: FETCH_DAILY_CONTENT_REQUESTED,
             payload: { dayNumber }
        });
        API.getDailyContent(dayNumber)
            .then(
                content => {
                    dispatch({
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

export function fetchDaysRequest() {
    return dispatch => {
        dispatch({ type: FETCH_DAYS_REQUESTED });
        API.getDays()
            .then(
                res => {
                    dispatch({
                        type: FETCH_DAYS_SUCCEEDED,
                        payload: { countdownTimes: res }
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

export function windowResized(width, height) {
    return {
        type: WINDOW_RESIZED,
        payload: { width, height }
    };
}