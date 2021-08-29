import React from "react";
import Header from "./components/Header";
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
        <Header />

        <div className="flex flex-col border-solid border-2 rounded-md p-2 border-gray-300 h-4/5">
          {/* Channel Info  */}
          <div className="mt-4 bg-gray-400 flex justify-between items-center p-3 rounded-md">
            <h3 className="text-white font-medium">#Genel</h3>
            <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Search Message" />
          </div>

          {/* Comment Side */}
          <div className="mt-4 pl-4 mb-4  border-gray h-[800px] rounded-md">
            <Message name={"Dracarys"} message={"Merhaba tailwindcss ile react"} />
            <Message name={"Muhammed"} message={"Merhaba tailwindcss ile react"} />
            <Message name={"Elif"} message={"Merhaba tailwindcss ile react"} />
            <Message name={"Gönül"} message={"Merhaba tailwindcss ile react"} />
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
