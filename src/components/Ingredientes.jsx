export function ListIngre(props) {
    let datos = props.data;
    console.log(datos)
    let listI = [];
    let imgI = "";
    let num = 1;
    let ingredient = "";
    let comprobante = true;

    if (datos.length != 0) {
        while (comprobante == true) {
            ingredient = datos["strMeasure" + num] + " " + datos["strIngredient" + num];

            if (props.tipo === "cocktail") {
                imgI = (`https://www.thecocktaildb.com/images/ingredients/${datos["strIngredient" + num]}-Medium.png`)

            } else {
                imgI = (`https://www.themealdb.com/images/ingredients/${datos["strIngredient" + num]}-Small.png`)
            }


            if (datos["strMeasure" + num] == null) {
                break;
            }

            if (datos["strMeasure" + num].length === 0 || datos["strIngredient" + num].length === 0) {
                break;

            } else {
                listI.push(<div key={num} className="ingrediente-item">
                    <img className="w-full" src={imgI} alt="no hay" />
                    <h3 className="text-amber-400 text-center text-2xl break-words">{ingredient}</h3>
                </div>);
                num += 1;
            }
        }
    }
    return (listI);
}