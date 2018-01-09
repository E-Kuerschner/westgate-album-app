import inRange from "lodash/inRange";
import { WINDOW_RESIZED } from "../actions";

const minImageSize = {width: 800, height: 650}
const maxImageSize = {width: Infinity, height: Infinity}

const initialState = {
    width: 1688,
    height: 950
};

const backgroundImageSize = (state = initialState, action) => {
    switch(action.type) {
        case WINDOW_RESIZED:
            let newState = {};
            const { width, height } = action.payload;

            //calc image width
            if(inRange(width, minImageSize.width, maxImageSize.width)) {
                Object.assign(newState, {width: width});
            } else if(width < minImageSize.width) {
                Object.assign(newState, {width: minImageSize.width});
            } else if(width >= maxImageSize.width) {
                Object.assign(newState, {width: maxImageSize.width});
            }

            //calc image height
            if(inRange(height, minImageSize.height, maxImageSize.height)) {
                Object.assign(newState, {height: height});
            } else if(height < minImageSize.height) {
                Object.assign(newState, {height: minImageSize.height});
            } else if(height >= maxImageSize.height) {
                Object.assign(newState, {height: maxImageSize.height});
            }

            return newState;

        default:
            return state;
    }
}

export default backgroundImageSize;