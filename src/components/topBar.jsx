import React from 'react'
import Logo from '../assets/Logo.svg'
import ClgLogo from '../assets/Clg_10yrLogo.jpeg'
import { Bell, Megaphone, User } from 'lucide-react'
const TopBar = () => {
  return (
    <div className='w-screen sticky bg-white shadow-lg   px-4 py-4 h-fit flex flex-row items-center justify-between'>
        
      
            <div >
                {/* <Logo /> */}
                <img src={Logo} alt="#" className='h-8' />
            </div>

            <div className="flex items-center gap-6">
            <div className="flex items-center justify-center">
            <Megaphone className='h-5 w-5' color='#28282B'/>
        </div>
        
             <div className="flex items-center justify-center">
            <Bell className='h-5 w-5' color='#28282B'/>
        </div>
        


          <div  className='flex items-center justify-around gap-1'>
            <img src={ClgLogo} alt="#" className='h-8 ' />
              <span className='text-sm font-semibold'>BML Munjal University</span>  
            </div>


            <div className="flex items-center justify-center rounded-full h-8 w-8 bg-slate-700 overflow-hidden">
               <User className='h-full w-full ' color='#28282B'/>
            </div>
            </div>
        
        
    </div>
  )
}

export default TopBar