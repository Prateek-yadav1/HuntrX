import {
  Home,
  Network,
  HandCoins,
  Lightbulb,
  MessageCircle,
  Settings,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import React, { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex w-fit bg-gray-100 h-full pr-12">
      <div
        className={`h-full bg-white shadow-lg flex flex-col justify-between
        transition-all duration-300 ease-in-out
        ${isOpen ? "w-56" : "w-16"} relative  flex-shrink-0`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-8 right-[-40px] z-10
                     bg-white rounded-sm p-1 shadow-md text-gray-600
                     hover:text-[#28282B] transition"
          style={{ transition: "right 0.3s" }}
        >
          {isOpen ? <PanelLeftClose size={25} /> : <PanelLeftOpen size={25} />}
        </button>
        <div>
          <div className="border-t border-gray-200 bg-gradient-to-b from-gray-50 to-white">
            <nav className="mt-6 relative">
              <ul className="space-y-2 px-2 relative">
                {[
                  { icon: <Home size={20} />, label: "Home" },
                  { icon: <Network size={20} />, label: "My Network" },
                  { icon: <HandCoins size={20} />, label: "EWYL" },
                  { icon: <Lightbulb size={20} />, label: "Opportunities" },
                  { icon: <MessageCircle size={20} />, label: "Messages" },
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center space-x-3 cursor-pointer 
                               px-2 py-3 rounded-lg text-gray-500
                               hover:bg-gray-200 hover:text-[#28282B] hover:shadow-md transition relative"
                  >
                    <span className="flex-shrink-0">
                      {React.cloneElement(item.icon, {
                        size: isOpen ? 20 : 22,
                      })}
                    </span>
                    {isOpen && <span>{item.label}</span>}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
    
    <div className="px-2 pb-6 space-y-2 flex-shrink-0">
          <div className="flex items-center space-x-3 cursor-pointer px-3 py-2 rounded-md text-gray-500 hover:bg-gray-200 hover:text-[#28282B] transition">
            <Settings size={20} />
            {isOpen && <span>Settings</span>}
          </div>
          <div className="flex items-center space-x-3 cursor-pointer px-3 py-2 rounded-md text-gray-500 hover:bg-gray-200 hover:text-[#28282B] transition">
            <LogOut size={20} />
            {isOpen && <span>Logout</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
