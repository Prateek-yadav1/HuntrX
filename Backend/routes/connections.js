import express from "express";
import Connection from "../models/Connection.js";
import User from "../models/User.js";

const router = express.Router();

// Send request
router.post("/request/:recipientId", async (req, res) => {
  try {
    const { userId } = req.body; // current user sending request
    const { recipientId } = req.params;

    const newRequest = new Connection({ requester: userId, recipient: recipientId });
    await newRequest.save();

    res.json(newRequest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Accept request
router.post("/accept/:requestId", async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await Connection.findById(requestId);
    if (!request) return res.status(404).json({ error: "Request not found" });

    request.status = "accepted";
    await request.save();

    // Add to users' connections
    await User.findByIdAndUpdate(request.requester, { $push: { connections: request.recipient } });
    await User.findByIdAndUpdate(request.recipient, { $push: { connections: request.requester } });

    res.json({ message: "Request accepted", request });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get connections & requests
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const connections = await Connection.find({
      $or: [{ requester: userId }, { recipient: userId }]
    }).populate("requester recipient");

    res.json(connections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
