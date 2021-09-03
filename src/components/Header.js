import React, { useRef } from 'react'
import { useFirebase } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import Tooltips from "@material-tailwind/react/Tooltips";
import TooltipsContent from "@material-tailwind/react/TooltipsContent";


const Header = ({ isOpen, setIsOpen }) => {

    const uid = useSelector(state => state.firebase.auth.uid)
    const profile = useSelector(state => state.firebase.profile)

    const firebase = useFirebase()

    const toggleButon = () => {
        setIsOpen(!isOpen)
    }

    const buttonRef = useRef();

    const signout = () => {
        firebase.database().ref("users").child(uid).update({ isActive: false }) // Logout yapan kullanıcının aktif özelliği false yapma
        firebase.logout();
        firebase.logout();
        // return (
        //     <Dropdown>
        //         <DropdownItem color="lightBlue" ripple="light">
        //             Action
        //         </DropdownItem>
        //         <DropdownLink
        //             href="#"
        //             color="red"
        //             ripple="light"
        //             onClick={() => firebase.logout()}
        //         >
        //             Another Action
        //         </DropdownLink>
        //         <DropdownItem color="lightBlue" ripple="light">
        //             Something else
        //         </DropdownItem>
        //     </Dropdown>
        // )

    }

    return (
        <header className="flex justify-between items-center py-3 border-b-2 border-gray-400">
            <div className="flex">
                <button className="text-gray-600 lg:hidden" onClick={toggleButon}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <div className="ml-2 lg:ml-0 text-gray-500 font-semibold text-lg">React Chat App</div>
            </div>

            {/* Icons */}
            <div className="flex items-center">
                <button className="text-gray-500" >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                </button>
                <button ref={buttonRef} onClick={signout} className="text-gray-500 object-cover pl-4">

                    {/* <img className="w-9 h-9 rounded-full" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=144&h=144&q=80" alt="Profile" /> */}
                    <img className="w-9 h-9 rounded-full" src={profile?.avatar} alt={profile?.name} />
                </button>
                <Tooltips placement="bottom" ref={buttonRef}>
                    <TooltipsContent>Sign Out</TooltipsContent>
                </Tooltips>


            </div>
        </header>
    )
}

export default Header
