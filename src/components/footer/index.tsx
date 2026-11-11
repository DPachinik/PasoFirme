import { Link } from "react-router-dom";
import logo from '../../../public/logo.png'
import { FacebookLogoIcon, InstagramLogoIcon } from "@phosphor-icons/react";

export default function Footer(){
    return(
        <section className=" bg-black  flex ">
            <div className="relative h-full bg-[#082F36]/60 w-full flex flex-col p-4 md:px-12 pb-11">
                <div className="flex flex-col md:flex-row font-bebas">
                    <div className="flex flex-col ">
                        <Link className=" relative flex font-bold text-2xl text-crema mt-4" to='/'>

                            <div className='w-12 text-wrap font-bold  leading-none '>
                                <p className='  select-none hover:tracking-widest duration-300'>Paso</p>
                                <p className='  select-none hover:tracking-widest duration-300 pl-6'>Firme</p>
                            </div>
                            
                            <img 
                            src={logo} 
                            className='absolute left-14 w-10 bg-transparent'
                            loading='lazy'
                            decoding='async'
                            alt='logotipo'
                            />
                        </Link>  
                        <div className="mt-4  text-crema text-sm md:text-base w-full flex-col max-w-[300px] ">
                            <p>Calzados que combinan diseño,comodidad y rendimiento.</p>
                            <p>Hechos para acompañarte siempre.</p>
                        </div>  

                    </div>

                    <div className="flex flex-col  flex-1 mt-8 space-y-4 text-white md:items-center ">
                        <h2 className="mb-6 font-bold">TIENDA</h2>
                        <Link to='/' className="hover:text-[#E86343]">Clásicos</Link>
                        <Link to='/accesorios' className="hover:text-[#E86343]">Accesorios</Link>
                        <Link to='/sport' className="hover:text-[#E86343]">Sport</Link>
                    </div>
                </div>


                <div className="flex flex-col md:flex-row justify-between items-center mt-8 md:mx-8 gap-4 font-bebas">
                    <div className="flex gap-4 items-center text-gray-400">
                        <p >Nuestras redes</p>
                       <Link to=''>
                        <InstagramLogoIcon size={32}  className="hover:text-[#E86343] hover:scale-105 transition-all duration-300"/>
                       </Link>
                       
                       <Link to=''>
                        <FacebookLogoIcon size={32} className="hover:text-[#E86343] hover:scale-105 transition-all duration-300"/>
                       </Link>

                    </div>

                    <p className="text-gray-400 text-center">Todos los derechos reservados @PasoFirme 2026</p>
                </div>

            </div>
           
        </section>
    )
}