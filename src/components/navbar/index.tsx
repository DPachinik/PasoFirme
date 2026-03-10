import {CartContext} from '../../contexts/cart/CartContext'
import { useContext } from 'react'
import {  FiShoppingCart, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import logo from '/logo.png'




export function Navbar(){

    const{ cart }= useContext(CartContext)


    return(
        <div className="  w-full mt-4 px-2 ">

            <nav className=" flex bg-white w-full  max-w-7xl h-14 md:flex items-center justify-between px-6 mx-auto  gap-3 rounded-lg ">
                <Link className=" relative flex font-bold text-2xl text-amber-50" to='/'>

                    <span className='bg-primary bg-clip-text text-transparent select-none'>Paso</span>
                    <span className='bg-secondary-rel bg-clip-text text-transparent select-none'>Firme</span>
                    <img 
                    src={logo} 
                    className='w-12 absolute -right-10'
                    loading='lazy'
                    decoding='async'
                    alt='logotipo'
                    />
                </Link>


                <div className='flex  items-center justify-center gap-8 px-4'>

                    <Link className="relative" to='/cart'>
                        <FiShoppingCart size={24} color="#213747"/>
                        { cart.length >0 && (
                            <span className="absolute -right-3 -top-4 px-2.5 bg-[#C00000] w-6 h-6 rounded-full flex justify-center items-center text-white ">{ cart.length}</span>
                        )}
                    </Link>

                    
                    <Link to='/login'>
                        <button 
                        className='flex items-center justify-center   w-8 h-8 rounded-full  border border-[#213747] hover:bg-[#213747] hover:text-white transition-all cursor-pointer'
                        >
                            <FiUser size={20} className='text-[#213747] hover:text-white transition-all'/>
                        </button>
                    </Link>
                </div>
                
            </nav>

            
        </div>
    )
}