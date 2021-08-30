import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className="flex justify-center items-center translate-y-[50vh]">
            <Link className="text-gray-500 font-semibold border-2 border-gray-700 px-4 py-1 rounded-full hover:border-green-400" to="/app">Go to App</Link>
        </div>
    )
}

export default Login
