import React, { useRef } from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { useFirebase } from 'react-redux-firebase'
import alertify from 'alertifyjs'
import Tooltips from "@material-tailwind/react/Tooltips";
import TooltipsContent from "@material-tailwind/react/TooltipsContent";

const Message = ({ messageKey, message }) => {

    const currentChannel = useSelector(state => state.channelReducer.currentChannel)
    const uid = useSelector(state => state.firebase.auth.uid)
    const profile = useSelector(state => state.firebase.profile)

    const firebase = useFirebase()
    const tooltipRef = useRef()

    const timeFromNow = (timestamp) => moment(timestamp).fromNow();

    const usersLikedMessage = (message) => {
        let likeUsername = []
        if (message.hasOwnProperty('likes')) {
            for (var i = 0; i < Object.keys(message.likes).length; i++) {
                likeUsername.push(Object.values(message.likes)[i].username)
            }
        }
        return likeUsername
    }

    const messageLikes = () => {

        const loginTimestamp = firebase.database.ServerValue.TIMESTAMP
        if (message.hasOwnProperty('likes') && Object.keys(message.likes).find(item => item === uid)) { // Eğer daha önceden beğendiyse beğenme siliniyor
            firebase.database().ref(`messages/${currentChannel.key}/${messageKey}/likes/${uid}`).remove()
            firebase.database().ref("users").child(uid).update({ lastLoginData: loginTimestamp }) // Kullanıcı aktifliği güncelleme
        } else { // Beğenme işlemi

            firebase.database().ref(`messages/${currentChannel.key}/${messageKey}/likes/${uid}`).update({ username: profile.name, timestamp: loginTimestamp }) // Login yapan kullanıcının aktif özelliği true yapma
            firebase.database().ref("users").child(uid).update({ lastLoginData: loginTimestamp }) // Kullanıcı aktifliği güncelleme
        }
    }

    const deleteMessage = () => {
        alertify.confirm('Delete Message', 'Mesajı silmek istediğinize emin misiniz?', function () {
            alertify.success('Mesaj Silindi!')
            firebase.database().ref(`messages/${currentChannel.key}/${messageKey}`).remove() // Mesaj Silme İşlemi
        }
            , function () { alertify.error('Mesaj Silinmedi!') }).autoOk(5)
        const loginTimestamp = firebase.database.ServerValue.TIMESTAMP
        firebase.database().ref("users").child(uid).update({ lastLoginData: loginTimestamp })
    }

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
            <div className="text-xs text-gray-400 pl-14 flex items-center">
                <div>
                    {uid === message.user.id &&
                        <button className="hover:text-red-500" onClick={deleteMessage}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </button>}
                </div>
                <div className="flex -mt-1 items-center">
                    {message.hasOwnProperty('likes') && Object.keys(message.likes).find(item => item === uid) ?
                        <button onClick={messageLikes} className="text-red-500 flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                            <div ref={tooltipRef}>
                                {message.hasOwnProperty('likes') === true ? Object.keys(message.likes).length : 0}
                            </div>
                            <Tooltips placement="right" ref={tooltipRef}>
                                <TooltipsContent>{message.hasOwnProperty('likes') && `${usersLikedMessage(message)}`}</TooltipsContent>
                            </Tooltips>
                        </button>
                        :
                        <button onClick={messageLikes} className="hover:text-red-500 flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <div ref={tooltipRef}>
                                {message.hasOwnProperty('likes') === true ? Object.keys(message.likes).length : 0}
                            </div>
                            <Tooltips placement="right" ref={tooltipRef}>
                                <TooltipsContent>{message.hasOwnProperty('likes') && `${usersLikedMessage(message)}`}</TooltipsContent>
                            </Tooltips>
                        </button>}
                </div>
            </div>

        </div>
    )
}

export default Message
