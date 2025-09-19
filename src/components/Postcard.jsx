import React from "react";
import { Heart, MessageCircle, Share2 } from "lucide-react";

const PostCard = ({ post }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6 w-full max-w-xl mx-auto">
      <div className="flex items-center mb-4">
        <img
          src={post.userAvatar}
          alt={post.userName}
          className="h-12 w-12 rounded-full object-cover mr-3"
        />
        <div>
          <h3 className="text-sm font-semibold">{post.userName}</h3>
          <p className="text-xs text-gray-500">{post.userDesignation}</p>
          <p className="text-xs text-gray-400">{post.time}</p>
        </div>
      </div>

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

      <div className="flex justify-between text-gray-500 text-sm border-t pt-3">
        <button className="flex items-center gap-1 hover:text-[#28282B] transition">
          <Heart size={18} />
          <span>Like</span>
        </button>
        <button className="flex items-center  gap-1 hover:text-[#28282B] transition">
          <MessageCircle size={18} />
          <span>Comment</span>
        </button>
        <button className="flex items-center gap-1 hover:text-[#28282B] transition">
          <Share2 size={18} />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
