import React, { useState } from "react";
import { Image } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

export default function AddPostForm({ onAddPost }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const { user } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() && !image) return;

    // Pass new post data to parent, including user info
    onAddPost({
      text,
      image,
      userName: user?.fullName || user?.firstName || "User",
      userAvatar: user?.imageUrl || "",
      userDesignation: "Member", // or user?.publicMetadata?.designation
      time: Date.now(),
    });

    setText("");
    setImage(null);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6 w-full mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your thoughts..."
          className="w-full border border-gray-300 rounded-lg p-2 resize-none focus:outline-blue-500"
          rows="3"
        />
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="w-full max-h-60 object-contain rounded-md"
          />
        )}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-gray-500 cursor-pointer hover:text-[#28282B]">
            <Image size={20} />
            <span className="text-sm">Photo</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="hidden"
            />
          </label>
          <button
            type="submit"
            className="px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}
