import React from 'react'
import MonthView from './MonthView'
import Today from './Today'
const MainView = () => {
  return (
    <div className=' m-3 flex justify-around  flex-col lg:flex-row overflow-y-scroll'>
        <MonthView/>
        <Today/>
      </div>
  )
}

export default MainView