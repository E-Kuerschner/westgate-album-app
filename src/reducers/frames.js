import React from "react";
import moment from "moment";
import * as Actions from "../actions";
import { MIN_BACKGROUND_IMG_WIDTH, MIN_BACKGROUND_IMG_HEIGHT } from "../constants"

const initialState = {
    isFetching: false,
    frames: [{
        isFetching: false,
        desc: "left",
        link: undefined,
        unlockEpoch: undefined,
        sizeToWindowRatio: { width: 0.148, height: 0.196 },
        offsetToWindowRatio: { top: 0.369, left: 0.763 },
        size: {
            width: undefined,
            height: undefined
        },
        offset: {
            top: undefined,
            left: undefined
        }
    }, {
        isFetching: false,
        desc: "top",
        link: undefined,
        unlockEpoch: undefined,
        sizeToWindowRatio: { width: 0.328, height: 0.116 },
        offsetToWindowRatio: { top: 0.066, left: 0.942 },
        size: {
            width: undefined,
            height: undefined
        },
        offset: {
            top: undefined,
            left: undefined
        }
    }, {
        isFetching: false,
        desc: "middle",
        link: undefined,
        unlockEpoch: undefined,
        sizeToWindowRatio: { width: 0.164, height: 0.123 },
        offsetToWindowRatio: { top: 0.307, left: 1.147 },
        size: {
            width: undefined,
            height: undefined
        },
        offset: {
            top: undefined,
            left: undefined
        }
    }, {
        isFetching: false,
        desc: "top-right",
        link: undefined,
        unlockEpoch: undefined,
        sizeToWindowRatio: { width: 0.142, height: 0.140 },
        offsetToWindowRatio: { top: 0.152, left: 1.476 },
        size: {
            width: undefined,
            height: undefined
        },
        offset: {
            top: undefined,
            left: undefined
        }
    }, {
        isFetching: false,
        desc: "bottom-right",
        link: undefined,
        unlockEpoch: undefined,
        sizeToWindowRatio: { width: 0.174, height: 0.133 },
        offsetToWindowRatio: { top: 0.599, left: 1.377 },
        size: {
            width: undefined,
            height: undefined
        },
        offset: {
            top: undefined,
            left: undefined
        }
    }]
};

export default function(state = initialState, action) {
    switch (action.type) {
        // when the window is resized and the background image gets scaled
        // the absolute position and size of the frame overlays needs to be recomputed
        case Actions.WINDOW_RESIZED:
            const { width, height } = action.payload;
            return {
                ...state,
                frames: state.frames.map((frameData) => {
                    const heightFactor = height <= MIN_BACKGROUND_IMG_HEIGHT ? MIN_BACKGROUND_IMG_HEIGHT : height;
                    return Object.assign({}, frameData, {
                        size: {
                            width: frameData.sizeToWindowRatio.width * heightFactor,
                            height: frameData.sizeToWindowRatio.height * heightFactor
                        },
                        offset: {
                            top: frameData.offsetToWindowRatio.top * heightFactor,
                            left: frameData.offsetToWindowRatio.left * heightFactor
                        }
                    });
                })
            };
        case Actions.FETCH_DAYS_REQUESTED:
            return {
                ...state,
                isFetching: true
            };
        case Actions.FETCH_DAYS_SUCCEEDED:
            return {
                ...state,
                isFetching: false,
                frames: state.frames.map((frameData, index) => {
                    return { ...frameData, ...action.payload[index + 1] };
                })
            };
        case Actions.FETCH_DAILY_CONTENT_REQUESTED:
            return {
                ...state,
                frames: state.frames.map((frameData, index) => {
                    if (index === action.payload.dayNumber - 1) {
                        return {
                            ...frameData,
                            isFetching: true
                        };
                    } else {
                        return frameData;
                    }
                })
            };
        case Actions.FETCH_DAILY_CONTENT_SUCCEEDED:
            return {
                ...state,
                frames: state.frames.map((frameData, index) => {
                    if (index === action.payload.dayNumber - 1) {
                        return {
                            ...frameData,
                            isFetching: false,
                            link: action.payload.link
                        };
                    } else { 
                        return frameData;
                    }
                })
            };
        case Actions.API_ERROR:
            return {
                ...state,
                frames: state.frames.map((frameData, index) => {
                    if (index === action.payload.dayNumber - 1) {
                        return {
                            ...frameData,
                            isFetching: false
                        };
                    } else {
                        return frameData
                    }
                })
            };
        default:
            return state;
    }
}