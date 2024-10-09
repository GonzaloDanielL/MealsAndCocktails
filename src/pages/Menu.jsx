import { Link } from "react-router-dom"

export function MenuPrincipal(props) {
    return (
        <>
            <header className='menu-principal'>
                <h1 className='menu-principal-titulo'> Meals & Cocktails</h1>

                <nav className='navegacion-1'>
                    <Link className="navegacion-1-link" to="/Meals">
                        <img src={props.meal.strMealThumb} alt="" />
                        <h2>Meals</h2>
                    </Link>
                    <Link className="navegacion-1-link" to="/Cocktails">
                        <img src={props.cocktail.strDrinkThumb} alt="" />
                        <h2>Cocktails</h2>
                    </Link>
                </nav>

            </header>

        </>
    )
}