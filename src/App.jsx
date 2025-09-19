import React, { useState, useEffect } from "react";
import TopBar from "./components/topBar";
import Sidebar from "./components/Sidebar";
import Home_Layout from "./components/home_Layout";
import Chat from "./components/Chat";
import ConnectionsPage from "./components/Connection";
import { Routes, Route } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

const App = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { user } = useUser();
  const currentUserId = user?.id; // or user?.publicMetadata?.mongoId if you sync Clerk with MongoDB

  useEffect(() => {
    if (user) {
      axios.post("http://localhost:5050/api/users", {
        name: user.fullName || user.firstName || "User",
        email: user.primaryEmailAddress?.emailAddress,
        avatar: user.imageUrl,
      });
    }
  }, [user]);

  return (
    <div className="flex flex-col h-screen">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="flex-1 overflow-auto p-6 bg-gray-100">
          <Routes>
            <Route path="/" element={<Home_Layout />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/network" element={<ConnectionsPage currentUserId={currentUserId} />} />
            {/* other routes */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
