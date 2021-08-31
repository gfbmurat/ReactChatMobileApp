import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useFirebase } from 'react-redux-firebase'
import { Link } from 'react-router-dom'

const SignUp = () => {


    const firebase = useFirebase()
    const [fbErrors, setFbErrors] = useState([]) // Firebase hatalarını tutmak
    const [submitting, setSubmitting] = useState(false) // Butona tıklanınca disabled yapmak

    const { register, handleSubmit, formState: { errors }, setValue } = useForm()

    const onSubmit = (data, e) => {
        // e.preventDefault();
        const { username, email, password } = data
        setSubmitting(true) // Buton disabled yapılacak
        setFbErrors([]) // Her submit yaptıktan sonra hatalar sıfırlanacak
        const [first, last] = data.username.split(' ')

        firebase.createUser(
            { email, password },
            {
                name: username,
                password: password,
                avatar: `https://ui-avatars.com/api/?name=${first}+${last ? last : ''}&background=random&color=fff`, // Eğer ikinci isim yoksa ilk ismin ilk 2 harfi avatar olur.
                isActive: true,
                lastLoginData: firebase.database.ServerValue.TIMESTAMP
            }
        ).then((firebaseUser) => {
            console.log(firebaseUser);
            console.log(`https://ui-avatars.com/api/?name=${first}+${last ? last : ''}&background=random&color=fff`);
        }).catch((error) => {
            setFbErrors([{ message: error.message }])
        }).finally(() => {
            setSubmitting(false)
        })
    }

    // const onSubmit = (data, e) => {
    //     console.log(data);
    //     setSubmitting(true)
    // }

    const handleChange = (e) => {
        const { name, value } = e.target
        setValue(name, value)
        setFbErrors([])
    }

    return (
        <div className="bg-desktop w-full h-screen flex justify-center xs:bg-mobile xs:flex xs:justify-center xs:pt-8">
            <div className="w-full max-w-md xs:max-w-sm pt-8">
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            name="email"
                            {...register("username", { required: true })}
                            onChange={handleChange}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.username ? 'border-red-500' : ''}`} id="username" type="text" placeholder="Username" />
                        <p className={`text-red-500 text-xs italic ${errors.email ? '' : 'hidden'}`}>Please enter username</p>
                    </div>
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
                        <button disabled={submitting} className="bg-gradient-to-r from-purple-700 to-blue-500 hover:from-pink-500 hover:to-yellow-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Sign Up
                        </button>
                        <Link to="/login" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                            Giriş Yap
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
