import { useRef } from 'react'
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

    // Uygulama ilk açıldığında user theme class olarak ekleme
    const root = window.document.documentElement
    root.className = profile.theme

    const buttonRef = useRef();
    const themeRef = useRef();

    const signout = () => {
        firebase.database().ref("users").child(uid).update({ isActive: false }) // Logout yapan kullanıcının aktif özelliği false yapma
        firebase.logout();
    }

    const updateTheme = () => {
        if (profile.theme === "light") {
            firebase.database().ref("users").child(uid).update({ theme: "dark" })
            root.classList.remove("dark");
            root.classList.add(profile.theme)
        } else if (profile.theme === "dark") {
            firebase.database().ref("users").child(uid).update({ theme: "light" })
            root.classList.remove("light");
            root.classList.add(profile.theme);
        }
    }

    return (
        <header className="flex justify-between items-center py-3 border-b-2 border-gray-400 ">
            <div className="flex">
                <button className="text-gray-600 lg:hidden dark:text-gray-300" onClick={toggleButon}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <div onClick={() => isOpen === true ? setIsOpen(false) : console.log()} className="ml-2 lg:ml-0 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 font-black text-lg">React Chat App</div>
            </div>

            {/* Icons */}
            <div className="flex items-center">
                <button ref={themeRef} onClick={updateTheme} className="text-gray-500 mr-2" >
                    {
                        profile.theme === "light" ? <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    }
                </button>
                <button className="text-gray-500" >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                </button>
                <button ref={buttonRef} onClick={signout} className="text-gray-500 object-cover pl-4">
                    <img className="w-9 h-9 rounded-full" src={profile?.avatar} alt={profile?.name} />
                </button>
                <Tooltips placement="bottom" ref={buttonRef}>
                    <TooltipsContent>Sign Out</TooltipsContent>
                </Tooltips>
                <Tooltips placement="bottom" ref={themeRef}>
                    <TooltipsContent>{profile.theme === "light" ? "Dark Theme" : "Light Theme"}</TooltipsContent>
                </Tooltips>
            </div>
        </header>
    )
}

export default Header
