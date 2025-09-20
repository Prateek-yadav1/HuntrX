import React from "react";
import Logo from "../assets/Logo.svg";
import ClgLogo from "../assets/Clg_10yrLogo.jpeg";
import { Bell, Megaphone } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const TopBar = () => {
  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-8xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <img src={Logo} alt="Main Logo" className="h-9" />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {/* Announcements */}
          <button
            className="relative p-2 rounded-full hover:bg-gray-100 transition"
            aria-label="Announcements"
          >
            <Megaphone className="h-5 w-5 text-gray-700" />
          </button>

          {/* Notifications */}
          <button
            className="relative p-2 rounded-full hover:bg-gray-100 transition"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5 text-gray-700" />
            {/* Example notification dot */}
            <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {/* Divider */}
          <div className="w-px h-6 bg-gray-200"></div>

          {/* College Logo + Name */}
          <div className="hidden md:flex items-center gap-2">
            <img
              src={ClgLogo}
              alt="College Logo"
              className="h-7 w-7 rounded-full object-cover"
            />
            <span className="text-sm font-medium text-gray-800 whitespace-nowrap">
              BML Munjal University
            </span>
          </div>

          {/* Auth */}
          <SignedOut>
            <SignInButton mode="redirect" redirectUrl="/sign-in">
              <span className="cursor-pointer text-sm font-semibold text-blue-600 hover:underline">
                Sign In
              </span>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
