import express from "express";
import Message from "../models/Message.js";
const router = express.Router();

// Get messages between two users
router.get("/", async (req, res) => {
  const { user1, user2 } = req.query;
  if (!user1 || !user2) return res.status(400).json({ error: "Missing user IDs" });
  const messages = await Message.find({
    $or: [
      { sender: user1, recipient: user2 },
      { sender: user2, recipient: user1 }
    ]
  }).sort({ timestamp: 1 });
  res.json(messages);
});

// Send a message
router.post("/", async (req, res) => {
  const { sender, recipient, senderName, content } = req.body;
  if (!sender || !recipient || !content) return res.status(400).json({ error: "Missing fields" });
  const msg = new Message({ sender, recipient, senderName, content });
  await msg.save();
  res.json(msg);
});

export default router;