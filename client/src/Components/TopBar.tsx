import React from 'react'

const TopBar = () => {
  return (
    <div className='h-[50px] bg-gray-900 flex justify-between p-2.5 z-50 '>
        <p className='text-2xl text-white font-bold'>Tasker</p>
        <button className='border-1 rounded-[5px] border-white text-white font-medium h-[95%] px-2.5 active:bg-white active:text-gray-900'>Logout</button>
    </div>
  )
}

export default TopBar