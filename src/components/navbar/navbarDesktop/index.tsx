import { FiShoppingCart, FiUser } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import logo from '/logo.png'
import { InputSearch } from "../../InputSearch/InputSearch";
import type { CartProps } from "../../../features/cart/CartContext";



export function NavbarDesktop({cart}:{cart:CartProps[]}){
    return(
        <div className="hidden sm:block sticky top-0 w-full h-18  z-30 bg-black border-b border-[#2A4D4E] ">

            <nav className=" flex bg-[#082F36]/60   h-full md:flex items-center justify-between px-2 sm:px-4 mx-auto ">

                <Link className=" relative flex font-bold text-2xl text-white " to='/'>

                    <div className='w-12 text-wrap font-bold  leading-none '>
                        <p className='  select-none hover:tracking-widest duration-300'>Paso</p>
                        <p className='  select-none hover:tracking-widest duration-300 pl-6'>Firme</p>
                    </div>
                    
                    <img 
                    src={logo} 
                    className='w-10 absolute -right-11  sm:-right-11 sm:top-0 bg-transparent'
                    loading='lazy'
                    decoding='async'
                    alt='logotipo'
                    />
                </Link>

                <section className=' max-w-xs w-full  justify-between items-center flex flex-1 '>
                    <NavLink to='/' className={({isActive})=>isActive?'text-[#E86343] ':'text-white hover:text-[#E86343]'}>
                        Clásicos
                    </NavLink>
                    <NavLink to='/accesorios' className={({isActive})=>isActive?'text-[#E86343] ':'text-white hover:text-[#E86343]'}>
                        Accesorios
                    </NavLink>
                    <NavLink to='/sport' className={({isActive})=>isActive?'text-[#E86343] ':'text-white hover:text-[#E86343]'}>
                        Sport
                    </NavLink>
                </section>

                <div className='hidden lg:flex'>
                    <InputSearch />
                </div>



                <div className='flex  items-center justify-center gap-3 md:gap-6'>

                    <Link className="relative pr-2" to='/cart'>
                        <FiShoppingCart size={24} color="#ffff"/>
                        { cart.length >0 && (
                            <span className="absolute -right-3 -top-3 px-2.5 bg-[#C00000] w-5 h-5 rounded-full flex justify-center items-center text-white ">{ cart.length}</span>
                        )}
                    </Link>

                    
                    <Link to='/login' className='hidden sm:flex'>
                        <button 
                        className='flex items-center justify-center   w-8 h-8 rounded-full  border border-[#F1EFE7] hover:bg-[#213747] hover:text-white transition-all cursor-pointer'
                        >
                            <FiUser size={20} className='text-[#F1EFE7] hover:text-white transition-all'/>
                        </button>
                    </Link>
                </div>
                
            </nav>

            
        </div>
    )
}