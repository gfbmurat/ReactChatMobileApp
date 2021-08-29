import React from 'react'
import Message from "./Message";

const Comment = () => {
    return (
        <>
            <div className="mt-4 pl-4 mb-4 h-full border-gray rounded-md">
                <Message name={"Dracarys"} message={"Merhaba tailwindcss ile react"} />
                <Message name={"Muhammed"} message={"Merhaba tailwindcss ile react"} />
                <Message name={"Elif"} message={"Merhaba tailwindcss ile react"} />
                <Message name={"Gönül"} message={"Merhaba tailwindcss ile react"} />
            </div>
            {/* Input Send Message */}
            <div className="flex-auto justify-end items-end">
                <input className=" w-full  shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="message" type="text" placeholder="Genel kanalına mesaj gönder." />
            </div>
        </>
    )
}

export default Comment
