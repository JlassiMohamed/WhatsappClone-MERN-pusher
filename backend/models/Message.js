import mongoose from "mongoose";
const { Schema, model } = mongoose;
const MessageSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
  received: Boolean,
});

export default model("message", MessageSchema);
