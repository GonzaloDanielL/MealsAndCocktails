import { Route, Routes } from 'react-router-dom'
import { fetchData } from './components/fetchData'
import { MainPage } from './components/mainPage'
import { ListData } from './components/listdata'
import { Details } from './components/details'
import './App.css'

const meal = fetchData("https://www.themealdb.com/api/json/v1/1/random.php");

const cocktail = fetchData("https://www.thecocktaildb.com/api/json/v1/1/random.php");

const meals = fetchData("https://www.themealdb.com/api/json/v1/1/search.php?s=");

const Cocktails = fetchData("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=");

const mealcategory = fetchData("https://www.themealdb.com/api/json/v1/1/categories.php");

const cocktailCategory = fetchData("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list")

function App() {
  const datameal = meal.read();
  const datacocktail = cocktail.read();
  const datameals = meals.read();
  const datacocktails = Cocktails.read();
  const datamealcategories = mealcategory.read();
  const datacocktailcategory = cocktailCategory.read();

  return (
    <>
      <div className='font-itim bg-gradient-to-b from-amber-600/30 to-amber-600/20 h-screen'>
        <Routes>
          <Route path="/" exact element={<MainPage meal={datameal.meals[0].strMealThumb} cocktail={datacocktail.drinks[0].strDrinkThumb} />} />

          <Route path="/listmeals" element={<ListData title="Meals" list={datameals.meals} categories={datamealcategories.categories} />} />

          <Route path="/listcocktails" element={<ListData title="Cocktails" list={datacocktails.drinks} categories={datacocktailcategory.drinks} />} />

          <Route path='/mealdetails/:id' element={<Details title="Meals" />} />

          <Route path='/cocktaildetails/:id' element={<Details title="Cocktails" />} />
        </Routes>
      </div>
    </>
  )
}

export default App
