import  { useContext } from 'react'
import TodayCardView from './TodayCardView'
import { DataContext, SingleDataContext } from '../providers/Contexts'

const TodayView = () => {
  const processData = useContext(SingleDataContext)
  const dataContext = useContext(DataContext)
  
  return (
    <div className='lg:h-[calc(100vh-70px)] overflow-y-scroll bg-blue-900 w-[100%] lg:w-[30%]  rounded-4xl hide-scrollbar'>
        
        <div className='z-10 sticky top-0 max-h-14 position- bg-black rounded-t-4xl text-white font-bold text-2xl flex justify-between items-center p-5'>
            <span>{processData?.data.full_date}</span>
        </div>
        <div className='rounded-b-4xl p-5 space-y-5 overflow-visible hide-scrollbar max-h-[calc(100%-56px)] h-full'>
          
          { 
          (processData?.data.tasks[0]) ? (

          
            processData?.data.tasks.map((task)=>(
              
              <TodayCardView task = {task} fetchData={() => {
                dataContext?.fetchAndProcessData()}}/> 
            ))
          ) : (
            <div className='min-h-20 flex justify-center items-center text-white font-bold text-3xl lg:h-[calc(100vh-200px)]'><span>No Tasks for today...</span></div>
          )
        
        }
           
        </div>
    </div>
  )
}

export default TodayView