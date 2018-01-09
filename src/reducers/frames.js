import React from "react";
import moment from "moment";
import * as Actions from "../actions";

const minImageSize = {width: 800, height: 650}

const initialState = [
    {
        isFetching: false,
        link: undefined,
        desc: "left",
        countDownTill: moment("8/5/2017 11:59:00 PM"),
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
    },
    {
        isFetching: false,
        link: undefined,
        desc: "top",
        countDownTill: moment("8/6/2017 11:59:00 PM"),
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
    },
    {
        isFetching: false,
        link: undefined,
        desc: "middle",
        countDownTill: moment("8/7/2017 11:59:00 PM"),
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
    },
    {
        isFetching: false,
        link: undefined,
        desc: "top-right",
        countDownTill: moment("8/8/2017 11:59:00 PM"),
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
    },
    {
        isFetching: false,
        link: undefined,
        desc: "bottom-right",
        countDownTill: moment("8/9/2017 11:59:00 PM"),
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
    }
];

export default function(state = initialState, action) {
    switch (action.type) {
        case Actions.WINDOW_RESIZED:
            const { width, height } = action.payload;
            return state.map((frameData) => {
                const heightFactor = height <= minImageSize.height ? minImageSize.height : height;
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
            });
        case Actions.FETCH_DAILY_CONTENT_REQUESTED:
            return state.map((frameData, index) => {
                if (index === action.payload.dayNumber - 1) {
                    return {
                        ...frameData,
                        isFetching: true
                    };
                } else {
                    return frameData
                }
            });
        case Actions.FETCH_DAILY_CONTENT_SUCCEEDED:
            return state.map((frameData, index) => {
                if (index === action.payload.dayNumber - 1) {
                    return {
                        ...frameData,
                        isFetching: false,
                        link: action.payload.link
                    };
                } else { 
                    return frameData;
                }
            });
        case Actions.API_ERROR:
            return state.map((frameData, index) => {
                if (index === action.payload.dayNumber - 1) {
                    return {
                        ...frameData,
                        isFetching: false
                    };
                } else {
                    return frameData
                }
            });
        default:
            return state;
    }
}