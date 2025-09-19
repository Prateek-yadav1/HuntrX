import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  avatar: String,
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

export default mongoose.model("User", userSchema);
