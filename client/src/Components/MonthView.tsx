import { useContext, useEffect, useMemo, useState } from 'react'
import MonthCard from './MonthCard'
import {SizeContext} from '../providers/ScreenSize'
import {daysInMonths,type dateObj} from '../utilities/cal'
import { IoIosArrowBack,IoIosArrowForward } from "react-icons/io";
import { TasksContext } from '../providers/FloatingWindows';
const MonthView = () => {
    const CURRENT_WEEK_MULTIPLY = 7
    const NUMBER_OF_MONTHS = 12
    const FULL_CALENDER_ELEMENTS = 42
    const WEEKDAYS = ['S','M','T','W','Th','F','St']
    const CURRENT_YEAR = new Date().getFullYear()
    const YEARS = Array.from({length : 10},(_,i)=> CURRENT_YEAR + i)
    const MONTHS = ['January','February','March','April','May','June','July','Agust','September','October','November','December']
    const mSize = useContext(SizeContext)
    const [currentWeek,setCurrentWeek] = useState<number>(0)
    const [currentYear,setCurrentYear] = useState<number>(new Date().getFullYear())
    
    const [month,setMonth] = useState<number>(0)
    if(mSize == undefined) throw new Error("useSizeContext must be used withint a size provider")
    const [dayList,setDayList] = useState<dateObj[]>([])
    const elementStart = mSize.isMediumDevice ? currentWeek*CURRENT_WEEK_MULTIPLY : 0
    const elementEnd = mSize.isMediumDevice ? elementStart+CURRENT_WEEK_MULTIPLY : dayList.length
    const placeHolderICalc = FULL_CALENDER_ELEMENTS - dayList.length - (dayList[0] ? dayList[0].week_num : 0)
    const placeHolderI = placeHolderICalc < 7 ? placeHolderICalc : Math.floor( placeHolderICalc - 7)
    const tasksDataContext = useContext(TasksContext)
    const TODAY = new Date()

    useEffect(()=>{
      setMonth(TODAY.getMonth())
      setCurrentWeek(Math.floor(TODAY.getDate()/7))
    },[])

    useEffect(() => {
      setDayList(daysInMonths(currentYear,month))
    },[month,currentYear])

    useEffect(() => {
      const handleResize = () => {
        mSize.setIsMediumDevice(window.innerWidth < 1024)
      }
      handleResize()
      window.addEventListener('resize',handleResize)

      return () => window.removeEventListener('resize',handleResize)
    },[mSize])

    const tasksData = useMemo(()=>{
      return dayList.map((day) => {
        const data = {
          ...day,
          'tasks' : Array()
        }

        tasksDataContext?.tasksData.forEach((tasks)=>{
          if(tasks.pendingOn.split('T')[0] == data.full_date){
            data.tasks.push(tasks)
          }
          else if(tasks.weekDays.length > 0){
            const task_week_num = tasks.weekDays.map((day)=> (WEEKDAYS.indexOf(day)))
            if(task_week_num.includes(data.week_num)){
              data.tasks.push(tasks)
            }
          }
        })
        return data

      })
    },[dayList,tasksDataContext])
  return (
    <div className='h-[calc(100vh-70px)] bg-blue-900  rounded-4xl w-[100%] lg:w-[68%] overflow-y-hidden lg:overflow-y-hidden hide-scrollbar'>
        <div className='max-h-14 bg-black rounded-t-4xl text-3xl font-bold text-white p-5 flex justify-between items-center'>

            <div className='w-[80%] lg:w-[20%] lg:flex justify-between'>
              {
                !mSize.isMediumDevice ? (
                <span>{MONTHS[month]}</span>
                ) : (
                  <select value={month} className = 'bg-black' onChange={(e) => {
                    setMonth(parseInt(e.target.value))
                    setCurrentWeek(0)
                  }}>
                    {
                      MONTHS.map((ele,idx) => (
                        <option className='text-2xl' value={`${idx}`}>{ele}</option>
                      ))
                    }
              
                  </select>
                )
              }
              <select onChange={(e) => setCurrentYear(parseInt(e.target.value))}  className = 'bg-black' value={currentYear}>
                {
                  YEARS.map((year)=>(
                    <option value={year}>{year}</option>
                  ))
                }
              </select>
            </div>

            <div className='flex justify-center items-center'>
              <i className={`${currentWeek == 0 ? 'not-lg:text-gray-300' : 'text-white'} ${month == 0 ? 'text-gray-300' : ''}`} onClick={()=>{
                if(mSize.isMediumDevice){
                  if(currentWeek == 0) return;
                  setCurrentWeek(currentWeek-1)
                }
                else{
                  if(month == 0) return;
                  setMonth(month - 1)
                }
                
                }}><IoIosArrowBack/></i>
              <i className={`${currentWeek >= Math.ceil(dayList.length / CURRENT_WEEK_MULTIPLY) - 1? 'not-lg:text-gray-300' : ''} ${NUMBER_OF_MONTHS-1 <= month ? 'text-gray-300' : ''}`} onClick={()=>{
                if(mSize.isMediumDevice){
                  if(currentWeek >= Math.ceil(dayList.length / CURRENT_WEEK_MULTIPLY) - 1) return 
                  setCurrentWeek(currentWeek+1)
                }
                else{
                  if(NUMBER_OF_MONTHS-1 <= month) return;
                  setMonth(month + 1)
                }
                }}><IoIosArrowForward/></i>
            </div>
        </div>
     {          
      !mSize.isMediumDevice &&
      <ul className='flex w-full justify-around px-6 text-white my-2 mb-3'>
        <li className='text-red-400 text-bold'>S</li>
        <li>M</li>
        <li>T</li>
        <li>W</li>
        <li>Th</li>
        <li>F</li>
        <li>St</li>
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
      tasksData.slice(elementStart, elementEnd).map((ele, idx) => (
        <MonthCard key={idx} data={ele} />
      ))
    }

    {
      !mSize.isMediumDevice &&
      Array(placeHolderI).fill(0).map((_,i)=>(
         <div key={`placeholder-e-${i}`} className='w-[13%] h-[100px]'></div>
      ))
    }
  </>
</div>

    </div>
  )
}

export default MonthView