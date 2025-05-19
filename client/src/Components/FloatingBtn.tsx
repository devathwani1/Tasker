import { FaPlus ,FaCheck} from "react-icons/fa6";
import React, { useContext, type Dispatch } from 'react'
import { AddTaskContext, CreateTaskContext } from "../providers/FloatingWindows";

const FloatingBtn = () => {
  const addTask = useContext(AddTaskContext)
  const taskContext = useContext(CreateTaskContext)
  return (
    <div className="w-20 bg-black fixed right-10 bottom-15 h-20 flex items-center justify-center rounded-full text-white active:bg-white active:text-black z-50" onClick={() => 
    {
      if(addTask?.addTaskVisible) taskContext?.submitTask()
      addTask?.setAddTaskVisible((prev) => !prev)
      }}>
      {
        addTask?.addTaskVisible ? (
        <FaCheck size={40}/>
        ) : (
        <FaPlus size={40}/>
        )
      }
        
        </div>
  )
}

export default FloatingBtn
