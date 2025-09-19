import React, { useState, useEffect } from "react";
import { getMessages, sendMessage } from "../services/api";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    async function fetchData() {
      const data = await getMessages();
      setMessages(data);
    }
    fetchData();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMsg = await sendMessage("Prateek", input);
    setMessages([newMsg, ...messages]); // Add to top
    setInput("");
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-lg rounded">
      <h2 className="text-xl font-bold mb-4">Chat</h2>
      <div className="h-64 overflow-y-auto border p-2 mb-2">
        {messages.map((msg) => (
          <div key={msg._id} className="mb-2">
            <strong>{msg.sender}:</strong> {msg.content}
            <span className="text-xs text-gray-400 ml-2">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          className="flex-1 border p-2 rounded-l"
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
    </div>
  );
}
