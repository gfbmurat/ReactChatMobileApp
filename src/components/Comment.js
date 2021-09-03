import React, { useRef, useState, useEffect } from 'react'
import Message from "./Message";
import '@material-tailwind/react/tailwind.css'
import CreateChannelForm from './channels/CreateChannelForm';
import { useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import { useFirebaseConnect } from 'react-redux-firebase';


const Comment = () => {
    const currentChannel = useSelector(state => state.channelReducer.currentChannel)
    const channelMessages = useSelector(state => state.firebase.ordered.channelMessages)

    useFirebaseConnect([{
        path: `messages/${currentChannel?.key}`,
        storeAs: 'channelMessages'
    }])

    const firebase = useFirebase()
    const profile = useSelector(state => state.firebase.profile)
    const currentUserId = useSelector(state => state.firebase.auth.uid)
    const uid = useSelector(state => state.firebase.auth.uid)

    const [content, setContent] = useState("")
    //const fileInputRef = useRef(null)
    const messageEndRef = useRef(null) // Yeni mesaj geldiğinde sayfa aşağı aksın

    useEffect(() => {
        messageEndRef?.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }, [channelMessages])

    const scrollToBottom = () => {
        messageEndRef.current.scrollIntoView({
            behavior: "smooth",
            block: "end"
        });
    };

    const messageInputChange = (e) => { // inputta her değişiklik olduğunda scroll aşağı inecek şekilde ayarlandı
        setContent(e.target.value)
    }

    const handleSubmit = event => {
        event.preventDefault();
        if (content !== "") {
            const message = {
                content,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: {
                    id: currentUserId,
                    name: profile.name,
                    avatar: profile.avatar
                }
            }
            firebase.push(`messages/${currentChannel.key}`, message)
                .then(() => {
                    setContent("")
                })
        }
        const loginTimestamp = firebase.database.ServerValue.TIMESTAMP
        firebase.database().ref("users").child(uid).update({ lastLoginData: loginTimestamp })
    }

    return (
        <>
            <div className="mt-4 pl-4 mb-4 h-full border-gray rounded-md overflow-auto scrollbar-rounded scrollbar-thumb:bg-indigo-400/[0.26]">
                <div ref={messageEndRef}>
                    {channelMessages && channelMessages.map(({ key, value }) => {
                        return <Message key={key} messageKey={key} message={value} />
                    })}
                </div>
            </div>

            {/* Input Send Message */}
            <form onSubmit={handleSubmit}>
                <div className="flex-auto flex justify-center items-center shadow focus:border-red-600">
                    <button className="h-[38px] border text-center rounded p-2 text-gray-700 hover:text-gray-600 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                    <input
                        onClick={scrollToBottom}
                        value={content}
                        onChange={messageInputChange}
                        autoComplete="off"
                        className="focus:border-green-600 w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="message"
                        type="text"
                        placeholder={`${currentChannel?.name} kanalına mesaj gönder.`} />
                </div>

            </form>
            <CreateChannelForm />
        </>
    )
}

export default Comment
