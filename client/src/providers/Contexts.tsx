import { createContext,  useState,  type ReactNode } from "react";
import {type AddTaskContextType, type CreateTaskContextType, type DateAndTaskType, type SingleDateAndTaskContext, type TaskCreateType, type TaskType, type DateAndTasksContextType, type DateType, type DateContextType, type eDate, type UpdateTaskContextType, type PutTaskContextType, type TaskUpdateType, type AuthContextType} from './Types'
import {daysInMonths} from '../utilities/cal'
import { TODAY, WEEK_DAYS } from "./Constants";

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
export const AddTaskContext = createContext<AddTaskContextType | undefined>(undefined)
export const UpdateTaskContext = 
createContext<UpdateTaskContextType | undefined>(undefined)
export const CreateTaskContext = createContext<CreateTaskContextType | undefined>(undefined)
export const PutTaskContext = createContext<PutTaskContextType | undefined>(undefined)
export const DataContext = createContext<DateAndTasksContextType | undefined>(undefined)
export const SingleDataContext  = createContext<SingleDateAndTaskContext | undefined>(undefined)
export const DateContext = createContext<DateContextType | undefined>(undefined)

export const AddTaskProvider : React.FC<{'children' : ReactNode}> = ({children}) => {
    const [isAuth,setIsAuth] = useState<boolean|null>(null)
    const [date,setDate] = useState<eDate>({
        day : TODAY.getDate(),
        month : TODAY.getMonth(),
        year : TODAY.getFullYear()
    })
    const [addTaskVisible,setAddTaskVisible]  = useState<boolean>(false)
    const [updateTaskVisible,setUpdateTaskVisible]  = useState<boolean>(false)
    const [taskData,setTaskData] = useState<TaskCreateType>({
        title : "",
        content : "",
        date : "",
        time : "",
        state : "PENDING",
        weekDays : []
    })
    const [putTaskData,setPutTaskData] = useState<TaskUpdateType>({
        id : 0,
       title : "",
       content : "",
       state : "PENDING",
       date : "",
       time : "",
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

    const updateTask = async () => {
        const {title,content,date,time,id,state,weekDays} = putTaskData
        if (id === 0) {
        alert("No task selected to update.")
        return
        }
        if (
            title === "" &&
            content === "" &&
            date === "" &&
            time === "" &&
            state === "PENDING" &&
             weekDays.length === 0
            ) {
            alert("Nothing to update in the task!")
            return
            }


        const token = localStorage.getItem('jwt_token')

        const data : Record<string,number | string | any[]> = {}
        if(title != "") data['title'] = title
        if(content != "") data['content'] = content
        if(date != "" && time != "") data['pendingOn'] = `${date}T${time}:00Z`
        if(weekDays.length != 0) data['weekDays'] = weekDays
        if(state != "PENDING") data['state'] = state
        



        if(!token){ alert("Can't submit, JWT missing!")
        return
        }
        try{
            const response = await fetch(`http://localhost:3000/task/${id}`,{
                method : "PUT",
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                },
                body : JSON.stringify(data)
            })
            if(!response.ok) throw new Error("Response is not ok while subbmiting a new task")
            console.log(data)
        }
        catch(e){
            console.error(String(e))
        }

        setPutTaskData({
    id : 0,
    title: "",
    content: "",
    date: "",
    time: "",
    state: "PENDING",
    weekDays: [],
})


        fetchAndProcessData()
    }

    const fetchAndProcessData = async () => {
        console.log("Triggering fetchand process data...")
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

            if (data.full_date) {
            const updatedData = processedData.find(d => d.full_date === data.full_date)
            if (updatedData) {
                setData({ ...updatedData })     
            }
            }
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
            if(!response.ok) throw new Error("Response is not ok while subbmiting a new task")
        }
        catch(e){
            console.error(String(e))
        }

        setTaskData({
    title: "",
    content: "",
    date: "",
    time: "",
    state: "PENDING",
    weekDays: [],
})


        fetchAndProcessData()
    }



    return (
        <AuthContext.Provider value={{isAuth,setIsAuth}}>
        <AddTaskContext.Provider value={{addTaskVisible,setAddTaskVisible}}>
        <UpdateTaskContext.Provider value={{updateTaskVisible,setUpdateTaskVisible}}>
            <CreateTaskContext.Provider value={{taskData,setTaskData,submitTask}}>
                <PutTaskContext.Provider value={{putTaskData,setPutTaskData,updateTask}}>
                <DataContext.Provider value={{dateAndTasks,fetchAndProcessData,isSuccessfull}}>
                    <SingleDataContext.Provider value={{data,setData}}>
                        <DateContext.Provider value={{date,setDate}}>
                            {children}
                        </DateContext.Provider>
                    </SingleDataContext.Provider>
                </DataContext.Provider>
                </PutTaskContext.Provider>
            </CreateTaskContext.Provider>
            </UpdateTaskContext.Provider>
        </AddTaskContext.Provider>
        </AuthContext.Provider>
    )
}
