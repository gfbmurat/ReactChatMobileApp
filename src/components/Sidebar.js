import React, { useState, useEffect } from 'react'

const Sidebar = ({ users, channels }) => {

    const [activeClass, setActiveClass] = useState("")

    useEffect(() => {
        setActiveClass(channels[0])

    }, [channels])

    const selectCurrentChannel = (channel) => {
        setActiveClass(channel)
    }

    return (
        <div className="w-64 px-8 py-4 overflow-hidden">
            <div>
                <img src="./images/logo.svg" alt="Logo" className="w-9 h-9" />
            </div>
            <nav className="mt-8">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Kanallar</h3>
                {/* Channels */}
                <div className="mt-2 -mx-3">
                    {channels.map(channel => (
                        <a
                            onClick={() => selectCurrentChannel(channel)}
                            className={`flex justify-between items-center px-3 py-2 ${activeClass.id === channel.id ? 'bg-gradient-to-r from-purple-700 to-blue-500 rounded-md' : ''}`}
                            key={channel.id} href="/#">
                            <span className={`text-sm ${activeClass.id === channel.id ? 'text-white' : 'text-gray-700'} font-medium`}>{channel.name}</span>
                            <span className={`text-xs ${activeClass.id === channel.id ? 'text-white' : 'text-gray-700'} font-medium`}>{channel.notification}</span>
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
