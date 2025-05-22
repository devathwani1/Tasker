import React, { useContext } from 'react'
import TodayCardView from './TodayCardView'
import { SingleDataContext } from '../providers/Contexts'

const TodayView = () => {
  const processData = useContext(SingleDataContext)
  return (
    <div className='lg:h-[calc(100vh-70px)] overflow-y-auto bg-blue-900 w-[100%] lg:w-[30%]  rounded-4xl'>
        <div className='max-h-14 position- bg-black rounded-t-4xl text-white font-bold text-2xl flex justify-between items-center p-5'>
            <span>{processData?.data.full_date}</span>
        </div>
        <div className='rounded-b-4xl p-5 space-y-5 overflow-y-scroll hide-scrollbar max-h-[45rem]'>
          {
            processData?.data.tasks.map((task)=>(
              
              <TodayCardView task = {task}/> 
            ))
          }
           
        </div>
    </div>
  )
}

export default TodayView