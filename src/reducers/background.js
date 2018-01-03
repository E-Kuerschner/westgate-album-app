import inRange from "lodash/inRange";

const minImageSize = {width: 800, height: 650}
const maxImageSize = {width: Infinity, height: Infinity}

const initialState = {
    width: 1688,
    height: 950
};

const backgroundImageSize = (state = initialState, action) => {
    switch(action.type) {
        case "RESIZE":
            let newState = {};
            const { width, height } = action;

            //calc image width
            if(inRange(width, minImageSize.width, maxImageSize.width)) {
                assign(newState, {width: width});
            } else if(width < minImageSize.width) {
                assign(newState, {width: minImageSize.width});
            } else if(width >= maxImageSize.width) {
                assign(newState, {width: maxImageSize.width});
            }

            //calc image height
            if(inRange(height, minImageSize.height, maxImageSize.height)) {
                assign(newState, {height: height});
            } else if(height < minImageSize.height) {
                assign(newState, {height: minImageSize.height});
            } else if(height >= maxImageSize.height) {
                assign(newState, {height: maxImageSize.height});
            }

            return newState;

        default:
            return state;
    }
}