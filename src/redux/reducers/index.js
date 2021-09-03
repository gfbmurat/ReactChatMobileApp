import { combineReducers } from "redux";
import channelReducer from './channelReducer'
import userReducer from "./userReducer";
import { reducer as firebase } from 'react-redux-firebase'

const rootReducer = combineReducers({
    firebase,
    channelReducer,
    userReducer
})

export default rootReducer