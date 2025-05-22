import React, { useContext, useEffect } from 'react'
import { TaskMenuContext } from '../providers/TodayContexts'

const TaskMenu = () => {
    const taskMenuContext = useContext(TaskMenuContext)
    
  return (
    <div className='font-semibold p-1 rounded-[.7rem] w-40 h-fit bg-white fixed top-0 left-0' style={{
        transform : `translateX(${(taskMenuContext?.mouseEvent?.clientX) && (taskMenuContext?.mouseEvent?.clientX)-100}px) translateY(${taskMenuContext?.mouseEvent?.clientY}px)`
    }}>
        <ul>
            <li>Delete</li>
            <hr />
            <li>Open</li>
        </ul>
    </div>
  )
}

export default TaskMenu