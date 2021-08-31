import React from 'react'
import { useSelector } from 'react-redux'
import InputIcon from "@material-tailwind/react/InputIcon";

const ChannelHeader = (channelName) => {

    const currentChannel = useSelector(state => state.channelReducer)
    return (
        <div className="mt-4 bg-gray-100 flex justify-between items-center p-3 rounded-md">
            <div className="flex justify-center items-center text-gray-700 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 xs:h-4 xs:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
                <h3 className="text-gray-700 font-medium">{currentChannel?.name}</h3>
            </div>
            {/* <input autoComplete="off" className="xs:w-1/2 xs:focus:w-full xs:duration-300 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Search Message" /> */}
            <div>
                <InputIcon
                    iconFamily="material-icons"
                    iconName="search" id="search" type="text" color="teal" size="sm" outline={true} placeholder="Search Message" />
            </div>
        </div>
    )
}

export default ChannelHeader
