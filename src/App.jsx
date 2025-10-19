import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Clientes from './Cliente'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Clientes></Clientes>
        
    </>
  )
}

export default App
