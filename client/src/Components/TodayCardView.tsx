import type { TaskType } from '../providers/Types'
import TaskMenu from './TaskMenu';

const TodayCardView = ({task,fetchData} : {task : TaskType,fetchData : ()=> void}) => {
    const WEEKDAYS = ['S','M','T','W','Th','F','St']
  return (
    <div className='border-2 border-white rounded-2xl text-white p-4'>
                <div className=' flex justify-between'>
                    <div>
                        <p>{task.title}</p>
                        <p className='text-gray-400'>{task.content.slice(0,40)}...</p>
                    </div>
                    <TaskMenu task={task} fetchData={fetchData} />
                </div>
                <div className='flex justify-between'>
                    <p>Status : <span className='text-yellow-300 font-medium'>{task.state}</span></p>
                   <p>Time : {task.pendingOn.split('T')[1].slice(0,5)}</p>
                </div>
                <div className='flex justify-between mt-3 '>
                {
                    WEEKDAYS.map((day)=>(
                        <div className={`${task.weekDays.includes(day) && 'bg-white text-black' } w-6 h-6 rounded-full border-white border-2 flex justify-center items-center text-[10px]`}>{day}</div>
                    ))
                }       
            </div>
            </div>
  )
}

export default TodayCardView