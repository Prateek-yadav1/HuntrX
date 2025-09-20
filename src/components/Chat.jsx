import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { useParams } from "react-router-dom";

export default function Chat({ currentUserId }) {
  const { userId } = useParams();
  const [connections, setConnections] = useState([]);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { user } = useUser();

  // Fetch connections
  useEffect(() => {
    if (currentUserId) {
      axios
        .get(`http://localhost:5050/api/connections/${currentUserId}`)
        .then((res) => {
          const accepted = res.data.filter((c) => c.status === "accepted");
          setConnections(accepted);
        });
    }
  }, [currentUserId]);

  // Fetch messages for selected connection
  useEffect(() => {
    if (selectedConnection) {
      axios
        .get(
          `http://localhost:5050/api/messages?user1=${currentUserId}&user2=${selectedConnection._id}`
        )
        .then((res) => setMessages(res.data));
    }
  }, [selectedConnection, currentUserId]);

  // Set selected connection based on URL param
  useEffect(() => {
    if (connections.length && userId) {
      const found = connections
        .map((conn) => {
          if (!conn.requester || !conn.recipient) return null;
          const otherUser =
            conn.requester._id === currentUserId
              ? conn.recipient
              : conn.requester;
          return otherUser;
        })
        .find((u) => u && u._id === userId);
      if (found) setSelectedConnection(found);
    }
  }, [connections, userId, currentUserId]);

  // Send message
  const handleSend = async () => {
    if (!input.trim() || !selectedConnection) return;
    const senderName = user?.fullName || user?.firstName || "User";
    await axios.post("http://localhost:5050/api/messages", {
      sender: currentUserId,
      recipient: selectedConnection._id,
      senderName,
      content: input,
    });
    setInput("");
    // Refresh messages
    axios
      .get(
        `http://localhost:5050/api/messages?user1=${currentUserId}&user2=${selectedConnection._id}`
      )
      .then((res) => setMessages(res.data));
  };

  return (
    <div className="flex max-w-5xl mx-auto mt-5 bg-white rounded-xl shadow-lg overflow-hidden h-[700px]">
      {/* Connections Sidebar */}
      <div className="w-1/3 bg-gray-50 border-r border-gray-300 p-4 overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Your Connections</h2>
        {connections.length === 0 ? (
          <div className="text-gray-500">No connections yet.</div>
        ) : (
          <ul>
            {connections.map((conn) => {
              // Defensive checks
              if (!conn.requester || !conn.recipient) return null;
              const otherUser =
                conn.requester._id === currentUserId
                  ? conn.recipient
                  : conn.requester;
              if (!otherUser || !otherUser._id) return null;
              return (
                <li
                  key={otherUser._id}
                  className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer mb-2 hover:bg-blue-100 ${
                    selectedConnection &&
                    selectedConnection._id === otherUser._id
                      ? "bg-blue-200"
                      : ""
                  }`}
                  onClick={() => setSelectedConnection(otherUser)}
                >
                  <img
                    src={otherUser.avatar || "/default-avatar.png"}
                    alt={otherUser.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-medium">{otherUser.name}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto">
          {selectedConnection ? (
            <>
              <div className="text-lg font-semibold mb-2">
                Chat with {selectedConnection.name}
              </div>
              <div className="space-y-2">
                {messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`flex ${
                      msg.sender === currentUserId
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`px-3 py-2 rounded-lg max-w-xs ${
                        msg.sender === currentUserId
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      <div className="text-sm">{msg.content}</div>
                      <div className="text-xs text-right mt-1 opacity-70">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-gray-500 flex items-center justify-center h-full">
              Select a connection to start chatting.
            </div>
          )}
        </div>
        {/* Input */}
        {selectedConnection && (
          <div className="p-4 border-t border-gray-300 flex">
            <input
              className="flex-1 border border-gray-300 p-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-4 rounded-r"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
