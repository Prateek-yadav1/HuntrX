import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  senderName: String,
  content: String,
  timestamp: { type: Date, default: Date.now }
});

// Only create the model if it doesn't already exist
export default mongoose.models.Message || mongoose.model("Message", MessageSchema);