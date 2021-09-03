import React from 'react'
import moment from 'moment'

const Message = ({ messageKey, message }) => {


    const timeFromNow = (timestamp) => moment(timestamp).fromNow();


    return (
        <div className=" flex flex-col mb-1">
            <div className="flex mt-2 justify-start items-center">
                <img className="w-9 h-9 mb-[-16px] rounded-full mr-4" src={message?.user.avatar} alt="Profile" />
                <div className="flex justify-center items-center">
                    <h3 className="text-gray-700 font-bold mr-2">{message?.user.name}</h3>
                    <span className="text-xs text-gray-400">{timeFromNow(message.timestamp)}</span>
                </div>
            </div>
            <div className="pl-14 mt-[-4px] items-start text-gray-600 ">
                <p>{message?.content}</p>
            </div>
        </div>
    )
}

export default Message
