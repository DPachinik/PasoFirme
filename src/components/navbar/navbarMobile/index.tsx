import {  FiMenu, FiShoppingCart, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import logo from '/logo.png'
import type { CartProps } from "../../../features/cart/CartContext";
import { useEffect, useState } from "react";



export function NavbarMobile({cart}:{cart:CartProps[]}){

    const[active, setActive]= useState(false);

    function handleResize(){
        const width = window.innerWidth
        if(width>640){
            setActive(false)
        }
    }


    useEffect(()=>{

        window.addEventListener('resize', handleResize)

        return()=> window.removeEventListener('resize', handleResize)
    },[])

    useEffect(()=>{
        if(active === true){
            document.body.style.overflow= 'hidden';
        }else{
        document.body.style.overflow= 'auto';
        }

    }, [active])

    return(
        <div className=" w-full h-18  z-30 bg-black border-b border-[#2A4D4E] sm:hidden">

            <nav className=" relative flex bg-[#082F36]/60   h-full md:flex items-center justify-between px-4 mx-auto ">

                <div className={`${active?'hidden':'flex'}`} onClick={()=>setActive(!active)}>
                    <FiMenu size={30} color='#ffff' />
                </div>

                <div className={`${active?'flex':'hidden'}`} onClick={()=>setActive(!active)}>
                    <FiX size={30} color='#ffff' />
                </div>
                
                <Link className=" relative flex font-bold text-2xl text-white" to='/'>

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


                <div className='flex  items-center justify-center gap-3 md:gap-6'>

                    <Link className="relative pr-2" to='/cart'>
                        <FiShoppingCart size={24} color="#ffff"/>
                        { cart.length >0 && (
                            <span className="absolute -right-3 -top-3 px-2.5 bg-[#C00000] w-5 h-5 rounded-full flex justify-center items-center text-white ">{ cart.length}</span>
                        )}
                    </Link>

                    

                </div>
                
            </nav>

            {/* Menú desplegable */}

            <section className={`${active?'absolute   h-80 w-full flex flex-col z-99 bg-black  ':'hidden'} animate-down `}>
                <div className="flex flex-col flex-1 justify-evenly items-center bg-[#082F36]/60 text-white ">
                    <Link to='/'>
                        Clásicos
                    </Link>
                    <Link to='/accesorios'>
                        Accesorios
                    </Link>
                    <Link to='/sport'>
                        Sport
                    </Link>
                    
                    <Link to='/login' className='hover:bg-amber-50'>
                            ADMIN
                    </Link>
                </div>

            </section>

            {/* overlay */}
            <div className={`${active?'flex':'hidden'} absolute top-118 left-0  inset-0 h-100vh bg-black/30 z-40`}>

            </div>

        </div>
    )
}