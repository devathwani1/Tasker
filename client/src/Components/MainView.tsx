import React, { useContext, useState } from 'react'
import MonthView from './MonthView'
import Today from './TodayView'
import FloatingBtn from './FloatingBtn'
import AddTaskView from './AddTaskView'
import { AddTaskContext } from '../providers/FloatingWindows'
const MainView = () => {
  const taskView = useContext(AddTaskContext)
  return (
    <>

    {taskView?.addTaskVisible &&
    <div className=' flex   flex-col lg:flex-row not-lg:space-y-3 fixed w-screen lg:h-[calc(100vh-50px)] justify-center lg:items-center lg:bg-[rgba(0,0,0,0.41)]'>
      <AddTaskView/>
    </div>}
    <div className=' flex justify-around  flex-col lg:flex-row not-lg:space-y-3 m-3'>
        <MonthView/>
        <Today/>
        <FloatingBtn />
    </div>
    </>
    
  )
}

export default MainView