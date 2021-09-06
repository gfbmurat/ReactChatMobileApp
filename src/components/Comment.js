import React, { useRef, useState, useEffect } from 'react'
import Message from "./Message";
import '@material-tailwind/react/tailwind.css'
import CreateChannelForm from './channels/CreateChannelForm';
import { useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import { useFirebaseConnect } from 'react-redux-firebase';
import { v4 as uuid_v4 } from "uuid";
import Input from "@material-tailwind/react/Input";
import { toast } from 'react-toastify';

const Comment = ({ searchTerm }) => {
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
    const fileInputRef = useRef(null)
    const messageEndRef = useRef(null) // Yeni mesaj geldiğinde sayfa aşağı aksın


    useEffect(() => {
        messageEndRef?.current.scrollIntoView({ behavior: 'auto', block: 'end' })
    }, [channelMessages])

    const scrollToBottom = () => {
        messageEndRef.current.scrollIntoView({
            behavior: "auto",
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

    const filterMessages = () => {
        const regex = new RegExp(searchTerm, "gi")
        const searchResults = [...channelMessages].reduce((acc, message) => {
            if ((message.value.content && message.value.content.match(regex)) ||
                (message.value.user && message.value.user.name.match(regex))) {
                acc.push(message)
            }
            return acc;
        }, [])

        return searchResults;
    }

    const renderedMessages = searchTerm !== "" ? filterMessages() : channelMessages


    const uploadMedia = event => {
        const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 4000));
        toast.promise(
            resolveAfter3Sec,
            {
                pending: 'Resim Yükleniyor',
                success: 'Resim Yüklendi 👌',
                error: 'Resim Yüklenemedi 🤯'
            }
        )
        const file = event.target.files[0] // Sadece 1 dosya yüklenmesi işlemi(ilk seçilen)

        if (file) {
            const storageRef = firebase.storage().ref();
            const fileRef = storageRef.child(`chat/public/${uuid_v4()}.jpg`)


            return fileRef.put(file).then((snap) => {
                fileRef.getDownloadURL().then((downloadURL) => {
                    sendMessageMedia(downloadURL);

                }).catch((error) => {
                    console.error("error uploading file")
                    toast.error('Resim Yüklenemedi', {
                        position: "bottom-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                })
            })
        }
    }
    const sendMessageMedia = (url) => {
        const message = {
            image: url,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: {
                id: currentUserId,
                name: profile.name,
                avatar: profile.avatar
            }
        }
        firebase.push(`messages/${currentChannel.key}`, message)
            .then(() => {
                console.log('Media Message Sent');
            })
    }

    const inputClick = () => {
        fileInputRef.current.click();
    }

    return (
        <>
            <div className="mt-4 pl-4 mb-4 h-full border-gray rounded-md overflow-auto scrollbar-rounded scrollbar-thumb:bg-indigo-400/[0.26]">
                <div ref={messageEndRef}>
                    {renderedMessages && renderedMessages.map(({ key, value }) => {
                        return <Message key={key} messageKey={key} message={value} />
                    })}
                </div>
            </div>

            {/* Input Send Message */}
            <form onSubmit={handleSubmit}>
                <div className="flex-auto flex justify-center items-center">
                    <button type="button" onClick={inputClick} className="h-9 flex items-center border rounded-lg text-center p-2 text-gray-700 hover:text-gray-600 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                    <input ref={fileInputRef} className="hidden" onChange={uploadMedia} type="file" name="file" />
                    {/* <input
                        onFocus={scrollToBottom}
                        value={content}
                        onChange={messageInputChange}
                        autoComplete="off"
                        className="focus:border-green-600 w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="message"
                        type="text"
                        placeholder={`${currentChannel?.name} kanalına mesaj gönder.`} /> */}
                    <Input
                        onFocus={scrollToBottom}
                        value={content}
                        onChange={messageInputChange}
                        type="text"
                        color="lightBlue"
                        size="sm"
                        outline={true}
                        placeholder={`${currentChannel?.name} kanalına mesaj gönder.`}
                    />
                    <button disabled={content === ""} type="submit" className="h-9 bg-green-400 hover:bg-green-200 flex items-center border text-center rounded-lg p-2 text-white hover:text-gray-600 ml-2 disabled:bg-green-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>
            </form>
            <CreateChannelForm />
        </>
    )
}

export default Comment
