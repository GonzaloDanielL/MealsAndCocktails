import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { ListIngre } from "../components/Ingredientes.jsx"
import { FaCaretLeft } from "react-icons/fa";
import { LuExternalLink } from "react-icons/lu";

export function RecetaGuia(props) {
    const [datos, GetDatos] = useState()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { id } = useParams()

    window.onscroll = () => {
        let nav = document.getElementById("navegacion-receta");
        let navPosition = document.getElementById("contenedor-receta").getBoundingClientRect().top;

        if (navPosition < 100) {
            nav.style.backdropFilter = "blur(10px)";

        } else {
            nav.style.backdropFilter = "none";
        }
    };

    useEffect(() => {

        const fetchData = async () => {
            try {

                if (props.tipo === "cocktail") {
                    const datosResponse = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
                    GetDatos(datosResponse.data.drinks[0])
                    console.log(datosResponse.data.drinks[0])

                } else {
                    const datosResponse = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
                    console.log(datosResponse.data.meals[0])
                    GetDatos(datosResponse.data.meals[0])
                }
            }

            catch (error) {
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
            <nav className="navegacion-receta" id="navegacion-receta">


                <h1 className="navegacion-receta-titulo">
                    <Link to={props.tipo === "cocktail" ? "/Cocktails" : "/meals"}>


                        <FaCaretLeft />
                        Receta{props.tipo === "cocktail" ? " - " + datos.strDrink : " - " + datos.strMeal}

                    </Link>
                </h1>



                {
                    props.tipo === "meal" ?
                        datos.strYoutube ? <a className="link-youtube" href={datos.strYoutube} target="_blank">
                            <LuExternalLink />
                            Link Video</a> : "" :
                        datos.strVideo ? <a className="link-youtube" href={datos.strVideo} target="_blank">
                            <LuExternalLink />
                            Link Video</a> : ""
                }

            </nav>

            <section className="contenedor-receta" id="contenedor-receta">
                <section className="contenido-receta-1">
                    <img src={props.tipo === "cocktail" ? datos.strDrinkThumb : datos.strMealThumb} alt="" />
                    <div className="contenedor-ingredientes">
                        <ListIngre data={datos} tipo={props.tipo} />
                    </div>
                </section>
                <section className="contenido-receta-2">
                    <p style={{ whiteSpace: 'pre-line' }} className="receta-descipcion">
                        {datos.strInstructions}
                    </p>
                </section>
            </section>
        </>
    )
}