import React, { useState } from "react";
import AddPostForm from "./AddPostForm";
import PostCard from "./Postcard";

import avatar2 from "../assets/avatar2.jpg";
import project_screenshot from "../assets/project-screenshot.jpg";

// Static posts array
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
  }

  
];

export default function Feed() {
  const [posts, setPosts] = useState(initialPosts);

  const handleAddPost = (newPost) => {
    setPosts([newPost, ...posts]); // add new post at the top
  };

  return (
    <div className="w-full max-w-180 flex flex-col gap-4">
      <AddPostForm onAddPost={handleAddPost} />

      {posts.map((post, i) => (
        <PostCard key={i} post={post} />
      ))}
    </div>
  );
}
