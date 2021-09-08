import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import channelActions from '../../redux/actions/channelActions'
import alertify from 'alertifyjs'
import { toast } from "react-toastify";

const ChannelList = () => {
    useFirebaseConnect([{ path: "channels" }])
    const dispatch = useDispatch()

    const channels = useSelector(state => state.firebase.ordered.channels)
    const currentChannel = useSelector(state => state.channelReducer.currentChannel)
    const profile = useSelector(state => state.firebase.profile)
    const [mounted, setMounted] = useState(false)


    useEffect(() => {
        // Burada en başta bir kanalın seçili gelmesi için yazıldı.
        if (!mounted && !isEmpty(channels)) {
            const { key, value } = channels[0]; // Genel kanalı
            // setActiveChannel({ key, ...value })
            dispatch(channelActions.setCurrentChannel({ key, ...value })) // İlk renderda genel kanalını current kanal yaptık ve menuyu kapatmadık
            setMounted(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mounted, channels])

    if (!isLoaded(channels)) {
        return "Loading Channel"
    }

    if (isEmpty(channels)) {
        return "No channels"
    }

    const setActiveChannel = channel => {
        if (channel.channelPassword) { // Eğer seçilen kanal şifreli ise burası çalışacak
            console.log(channel?.channelPassword);
            alertify.prompt(`${channel?.name}`, 'Şifreyi Giriniz', ""
                , function (evt, value) {
                    if (channel?.channelPassword === value) {
                        dispatch(channelActions.setCurrentChannel(channel))
                        toast.success('Kanala Giriş Başarılı', {
                            position: "bottom-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: profile.theme === "light" ? 'dark' : 'light'
                        });

                    } else {
                        value = ""
                        toast.error('Şifreyi Yanlış Girdiniz..', {
                            position: "bottom-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: profile.theme === "light" ? 'dark' : 'light'
                        });
                    }
                }
                , function () {
                    toast.error('Geçersiz Şifre', {
                        position: "bottom-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: profile.theme === "light" ? 'dark' : 'light'
                    });
                }).set('type', 'password');



        } else {
            dispatch(channelActions.setCurrentChannel(channel))
        }

    }

    return (
        <>
            {channels.map(({ key, value }) => (
                <a
                    href="/#"
                    onClick={() => setActiveChannel({ key, ...value })}
                    className={`flex justify-between items-center px-3 py-2 cursor-pointer ${currentChannel?.key === key ? 'bg-gradient-to-r from-purple-700 to-blue-500 rounded-md' : ''}`}
                    key={key} >
                    <span className={`text-sm ${currentChannel?.key === key ? 'text-white' : 'text-gray-700 dark:text-gray-400'} font-medium`}>{value?.name}</span>
                    {value?.icon === "hashtag" && <span className={`text-xs ${currentChannel?.key === key ? 'text-white' : 'text-gray-700 dark:text-gray-400'} font-medium`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                        </svg>
                    </span>}
                    {value?.icon === "lock" && <span className={`text-xs ${currentChannel?.key === key ? 'text-white' : 'text-gray-700 dark:text-gray-400'} font-medium`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                    </span>}
                    {value?.icon === "music" && <span className={`text-xs ${currentChannel?.key === key ? 'text-white' : 'text-gray-700 dark:text-gray-400'} font-medium`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                        </svg>
                    </span>}
                </a>
            ))}
        </>
    )
}

export default ChannelList
