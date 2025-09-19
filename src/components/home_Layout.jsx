import React from 'react'
import Feed from './Feed'
import Card from '../ui/Card'
import LiveProjectData from './liveProject.json'
const Home_Layout = () => {
  return (
    <div className=" min-h-screen p-8 max-w-7xl mx-auto">
      <div className="grid gap-5 grid-cols-[250px_1fr_250px]">
        <div className="">Hi</div>
        <div className=" min-w-90"> <Feed /></div>
        <div className=" h-fit space-y-4">
            <Card title="Live Projects" Content={LiveProjectData} />
            <Card title="EWYL" Content={LiveProjectData} />    
        </div>
      </div>
    </div>
  )
}

export default Home_Layout
