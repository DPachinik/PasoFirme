import {CartContext} from '../../contexts/cart/CartContext'
import { useContext } from 'react'
import { FiShoppingCart } from "react-icons/fi";
import {  IoSearch } from 'react-icons/io5';
import { Link } from "react-router-dom";


export function Navbar(){

    const{ cart }= useContext(CartContext)

    return(
        <div className="w-full px-1 mt-4  ">
            <nav className="bg-white w-full  max-w-7xl h-14 flex items-center justify-between px-5 mx-auto shadow gap-3 rounded-lg">
                <Link className="font-bold text-2xl text-amber-50" to='/'>
                    <span className='bg-primary bg-clip-text text-transparent select-none'>PASO</span>
                    <span className='bg-secondary bg-clip-text text-transparent select-none'>FIRME</span>
                </Link>

                <div className='flex w-full items-center justify-center gap-2'>
                    <input
                    className='w-full max-w-2xl pl-2 rounded-sm h-8 border border-[#3D4035] outline-none' 
                    type='text' 
                    placeholder='Buscar'
                    />
                    <IoSearch color='#3D4035' size={28} className='cursor-pointer' />
                </div>

                <div className='flex  items-center justify-center gap-3'>

                    <Link to='/login'>
                        <button className='hidden lg:block px-4   rounded-xl text-gray-600  border border-[#3D4035] hover:bg-[#3D4035] hover:text-white transition-all'>Admin</button>
                    </Link>

                    <Link className="relative" to='/cart'>
                        <FiShoppingCart size={24} color="#3D4035"/>
                        { cart.length >0 && (
                            <span className="absolute -right-3 -top-4 px-2.5 bg-[#C00000] w-6 h-6 rounded-full flex justify-center items-center text-white ">{ cart.length}</span>
                        )}
                    </Link>
                </div>
                
            </nav>

            
        </div>
    )
}