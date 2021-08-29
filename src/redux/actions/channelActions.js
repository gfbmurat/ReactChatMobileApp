import * as actionTypes from './actionTypes'

const setCurrentChannel = (channel) => (
    { type: actionTypes.SET_CURRENT_CHANNEL, payload: channel }
)

const channelActions = {
    setCurrentChannel
}

export default channelActions;