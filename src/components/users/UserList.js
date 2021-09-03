import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import Tooltips from "@material-tailwind/react/Tooltips";
import TooltipsContent from "@material-tailwind/react/TooltipsContent";
import moment from 'moment';

const UserList = () => {

    const activeRef = useRef()
    useFirebaseConnect([{ path: "users" }]) // Firebase'de channeldeki değişiklerin dinleme
    const users = useSelector(state => state.firebase.ordered.users)

    if (!isLoaded(users)) {
        return "Loading users"
    }

    if (isEmpty(users)) {
        return "No users"
    }



    return (
        <div >
            {users.map(user => (
                <>
                    <a key={user?.key} className="flex justify-between items-center px-3 py-2" href="/#">
                        <span className="text-sm text-gray-700 font-medium">{user?.value.name}</span>
                        <span ref={activeRef} className={`text-sm font-semibold ${user?.value.isActive ? 'text-green-700' : 'text-red-700'}`}>
                            {user?.value.isActive ? <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
                            </svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
                            </svg>}
                        </span>

                    </a>
                    <Tooltips placement="bottom" ref={activeRef}>
                        <TooltipsContent>{moment(user.value.lastLoginData).fromNow()}</TooltipsContent>
                    </Tooltips>
                </>
            ))}
        </div>
    )
}

export default UserList
