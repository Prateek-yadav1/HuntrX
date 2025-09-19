import React from 'react'
import Feed from './Feed'

const Home_Layout = () => {
  return (
    <div className="bg-amber-900 min-h-screen p-8 max-w-7xl mx-auto">
      <div className="grid gap-5 grid-cols-[250px_1fr_250px]">
        <div className="bg-amber-200">Hi</div>
        <div className="bg-white"> <Feed /></div>
        <div className="bg-white">Hi</div>
      </div>
    </div>
  )
}

export default Home_Layout
