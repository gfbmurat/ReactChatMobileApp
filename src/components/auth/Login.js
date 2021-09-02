import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useFirebase } from 'react-redux-firebase'
import { useDispatch } from 'react-redux'
import InputIcon from '@material-tailwind/react/InputIcon'
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import H5 from "@material-tailwind/react/Heading5";

const Login = () => {

    const firebase = useFirebase()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const [fbErrors, setFbErrors] = useState([]) // Firebase hatalarını tutmak
    const [submitting, setSubmitting] = useState(false) // Butona tıklanınca disabled yapmak

    const onSubmit = (data, e) => {
        const { email, password } = data
        setSubmitting(true)
        setFbErrors([])
        firebase.login(
            { email, password })
            .then((data) => {
                console.log(data);
                //dispatch(userActions.setCurrentUser({ currentUser: data }))
            }).catch((error) => {
                setFbErrors([{ message: error.message }])
            }).finally(() => {
                setSubmitting(false)
            })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        console.log(name, value);
        setValue(name, value)
        setFbErrors([])
    }

    return (
        <div className="bg-desktop w-full h-screen flex justify-center xs:bg-mobile xs:flex xs:justify-center xs:pt-8">
            <div className="w-full max-w-md xs:max-w-sm pt-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            name="email"
                            {...register("email", { required: true })}
                            onChange={handleChange}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`} id="email" type="text" placeholder="Email" />
                        <p className={`text-red-500 text-xs italic ${errors.email ? '' : 'hidden'}`}>Please enter email</p>
                    </div> */}
                    <Card>
                        <CardHeader color="lightBlue" size="lg">
                            <H5 color="white">Login</H5>
                        </CardHeader>
                        <CardBody>
                            <div className="mb-4">
                                <InputIcon
                                    name="email"
                                    {...register("email", { required: true })}
                                    onChange={handleChange}
                                    type="email"
                                    color={errors.email ? 'red' : "lightBlue"}
                                    size="regular"
                                    outline={true}
                                    placeholder="Email"
                                    iconFamily="material-icons"
                                    iconName="email"
                                />
                            </div>
                            <div>
                                <InputIcon
                                    name="password"
                                    {...register("password", { required: true, minLength: 6 })}
                                    onChange={handleChange}
                                    type="password"
                                    color={errors.password ? 'red' : "lightBlue"}
                                    size="regular"
                                    outline={true}
                                    placeholder="Password"
                                    iconFamily="material-icons"
                                    iconName="lock"
                                />
                            </div>
                        </CardBody>
                        <CardFooter>
                            <div className="flex items-center justify-between">
                                <button disabled={submitting} className="bg-gradient-to-r from-purple-700 to-blue-500 hover:from-pink-500 hover:to-yellow-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                    Sign In
                                </button>
                                <Link to="/signup" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                                    Kayıt Ol
                                </Link>
                            </div>
                        </CardFooter>
                        {fbErrors.length > 0 && <div className="bg-errorColor text-white text-xs rounded-md text-center p-1" >{fbErrors.map((error, index) => {
                            return <p key={index}>{error.message}</p>
                        })}</div>}
                    </Card>
                </form>
            </div>
        </div>
    )
}

export default Login
