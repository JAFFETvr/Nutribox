import { useState } from 'react'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import LoginView from './feacture/login/presentation/UL/Section'
import Home from './feacture/Home/presentation/UL/Home'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
            
            
            <Route path="/login" element={<LoginView />} />

    </Routes>
     
    </>
  )
}

export default App
