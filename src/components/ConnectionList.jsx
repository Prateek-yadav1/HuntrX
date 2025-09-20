import React, { useEffect, useState } from "react";
import axios from "axios";
import { MessageCircle } from "lucide-react";

export default function ConnectionsList({ currentUserId }) {
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    if (currentUserId) {
      axios
        .get(`http://localhost:5050/api/connections/${currentUserId}`)
        .then((res) => {
          const accepted = res.data.filter((c) => c.status === "accepted");
          setConnections(accepted);
        })
        .catch((err) => console.error("Error fetching connections:", err));
    }
  }, [currentUserId]);

  return (
    <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
 <h1 className="text-3xl font-extrabold mb-10  text-slate-700">
Your Connections</h1>   
      {connections.length === 0 ? (
        <div className="text-gray-500 text-center py-6">
          You don’t have any connections yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {connections.map((conn) => {
            const requester = conn.requester;
            const recipient = conn.recipient;
            if (!requester || !recipient) return null;

            const otherUser =
              requester._id === currentUserId ? recipient : requester;
            if (!otherUser) return null;

            return (
              <div
                key={conn._id}
                className="flex flex-col bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition overflow-hidden h-80 w-70"
              >
                {/* Banner */}
                <div className="h-24 bg-gradient-to-r from-blue-100 to-purple-100 relative">
                  <img
                    src={otherUser.avatar || "/default-avatar.png"}
                    alt={otherUser.name}
                    className="absolute w-20 h-20 rounded-full border-4 border-white left-1/2 -translate-x-1/2 -bottom-10 object-cover shadow-md"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col items-center px-4 pt-14 pb-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {otherUser.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 break-all">
                    {otherUser.email}
                  </p>

                  <div className="flex-1" />

                  <button className="mt-2 w-full flex items-center justify-center gap-2 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                    <MessageCircle size={16} />
                    Message
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
