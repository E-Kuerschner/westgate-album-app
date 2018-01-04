import { getDayContent } from "./api";

export const FETCH_DAILY_CONTENT_REQUESTED = "";
export const FETCH_DAILY_CONTENT_SUCCEEDED = "";
export const API_ERROR = "";

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