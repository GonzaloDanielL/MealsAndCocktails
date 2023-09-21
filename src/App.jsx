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
    <div>
      <div className='-z-10 fixed top-0 left-0 h-screen w-auto opacity-70 flex flex-col overflow-hidden gap-2 p-2 bg-amber-950'>

        <div className='h-1/2 -translate-x-full animate-fondomeals flex-auto w-full flex flex-row gap-2'>
          {datameals.meals?.map((imgs) => (
            <img key={imgs.idMeal} className='rounded-lg w-80' src={imgs.strMealThumb} alt="" />
          ))}
        </div>

        <div className='h-1/2 -translate-x-full animate-fondodrinks flex-auto flex flex-row bottom-0 gap-2'>
          {datacocktails.drinks?.map((imgs) => (
            <img key={imgs.idDrink} className='rounded-lg w-80' src={imgs.strDrinkThumb} alt="" />
          ))}
        </div>

      </div>

      <div className='font-itim z-10 h-screen'>
        <Routes>
          <Route path="/" exact element={<MainPage meal={datameal.meals[0].strMealThumb} cocktail={datacocktail.drinks[0].strDrinkThumb} />} />

          <Route path="/listmeals" element={<ListData title="Meals" list={datameals.meals} categories={datamealcategories.categories} />} />

          <Route path="/listcocktails" element={<ListData title="Cocktails" list={datacocktails.drinks} categories={datacocktailcategory.drinks} />} />

          <Route path='/mealdetails/:id' element={<Details title="Meals" />} />

          <Route path='/cocktaildetails/:id' element={<Details title="Cocktails" />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
