import React from 'react'
import TopBar from './Components/TopBar'
import Today from './Components/Today'
import MonthView from './Components/MonthView'
import MonthCard from './Components/MonthCard'
import MainView from './Components/MainView'
import { SizeProvider } from './providers/ScreenSize'


const App = () => {
  return (
    <SizeProvider>
    <div className='bg-blue-950 h-fit overflow-y-hidden'>
      <TopBar/>
      
      <MainView/>
      {/* <MonthCard/> */}
    </div>
    </SizeProvider>
  )
}

export default App