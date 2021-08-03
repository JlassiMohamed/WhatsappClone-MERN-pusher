import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import React, { useState } from "react";
import axios from "../axios";
import "./Chat.css";
const Chat = ({ messages }) => {
  const [message, setMessage] = useState("");

  const handleMessage = async (e) => {
    e.preventDefault();
    await axios.post("/message/new", {
      message: message,
      name: "sara",
      timestamp: "i am a demo date",
      received: true,
    });
    setMessage("");
  };
  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar />
        <div className="chat_headerInfo">
          <h3>Room Name</h3>
          <p>Last seen at...</p>
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>{" "}
          <IconButton>
            <AttachFile />
          </IconButton>{" "}
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {messages.map((el) => (
          <p
            className={
              el.received ? " chat_message chat_reciever" : " chat_message"
            }
          >
            <span className="chat_name">{el.name}</span>
            {el.message}
            <span className="chat_timestamp">{el.timestamp}</span>
          </p>
        ))}
      </div>
      <div className="chat_footer">
        <InsertEmoticon />
        <form onSubmit={handleMessage}>
          <input
            placeholder=" type a messsage"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handleMessage} type="submit">
            Send a message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
};

export default Chat;
