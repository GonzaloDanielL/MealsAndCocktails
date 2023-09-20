import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { BsFillCaretLeftFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { OrderList } from "./orderList"

export function Details(props) {
    const { id } = useParams();
    const [data, seData] = useState([]);
    let name, img, keyid, youtube, ytlinknew, retorno;


    async function GetDato(id) {
        let url, tipo;

        if (props.title == "Meals") {
            tipo = "meals"
        } else {
            tipo = "drinks"
        }

        if (props.title == "Meals") {
            url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

        } else if (props.title == "Cocktails") {
            url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
        }

        const res = await fetch(url)
        const data = await res.json()
        seData(data[tipo][0])
    }

    if (props.title == "Meals") {
        name = "strMeal";
        img = "strMealThumb";
        keyid = "idMeal";
        youtube = "strYoutube";
        retorno = "/listmeals/"

    } else if (props.title == "Cocktails") {
        name = "strDrink";
        img = "strDrinkThumb";
        keyid = "idDrink";
        youtube = "strVideo"
        retorno = "/listcocktails/"
    }


    useEffect(() => {
        GetDato(id)
    }, [])

    if (data.length != 0) {
        /* Reparar link de youtube*/

        if (data[youtube] != null) {
            let ytlink = data[youtube].replace('watch?v=', '').split('/');
            ytlinknew = [ytlink[0], ytlink[1], ytlink[2], ...["embed", ytlink[3]]].join("/")
        } else {
            ytlinknew = false;
        }

        return (
            <div className="h-full flex flex-col pl-36 pr-36 pt-5 max-lg:pr-24 max-lg:pl-24 max-md:pr-10 max-md:pl-10 max-sm:pl-4 max-sm:pr-4">
                <div className="flex flex-row w-full mb-4
            ">
                    <Link to={retorno} className="text-6xl text-amber-400 w-fit flex flex-row transition-all duration-300 linear hover:scale-105">
                        <BsFillCaretLeftFill />
                        <h1 className="">{props.title}</h1>
                    </Link>

                </div>

                <hr className="h-1 bg-yellow-500 border-0" />

                <div className="overflow-auto h-3/4 mt-6 no-scrollbar  bg-amber-400/20 p-5 rounded-xl">

                    <div key={data[keyid]} className="flex flex-wrap gap-8 justify-center">
                        <div className="flex flex-row gap-10 w-full max-md:flex-col max-w-screen-xl">
                            <div className="flex-auto">
                                <h2 className="text-amber-400 h-fit text-4xl">{data[name]}</h2>
                                <img className="w-full rounded-xl mt-4 max-md:h-72" src={data[img]} alt="" />
                            </div>
                            <div className="flex-auto">
                                <h2 className="text-amber-400 h-fit text-4xl">Ingredients</h2>
                                <div className="mt-4 flex flex-wrap gap-10 justify-center rounded-xl p-5 bg-amber-400/20">
                                    <OrderList datos={data} />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-row gap-10 w-full  max-md:flex-col max-w-screen-xl">
                            <div className="flex-auto">
                                <h2 className="text-amber-400 h-fit text-4xl">Youtube</h2>
                                {ytlinknew == false? <div className="mt-4 rounded-xl w-96 h-72  max-md:h-56 max-md:w-full text-amber-500 text-xl">No hay video para esta receta</div> : <iframe className="mt-4 rounded-xl w-96 h-72  max-md:h-56 max-md:w-full"
                                 src={ytlinknew + "?autohide=2"} 
                                 title="YouTube video player" alt={ytlinknew}></iframe>  }
                                
                            </div>
                            <div className="flex-auto">
                                <h2 className="text-amber-400 h-fit text-4xl">Instructions</h2>
                                <p className="text-amber-500 text-xl mt-4 rounded-xl p-5 bg-amber-400/20">{data.strInstructions}</p>
                            </div>
                        </div>
                    </div>

                </div>
                <hr className="mt-6 h-1 bg-yellow-500 border-0" />
            </div>
        )
    }
}