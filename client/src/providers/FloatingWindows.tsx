import { createContext, useContext, useState, type Dispatch, type ReactNode } from "react";

type addTaskType = {
    addTaskVisible : boolean,
    setAddTaskVisible : Dispatch<React.SetStateAction<boolean>>
}

export const AddTaskContext = createContext<addTaskType | undefined>(undefined)


export const AddTaskProvider : React.FC<{'children' : ReactNode}> = ({children}) => {
    const [addTaskVisible,setAddTaskVisible]  = useState<boolean>(false)

    return (
        <AddTaskContext.Provider value={{addTaskVisible,setAddTaskVisible}}>
            {children}
        </AddTaskContext.Provider>
    )
}
