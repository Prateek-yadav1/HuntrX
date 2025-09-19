import React, { useState, useEffect } from "react";
import AddPostForm from "./AddPostForm";
import PostCard from "./Postcard";
import avatar2 from "../assets/avatar2.jpg";

const API_URL = "http://localhost:5050/api/posts";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts from backend
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  // Add new post
  const handleAddPost = async (newPost) => {
    let imageBase64 = "";
    if (newPost.image) {
      imageBase64 = await toBase64(newPost.image);
    }
    const postData = {
      userAvatar: newPost.userAvatar,
      userName: newPost.userName,
      userDesignation: newPost.userDesignation,
      time: newPost.time,
      content: newPost.text,
      image: imageBase64,
    };
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });
    const savedPost = await res.json();
    setPosts([savedPost, ...posts]);
  };

  // Utility to convert image file to base64
  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-full max-w-180 flex flex-col gap-4">
      <AddPostForm onAddPost={handleAddPost} />
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          onDelete={() => handleDeletePost(post._id)}
        />
      ))}
    </div>
  );
}
