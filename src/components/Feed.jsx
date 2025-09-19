import React, { useState, useEffect } from "react";
import AddPostForm from "./AddPostForm";
import PostCard from "./Postcard";

import avatar2 from "../assets/avatar2.jpg";
import project_screenshot from "../assets/project-screenshot.jpg";

const initialPosts = [
  {
    userAvatar: avatar2,
    userName: "Jane Doe",
    userDesignation: "Software Engineer at ABC Corp",
    time: "2h ago",
    content: "Excited to share my latest project! #React #TailwindCSS",
    image: project_screenshot,
  },
  {
    userAvatar: avatar2,
    userName: "John Smith",
    userDesignation: "Product Manager",
    time: "1d ago",
    content: "Great team meeting today, lots of ideas flowing.",
  },
  {
    userAvatar: avatar2,
    userName: "Jane Doe",
    userDesignation: "Software Engineer at ABC Corp",
    time: "2h ago",
    content: "Excited to share my latest project! #React #TailwindCSS",
    image: project_screenshot,
  },
  {
    userAvatar: avatar2,
    userName: "John Smith",
    userDesignation: "Product Manager",
    time: "1d ago",
    content: "Great team meeting today, lots of ideas flowing.",
  },
  {
    userAvatar: avatar2,
    userName: "John Smith",
    userDesignation: "Product Manager",
    time: "1d ago",
    content: "Great team meeting today, lots of ideas flowing.",
  },
  {
    userAvatar: avatar2,
    userName: "Jane Doe",
    userDesignation: "Software Engineer at ABC Corp",
    time: "2h ago",
    content: "Excited to share my latest project! #React #TailwindCSS",
    image: project_screenshot,
  },
  {
    userAvatar: avatar2,
    userName: "John Smith",
    userDesignation: "Product Manager",
    time: "1d ago",
    content: "Great team meeting today, lots of ideas flowing.",
  },
  {
    userAvatar: avatar2,
    userName: "John Smith",
    userDesignation: "Product Manager",
    time: "1d ago",
    content: "Great team meeting today, lots of ideas flowing.",
  },
  {
    userAvatar: avatar2,
    userName: "Jane Doe",
    userDesignation: "Software Engineer at ABC Corp",
    time: "2h ago",
    content: "Excited to share my latest project! #React #TailwindCSS",
    image: project_screenshot,
  },
  {
    userAvatar: avatar2,
    userName: "John Smith",
    userDesignation: "Product Manager",
    time: "1d ago",
    content: "Great team meeting today, lots of ideas flowing.",
  },
];

const LOCAL_STORAGE_KEY = "huntrx-posts";

export default function Feed() {
  // Load posts from localStorage or fallback to initialPosts
  const getStoredPosts = () => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialPosts;
  };

  const [posts, setPosts] = useState(getStoredPosts);

  // Save posts to localStorage whenever posts change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  // Add new post and save to localStorage
  const handleAddPost = (newPost) => {
    const post = {
      userAvatar: avatar2,
      userName: "You",
      userDesignation: "Member",
      time: Date.now(), // store timestamp
      content: newPost.text,
      image: newPost.image ? URL.createObjectURL(newPost.image) : undefined,
      id: Date.now(),
    };
    setPosts([post, ...posts]);
  };

  return (
    <div className="w-full max-w-180 flex flex-col gap-4">
      <AddPostForm onAddPost={handleAddPost} />
      {posts.map((post, i) => (
        <PostCard key={post.id || i} post={post} />
      ))}
    </div>
  );
}
