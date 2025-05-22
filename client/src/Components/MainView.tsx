import React, { useContext, useEffect, useState } from 'react'
import MonthView from './MonthView'
import Today from './TodayView'
import FloatingBtn from './FloatingBtn'
import AddTaskView from './AddTaskView'
import { AddTaskContext, DataContext,  } from '../providers/Contexts'
import LoadingView from './LoadingView'
import TaskMenu from './TaskMenu'
import { useSearchParams } from 'react-router-dom'

const MainView = () => {
  const taskView = useContext(AddTaskContext)
  const dataContext = useContext(DataContext)


  useEffect(()=>{
    dataContext?.fetchAndProcessData()
  })

  if(!dataContext?.isSuccessfull) return <LoadingView/>
  return (
    <>
    {taskView?.addTaskVisible &&
    <div className=' flex   flex-col lg:flex-row not-lg:space-y-3 fixed w-screen lg:h-[calc(100vh-50px)] justify-center lg:items-center lg:bg-[rgba(0,0,0,0.41)]'>
      <AddTaskView/>
    </div>}
    <div className={`flex justify-around  flex-col lg:flex-row not-lg:space-y-3 m-3 ${taskView?.addTaskVisible && 'not-lg:hidden'}`}>
        <MonthView/>
        <Today/>   
    </div>
    <FloatingBtn />
    <TaskMenu/>
    </>
  )
}

export default MainView