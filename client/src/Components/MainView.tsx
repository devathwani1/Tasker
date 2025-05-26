import React, { useContext, useEffect, useState } from 'react'
import MonthView from './MonthView'
import Today from './TodayView'
import FloatingBtn from './FloatingBtn'
import AddTaskView from './AddTaskView'
import { AddTaskContext, DataContext, UpdateTaskContext,  } from '../providers/Contexts'
import LoadingView from './LoadingView'
import UpdateTaskView from './UpdateTaskView'

const MainView = () => {
  const addTaskView = useContext(AddTaskContext)
  const updateTaskView = useContext(UpdateTaskContext)
  const dataContext = useContext(DataContext)


  useEffect(()=>{
    dataContext?.fetchAndProcessData()
  },[])

  if(!dataContext?.isSuccessfull) return <LoadingView/>
  return (
    <>
    {(addTaskView?.addTaskVisible || updateTaskView?.updateTaskVisible) &&
    <div className=' flex   flex-col lg:flex-row not-lg:space-y-3 fixed w-screen lg:h-[calc(100vh-50px)] justify-center lg:items-center lg:bg-[rgba(0,0,0,0.41)]'>
      {
       addTaskView?.addTaskVisible && <AddTaskView/>
      }
      {
        updateTaskView?.updateTaskVisible && <UpdateTaskView/>
      }
    </div>}
    <div className={`flex justify-around  flex-col lg:flex-row not-lg:space-y-3 m-3 ${(addTaskView?.addTaskVisible || updateTaskView?.updateTaskVisible) && 'not-lg:hidden'}`}>
        <MonthView/>
        <Today/>   
    </div>
    <FloatingBtn />   
     </>
  )
}

export default MainView