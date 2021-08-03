import { useEffect, useState } from "react";
import "./App.css";
import Chat from "./Components/Chat";
import SideBar from "./Components/SideBar";
import Pusher from "pusher-js";
import axios from "./axios";
function App() {
  const [message, setMessage] = useState([]);
  useEffect(() => {
    axios.get("/message/sync").then((res) => setMessage(res.data));
  }, []);

  useEffect(() => {
    const pusher = new Pusher("a6de2f4eb749a61a3f1c", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      setMessage([...message, newMessage]);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [message]);

  return (
    <div className="app">
      <div className="app_body">
        {/* sidebar Components */}
        <SideBar />
        {/* chat components */}
        <Chat messages={message} />
      </div>
    </div>
  );
}

export default App;
