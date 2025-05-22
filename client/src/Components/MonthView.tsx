import { useContext, useEffect, useMemo, useState } from 'react'
import MonthCard from './MonthCard'
import {SizeContext} from '../providers/ScreenSize'
import { IoIosArrowBack,IoIosArrowForward } from "react-icons/io";
import { WEEK_DAYS,TODAY,CURRENT_WEEK_MULTIPLY,NUMBER_OF_MONTHS,YEARS,MONTHS,FULL_CALENDER_ELEMENTS } from '../providers/Constants';
import { DataContext, DateContext, SingleDataContext } from '../providers/Contexts';

const MonthView = () => {     
    const mSize = useContext(SizeContext)
    const dataContext = useContext(DataContext)
    const dateContext = useContext(DateContext)
    const singleContext = useContext(SingleDataContext)
    if(mSize == undefined) throw new Error("SizeContext is undefined for MonthView!")
    if(dataContext == undefined) throw new Error("DataContext is undefined for MonthView!")
    if(dateContext == undefined) throw new Error("DateContext is undefined for MonthView!")

    const [currentWeek,setCurrentWeek] = useState<number>(0)

    const dayList = dataContext?.dateAndTasks ?? []
    const elementStart = mSize.isMediumDevice ? currentWeek*CURRENT_WEEK_MULTIPLY : 0
    const elementEnd = mSize.isMediumDevice ? elementStart+CURRENT_WEEK_MULTIPLY : dayList.length
    const placeHolderICalc = FULL_CALENDER_ELEMENTS - dayList.length - (dayList[0] ? dayList[0].week_num : 0)
    const placeHolderI = placeHolderICalc < 7 ? placeHolderICalc : Math.floor( placeHolderICalc - 7)

    useEffect(()=>{
      dataContext?.fetchAndProcessData()
      setCurrentWeek(Math.floor((TODAY.getDate()-1)/7))
    },[])

    useEffect(()=>{
      dataContext?.fetchAndProcessData()
      if(!(singleContext?.data.full_date == "")) return
      const dataToday = dataContext.dateAndTasks.find(prev => (prev.full_date == TODAY.toLocaleDateString('en-CA'))) 
      if(dataToday) 
      singleContext?.setData(dataToday)
    },[dateContext])

    useEffect(() => {
      const handleResize = () => {
        mSize.setIsMediumDevice(window.innerWidth < 1024)
      }
      handleResize()
      window.addEventListener('resize',handleResize)
      return () => window.removeEventListener('resize',handleResize)
    },[mSize])


  

  return (
    <div className='h-[calc(100vh-70px)] bg-blue-900  rounded-4xl w-[100%] lg:w-[68%] overflow-y-hidden lg:overflow-y-hidden hide-scrollbar'>
        <div className='max-h-14 bg-black rounded-t-4xl text-3xl font-bold text-white p-5 flex justify-between items-center'>

            <div className='w-[80%] lg:w-[20%] lg:flex justify-between'>
              {
                !mSize.isMediumDevice ? (
                <span>{MONTHS[dateContext?.date.month ?? 0]}</span>
                ) : (
                  <select value={dateContext?.date.month} className = 'bg-black' onChange={(e) => {
                    dateContext?.setDate(prev => ({
                      ...prev,
                      'month' : parseInt(e.target.value),
                      'week' : 0
                    }))
                  }}>
                    {
                      MONTHS.map((ele,idx) => (
                        <option className='text-2xl' value={`${idx}`}>{ele}</option>
                      ))
                    }
              
                  </select>
                )
              }
              <select onChange={(e) => dateContext?.setDate(prev =>({...prev,'year' : parseInt(e.target.value)}))}  className = 'bg-black' value={dateContext?.date.year}>
                {
                  YEARS.map((year,idx)=>(
                    <option key={`year_option_${idx}`} value={year}>{year}</option>
                  ))
                }
              </select>
            </div>

            <div className='flex justify-center items-center'>
              <i className={`${currentWeek == 0 ? 'not-lg:text-gray-300' : 'text-white'} ${dateContext?.date.month == 0 ? 'text-gray-300' : ''}`} onClick={()=>{
                if(mSize.isMediumDevice){
                  if(currentWeek == 0) return;
                  setCurrentWeek(currentWeek-1)
                }
                else{
                  if(dateContext?.date.month == 0) return;
                  dateContext?.setDate(prev => ({
                    ...prev,
                    'month' : prev.month - 1
                }))
                }
                
                }}><IoIosArrowBack/></i>
              <i className={`${currentWeek >= Math.ceil(dayList.length / CURRENT_WEEK_MULTIPLY) - 1? 'not-lg:text-gray-300' : ''} ${NUMBER_OF_MONTHS-1 <= (dateContext?.date.month ?? 0) ? 'text-gray-300' : ''}`} onClick={()=>{
                if(mSize.isMediumDevice){
                  if(currentWeek >= Math.ceil(dayList.length / CURRENT_WEEK_MULTIPLY) - 1) return 
                  setCurrentWeek(currentWeek+1)
                }
                else{
                  if(NUMBER_OF_MONTHS-1 <= (dateContext?.date.month ?? 0)) return;
                  dateContext?.setDate(prev => ({
                    ...prev,
                    'month' : prev.month + 1
                }))
                }
                }}><IoIosArrowForward/></i>
            </div>
        </div>
     {          
      !mSize.isMediumDevice &&
      <ul className='flex w-full justify-around px-6 text-white my-2 mb-3'>
        <li className='text-red-400 text-bold'>S</li>
        {
          WEEK_DAYS.slice(1).map((day,idx)=>(
            <li key={`week_placeholder_${idx}`}>{day}</li>
          ))
        }
      </ul>
    }
        <div className={`lg:pt-0 lg:h-[calc(100%-6rem)] rounded-b-4xl p-6 flex h flex-wrap space-x-1.5 justify-between ${currentWeek >= Math.floor(dayList.length / CURRENT_WEEK_MULTIPLY) ? 'content-start gap-1.5' : 'content-between'}  h-[calc(100%-3.5rem)]`}>
  <>
   
    {
      !mSize.isMediumDevice &&
      Array(dayList[0]?.week_num || 0).fill(0).map((_, i) => (
        <div key={`placeholder-${i}`} className='w-[13%] h-[100px]'></div>
      ))
    }

    {
      dataContext?.dateAndTasks.slice(elementStart, elementEnd).map((ele, idx) => (
        <MonthCard key={idx} data={ele}/>
      ))
    }

    {
      !mSize.isMediumDevice &&
      Array(placeHolderI).fill(0).map((_,i)=>(
         <div key={`placeholder-e-${i}`}
          className='w-[13%] h-[100px]'></div>
      ))
    }
  </>
</div>

    </div>
  )
}

export default MonthView