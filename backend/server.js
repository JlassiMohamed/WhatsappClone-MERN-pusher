console.clear();
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/connectDB.js";
import message from "./router/message.js";
import Pusher from "pusher";

// app config
const app = express();
dotenv.config();
// pusher
const pusher = new Pusher({
  appId: "1202958",
  key: "a6de2f4eb749a61a3f1c",
  secret: "741f366f412ae4fde97b",
  cluster: "eu",
  useTLS: true,
});

// middleware
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

// DB config
connectDB();
// .....
const db = mongoose.connection;
db.once("open", () => {
  console.log("connected");
  const msgCollection = db.collection("messages");
  const changeStream = msgCollection.watch();
  changeStream.on("change", (change) => {
    if (change.operationType == "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        // name: messageDetails.name,
        // message: messageDetails.message,
        // timestamp: messageDetails.timestamp,
        // received: messageDetails.received,
        // _id: messageDetails._id,
        ...messageDetails,
      });
    } else {
      console.log("error in pusher");
    }
  });
});
// api routes
app.get("/", (req, res) => res.send("hello world"));

app.use("/api/message", message);
//listen
const PORT = process.env.PORT;
app.listen(PORT, (err) =>
  err ? console.error(err) : console.log("server is running", PORT)
);
