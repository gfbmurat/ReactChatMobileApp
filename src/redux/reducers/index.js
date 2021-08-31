import { combineReducers } from "redux";
import channelReducer from './channelReducer'
import { reducer as firebase } from 'react-redux-firebase'

const rootReducer = combineReducers({
    firebase,
    channelReducer
})

export default rootReducer