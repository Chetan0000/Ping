"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
const ChatPage = () => {
  const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    const { data } = await axios.get("/chats");
    setChats(data);
  };
  useEffect(() => {
    fetchChats();
  }, []);
  console.log(chats);
  return (
    <>
      <h1>This is chat page</h1>
      <div className="text-red">
        {chats.map((chat) => {
          return <div key={chat._id}>{chat.chatName}</div>;
        })}
      </div>
    </>
  );
};

export default ChatPage;
