import { useContext, useEffect, useState, type FC, type ReactNode } from "react"
import { Navigate, useSearchParams } from "react-router-dom"
import LoadingView from "../Components/LoadingView"
import { AuthContext } from "./Contexts"

const auth_login = async () => {
    try{
        const token = localStorage.getItem('jwt_token')
        if(!token) throw new Error("Token is missing from the session!")

        const response = await fetch('http://localhost:3000/verify_jwt',{
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        })

        const data = await response.json()
        if(data['successful']) return true
        return false
    }
    catch(e){
        console.error(String(e))
        return false
    }
}


const ProtectedRoute : FC<{'children' : ReactNode}> = ({children}) => {

    const authContext = useContext(AuthContext)
    if(!authContext) throw new Error("AuthContext is not setted!")

    useEffect(() => {
        const checkAuth = async () => {
            const result = await auth_login()
            authContext.setIsAuth(result)
        }
        checkAuth()
    },[])
    if(authContext.isAuth === null){
        return <LoadingView/>
    }

    if(!authContext.isAuth){
        return <Navigate to={'/login'}/>
    }

    return children;
}


export default ProtectedRoute