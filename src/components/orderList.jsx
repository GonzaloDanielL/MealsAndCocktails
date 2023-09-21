export function OrderList(datos) {
    let listI = [];
    let imgI = "";
    let num = 1;
    let ingredient = "";
    let comprobante = true;

    if (datos.datos.length != 0) {
        while (comprobante == true) {
            ingredient = datos.datos["strMeasure" + num] + " " + datos.datos["strIngredient" + num];
            imgI = (`https://www.themealdb.com/images/ingredients/${datos.datos["strIngredient" + num]}.png`)

            if (datos.datos["strMeasure" + num] == null) {
                break;
            }

            if (datos.datos["strMeasure" + num].length === 0 || datos.datos["strIngredient" + num].length === 0) {
                break;

            } else {
                listI.push(<div key={num} className="flex w-32 flex-col gap-2 items-center max-sm:w-24">
                    <img className="w-full" src={imgI} alt="no hay" />
                    <h3 className="text-amber-400 text-center text-2xl break-words">{ingredient}</h3>
                </div>);
                num += 1;
            }
        }
    }
    return (listI);
}