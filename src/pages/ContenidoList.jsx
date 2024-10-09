import { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaCaretLeft } from "react-icons/fa";

export function ListaDatos(props) {
    const [datos, setDatos] = useState(props.datos);
    let categorias = props.categorias;
    let key = 0;
    let key2 = 0;

    window.onscroll = () => {
        let nav = document.getElementById("contenido-navegacion");
        let navPosition = document.getElementById("lista-datos-grid").getBoundingClientRect().top;

        if (navPosition < 100) {
            nav.style.backdropFilter = "blur(10px)";

        } else {
            nav.style.backdropFilter = "none";
        }
    };


    async function changeCategories(name) {
        let url;
        if (props.tipo == "meal") {
            url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`
        } else if (props.tipo == "cocktail") {
            url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${name}`
        }


        const res = await fetch(url)
        const data = await res.json()
        setDatos(props.tipo == "meal" ? data.meals : data.drinks)
    }

    async function changeSearch(name) {
        let url;
        if (props.tipo == "meal") {
            url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
        } else if (props.tipo == "cocktail") {
            url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`
        }

        const res = await fetch(url)
        const data = await res.json()
        setDatos(props.tipo == "meal" ? data.meals : data.drinks)
    }

    return (
        <>
            <nav className="contenedor-contenido-navegacion" id="contenido-navegacion">
                <h1 className='contenido-navegacion-titulo'>
                    <Link to="/">
                        <FaCaretLeft /> {props.tipo === "meal" ? "Meals" : "Cocktails"}
                    </Link>
                </h1>

                <div className="contenedor-contenido-navegacion-busqueda">
                    <label>Categoria:</label>

                    <select name="" id="" onChange={(e) => { changeCategories(e.target.value) }}>
                        {
                            categorias?.map((categoria) => (
                                <option key={key2++} value={categoria.strCategory}>{categoria.strCategory}</option>
                            ))
                        }
                    </select>

                </div>
                <div className="contenedor-contenido-navegacion-busqueda">

                    <label>Buscar:</label>

                    <input type="text" onChange={(e) => changeSearch(e.target.value)} />

                </div>
            </nav>

            <section className="lista-datos-grid" id='lista-datos-grid'>
                {datos?.map((lista) => (
                    <Link to={props.tipo === "meal" ? "/MealRecipe/" + lista.idMeal : "/CocktailRecipe" + "/" + lista.idDrink} className='lista-datos-grid-item' key={key++}>

                        <img src={
                            props.tipo === "cocktail" ?
                                lista.strDrinkThumb + "/preview" :
                                lista.strMealThumb + "/preview"
                        } alt="" />

                        <h3>{props.tipo === "cocktail" ?
                            lista.strDrink :
                            lista.strMeal
                        }</h3>

                    </Link>
                ))}
            </section>
        </>
    )
}