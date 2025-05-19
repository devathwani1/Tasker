import { createContext, useContext, useState, type Dispatch, type ReactNode } from "react";

type addTaskType = {
    addTaskVisible : boolean,
    setAddTaskVisible : Dispatch<React.SetStateAction<boolean>>
}

type TaskData = {
    title : string,
    content : string,
    date : string,
    time : string,
}

type createTaskType = {
    taskData : TaskData,
    setTaskData : Dispatch<React.SetStateAction<TaskData>>,
    submitTask : () => void;
}

type TaskType = {
    userId : number,
    title : string,
    content : string,
    pendingOn : string
}

type TaskDataType = {
    tasksData : TaskType[],
    getTasksData : () => void;
}

export const AddTaskContext = createContext<addTaskType | undefined>(undefined)
export const CreateTaskContext = createContext<createTaskType | undefined>(undefined)
export const TasksContext = createContext<TaskDataType | undefined>(undefined)

export const AddTaskProvider : React.FC<{'children' : ReactNode}> = ({children}) => {
    const [addTaskVisible,setAddTaskVisible]  = useState<boolean>(false)
    const [taskData,setTaskData] = useState<TaskData>({
        title : "",
        content : "",
        date : "",
        time : ""
    })
    const [tasksData,setTasksData] = useState<TaskType[]>([])

    const getTasksData = async () => {
        const token = localStorage.getItem('jwt_token')

        if(!token){ alert("Can't get tasks data, JWT missing!")
        return
        }

        try{
            const response = await fetch('http://localhost:3000/tasks',{
                method : 'GET',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                },
            })
            const data = await response.json()
            setTasksData(data)
            
        }
        catch(e){
            console.log(String(e))
        }
    }



    const submitTask = async () => {
        const {title,content,date,time} = taskData
        if(title == "" || content == "" || date == "" || time == "") {alert("Can't submit, Empty Task!")
        return}

        const token = localStorage.getItem('jwt_token')

        if(!token){ alert("Can't submit, JWT missing!")
        return
        }

        try{
            const response = await fetch('http://localhost:3000/task',{
                method : "POST",
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                },
                body : JSON.stringify({
                    ...taskData,
                    'pendingOn' : `${taskData.date}T${taskData.time}:00Z`
                })
            })
            const data = await response.json()
            console.log(data)
        }
        catch(e){
            console.error(String(e))
        }

        taskData.title = ""
        taskData.content = ""
        taskData.date = ""
        taskData.time = ""
    }

    return (
        <AddTaskContext.Provider value={{addTaskVisible,setAddTaskVisible}}>
            <CreateTaskContext.Provider value={{taskData,setTaskData,submitTask}}>
                <TasksContext.Provider value={{tasksData,getTasksData}}>
                    {children}
                </TasksContext.Provider>
            </CreateTaskContext.Provider>
        </AddTaskContext.Provider>
    )
}
