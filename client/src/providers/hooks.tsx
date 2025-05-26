import { useState } from "react";
import type { TaskType } from "./Types";

export function useDeleteItem(){
    const [isSuccessfull,setIsSuccessfull] = useState<boolean>(false)
    const deleteTask = async (id : number) =>{
    try {
        const token = localStorage.getItem('jwt_token')
        if(!token) throw new Error('Token is missing in the client!')

        const response = await fetch(`http://localhost:3000/task/${id}`,
        {
          method : 'DELETE',
          headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
          }
        }
        )
        if(!response.ok) throw new Error("Response is not ok in delete task request!")
        setIsSuccessfull(true)
        }
        catch(e){
          console.error(e)
        }
    }

    return {isSuccessfull,deleteTask}
    }

export function useUpdateItem(){
  const [isSuccessfull,setIsSuccessfull] = useState<boolean>(false)
  const updateTask = async (task:TaskType) => {
   try {
        const token = localStorage.getItem('jwt_token')
        if(!token) throw new Error('Token is missing in the client!')

        const response = await fetch(`http://localhost:3000/task/${task.id}`,
        {
          method : 'DELETE',
          headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
          },
          body : JSON.stringify(task)
        }
        )
        if(!response.ok) throw new Error("Response is not ok in delete task request!")
        setIsSuccessfull(true)
        }
    catch(e){
          console.error(e)
        }

        return {isSuccessfull,updateTask}

      
    }
  }
