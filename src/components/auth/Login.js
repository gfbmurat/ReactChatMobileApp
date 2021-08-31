import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const Login = () => {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const [fbErrors, setFbErrors] = useState([]) // Firebase hatalarını tutmak
    const onSubmit = (data, e) => {
        console.log(data);
    }

    const handleChange = (e) => {
        console.log(e.target.name, e.target.value);
        setValue(e.target.name, e.target.value)
        setFbErrors([])
    }

    return (
        <div className="bg-desktop w-full h-screen flex justify-center xs:bg-mobile xs:flex xs:justify-center xs:pt-8">
            <div className="w-full max-w-md xs:max-w-sm pt-8">
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            name="email"
                            {...register("email", { required: true })}
                            onChange={handleChange}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`} id="email" type="text" placeholder="Email" />
                        <p className={`text-red-500 text-xs italic ${errors.email ? '' : 'hidden'}`}>Please enter email</p>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            {...register("password", { required: true, minLength: 6 })}
                            onChange={handleChange}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`} name="password" id="password" type="password" placeholder="******" />
                        <p className={`text-red-500 text-xs italic ${errors.password ? '' : 'hidden'}`}>Please choose a password.</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Sign In
                        </button>
                        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                            Kayıt Ol
                        </a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
