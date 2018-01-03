import React from "react";
import moment from "moment";

const iframeStyle = {
    border: "none",
    width: "100%",
    height: "100%"
};

const minImageSize = {width: 800, height: 650}

const initialState = [
    {
        desc: "left",
        countDownTill: moment("8/5/2017 11:59:00 PM"),
        sizeToWindowRatio: { width: 0.148, height: 0.196 },
        offsetToWindowRatio: { top: 0.369, left: 0.763 },
        content: <iframe style={ iframeStyle } src="https://www.youtube.com/embed/UlYtjrW5uss"></iframe>,
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
        desc: "top",
        countDownTill: moment("8/6/2017 11:59:00 PM"),
        sizeToWindowRatio: { width: 0.328, height: 0.116 },
        offsetToWindowRatio: { top: 0.066, left: 0.942 },
        content: <iframe style={ iframeStyle } src="https://www.youtube.com/embed/UlYtjrW5uss"></iframe>,
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
        desc: "middle",
        countDownTill: moment("8/7/2017 11:59:00 PM"),
        sizeToWindowRatio: { width: 0.164, height: 0.123 },
        offsetToWindowRatio: { top: 0.307, left: 1.147 },
        content: <iframe style={ iframeStyle } src="https://www.youtube.com/embed/UlYtjrW5uss"></iframe>,
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
        desc: "top-right",
        countDownTill: moment("8/8/2017 11:59:00 PM"),
        sizeToWindowRatio: { width: 0.142, height: 0.140 },
        offsetToWindowRatio: { top: 0.152, left: 1.476 },
        content: <iframe style={ iframeStyle } src="https://www.youtube.com/embed/UlYtjrW5uss"></iframe>,
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
        desc: "bottom-right",
        countDownTill: moment("8/9/2017 11:59:00 PM"),
        sizeToWindowRatio: { width: 0.174, height: 0.133 },
        offsetToWindowRatio: { top: 0.599, left: 1.377 },
        content: <iframe style={ iframeStyle } src="https://www.youtube.com/embed/UlYtjrW5uss"></iframe>,
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
        case "RESIZE":
            const { width, height } = action.payload;
            return state.map((frameData, index) => {
                const heightFactor = height <= minImageSize.height ? minImageSize.height : height;
                return Object.assign({}, state[index], {
                    size: {
                        width: state[index].sizeToWindowRatio.width * heightFactor,
                        height: state[index].sizeToWindowRatio.height * heightFactor
                    },
                    offset: {
                        top: state[index].offsetToWindowRatio.top * heightFactor,
                        left: state[index].offsetToWindowRatio.left * heightFactor
                    }
                });
            });
        default:
            return state;
    }
}