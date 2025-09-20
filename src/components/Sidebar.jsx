import {
  Home,
  Network,
  HandCoins,
  Lightbulb,
  Users,
  MessageCircle,
  Settings,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const navItems = [
    { icon: <Home />, label: "Home", to: "/" },
    { icon: <Network />, label: "My Network", to: "/network" },
    { icon: <Users />, label: "Connections", to: "/connections" },
    { icon: <HandCoins />, label: "EWYL", to: "/ewyl" },
    { icon: <Lightbulb />, label: "Opportunities", to: "/opportunities" },
    { icon: <MessageCircle />, label: "Messages", to: "/chat" },
  ];

  return (
    <div className="flex w-fit h-screen">
      <div
        className={`h-full bg-white shadow-xl border-r border-gray-200 flex flex-col justify-between
        transition-all duration-300 ease-in-out
        ${isOpen ? "w-60" : "w-20"} relative flex-shrink-0`}
      >
        {/* Toggle button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-8 right-[-40px] z-10 bg-white rounded-sm p-1 shadow-md text-gray-600 hover:text-[#28282B] transition"
        >
          {isOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
        </button>

    
        {/* Nav Items */}
        <div className="flex-1 overflow-y-auto">
          <nav className="mt-4">
            <ul className="space-y-1 px-3">
              {navItems.map((item, i) => {
                const active = location.pathname === item.to;
                return (
                  <li key={i} className="relative group">
                    <Link
                      to={item.to}
                      className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all
                        ${
                          active
                            ? "bg-blue-50 text-blue-500 font-medium border-l-4 border-blue-500"
                            : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                        }`}
                    >
                      <span className="flex-shrink-0">
                        {React.cloneElement(item.icon, {
                          size: 22,
                          className: active
                            ? "text-indigo-600"
                            : "text-gray-500 group-hover:text-indigo-600",
                        })}
                      </span>
                      {isOpen && <span>{item.label}</span>}
                    </Link>

                    {/* Tooltip when collapsed */}
                    {!isOpen && (
                      <div className="absolute left-16 top-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition">
                        {item.label}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="px-3 pb-6 space-y-2">
          <div
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-indigo-600 transition cursor-pointer"
          >
            <Settings size={20} />
            {isOpen && <span>Settings</span>}
          </div>
          <div
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-600 transition cursor-pointer"
          >
            <LogOut size={20} />
            {isOpen && <span>Logout</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
