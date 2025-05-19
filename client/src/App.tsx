import React from 'react'
import TopBar from './Components/TopBar'
import Today from './Components/TodayView'
import MonthView from './Components/MonthView'
import MonthCard from './Components/MonthCard'
import MainView from './Components/MainView'
import { SizeProvider } from './providers/ScreenSize'
import { AddTaskProvider } from './providers/FloatingWindows'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import AuthView from './Components/AuthView'
import LoginView from './Components/LoginView'
import RegisterView from './Components/RegisterView'

const App = () => {
  return (

    <Router>
    <SizeProvider>
        <AddTaskProvider>
      <div className='bg-blue-950 h-fit overflow-y-hidden'>
        <TopBar/>
        {/* <MainView/> */}
        {/* <MonthCard/> */}
        <Routes>
        <Route path='/' element={
          <MainView/>
        }/>
        <Route path='/login' element={
          <AuthView>
              <LoginView/>
          </AuthView>
        }/>
        <Route path='/register' element={
          <AuthView>
              <RegisterView/>
          </AuthView>
        }/>
      
      </Routes>
      </div>
      </AddTaskProvider>
      </SizeProvider>
      
    </Router>
    
      
    
  )
}

export default App