import React, { useState, useEffect } from "react";
import { Heart, MessageCircle, Share2 } from "lucide-react";

function timeAgo(timestamp) {
  const now = Date.now();
  const diff = Math.floor((now - timestamp) / 1000); // seconds
  if (diff < 60) return `${diff} sec ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} h ago`;
  return `${Math.floor(diff / 86400)} d ago`;
}

const PostCard = ({ post, onDelete }) => {
  // Unique key for each post (use post.id or similar unique value)
  const postKey = `post-${post.id || post.userName}-${post.time}`;

  // Load likes/comments from localStorage
  const getStoredData = () => {
    const data = localStorage.getItem(postKey);
    if (data) return JSON.parse(data);
    return {
      likes: typeof post.likes === "number" && !isNaN(post.likes) ? post.likes : 0,
      isLiked: false,
      comments: [],
    };
  };

  const [data, setData] = useState(getStoredData());
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  // Real-time time ago
  const [timeString, setTimeString] = useState(
    typeof post.time === "number" ? timeAgo(post.time) : post.time
  );

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(postKey, JSON.stringify(data));
  }, [data, postKey]);

  useEffect(() => {
    if (typeof post.time === "number") {
      const interval = setInterval(() => {
        setTimeString(timeAgo(post.time));
      }, 60000); // update every minute
      return () => clearInterval(interval);
    }
  }, [post.time]);

  const handleLike = () => {
    setData((prev) => ({
      ...prev,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
      isLiked: !prev.isLiked,
    }));
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setData((prev) => ({
      ...prev,
      comments: [...prev.comments, newComment],
    }));
    setNewComment("");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Post link copied to clipboard!");
  };

  return (
    <div className="bg-white shadow-xs rounded-lg p-4 mb-6 w-full mx-auto">
      <div className="flex items-center mb-4">
        <img
          src={post.userAvatar}
          alt={post.userName}
          className="h-12 w-12 rounded-full object-cover mr-3"
        />
        <div>
          <h3 className="text-sm font-semibold">{post.userName}</h3>
          <p className="text-xs text-gray-500">{post.userDesignation}</p>
          <p className="text-xs text-gray-400">{timeString}</p>
        </div>
      </div>

      {/* --- Content --- */}
      <div className="mb-4">
        <p className="text-gray-800">{post.content}</p>
        {post.image && (
          <img
            src={post.image}
            alt="post"
            className="mt-3 w-full rounded-lg"
          />
        )}
      </div>

      {/* --- Action buttons --- */}
      <div className="flex justify-between items-center text-gray-700 text-sm bg-gray-50 px-4 py-3 rounded-xl shadow-sm">
        <button
          onClick={handleLike}
          className="flex items-center gap-1 transition hover:text-[#28282B]"
        >
          <Heart
            size={18}
            className={data.isLiked ? "text-red-500" : ""}
            fill={data.isLiked ? "red" : "none"}
          />
          <span>{data.likes} Like</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1 hover:text-[#28282B] transition"
        >
          <MessageCircle size={18} />
          <span>Comments</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-1 hover:text-[#28282B] transition"
        >
          <Share2 size={18} />
          <span>Share</span>
        </button>

      </div>

      {/* --- Comment Section --- */}
      {showComments && (
        <div className="mt-4 pt-3">
          {/* Existing comments */}
          {data.comments.length > 0 ? (
            <div className="space-y-2 mb-3">
              {data.comments.map((c, i) => (
                <div
                  key={i}
                  className="bg-gray-100 px-3 py-2 rounded-md text-sm text-gray-700"
                >
                  {c}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 mb-2">No comments yet.</p>
          )}

          {/* Add new comment */}
          <div className="flex gap-2">
            <input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 border border-gray-300 rounded-full px-2 py-1 text-sm focus:outline-blue-500"
              placeholder="Write a comment..."
            />
            <button
              onClick={handleAddComment}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
            >
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
