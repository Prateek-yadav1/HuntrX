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
    alert("Request sent!");
  };

  const acceptRequest = async (requestId) => {
    await axios.post(`http://localhost:5050/api/connections/accept/${requestId}`);
    alert("Request accepted!");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">People You May Know</h2>
      {users.filter(u => u._id !== currentUserId).map(user => (
        <div key={user._id} className="flex justify-between items-center border-b p-2">
          <span>{user.name}</span>
          <button 
            onClick={() => sendRequest(user._id)}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Connect
          </button>
        </div>
      ))}

      <h2 className="text-xl font-bold mt-6 mb-4">Connection Requests</h2>
      {connections.filter(c => c.status === "pending" && c.recipient._id === currentUserId).map(req => (
        <div key={req._id} className="flex justify-between items-center border-b p-2">
          <span>{req.requester.name}</span>
          <button 
            onClick={() => acceptRequest(req._id)}
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            Accept
          </button>
        </div>
      ))}
    </div>
  );
}
