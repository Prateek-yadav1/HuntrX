import React from 'react'

const Card = (
    {title,
     Content= []
    
    }
) => {
  return (
    <div className='w-full p-2 shadow-xs rounded-lg flex flex-col relative bg-white'>
        <div className="flex justify-start mb-2">{title}</div>
        <div className='flex item-start justify-center flex-col w-full'>
          {Content.map((project, id) => {
            return (<div className='flex flex-row items-center  hover:bg-blue-400 rounded-lg hover:text-white px-2 '>
                <div className='flex flex-row gap-2 my-2 items-center'>
                    <div className="py-1 w-[5px] h-5 bg-[#2e2ec4] rounded ]"></div>
                <div className='text-md font-normal ' key={id}>{project.name}</div> 
                
                </div>

            </div>)
          })}
        </div>
    </div>
  )
}

export default Card