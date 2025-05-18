import React from 'react'
import TopBar from './Components/TopBar'
import Today from './Components/TodayView'
import MonthView from './Components/MonthView'
import MonthCard from './Components/MonthCard'
import MainView from './Components/MainView'
import { SizeProvider } from './providers/ScreenSize'
import { AddTaskProvider } from './providers/FloatingWindows'


const App = () => {
  return (
    <SizeProvider>
      <AddTaskProvider>
    <div className='bg-blue-950 h-fit overflow-y-hidden'>
      <TopBar/>
      
      <MainView/>
      {/* <MonthCard/> */}
    </div>
    </AddTaskProvider>
    </SizeProvider>
  )
}

export default App