import React, { useState } from "react";
import ChannelHeader from "./components/ChannelHeader";
import CreateChannelForm from "./components/channels/CreateChannelForm";
import Comment from "./components/Comment";
import Header from "./components/Header";
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

  const [isOpen, setIsOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="h-screen flex">
      <Sidebar showModal={showModal} setShowModal={setShowModal} isOpen={isOpen} setIsOpen={setIsOpen} users={users} channels={channels} />
      <CreateChannelForm showModal={showModal} setShowModal={setShowModal} />
      <div className="flex-1 h-screen min-w-0 px-8 py-4">
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="mt-2 h-[90%] flex border-[1px] border-gray-300 flex-col rounded-md p-2">
          <ChannelHeader />
          <Comment />
        </div>
      </div>

    </div>
  );
}

export default App;
