import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import { MenuPrincipal } from './pages/Menu.jsx'
import { ListaDatos } from './pages/ContenidoList.jsx'
import { RecetaGuia } from './pages/Receta.jsx'
import fondoImagen from './fondo.png'

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
)

function App() {
  const location = useLocation()
  const [mealData, setMealData] = useState(null)
  const [cocktailData, setCocktailData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [mealsList, setMealsList] = useState()
  const [cocktailList, setCocktailsList] = useState()

  const [mealCategories, setMealCategories] = useState()
  const [cocktailCategories, setCocktailCategories] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mealResponse = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
        setMealData(mealResponse.data.meals[0])

        const cocktailResponse = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        setCocktailData(cocktailResponse.data.drinks[0])

        const mealsResponse = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        setMealsList(mealsResponse.data.meals)

        const cocktailsResponse = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')
        setCocktailsList(cocktailsResponse.data.drinks)

        const mealcategoriesResponse = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
        setMealCategories(mealcategoriesResponse.data.categories)

        const cocktailcategoriesResponse = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
        setCocktailCategories(cocktailcategoriesResponse.data.drinks)

      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <h1 className='mensaje-carga-error'>Loading...</h1>
  }

  if (error) {
    return <h1 className='mensaje-carga-error'>Error: {error}</h1>
  }

  return (
    <>
      <img className='fondo-imagen' src={fondoImagen} alt="" />

      <main className='contenedor-contenido'>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <PageTransition>
                <MenuPrincipal meal={mealData} cocktail={cocktailData} />
              </PageTransition>
            } />

            <Route path="/Meals" element={
              <PageTransition>
                <ListaDatos datos={mealsList} tipo="meal" categorias={mealCategories} />
              </PageTransition>
            } />

            <Route path="/Cocktails" element={
              <PageTransition>
                <ListaDatos datos={cocktailList} tipo="cocktail" categorias={cocktailCategories} />
              </PageTransition>
            } />

            <Route path="/MealRecipe/:id" element={
              <PageTransition>
                <RecetaGuia tipo="meal" />
              </PageTransition>
            } />

            <Route path="/CocktailRecipe/:id" element={
              <PageTransition>
                <RecetaGuia tipo="cocktail" />
              </PageTransition>
            } />
          </Routes>
        </AnimatePresence>
      </main>
    </>
  )
}

export default App