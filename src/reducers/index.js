import { combineReducers } from "redux";
import background from "./background";
import frames from "./frames";

export default combineReducers({
    background,
    frames
});