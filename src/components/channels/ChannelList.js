import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import channelActions from '../../redux/actions/channelActions'

const ChannelList = ({ activeClass }) => {
    useFirebaseConnect([{ path: "channels" }])
    const dispatch = useDispatch()

    const channels = useSelector(state => state.firebase.ordered.channels)
    const [mounted, setMounted] = useState(false)
    const currentChannel = useSelector(state => state.channelReducer.currentChannel)

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
            dispatch(channelActions.setCurrentChannel(channel))

        } else {
            dispatch(channelActions.setCurrentChannel(channel))
        }

    }

    return (
        <>
            {channels.map(({ key, value }) => (
                <a
                    href="#"
                    onClick={() => setActiveChannel({ key, ...value })}
                    className={`flex justify-between items-center px-3 py-2 cursor-pointer ${currentChannel?.key === key ? 'bg-gradient-to-r from-purple-700 to-blue-500 rounded-md' : ''}`}
                    key={key} >
                    <span className={`text-sm ${currentChannel?.key === key ? 'text-white' : 'text-gray-700'} font-medium`}>{value?.name}</span>
                    {value?.icon === "hashtag" && <span className={`text-xs ${currentChannel?.key === key ? 'text-white' : 'text-gray-700'} font-medium`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                        </svg>
                    </span>}
                    {value?.icon === "lock" && <span className={`text-xs ${currentChannel?.key === key ? 'text-white' : 'text-gray-700'} font-medium`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                    </span>}

                </a>
            ))}
        </>
    )
}

export default ChannelList
