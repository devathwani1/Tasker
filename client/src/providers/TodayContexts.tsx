import React, { createContext, useState, type FC } from 'react'

type TaskMenuContextType = {
    'mouseEvent' : React.MouseEvent | null
    'setMouseEvent' : React.Dispatch<React.SetStateAction<React.MouseEvent | null>> 
}

export const TaskMenuContext = createContext<TaskMenuContextType | undefined>(undefined)



const TodayContextProvider : FC<{'children' : React.ReactNode}> = ({children}) => {
    const [mouseEvent,setMouseEvent] = useState<React.MouseEvent | null>(null)
  return (
    <TaskMenuContext.Provider value = {{mouseEvent,setMouseEvent}}>
        {children}
    </TaskMenuContext.Provider>
  )
}

export default 
TodayContextProvider