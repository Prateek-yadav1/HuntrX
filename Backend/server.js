import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import connectionsRouter from "./routes/connections.js";

dotenv.config();
const app = express();

app.use(cors());

// OR if using express.json() and express.urlencoded()
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));


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

// New Post Schema
const PostSchema = new mongoose.Schema({
  userAvatar: String,
  userName: String,
  userDesignation: String,
  time: { type: Number, default: Date.now }, // timestamp
  content: String,
  image: String,
  likes: { type: Number, default: 0 },
  comments: [
    {
      userName: String,
      userAvatar: String,
      text: String,
      time: { type: Number, default: Date.now }
    }
  ]
});

const Post = mongoose.model("Post", PostSchema);

// Project Schema
const ProjectSchema = new mongoose.Schema({
  name: String,
  // add other fields as needed
});

const Project = mongoose.model("Project", ProjectSchema);

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

// Fetch all posts
app.get("/api/posts", async (req, res) => {
  const posts = await Post.find().sort({ time: -1 });
  res.json(posts);
});

// Add a new post
app.post("/api/posts", async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  res.json(post);
});

// Delete a post
app.delete("/api/posts/:id", async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Like a post
app.post("/api/posts/:id/like", async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.likes += 1;
  await post.save();
  res.json(post);
});

// Add a comment
app.post("/api/posts/:id/comment", async (req, res) => {
  const { userName, userAvatar, text } = req.body;
  const post = await Post.findById(req.params.id);
  post.comments.push({ userName, userAvatar, text, time: Date.now() });
  await post.save();
  res.json(post);
});

// Fetch all projects
app.get("/api/projects", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

// Add a new user
app.post("/api/users", async (req, res) => {
  try {
    const { name, email, avatar } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email, avatar });
      await user.save();
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch all users
app.get("/api/users", async (req, res) => {
  try {
    if (req.query.email) {
      const user = await User.findOne({ email: req.query.email });
      return res.json(user);
    }
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Connection routes
app.use("/api/connections", connectionsRouter);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
