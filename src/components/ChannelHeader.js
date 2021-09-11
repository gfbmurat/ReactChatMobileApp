import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import InputIcon from "@material-tailwind/react/InputIcon";
import Tooltips from "@material-tailwind/react/Tooltips";
import TooltipsContent from "@material-tailwind/react/TooltipsContent";
import alertify from 'alertifyjs';
import { useFirebase } from 'react-redux-firebase';
import channelActions from '../redux/actions/channelActions'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const ChannelHeader = ({ searchTerm, setSearchTerm }) => {

    const firebase = useFirebase()
    const dispatch = useDispatch()

    const currentChannel = useSelector(state => state.channelReducer.currentChannel)
    const currentUserId = useSelector(state => state.firebase.auth.uid)
    const channels = useSelector(state => state.firebase.ordered.channels)
    const profile = useSelector(state => state.firebase.profile)

    const channelNameRef = useRef()


    const removeChannel = () => {

        // Kanal Silme İşlemi ve Genel Kanalı Aktif Etme
        alertify.confirm('Delete Channel', `${currentChannel.name} kanalını silmek istediğinize emin misiniz?`,
            function () {
                toast.success(`${currentChannel.name} kanalı silindi`, {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: profile.theme === "light" ? 'dark' : 'light'
                });
                firebase.database().ref(`channels/${currentChannel.key}`).remove()
                const { key, value } = channels[0];
                dispatch(channelActions.setCurrentChannel({ key, ...value }))
            },
            function () {
                toast.error(`${currentChannel.name} kanalı silinmedi`, {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: profile.theme === "light" ? 'dark' : 'light'
                });
            })
    }

    return (
        <div className="mt-4 bg-gray-100 flex justify-between items-center p-3 rounded-md dark:bg-gray-600">
            <div className="flex justify-center items-center text-gray-700 mb-2 dark:text-gray-100">
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
                <h3 ref={channelNameRef} className="text-gray-700 font-medium xs:text-xs dark:text-gray-100">{currentChannel?.name}</h3>
                <Tooltips placement="right" ref={channelNameRef}>
                    <TooltipsContent>
                        {currentChannel?.name === "Genel" ? 'Genel Kanal Silinemez !' : currentChannel?.description}
                        <button disabled={currentChannel?.createdBy?.uid !== currentUserId} onClick={removeChannel} className="bg-red-500 ml-2 rounded-md p-1 disabled:bg-red-300">Kanalı Sil</button>
                    </TooltipsContent>
                </Tooltips>
            </div>
            {/* <input autoComplete="off" className="xs:w-1/2 xs:focus:w-full xs:duration-300 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Search Message" /> */}

            <div className="flex space-x-1 group bg-red-500">
                <button className="group-focus-within:hidden text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
                <div className="hidden group-focus-within:block dark:text-gray-100 dark:placeholder-gray-100">
                    <InputIcon
                        value={searchTerm}
                        onChange={event => setSearchTerm(event.target.value)}
                        iconFamily="material-icons"
                        iconName="search" id="search" type="text" color="teal" size="sm" outline={true} placeholder="Search Message" />
                </div>
            </div>

        </div>
    )
}

export default ChannelHeader
