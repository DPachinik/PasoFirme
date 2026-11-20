
import { Link } from "react-router-dom";
import logo from '/logo.png'
import type { CartProps } from "../../../features/cart/CartContext";
import { useEffect, useState } from "react";
import { BaseballCapIcon, ListIcon, ShoppingCartSimpleIcon, SneakerIcon, SneakerMoveIcon, UserIcon, XIcon } from "@phosphor-icons/react";



export function NavbarMobile({cart, signed, loadingAdmin}:{cart:CartProps[], signed:boolean, loadingAdmin: boolean}){

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
        <div className=" sticky top-0 w-full h-18  z-30 bg-black border-b border-[#2A4D4E] sm:hidden">

            <nav className=" relative flex bg-[#082F36]/60   h-full md:flex items-center justify-between px-4 mx-auto ">

                <div className="flex gap-8 items-center">
                    <div className={`${active?'hidden':'flex'}`} onClick={()=>setActive(!active)}>
                        <ListIcon size={26} color='#ffff' />
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
                </div>


                <div className='flex  items-center justify-center gap-3 md:gap-6'>

                    <Link className="relative pr-2" to='/cart'>
                        <ShoppingCartSimpleIcon size={26} color="#ffff"/>
                        { cart.length >0 && (
                            <span className="absolute -right-3 -top-3 px-2.5 bg-[#C00000] w-5 h-5 rounded-full flex justify-center items-center text-white ">{ cart.length}</span>
                        )}
                    </Link>

                    

                </div>
                
            </nav>

            {/* Menú desplegable */}

            <section className={`${active?'absolute top-0  h-screen w-[75%] flex flex-col z-99 bg-black  ':'hidden'} animate-down `}>
                <div className="rel flex flex-col flex-1 justify-evenly items-start   bg-[#082F36]/60 text-white ">
                    <div className={`${active?'flex absolute top-4 right-4':'hidden'}`} onClick={()=>setActive(!active)}>
                        <XIcon size={26} color='#ffff' />
                    </div>

                    <Link className=" relative flex font-bold text-2xl text-white my-4 pl-4" to='/'>

                        <div className='w-12 text-wrap font-bold  leading-none '>
                            <p className='  select-none hover:tracking-widest duration-300'>Paso</p>
                            <p className='  select-none hover:tracking-widest duration-300 pl-6'>Firme</p>
                        </div>
                        
                        <img 
                        src={logo} 
                        className='w-10 absolute -right-11  sm:-right-11 sm:top-0 bg-transparent '
                        loading='lazy'
                        decoding='async'
                        alt='logotipo'
                        />
                    </Link> 

                    <div className="h-px w-full bg-[#F1EFE7]"></div>    


                    <section className="flex flex-col flex-2  pl-4 w-full space-y-6 pt-8 text-[#F1EFE7] ">
                        <p className="text-secondary font-medium">CATEGORÍAS</p>
                        <Link to='/clásicos' onClick={()=>setActive(!active)} className="flex gap-4 items-center">
                            <SneakerIcon size={30} />
                            <p className="text-lg">Clásicos</p>
                        </Link>
                        <Link to='/accesorios' onClick={()=>setActive(!active)} className="flex gap-4 items-center">
                            <BaseballCapIcon  size={30}  />
                            <p className="text-lg">Accesorios</p> 
                        </Link>
                        <Link to='/sport' onClick={()=>setActive(!active)} className="flex gap-4 items-center">
                            <SneakerMoveIcon size={30}  />
                            <p className="text-lg">Sport</p> 
                        </Link>
                    </section>

                    <section className="flex-1 flex items-center pl-4 w-full border-b-px">
                        <Link to='/login' className='hover:bg-amber-50'onClick={()=>setActive(!active)}>
                            <button 
                            className='flex items-center justify-center   transition-all cursor-pointer'
                            >
                            {!loadingAdmin && !signed && (
                                <div className="flex gap-4 items-center">
                                    <div className="flex items-baseline justify-center  w-8 h-8  hover:bg-[#213747] hover:text-white  ">
                                        <UserIcon  size={30}  className='text-[#F1EFE7] hover:text-white transition-all'/> 
                                    </div>
                                    <p className="text-lg">Administrar</p>
                                </div>

                                
                            )}

                            {!loadingAdmin && signed && (
                                <strong className="text-white text-sm">Admin</strong>
                            )}
                            </button>
                        </Link>
                    </section>
                    

                </div>

            </section>

            {/* overlay */}
            <div className={`${active?'flex':'hidden'} absolute top-0 right-0  w-[25%] h-screen h-100vh bg-black/40 z-99`}>

            </div>

        </div>
    )
}