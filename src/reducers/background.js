import inRange from "lodash/inRange";
import { WINDOW_RESIZED } from "../actions";
import * as ImgSizeLimits from "../constants"

// limits for background image size
const minImageSize = { width: 800, height: 650 };
const maxImageSize = { width: Infinity, height: Infinity };

const backgroundImageSize = (state = { width: null, height: null }, action) => {
    switch(action.type) {
        case WINDOW_RESIZED:
            let newState = {};
            const { width, height } = action.payload;

            // calc new image width:
            // if the image is within the size limits defined above don't change the width
            if(inRange(width, ImgSizeLimits.MIN_BACKGROUND_IMG_WIDTH, ImgSizeLimits.MAX_BACKGROUND_IMG_WIDTH)) {
                Object.assign(newState, { width });
            // if the width is less than the min width, set new width to minimum value
            } else if(width < ImgSizeLimits.MIN_BACKGROUND_IMG_WIDTH) {
                Object.assign(newState, { width: ImgSizeLimits.MIN_BACKGROUND_IMG_WIDTH });
            // if the width is greater than the max width, set the new width to the maximum value
            } else if(width >= ImgSizeLimits.MAX_BACKGROUND_IMG_WIDTH) {
                Object.assign(newState, { width: ImgSizeLimits.MAX_BACKGROUND_IMG_WIDTH });
            }

            // calc image height:
            // same rules as width calculation...
            if(inRange(height, ImgSizeLimits.MIN_BACKGROUND_IMG_HEIGHT, ImgSizeLimits.MAX_BACKGROUND_IMG_HEIGHT)) {
                Object.assign(newState, { height });
            } else if(height < ImgSizeLimits.MIN_BACKGROUND_IMG_HEIGHT) {
                Object.assign(newState, { height: ImgSizeLimits.MIN_BACKGROUND_IMG_HEIGHT });
            } else if(height >= ImgSizeLimits.MAX_BACKGROUND_IMG_HEIGHT) {
                Object.assign(newState, { height: ImgSizeLimits.MAX_BACKGROUND_IMG_HEIGHT });
            }

            return newState;

        default:
            return state;
    }
}

export default backgroundImageSize;