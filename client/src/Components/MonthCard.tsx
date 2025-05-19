import { type dateObj,type dateWithDataObj } from '../utilities/cal'


const MonthCard = ({data} : {data : dateWithDataObj}) => {
    const WHEEK = ['S','M','T','W','Th','F','St']
  return (
    <div className='rounded-2xl border-2 border-white  lg:w-[13.00%] w-[100%] not-lg:px-1.5 p-1 overflow-y-hidden flex lg:flex-col not-lg:space-x-6'>
        <div className='mb-1 not-lg:flex not-lg:flex-col not-lg:justify-between not-lg:items-center'>
            <p className=' text-[1.5rem] lg:text-[1rem] text-white font-medium'>{data.date}</p>
            <span className={`${data.week_num == 0 ? 'text-red-400' : 'text-white'} lg:hidden font-medium`}>{WHEEK[data.week_num]}</span>
        </div>
        <div className='space-y-1 text-sm flex lg:flex-col not-lg:h-[85px] not-lg:space-x-1.5'>
            <div className='text-white border-1 border-white rounded-[5px] px-1'>
                <p>{data.tasks.length == 0 ? "This is..." : data.tasks[0].title}</p>
            </div>
            <div className='text-white border-1 border-white rounded-[5px] px-1'>
                <p>This is...</p>
            </div>
            <div className='text-white px-1 flex justify-end'>
                <p>+</p>
            </div>
           
        </div>
    </div>
  )
}

export default MonthCard