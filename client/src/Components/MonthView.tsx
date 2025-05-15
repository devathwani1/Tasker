import { useContext, useEffect, useState } from 'react'
import MonthCard from './MonthCard'
import {SizeContext} from '../providers/ScreenSize'
const MonthView = () => {
    const mSize = useContext(SizeContext)
    if(mSize == undefined){
      throw new Error("useSizeContext must be used withint a size provider")
    }
    const list = new Array(35).fill(0)
    const elementAmount = mSize.isMediumDevice ? 7 : 35


    useEffect(() => {

      window.addEventListener('resize',()=>{
        window.innerWidth < 1024 ? mSize.setIsMediumDevice(true) : mSize.setIsMediumDevice(false)
      })

    },[])
  return (
    <div className='h-[calc(100vh-70px)] bg-blue-900  rounded-4xl w-[100%] lg:w-[68%] overflow-y-hidden lg:overflow-y-hidden hide-scrollbar'>
        <div className='max-h-14 bg-black rounded-t-4xl text-3xl font-bold text-white p-5 flex justify-between items-center'>
            <span>January</span>
            <span>L R</span>
        </div>
        <div className='rounded-b-4xl p-6 flex h flex-wrap space-x-2  justify-between  content-between h-[calc(100%-3.5rem)]'>
           {
            list.slice(0,elementAmount).map(()=>(
                <MonthCard/>
            ))
           }
            
        </div>
    </div>
  )
}

export default MonthView