import React from "react";
import Message from "./components/Message";
import Sidebar from "./components/Sidebar";

function App() {

  const users = [
    { id: 1, name: 'Dracarys', notification: 23 },
    { id: 2, name: 'Muhammed', notification: 5 },
    { id: 3, name: 'Elif', notification: 12 },
    { id: 4, name: 'Gönül', notification: 42 },
    { id: 5, name: 'Fuat', notification: 3 },
  ]

  const channels = [
    { id: 1, name: 'Genel', notification: 23 },
    { id: 2, name: 'Active Channel', notification: 5 },
    { id: 3, name: 'Şarkı Öneri', notification: 12 },
    { id: 4, name: 'Private Channel', notification: 42 },
    { id: 5, name: 'Fenerbahçe', notification: 1907 },
  ]

  return (
    <div className="h-full flex divide-x-2 divide-gray-300">
      {/* Sidebar */}
      <Sidebar users={users} channels={channels} />
      {/* Main  */}
      <div className="flex-1 min-w-0  px-8 py-4">
        <header className="flex justify-between items-center py-3">
          <div className="text-gray-500 font-semibold text-lg">React Chat App</div>
          {/* Icons */}
          <div className="flex items-center">
            <button className="text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <button className="text-gray-500 object-cover pl-4">
              <img className="w-9 h-9 rounded-full" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=144&h=144&q=80" alt="Profile" />
            </button>
          </div>
        </header>

        <div className="flex flex-col border-solid border-2 rounded-md p-2 border-gray-300 h-4/5">
          {/* Channel Info  */}
          <div className="mt-4 bg-gray-400 flex justify-between items-center p-3 rounded-md">
            <h3 className="text-white font-medium">#Genel</h3>
            <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Search Message" />
          </div>



          {/* Comment Side */}
          <div className="mt-4 pl-4 mb-4  border-gray h-[800px] rounded-md">
            <Message name={"Dracarys"} message={"Merhaba tailwindcss ile react"} />
          </div>
          {/* Input Send Message */}
          <div className="flex-auto justify-end items-end">
            <input className=" w-full  shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="message" type="text" placeholder="Genel kanalına mesaj gönder." />
          </div>
        </div>




      </div>

    </div>
  );
}

export default App;
