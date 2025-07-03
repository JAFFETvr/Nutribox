import { useState } from 'react'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import LoginView from './feacture/login/presentation/UL/Section'
import DashboardView from './feacture/Admin/presentation/UL/dashboar'
import Home from './feacture/Home/presentation/UL/Home'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
            
            
            <Route path="/login" element={<LoginView />} />
      <Route path="/dashboard" element={<DashboardView />} />

    </Routes>
     
    </>
  )
}

export default App
