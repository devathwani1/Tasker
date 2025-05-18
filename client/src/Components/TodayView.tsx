import React from 'react'
import TodayCardView from './TodayCardView'

const TodayView = () => {
  return (
    <div className='lg:h-[calc(100vh-70px)] overflow-y-auto bg-blue-900 w-[100%] lg:w-[30%]  rounded-4xl'>
        <div className='max-h-14 position- bg-black rounded-t-4xl text-white font-bold text-2xl flex justify-between items-center p-5'>
            <span>Today Tasks</span>
            <span>11-02-25</span>
        </div>
        <div className='rounded-b-4xl p-5 space-y-5 overflow-y-scroll hide-scrollbar max-h-[45rem]'>
           <TodayCardView/> 
           
            
        </div>
    </div>
  )
}

export default TodayView