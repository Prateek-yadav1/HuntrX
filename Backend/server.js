import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ MongoDB Error:", err));

// Example Schema
const MessageSchema = new mongoose.Schema({
  sender: String,
  content: String,
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", MessageSchema);

// Routes
app.get("/", (req, res) => res.send("API running ✅"));

// Fetch all messages
app.get("/api/messages", async (req, res) => {
  const messages = await Message.find().sort({ timestamp: -1 });
  res.json(messages);
});

// Add a new message
app.post("/api/messages", async (req, res) => {
  const { sender, content } = req.body;
  const newMsg = new Message({ sender, content });
  await newMsg.save();
  res.json(newMsg);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
