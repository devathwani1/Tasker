import type { Dispatch } from "react"

//To turn of and on the add task floating page
export type AddTaskContextType = {
    addTaskVisible : boolean,
    setAddTaskVisible : Dispatch<React.SetStateAction<boolean>>
}

//Task Createe Type and creatTask CreateTaskContext Type to create a new task
export type TaskCreateType = {
    title : string,
    content : string,
    state : string,
    date : string,
    time : string,
    weekDays : string[]
}

export type CreateTaskContextType = {
    taskData : TaskCreateType,
    setTaskData : Dispatch<React.SetStateAction<TaskCreateType>>,
    submitTask : () => void;
}

//Main TaskType for fetching the ddata na ditnex context type
export type TaskType = {
    userId : number,
    title : string,
    content : string,
    state : string,
    pendingOn : string,
    weekDays : string[]
}

export type TasksDataContextType = {
    tasksData : TaskType[],
    getTasksData : () => void;
}


//DateType used to create date objects
export type DateType = {
    'date' : number,
    'full_date' : string,
    'week_num' : number,
    'week_day' : string
}

//Dateandtasktype to create objects for the main calender 
export type DateAndTaskType = DateType & {
    tasks : TaskType[]
}

export type DateAndTasksContextType = {
    dateAndTasks : DateAndTaskType[],
    fetchAndProcessData : () => void;
    isSuccessfull : boolean
}

//For Setting a single dateandtask object
export type SingleDateAndTaskContext = {
    data : DateAndTaskType,
    setData : Dispatch<React.SetStateAction<DateAndTaskType>> 
}



//for setting the date

export type eDate = {
    day : number,
    month : number,
    year : number
}
export type DateContextType = {
    date : eDate
    setDate : Dispatch<React.SetStateAction<eDate>>
}