import { useUser } from '@clerk/clerk-react';
import React from "react";
import ClgLogo from '../assets/Clg_10yrLogo.jpeg'
import Backdrop from '../assets/backdrop.svg'
import { Bold, Shield, ShieldCheck } from 'lucide-react';
export default function ProfileCard() {
  const { user } = useUser(); // Use Clerk's user object

  return (
    <div className="  mt-0 bg-white shadow-xs rounded-lg max-h-90  w-full overflow-hidden ">
      {/* Header */}
      {/* <div className="absolute">
        <span className="text-lg font-semibold text-center text-black mt-2 ml-4">
          Profile
        </span>
      </div> */}
      
      <div className="relative  flex justify-end items-center mb-4 ">
        <img src={Backdrop} alt="" />
        <img
          src={user?.imageUrl || "/api/placeholder/60/60"}
          alt="Profile"
          className="absolute w-18 h-18 rounded-full border-2 left-9 -bottom-9 border-blue-400 shadow-[0_4px_8px_rgba(0,0,0,0.1)] object-cover"
          onError={(e) => {
            const target = e.target;
            if (target && target instanceof HTMLImageElement) {
              target.src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='%23a855f7'%3E%3Cpath d='M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z'/%3E%3C/svg%3E";
            }
          }}
        />
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