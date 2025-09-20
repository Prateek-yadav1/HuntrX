import React, { useEffect, useState } from "react";
import axios from "axios";
import { ShieldCheck } from "lucide-react";

export default function ConnectionsPage({ currentUserId }) {
  const [users, setUsers] = useState([]);
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5050/api/users").then((res) => setUsers(res.data));
    axios
      .get(`http://localhost:5050/api/connections/${currentUserId}`)
      .then((res) => setConnections(res.data));
  }, [currentUserId]);

  const sendRequest = async (recipientId) => {
    await axios.post(`http://localhost:5050/api/connections/request/${recipientId}`, {
      userId: currentUserId,
    });
    const res = await axios.get(`http://localhost:5050/api/connections/${currentUserId}`);
    setConnections(res.data);
  };

  const acceptRequest = async (requestId) => {
    await axios.post(`http://localhost:5050/api/connections/accept/${requestId}`);
    const res = await axios.get(`http://localhost:5050/api/connections/${currentUserId}`);
    setConnections(res.data);
  };

  // Reusable portrait-style card
  const UserCard = ({ user, actionBtn }) => (
    <div className="flex flex-col bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition overflow-hidden h-80 w-70">
      {/* Banner */}
      <div className="h-24 bg-gray-100 relative">
        <img
          src={user?.avatar || "/default-avatar.png"}
          alt={user?.name}
          className="absolute w-20 h-20 rounded-full border-4 border-white left-1/2 -translate-x-1/2 -bottom-10 object-cover shadow-md"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center px-4 pt-14 pb-4 text-center">
        <div className="flex items-center justify-center gap-1">
          <h3 className="text-lg font-semibold text-gray-800">{user?.name}</h3>
          <ShieldCheck className="h-4 w-4 text-gray-600" />
        </div>
        <p className="text-sm text-gray-500 mt-1 break-words">{user?.email}</p>

        {/* Spacer to push button down */}
        <div className="flex-1" />

        {/* Action button */}
        <div className="w-full">{actionBtn}</div>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Suggested Connections */}
      <h1 className="text-3xl font-extrabold mb-10 text-slate-700">
        People You May Know
      </h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {users
          .filter((u) => {
            if (u._id === currentUserId) return false;
            const isConnected = connections.some(
              (c) =>
                c.status === "accepted" &&
                ((c.requester?._id === currentUserId && c.recipient?._id === u._id) ||
                  (c.recipient?._id === currentUserId && c.requester?._id === u._id))
            );
            return !isConnected;
          })
          .map((user) => {
            const alreadyRequested = connections.some(
              (c) =>
                c.requester?._id === currentUserId &&
                c.recipient?._id === user._id &&
                c.status === "pending"
            );
            return (
              <UserCard
                key={user._id}
                user={user}
                actionBtn={
                  <button
                    onClick={() => sendRequest(user._id)}
                    disabled={alreadyRequested}
                    className={`mt-2 w-full py-2 text-sm rounded-md font-medium transition ${
                      alreadyRequested
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {alreadyRequested ? "Request Sent" : "Connect"}
                  </button>
                }
              />
            );
          })}
        {/* Show message if no suggestions */}
        {users.filter((u) => {
          if (u._id === currentUserId) return false;
          const isConnected = connections.some(
            (c) =>
              c.status === "accepted" &&
              ((c.requester?._id === currentUserId && c.recipient?._id === u._id) ||
                (c.recipient?._id === currentUserId && c.requester?._id === u._id))
          );
          return !isConnected;
        }).length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-10">
            No suggestions at the moment.
          </div>
        )}
      </div>

      {/* Connection Requests */}
      <h1 className="text-3xl font-extrabold mb-10 text-slate-700 mt-20">
        Connection Requests
      </h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {connections
          .filter((c) => c.status === "pending" && c.recipient?._id === currentUserId)
          .map((req) => (
            <UserCard
              key={req._id}
              user={req.requester}
              actionBtn={
                <button
                  onClick={() => acceptRequest(req._id)}
                  className="mt-2 w-full bg-green-600 text-white py-2 text-sm rounded-md font-medium hover:bg-green-700 transition"
                >
                  Accept
                </button>
              }
            />
          ))}
        {/* Show message if no requests */}
        {connections.filter((c) => c.status === "pending" && c.recipient?._id === currentUserId).length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-10">
            No connection requests.
          </div>
        )}
      </div>
    </div>
  );
}
