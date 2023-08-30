import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const [count, setCount] = useState(0)

  async function getDato() {
    await fetch("https://api.animality.xyz/all/cat")

      .then((response) => response.json())
      .then((data) => { console.log(data) });

  }


  useEffect(() => {
    getDato()
  }, [])

  return (
    <>
      <h1 className="text-3xl text-cyan-300 font-bold underline">
        Hello world!
      </h1>
    </>
  )
}

export default App
