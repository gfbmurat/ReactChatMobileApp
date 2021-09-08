import React, { useState } from "react";
import ChannelHeader from "./components/ChannelHeader";
import CreateChannelForm from "./components/channels/CreateChannelForm";
import Comment from "./components/Comment";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { ToastContainer } from "react-toastify";
import { useSelector } from 'react-redux'
import { useFirebase } from 'react-redux-firebase'

function App() {

  const [isOpen, setIsOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const firebase = useFirebase()
  const currentUser = useSelector(state => state.userReducer.currentUser)
  const uid = useSelector(state => state.firebase.auth.uid)

  if (currentUser && currentUser.user.additionalUserInfo.isNewUser === false) { // Giriş yapan kullanıcı yeni değilse yani sadece login yapıyorsa
    const timestamp = firebase.database.ServerValue.TIMESTAMP
    firebase.database().ref("users").child(uid).update({ isActive: true, lastLoginData: timestamp }) // Login yapan kullanıcının aktif özelliği true yapma
  }

  return (
    <div className={`h-screen flex dark:bg-gray-900`}>
      <div className={`${showModal ? 'blur' : ''} border-r-[1px] border-gray-300`}>
        <Sidebar showModal={showModal} setShowModal={setShowModal} isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <CreateChannelForm showModal={showModal} setShowModal={setShowModal} />

      <div className="flex-1 h-screen min-w-0 px-8 py-4">
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className={`mt-2 h-[90%] flex border-[1px] border-gray-300 flex-col rounded-md p-2 ${showModal ? 'blur' : ''}`}>
          <ChannelHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Comment searchTerm={searchTerm} />
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
