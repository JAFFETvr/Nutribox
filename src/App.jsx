import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Jugs from './feacture/admin/Jugos/presentation/UL/Jugs'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  <Jugs/>
    </>
  )
}

export default App
