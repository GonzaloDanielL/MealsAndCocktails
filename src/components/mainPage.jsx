import { Link } from 'react-router-dom'


export function MainPage(props) {
    return (
        <div className='flex flex-col pt-24 items-center h-full gap-20 max-md:gap-10 max-md:pt-12 max-sm:pb-20 max-sm:overflow-auto'>
            <h1 className="text-amber-400 font-extrabold text-7xl text-center">Meals And Cocktails</h1>
            <div className='text-amber-500 flex flex-row gap-40 max-md:gap-14 max-sm:flex-col'>
                <Link to="/listmeals" className="bg-amber-400/20 rounded-xl p-5  transition-all duration-300 linear  hover:bg-amber-400/40 hover:scale-105">
                    <img className='w-60 h-60 rounded-xl' src={props.meal} alt="" />
                    <h2 className='text-center mt-4 text-4xl'>Meals</h2>
                </Link>
                <Link to="/listcocktails" className="bg-amber-400/20 rounded-xl p-5
                    transition-all duration-300 linear  hover:bg-amber-400/40 hover:scale-105">
                    <img className='w-60 h-60 rounded-xl' src={props.cocktail} alt="" />
                    <h2 className='text-center mt-4 text-4xl'>Cocktails</h2>
                </Link>
            </div>
        </div>
    )

}