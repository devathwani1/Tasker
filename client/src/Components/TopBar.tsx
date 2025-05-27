import  { useContext } from 'react'
import { AuthContext } from '../providers/Contexts'

const TopBar = () => {
   const authContext = useContext(AuthContext)
  const logOut = () => {
    localStorage.removeItem('jwt_token')
    authContext?.setIsAuth(false)
  }
  return (
    <div className='h-[50px] bg-gray-900 flex justify-between p-2.5 z-50 '>
        <p className='text-2xl text-white font-bold'>Tasker</p>

        {
          authContext?.isAuth && (
             <button onClick={()=>logOut()}className='border-1 rounded-[5px] border-white text-white font-medium h-[95%] px-2.5 active:bg-white active:text-gray-900'>Logout</button>
          ) 
        }
    </div>
  )
}

export default TopBar