import { Link } from 'react-router-dom'


export function MainPage(props) {
    return (
        <div className='flex justify-center h-full items-center max-sm:overflow-auto max-sm:p-3 max-sm:h-auto'>
            <div className='bg-yellow-800 w-2/4 h-fit p-10 rounded-xl flex flex-col gap-8 shadow-2xl shadow-black max-sm:w-full max-sm:p-5'>
                <h1 className="text-amber-400 drop-shadow-xl shadow-amber-600 font-extrabold text-7xl text-center max-sm:text-5xl max-sm:break-words">Meals And Cocktails</h1>
                <div className='text-amber-400 flex flex-row justify-center gap-20 max-md:gap-14 max-sm:flex-col'>
                    <Link to="/listmeals" className="bg-amber-400/20 flex flex-col rounded-xl p-5 transition-all shadow-xl duration-300 linear  hover:bg-amber-400/40 hover:scale-105">
                        <img className='w-full rounded-xl shadow-md' src={props.meal} alt="" />
                        <h2 className='text-center mt-4 text-4xl drop-shadow-xl'>Meals🥞</h2>
                    </Link>
                    <Link to="/listcocktails" className="bg-amber-400/20 flex flex-col rounded-xl p-5 shadow-xl
                    transition-all duration-300 linear hover:bg-amber-400/40 hover:scale-105">
                        <img className='w-full rounded-xl shadow-md' src={props.cocktail} alt="" />
                        <h2 className='text-center mt-4 text-4xl drop-shadow-xl'>Cocktails🍸</h2>
                    </Link>
                </div>
            </div>
        </div>
    )

}