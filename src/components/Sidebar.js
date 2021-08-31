import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import channelActions from '../redux/actions/channelActions'


const Sidebar = ({ isOpen, setIsOpen, users, channels }) => {

    const [activeClass, setActiveClass] = useState("")
    const dispatch = useDispatch()

    useEffect(() => {
        setActiveClass(channels[0])

    }, [channels])

    const selectCurrentChannel = (channel) => {
        dispatch(channelActions.setCurrentChannel(channel))
        setActiveClass(channel)
        setIsOpen(false)
    }

    const toggleButon = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className={`fixed lg:static inset-y-0 left-0 w-64 z-50 px-8 py-4 bg-white overflow-auto border-r-[1px] border-gray-300 lg:translate-x-0 transform 
            ${isOpen ? 'xs:hidden translate-x-0 ease-out transition-medium' : '-translate-x-full ease-in transition-medium'}`}>
            <div className="flex justify-between items-center">
                <img src="./images/logo.svg" alt="Logo" className="w-9 h-9" />
                <button className="text-gray-700 lg:hidden" onClick={toggleButon}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <nav className="mt-8">
                <div className="flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Kanallar</h3>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>
                {/* Channels */}
                <div className="mt-4 -mx-3">
                    {channels.map(channel => (
                        <a
                            onClick={() => selectCurrentChannel(channel)}
                            className={`flex justify-between items-center px-3 py-2 cursor-pointer ${activeClass.id === channel.id ? 'bg-gradient-to-r from-purple-700 to-blue-500 rounded-md' : ''}`}
                            key={channel.id} >
                            <span className={`text-sm ${activeClass.id === channel.id ? 'text-white' : 'text-gray-700'} font-medium`}>{channel.name}</span>
                            <span className={`text-xs ${activeClass.id === channel.id ? 'text-white' : 'text-gray-700'} font-medium`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                                </svg>
                            </span>
                        </a>
                    ))}
                </div>

                {/* Kullanıcılar */}
                <h3 className="mt-8 text-sm font-semibold text-gray-700 uppercase tracking-wide">Kullanıcılar</h3>
                <div className="mt-2 -mx-3">
                    {users.map(user => {
                        return <a key={user.id} className="flex justify-between items-center px-3 py-2" href="/#">
                            <span className="text-sm text-gray-700 font-medium">{user.name}</span>
                            <span className="text-xs font-medium text-gray-700">{user.notification}</span>
                        </a>
                    })}

                </div>
            </nav>
        </div>
    )
}

export default Sidebar
