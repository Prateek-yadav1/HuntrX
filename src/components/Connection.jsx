import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ConnectionsPage({ currentUserId }) {
  const [users, setUsers] = useState([]);
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5050/api/users").then((res) => setUsers(res.data));
    axios.get(`http://localhost:5050/api/connections/${currentUserId}`).then((res) => setConnections(res.data));
  }, [currentUserId]);

  const sendRequest = async (recipientId) => {
    await axios.post(`http://localhost:5050/api/connections/request/${recipientId}`, {
      userId: currentUserId
    });
    // Refresh connections after sending request
    const res = await axios.get(`http://localhost:5050/api/connections/${currentUserId}`);
    setConnections(res.data);
    alert("Request sent!");
  };

  const acceptRequest = async (requestId) => {
    await axios.post(`http://localhost:5050/api/connections/accept/${requestId}`);
    // Refresh connections after accepting request
    const res = await axios.get(`http://localhost:5050/api/connections/${currentUserId}`);
    setConnections(res.data);
    alert("Request accepted!");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">People You May Know</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {users.filter(u => u._id !== currentUserId).map(user => {
          const alreadyRequested = connections.some(
            c => c.requester._id === currentUserId && c.recipient._id === user._id && c.status === "pending"
          );
          return (
            <div key={user._id} className="bg-white shadow rounded-lg p-2 flex flex-col items-center">
              <img
                src={user.avatar || "/default-avatar.png"}
                alt={user.name}
                className="w-12 h-12 rounded-full mb-2 object-cover"
              />
              <div className="text-base font-semibold">{user.name}</div>
              <div className="text-xs text-gray-500">{user.email}</div>
              <button
                onClick={() => sendRequest(user._id)}
                className={`mt-2 px-3 py-1 text-sm rounded ${alreadyRequested ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
                disabled={alreadyRequested}
              >
                {alreadyRequested ? "Request Sent" : "Connect"}
              </button>
            </div>
          );
        })}
      </div>

      <h2 className="text-xl font-bold mt-6 mb-4">Connection Requests</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {connections
          .filter(c => c.status === "pending" && c.recipient._id === currentUserId)
          .map(req => (
            <div key={req._id} className="bg-gray-100 shadow rounded-lg p-2 flex flex-col items-center">
              <img
                src={req.requester.avatar || "/default-avatar.png"}
                alt={req.requester.name}
                className="w-12 h-12 rounded-full mb-2 object-cover"
              />
              <div className="text-base font-semibold">{req.requester.name}</div>
              <div className="text-xs text-gray-500">{req.requester.email}</div>
              <button
                onClick={() => acceptRequest(req._id)}
                className="mt-2 bg-green-600 text-white px-3 py-1 text-sm rounded hover:bg-green-700"
              >
                Accept
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
