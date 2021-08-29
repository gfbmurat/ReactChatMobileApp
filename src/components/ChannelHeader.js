import React from 'react'

const ChannelHeader = (channelName) => {
    return (
        <div className="mt-4 bg-gray-100 flex justify-between items-center p-3 rounded-md">
            <h3 className="text-gray-700 font-medium"># Fenerbahçe</h3>
            <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Search Message" />
        </div>
    )
}

export default ChannelHeader
