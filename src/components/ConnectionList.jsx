import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ConnectionsList({ currentUserId }) {
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    if (currentUserId) {
      axios.get(`http://localhost:5050/api/connections/${currentUserId}`)
        .then(res => {
          // Filter only accepted connections
          const accepted = res.data.filter(c => c.status === "accepted");
          setConnections(accepted);
        });
    }
  }, [currentUserId]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Your Connections</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {connections.map(conn => {
          // Show the other user (not current user)
          const otherUser = conn.requester._id === currentUserId ? conn.recipient : conn.requester;
          return (
            <div key={conn._id} className="bg-white shadow rounded-lg p-2 flex flex-col items-center">
              <img
                src={otherUser.avatar || "/default-avatar.png"}
                alt={otherUser.name}
                className="w-12 h-12 rounded-full mb-2 object-cover"
              />
              <div className="text-base font-semibold">{otherUser.name}</div>
              <div className="text-xs text-gray-500">{otherUser.email}</div>
            </div>
          );
        })}
        {connections.length === 0 && (
          <div className="text-gray-500 col-span-full text-center">No connections yet.</div>
        )}
      </div>
    </div>
  );
}