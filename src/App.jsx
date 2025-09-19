import React, { useState, useEffect } from "react";
import TopBar from "./components/topBar";
import Sidebar from "./components/Sidebar";
import Home_Layout from "./components/home_Layout";
import Chat from "./components/Chat";
import ConnectionsPage from "./components/Connection";
import ConnectionsList from "./components/ConnectionList";
import { Routes, Route } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

import Profile from "./components/Profile.jsx"; // ✅ import profile page
import Opportunity from "./components/Opportunity.jsx";
import OpportunityDetails from "./components/OpportunityDetails.jsx";


const App = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [mongoUserId, setMongoUserId] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      axios
        .post("http://localhost:5050/api/users", {
          name: user.fullName || user.firstName || "User",
          email: user.primaryEmailAddress?.emailAddress,
          avatar: user.imageUrl,
        })
        .then(() => {
          axios
            .get(
              `http://localhost:5050/api/users?email=${user.primaryEmailAddress?.emailAddress}`
            )
            .then((res) => setMongoUserId(res.data._id));
        });
    }
  }, [user]);

  return (
    <div className="flex flex-col h-screen">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="flex-1 overflow-auto px-6 bg-gray-100">
          <Routes>
            <Route path="/" element={<Home_Layout />} />
            <Route path="/chat" element={<Chat />} />
            <Route
              path="/network"
              element={<ConnectionsPage currentUserId={mongoUserId} />}
            />
            <Route
              path="/connections"
              element={<ConnectionsList currentUserId={mongoUserId} />}
            />

            📌 New routes
            <Route path="/opportunities" element={<Opportunity />} />
            <Route path="/opportunity/:id" element={<OpportunityDetails />} />

            {/* 📌 Profile route */}
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
