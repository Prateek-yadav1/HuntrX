import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import React from "react";
import ClgLogo from '../assets/Clg_10yrLogo.jpeg'
import Backdrop from '../assets/backdrop.svg'
import { Bold, Shield, ShieldCheck } from 'lucide-react';
export default function ProfileCard() {
  const { user } = useUser(); // Clerk user object

  return (
    <div className="  mt-0 bg-white shadow-xs rounded-lg max-h-90  w-full overflow-hidden ">
      
      <div className="relative  flex justify-end items-center mb-4 ">
        <Link to="/profile">
        <img src={Backdrop} alt="" />
        <img
          src={user?.imageUrl || "/api/placeholder/60/60"}
          alt="Profile"
          className="absolute w-18 h-18 rounded-full border-2 left-9 -bottom-9 border-blue-400 shadow-[0_4px_8px_rgba(0,0,0,0.1)] object-cover"
          onError={(e) => {
            const target = e.target;
            if (target && target instanceof HTMLImageElement) {
              target.src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24' fill='%236b7280'%3E%3Cpath d='M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z'/%3E%3C/svg%3E";
            }
          }}
        />
        </Link>
      </div>
<div className="p-4 mt-9 text-left">
  <div className="flex flex-col justify-start space-y-1/2 mb-4">
      {/* User Info */}
      <span className='flex items-center gap-2'>
      <h2 className="text-[1.125rem] font-semibold text-[#28282b]  ">
        {user?.fullName || user?.firstName || "User"}
      </h2>
      <ShieldCheck color='#28282b' className='h-4 w-4 font-bold' />
      
      </span>
      <p className="text-xs font-normal text-gray-800  break-all">
        {/* {user?.primaryEmailAddress?.emailAddress || "No email available"} */}
        Student at <span className='font-bold'>BML Munjal University</span><br/>
        Gurugram, Haryana
      </p>
</div>
      {/* College Logo */}
      <div className="text-left flex flex-row gap-2 items-center">
       
       <div className="w-10 h-10 flex items-center justify-center overflow-hidden rounded-full"> <img
          src={ClgLogo}
          alt="College Logo"
          className=" object-contain rounded-sm"
        /></div>
        <span>BML Munjal University</span>
        
      </div>

</div>

    </div>
  );
}

