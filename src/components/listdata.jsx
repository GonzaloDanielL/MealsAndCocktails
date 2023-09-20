import { BsFillCaretLeftFill } from "react-icons/bs";
import { useState } from "react";
import { Link } from "react-router-dom";

export function ListData(props) {
    const [data, setData] = useState(props.list)
    let categories = props.categories
    let name, img, keyid, ctgid = 1, details;

    async function changeCategories(name) {
        let url;
        if (props.title == "Meals") {
            url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`
        } else if (props.title == "Cocktails") {
            url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${name}`
        }

        const res = await fetch(url)
        const data = await res.json()
        setData(props.title == "Meals" ? data.meals : data.drinks)
    }

    async function changeSearch(name) {
        let url;
        if (props.title == "Meals") {
            url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
        } else if (props.title == "Cocktails") {
            url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`
        }

        const res = await fetch(url)
        const data = await res.json()
        setData(props.title == "Meals" ? data.meals : data.drinks)
    }

    if (props.title == "Meals") {
        name = "strMeal";
        img = "strMealThumb";
        keyid = "idMeal";
        details = "mealdetails";

    } else if (props.title == "Cocktails") {
        name = "strDrink";
        img = "strDrinkThumb";
        keyid = "idDrink";
        details = "cocktaildetails";
    }

    return (
        <div className="h-full flex flex-col pl-36 pr-36 pt-5 max-lg:pr-24 max-lg:pl-24 max-md:pr-10 max-md:pl-10 max-sm:pl-4 max-sm:pr-4">
            <div className="flex flex-row w-full mb-4 max-lg:flex-wrap max-lg:flex-none max-lg:gap-4
            ">
                <Link to="/" className="text-6xl text-amber-400 w-fit flex flex-row transition-all duration-300 linear hover:scale-105">
                    <BsFillCaretLeftFill />
                    <h1>{props.title}</h1>
                </Link>

                <div className="flex-auto flex flex-row justify-end items-end gap-2 max-lg:justify-center">
                    <h2 className="text-amber-400 h-fit text-2xl">Categories: </h2>
                    <select className="p-1 pl-2 pr-2 h-fit w-40 rounded-md outline-none bg-yellow-500/50 border-2 border-yellow-500 text-amber-500" onChange={(e) => { changeCategories(e.target.value) }}>
                        {categories?.map((catego) => (
                            <option key={ctgid += 1} value={catego.strCategory}>{catego.strCategory}</option>
                        ))}
                    </select>
                </div>

                <div className="flex-auto flex flex-row justify-end items-end gap-2 max-lg:justify-center">
                    <h2 className="text-amber-400 h-fit text-2xl">Search: </h2>
                    <input className="p-1 pl-2 pr-2 h-fit w-40 rounded-md outline-none bg-yellow-500/50 border-2 border-yellow-500 text-amber-500" type="text" onChange={(e) => { changeSearch(e.target.value) }} />
                </div>
            </div>

            <hr className="h-1 bg-yellow-500 border-0" />

            <div className="overflow-auto h-3/4 mt-6 no-scrollbar max-lg:h-2/3 max-md:h-3/5">
                <div className="flex flex-wrap gap-8 justify-center">
                    {data?.map((item) => (
                        <Link to={`/${details}/${item[keyid]}`} className="w-72 shadow-xl bg-amber-400/20 p-4 flex flex-col items-center rounded-xl transition-all duration-300 linear  hover:bg-amber-400/40" key={item[keyid]}>
                            <img className='w-64 h-64 rounded-xl' src={item[img]} alt="" />
                            <h3 className="text-amber-500 text-center mt-4 text-2xl break-words">{item[name]}</h3>
                        </Link>
                    ))}
                </div>
            </div>
            <hr className="mt-6 h-1 bg-yellow-500 border-0" />
        </div>
    )
} 