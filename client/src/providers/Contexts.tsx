import { createContext, useContext, useState, type Dispatch, type ReactNode } from "react";
import {type AddTaskContextType, type CreateTaskContextType, type DateAndTaskType, type SingleDateAndTaskContext, type TaskCreateType, type TasksDataContextType, type TaskType, type DateAndTasksContextType, type DateType, type DateContextType, type eDate} from './Types'
import {daysInMonths} from '../utilities/cal'
import { TODAY, WEEK_DAYS } from "./Constants";

export const AddTaskContext = createContext<AddTaskContextType | undefined>(undefined)
export const CreateTaskContext = createContext<CreateTaskContextType | undefined>(undefined)
export const DataContext = createContext<DateAndTasksContextType | undefined>(undefined)
export const SingleDataContext  = createContext<SingleDateAndTaskContext | undefined>(undefined)
export const DateContext = createContext<DateContextType | undefined>(undefined)

export const AddTaskProvider : React.FC<{'children' : ReactNode}> = ({children}) => {
    const [date,setDate] = useState<eDate>({
        day : TODAY.getDate(),
        month : TODAY.getMonth(),
        year : TODAY.getFullYear()
    })
    const [addTaskVisible,setAddTaskVisible]  = useState<boolean>(false)
    const [taskData,setTaskData] = useState<TaskCreateType>({
        title : "",
        content : "",
        date : "",
        time : "",
        state : "PENDING",
        weekDays : []
    })
    const [dateAndTasks,setDateAndTasks] = useState<DateAndTaskType[]>([])
    const [isSuccessfull,setIsSuccessfull] = useState(false) //if data is fetched and successfully processed
    const [data,setData] = useState<DateAndTaskType>({
        date : 0,
        full_date : "",
        week_num : 0,
        week_day : "",
        tasks : []
    })

    const fetchAndProcessData = async () => {
        const token = localStorage.getItem('jwt_token')
        var tasks : TaskType[] = []
        const processedData  : DateAndTaskType[] = []

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
            if(!response.ok) throw new Error("The Response is not ok!")
            tasks = await response.json()
            if(!tasks) throw new Error("Not valid data!")
            

            const dateData : DateType[] = daysInMonths(date.year,date.month)
            if(!dateData) throw new Error("Fail to fetch days data!")

            dateData.forEach((day : DateType)=>{
                const data : DateAndTaskType = {
                    ...day,
                    'tasks' : []
                }
                tasks.forEach((task : TaskType) => {
                    if(day.full_date == task.pendingOn.split('T')[0]){
                        data.tasks.push(task)
                    }
                    else if(task.weekDays.length > 0){
                         const task_week_num = task.weekDays.map((w_day)=> (WEEK_DAYS.indexOf(w_day)))
                        if(task_week_num.includes(data.week_num)){
                            data.tasks.push(task)
                        }       
                    }
                })
                processedData.push(data)
            })

            if(!processedData) throw new Error("Process data is empty!")
            setDateAndTasks(processedData)
            setIsSuccessfull(true)
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
            if(!response.ok) return new Error("Response is not ok while subbmiting a new task")
        }
        catch(e){
            console.error(String(e))
        }

        taskData.title = ""
        taskData.content = ""
        taskData.date = ""
        taskData.time = ""

        fetchAndProcessData()
    }



    return (
        <AddTaskContext.Provider value={{addTaskVisible,setAddTaskVisible}}>
            <CreateTaskContext.Provider value={{taskData,setTaskData,submitTask}}>
                <DataContext.Provider value={{dateAndTasks,fetchAndProcessData,isSuccessfull}}>
                    <SingleDataContext.Provider value={{data,setData}}>
                        <DateContext.Provider value={{date,setDate}}>
                            {children}
                        </DateContext.Provider>
                    </SingleDataContext.Provider>
                </DataContext.Provider>
            </CreateTaskContext.Provider>
        </AddTaskContext.Provider>
    )
}
