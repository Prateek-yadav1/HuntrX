import React from 'react'
import Logo from '../assets/Logo.svg'
import ClgLogo from '../assets/Clg_10yrLogo.jpeg'
import { Bell, Megaphone } from 'lucide-react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'

const TopBar = () => {
  return (
    <div className='w-screen sticky bg-white shadow-lg px-4 py-4 h-fit flex flex-row items-center justify-between'>
      <div>
        <img src={Logo} alt="#" className='h-8' />
      </div>

      <div className="flex items-center gap-6">
        {/* Announcements */}
        <div className="flex items-center justify-center">
          <Megaphone className='h-5 w-5' color='#28282B'/>
        </div>

        {/* Notifications */}
        <div className="flex items-center justify-center">
          <Bell className='h-5 w-5' color='#28282B'/>
        </div>

        {/* College Logo + Name */}
        <div className='flex items-center justify-around gap-1'>
          <img src={ClgLogo} alt="College Logo" className='h-8' />
          <span className='text-sm font-semibold'>BML Munjal University</span>  
        </div>

        {/* Clerk Authentication */}
        <SignedOut>
          <SignInButton mode="redirect" redirectUrl="/sign-in">
            <span className="cursor-pointer text-sm font-semibold text-blue-600 hover:underline">
              Sign In
            </span>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  )
}

export default TopBar