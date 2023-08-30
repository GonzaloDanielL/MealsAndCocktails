import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const [datos, setDatos] = useState()

  async function getData(){
    await fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
    .then((response) => response.json())
    .then((data) => {console.log(data), setDatos(data.drinks)})
  }

  useEffect(()=>{
    getData();
  },[])

  return (
    <>
      <h1 className="text-3xl text-cyan-300 font-bold underline">
        Hello world!
      </h1>
      <div>
        {datos?.map((item) => (
          <div key={item.idDrink}>
<h2>{item.strDrink}</h2>
          </div>

        ))}
      </div>
    </>
  )
}

export default App
