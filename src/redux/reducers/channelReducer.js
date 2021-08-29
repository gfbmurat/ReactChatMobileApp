import * as actionTypes from '../actions/actionTypes'

const initialState = {
    channel: {}
}

const channelReducer = (state = initialState.channel, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_CHANNEL:
            return action.payload;
        default:
            return state
    }
}

export default channelReducer