import React from "react";
import "./SideBar.css";
import { Chat, DonutLarge, MoreVert, SearchOutlined } from "@material-ui/icons";
import { Avatar, IconButton } from "@material-ui/core";
import SidebarChat from "./SidebarChat";
const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar src="https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX17055793.jpg" />
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLarge />
          </IconButton>{" "}
          <IconButton>
            <Chat />
          </IconButton>{" "}
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchOutlined />
          <input placeholder="search or start chat" type="text" />
        </div>
      </div>
      <div className="sidebar_chats">
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
      </div>
    </div>
  );
};

export default SideBar;
