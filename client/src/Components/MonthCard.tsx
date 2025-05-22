import { useContext } from 'react'
import { SizeContext } from '../providers/ScreenSize'
import type { DateAndTaskType } from '../providers/Types'
import { WEEK_DAYS } from '../providers/Constants'
import { SingleDataContext } from '../providers/Contexts'

const MonthCard = ({data} : {data : DateAndTaskType}) => {
    const SingleContext = useContext(SingleDataContext)
    const mSize = useContext(SizeContext)
    const MAX_ELEMENTS = mSize?.isMediumDevice ? 4 : 2
    const slice_length = mSize?.isMediumDevice ? 25 : 12
    const is_today = (new Date().toLocaleDateString('en-CA')) == data.full_date
  return (
    <div onClick={()=>{
         SingleContext?.setData(data)
    }} className={`rounded-2xl border-2 ${is_today ? 'bg-white text-black' : 'text-white'} border-white  lg:w-[13.00%] w-[100%] not-lg:px-1.5 p-1 overflow-y-hidden flex lg:flex-col not-lg:space-x-6 lg:h-[16%]`}>
        <div className='mb-1 not-lg:flex not-lg:flex-col not-lg:justify-between not-lg:items-center'>
            <p className=' text-[1.5rem] lg:text-[1rem]  font-medium'>{data.date}</p>
            <span className={`${data.week_num == 0 ? 'text-red-400' : ''} lg:hidden font-medium`}>{WEEK_DAYS[data.week_num]}</span>
        </div>
        <div className='space-y-1 text-sm flex lg:flex-col not-lg:h-[85px] not-lg:space-x-1.5'>
            {
                !(data.tasks.length == 0) && (
                    data.tasks.slice(0,MAX_ELEMENTS).map((task) => (
                        <div className={` border-1 ${is_today ? 'border-black' : 'border-white'} rounded-[5px] px-1 not-lg:w-17`}>
                            <span>{task.title.slice(0,slice_length)}</span> 
                            <span>{(task.title.length > slice_length) && '...'}</span>
                        </div>
                    ))
                ) 
            }

            {
                (data.tasks.length > MAX_ELEMENTS) && (
                    <div className='text-white px-1 flex justify-end'>
                <p>+</p>
            </div>
                )
            }
            
           
        </div>
    </div>
  )
}

export default MonthCard