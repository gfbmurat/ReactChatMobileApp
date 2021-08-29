import React from 'react'

const Message = ({ name, message }) => {
    return (
        <div className=" flex flex-col ml-4 mb-4">
            <div className="flex mt-4 justify-start items-center">
                <img className="w-9 h-9 rounded-full mr-4" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=144&h=144&q=80" alt="Profile" />
                <div className="flex justify-center items-center">
                    <h3 className="text-gray-700 font-bold mr-2">{name}</h3>
                    <span className="text-xs text-gray-400">2 minute ago</span>
                </div>
            </div>
            <div className="pl-14 items-start text-gray-600 ">
                <p>{message}</p>
            </div>

        </div>
    )
}

export default Message
