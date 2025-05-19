import React, { createContext, useContext } from 'react'
import { CreateTaskContext } from '../providers/FloatingWindows'

const AddTaskView = () => {
  const taskContext = useContext(CreateTaskContext)

  return (
    <div className='bg-gray-800 h-[calc(100vh-50px)] p-3 flex flex-col lg:h-[70%] lg:w-[50%] lg:p-6 lg:rounded-2xl'>
        <span className='text-white text-3xl font-bold'>Create Task</span>
        <div className='mt-2 flex flex-col flex-grow'>
            <input value={taskContext?.taskData.title} onChange={(e) => taskContext?.setTaskData({
              ...taskContext.taskData,
              title : e.target.value
            })}
            type="text" placeholder='Title' className='w-[100%] text-2xl text-white focus:outline-0'/>
            <hr className='text-white my-2'/>
            <textarea value={taskContext?.taskData.content} onChange={(e)=>taskContext?.setTaskData({
              ...taskContext.taskData,
              'content' : e.target.value
            })} className='w-[100%] h-auto text-2xl text-white resize-none focus:outline-0 flex-grow' name="" id="" placeholder='Details'></textarea>
            <div className='flex not-lg:flex-col justify-between not-lg:w-[50%] gap-1.5'>
                <input value={taskContext?.taskData.date} onChange={(e) => taskContext?.setTaskData({
                  ...taskContext.taskData,
                  'date' : e.target.value
                })} type="date" className='text-black text-2xl focus:outline-0 border-1 p-2 rounded-[.7rem] bg-white font-bold' min={new Date().toISOString().split('T')[0]} />
                <input value={taskContext?.taskData.time} onChange={(e) => taskContext?.setTaskData({
                  ...taskContext.taskData,
                  'time' : e.target.value
                })} type="time" className='text-black text-2xl focus:outline-0 border-1 p-2 rounded-[.7rem] bg-white font-bold' />
            </div>
        </div>
    </div>
  )
}

export default AddTaskView